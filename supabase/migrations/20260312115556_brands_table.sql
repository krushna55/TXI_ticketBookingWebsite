-- 0004_create_brands.sql
CREATE TABLE public.brands (
  id          BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name        VARCHAR NOT NULL,
  logo_url    VARCHAR NOT NULL,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.brands ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read brands"
  ON public.brands FOR SELECT USING (true);

