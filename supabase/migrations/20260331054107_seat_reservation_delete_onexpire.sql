-- 1. Function that deletes expired hold reservations
CREATE OR REPLACE FUNCTION delete_expired_hold_reservations()
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
  DELETE FROM seat_reservations
  WHERE reservation_status = 'hold'
  AND expires_at < NOW();
END;
$$;

-- 2. Schedule it to run every minute using pg_cron
SELECT cron.schedule(
  'delete-expired-holds',     -- job name
  '* * * * *',                -- every minute
  'SELECT delete_expired_hold_reservations()'
);