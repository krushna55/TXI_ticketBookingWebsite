-- 0010_create_seat_reservations.sql
CREATE TABLE public.seat_reservations (
  id                  BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id             UUID NOT NULL REFERENCES public.profile(user_id) ON DELETE CASCADE,
  showtime_id         BIGINT NOT NULL REFERENCES public.showtimes(id) ON DELETE CASCADE,
  seat_no             VARCHAR NOT NULL,
  price               INT,
  expires_at          TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT (NOW() + INTERVAL '5 minutes'),
  created_at          TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at          TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.seat_reservations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own reservations"
  ON public.seat_reservations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reservations"
  ON public.seat_reservations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reservations"
  ON public.seat_reservations FOR UPDATE
  USING (auth.uid() = user_id);
