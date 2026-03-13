-- 0007_create_screen.sql
CREATE TABLE public.screen (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name        VARCHAR NOT NULL,
  theater_id  BIGINT NOT NULL REFERENCES public.theater(id) ON DELETE CASCADE,
  type        VARCHAR,
  screen_row  INT,
  screen_column    INT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.screen ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read screens"
  ON public.screen FOR SELECT USING (true);
