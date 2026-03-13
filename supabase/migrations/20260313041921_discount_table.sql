-- 0009_create_discounts.sql
CREATE TABLE public.discounts (
  id           BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  code         VARCHAR NOT NULL UNIQUE,
  discount_pct INT,
  min_amount   INT,
  created_at   TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at   TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.discounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read discounts"
  ON public.discounts FOR SELECT
  USING (auth.role() = 'authenticated');