-- ============================================================
-- sync_seat_reservations
-- ============================================================
-- Run this in your Supabase SQL Editor (Database → SQL Editor).
--
-- What it does in ONE round trip:
--   1. Checks every seat in p_seats_to_add — if any are already
--      held/paid by someone else it raises an exception immediately
--      (nothing is written, full rollback).
--   2. Deletes every seat in p_seats_to_delete that belongs to
--      this user + showtime.
--   3. Inserts every seat in p_seats_to_add for this user.
--
-- Because it runs inside a single transaction, either ALL of it
-- succeeds or NONE of it does — no partial writes possible.
--
-- auth.uid() is used directly so the user_id is always the
-- authenticated caller — impossible to spoof from the client.
-- ============================================================

CREATE OR REPLACE FUNCTION sync_seat_reservations(
    p_showtime_id   INT,
    p_seats_to_add  TEXT[],   -- seats user wants to hold
    p_seats_to_del  TEXT[],   -- seats user wants to release
    p_price         NUMERIC   -- price per seat
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER   -- runs as DB owner so RLS doesn't block internal checks
AS $$
DECLARE
    v_user_id       UUID := auth.uid();
    v_conflict_seat TEXT;
    v_inserted      JSONB;
BEGIN
    -- ── GUARD: must be authenticated ────────────────────────────────────────
    IF v_user_id IS NULL THEN
        RAISE EXCEPTION 'NOT_AUTHENTICATED';
    END IF;

    -- ── GUARD: check for conflicts on seats we want to add ──────────────────
    -- A seat is "conflicted" if it exists in seat_reservations for this
    -- showtime AND is either:
    --   • paid by anyone
    --   • held by a DIFFERENT user
    SELECT seat_no INTO v_conflict_seat
    FROM   seat_reservations
    WHERE  showtime_id = p_showtime_id
      AND  seat_no     = ANY(p_seats_to_add)
      AND  (
               reservation_status = 'paid'
           OR (reservation_status = 'hold' AND user_id <> v_user_id)
           )
    LIMIT 1;

    IF FOUND THEN
        -- Return a structured error the client can parse
        RETURN jsonb_build_object(
            'success', false,
            'error',   'SEAT_CONFLICT',
            'seat',    v_conflict_seat
        );
    END IF;

    -- ── DELETE seats the user is releasing ──────────────────────────────────
    IF array_length(p_seats_to_del, 1) > 0 THEN
        DELETE FROM seat_reservations
        WHERE  showtime_id = p_showtime_id
          AND  user_id     = v_user_id
          AND  seat_no     = ANY(p_seats_to_del);
    END IF;

    -- ── INSERT seats the user wants to hold ─────────────────────────────────
    IF array_length(p_seats_to_add, 1) > 0 THEN
        INSERT INTO seat_reservations
            (showtime_id, user_id, seat_no, price, reservation_status)
        SELECT
            p_showtime_id,
            v_user_id,
            unnest(p_seats_to_add),
            p_price,
            'hold'
        -- If this user already has a hold on the same seat (e.g. page refresh
        -- race), just update the expires_at instead of erroring.
        ON CONFLICT (showtime_id, seat_no)
        DO UPDATE SET
            updated_at = now(),
            expires_at = now() + INTERVAL '10 minutes'
        WHERE seat_reservations.user_id = v_user_id
          AND seat_reservations.reservation_status = 'hold';
    END IF;

    -- ── Return the current hold rows for this user so client can sync ────────
    SELECT jsonb_build_object(
        'success', true,
        'held_seats', jsonb_agg(seat_no)
    )
    INTO v_inserted
    FROM seat_reservations
    WHERE showtime_id = p_showtime_id
      AND user_id     = v_user_id
      AND reservation_status = 'hold';

    RETURN COALESCE(v_inserted, jsonb_build_object('success', true, 'held_seats', '[]'::jsonb));

EXCEPTION WHEN OTHERS THEN
    -- Catch any unexpected DB error and return it cleanly
    RETURN jsonb_build_object(
        'success', false,
        'error',   SQLERRM
    );
END;
$$;

-- ============================================================
-- Grant execute to authenticated users only
-- ============================================================
REVOKE ALL ON FUNCTION sync_seat_reservations FROM PUBLIC;
GRANT  EXECUTE ON FUNCTION sync_seat_reservations TO authenticated;

-- ============================================================
-- NOTE: If you don't have a UNIQUE constraint on
-- (showtime_id, seat_no) yet, add it now so ON CONFLICT works:
--
-- ALTER TABLE seat_reservations
--   ADD CONSTRAINT seat_reservations_showtime_seat_unique
--   UNIQUE (showtime_id, seat_no);
-- ============================================================