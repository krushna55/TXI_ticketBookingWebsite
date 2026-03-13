CREATE TYPE  age_rating    AS ENUM ('U', 'U/A 7+', 'U/A 13+','U/A 16+','A','S');


-- 0005_create_movies.sql
CREATE TABLE public.movies (
  id             BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  name           VARCHAR NOT NULL,
  movie_img      VARCHAR,
  director       VARCHAR,
  duration       VARCHAR,
  genre          VARCHAR,
  age_rating     age_rating NOT NULL DEFAULT 'U',
  movies_status  movie_status NOT NULL DEFAULT 'upcoming',
  created_at     TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at     TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.movies ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read movies"
  ON public.movies FOR SELECT USING (true);
