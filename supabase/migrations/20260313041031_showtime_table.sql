-- 0008_create_showtimes.sql
CREATE TABLE public.showtimes (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  movie_id    BIGINT NOT NULL REFERENCES public.movies(id) ON DELETE CASCADE,
  theater_id  BIGINT NOT NULL REFERENCES public.theater(id) ON DELETE CASCADE,
  screen_id   BIGINT NOT NULL REFERENCES public.screen(id) ON DELETE CASCADE,
  price       INT,
  date        TIMESTAMPTZ,
  show_time   TIME WITHOUT TIME ZONE,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.showtimes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read showtimes"
  ON public.showtimes FOR SELECT USING (true);
