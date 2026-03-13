CREATE TABLE public.theater (
  id                BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name              VARCHAR NOT NULL,
  city_id           BIGINT NOT NULL REFERENCES public.cities(id) ON DELETE RESTRICT,
  user_id           UUID NOT NULL REFERENCES public.profile(user_id) ON DELETE RESTRICT,
  brand_id          BIGINT NOT NULL REFERENCES public.brands(id) ON DELETE RESTRICT,
  district          VARCHAR,
  complete_address  VARCHAR,
  created_at        TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at        TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.theater ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read theaters"
  ON public.theater FOR SELECT USING (true);
