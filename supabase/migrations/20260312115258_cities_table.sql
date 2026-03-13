-- 0003_create_cities.sql
CREATE TABLE public.cities (
  id         BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name       VARCHAR NOT NULL,
  state      VARCHAR NOT NULL,
  latitude   NUMERIC,
  longitude  NUMERIC
);

ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read cities"
  ON public.cities FOR SELECT
  USING (true);

