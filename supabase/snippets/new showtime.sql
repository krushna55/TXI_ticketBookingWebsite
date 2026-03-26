DO $$
DECLARE
  d integer;
  movie_ids integer[] := ARRAY[1,2,3,4,5,7,8,10,11,12];
  mid integer;
  -- price by screen type
  price_imax    integer := 380;
  price_regular integer := 220;
  price_4dx     integer := 320;
BEGIN
  FOR d IN 0..7 LOOP
    FOREACH mid IN ARRAY movie_ids LOOP

      -- ── Theater 1: PVR Juhu Mumbai ──────────────────────────────────
      -- Screen 1 IMAX
      INSERT INTO public.showtimes (movie_id, theater_id, screen_id, price, date, show_time) VALUES
        (mid, 1, 1, price_imax,    CURRENT_DATE + d, '09:30:00'),
        (mid, 1, 1, price_imax,    CURRENT_DATE + d, '12:30:00'),
        (mid, 1, 1, price_imax,    CURRENT_DATE + d, '15:30:00'),
        (mid, 1, 1, price_imax,    CURRENT_DATE + d, '18:30:00'),
        (mid, 1, 1, price_imax,    CURRENT_DATE + d, '21:30:00');
      -- Screen 2 Regular
      INSERT INTO public.showtimes (movie_id, theater_id, screen_id, price, date, show_time) VALUES
        (mid, 1, 2, price_regular, CURRENT_DATE + d, '09:30:00'),
        (mid, 1, 2, price_regular, CURRENT_DATE + d, '12:30:00'),
        (mid, 1, 2, price_regular, CURRENT_DATE + d, '15:30:00'),
        (mid, 1, 2, price_regular, CURRENT_DATE + d, '18:30:00'),
        (mid, 1, 2, price_regular, CURRENT_DATE + d, '21:30:00');

      -- ── Theater 2: INOX Nariman Point Mumbai ─────────────────────────
      -- Screen 3 Regular
      INSERT INTO public.showtimes (movie_id, theater_id, screen_id, price, date, show_time) VALUES
        (mid, 2, 3, price_regular, CURRENT_DATE + d, '09:30:00'),
        (mid, 2, 3, price_regular, CURRENT_DATE + d, '12:30:00'),
        (mid, 2, 3, price_regular, CURRENT_DATE + d, '15:30:00'),
        (mid, 2, 3, price_regular, CURRENT_DATE + d, '18:30:00'),
        (mid, 2, 3, price_regular, CURRENT_DATE + d, '21:30:00');
      -- Screen 4 4DX
      INSERT INTO public.showtimes (movie_id, theater_id, screen_id, price, date, show_time) VALUES
        (mid, 2, 4, price_4dx,     CURRENT_DATE + d, '10:00:00'),
        (mid, 2, 4, price_4dx,     CURRENT_DATE + d, '13:00:00'),
        (mid, 2, 4, price_4dx,     CURRENT_DATE + d, '16:00:00'),
        (mid, 2, 4, price_4dx,     CURRENT_DATE + d, '19:00:00'),
        (mid, 2, 4, price_4dx,     CURRENT_DATE + d, '22:00:00');

      -- ── Theater 3: Cinepolis Thane Mumbai ────────────────────────────
      -- Screen 5 Regular
      INSERT INTO public.showtimes (movie_id, theater_id, screen_id, price, date, show_time) VALUES
        (mid, 3, 5, price_regular, CURRENT_DATE + d, '09:30:00'),
        (mid, 3, 5, price_regular, CURRENT_DATE + d, '12:30:00'),
        (mid, 3, 5, price_regular, CURRENT_DATE + d, '15:30:00'),
        (mid, 3, 5, price_regular, CURRENT_DATE + d, '18:30:00'),
        (mid, 3, 5, price_regular, CURRENT_DATE + d, '21:30:00');
      -- Screen 6 IMAX
      INSERT INTO public.showtimes (movie_id, theater_id, screen_id, price, date, show_time) VALUES
        (mid, 3, 6, price_imax,    CURRENT_DATE + d, '10:00:00'),
        (mid, 3, 6, price_imax,    CURRENT_DATE + d, '13:00:00'),
        (mid, 3, 6, price_imax,    CURRENT_DATE + d, '16:00:00'),
        (mid, 3, 6, price_imax,    CURRENT_DATE + d, '19:00:00'),
        (mid, 3, 6, price_imax,    CURRENT_DATE + d, '22:00:00');

      -- ── Theater 4: PVR Aundh Pune ────────────────────────────────────
      -- Screen 7 Regular
      INSERT INTO public.showtimes (movie_id, theater_id, screen_id, price, date, show_time) VALUES
        (mid, 4, 7, price_regular, CURRENT_DATE + d, '09:30:00'),
        (mid, 4, 7, price_regular, CURRENT_DATE + d, '12:30:00'),
        (mid, 4, 7, price_regular, CURRENT_DATE + d, '15:30:00'),
        (mid, 4, 7, price_regular, CURRENT_DATE + d, '18:30:00'),
        (mid, 4, 7, price_regular, CURRENT_DATE + d, '21:30:00');
      -- Screen 8 4DX
      INSERT INTO public.showtimes (movie_id, theater_id, screen_id, price, date, show_time) VALUES
        (mid, 4, 8, price_4dx,     CURRENT_DATE + d, '10:00:00'),
        (mid, 4, 8, price_4dx,     CURRENT_DATE + d, '13:00:00'),
        (mid, 4, 8, price_4dx,     CURRENT_DATE + d, '16:00:00'),
        (mid, 4, 8, price_4dx,     CURRENT_DATE + d, '19:00:00'),
        (mid, 4, 8, price_4dx,     CURRENT_DATE + d, '22:00:00');

      -- ── Theater 5: Cinepolis Kothrud Pune ────────────────────────────
      -- Screen 9 Regular
      INSERT INTO public.showtimes (movie_id, theater_id, screen_id, price, date, show_time) VALUES
        (mid, 5, 9,  price_regular, CURRENT_DATE + d, '09:30:00'),
        (mid, 5, 9,  price_regular, CURRENT_DATE + d, '12:30:00'),
        (mid, 5, 9,  price_regular, CURRENT_DATE + d, '15:30:00'),
        (mid, 5, 9,  price_regular, CURRENT_DATE + d, '18:30:00'),
        (mid, 5, 9,  price_regular, CURRENT_DATE + d, '21:30:00');
      -- Screen 10 IMAX
      INSERT INTO public.showtimes (movie_id, theater_id, screen_id, price, date, show_time) VALUES
        (mid, 5, 10, price_imax,    CURRENT_DATE + d, '10:00:00'),
        (mid, 5, 10, price_imax,    CURRENT_DATE + d, '13:00:00'),
        (mid, 5, 10, price_imax,    CURRENT_DATE + d, '16:00:00'),
        (mid, 5, 10, price_imax,    CURRENT_DATE + d, '19:00:00'),
        (mid, 5, 10, price_imax,    CURRENT_DATE + d, '22:00:00');

      -- ── Theater 6: PVR Select City Delhi ─────────────────────────────
      -- Screen 11 IMAX
      INSERT INTO public.showtimes (movie_id, theater_id, screen_id, price, date, show_time) VALUES
        (mid, 6, 11, price_imax,    CURRENT_DATE + d, '09:30:00'),
        (mid, 6, 11, price_imax,    CURRENT_DATE + d, '12:30:00'),
        (mid, 6, 11, price_imax,    CURRENT_DATE + d, '15:30:00'),
        (mid, 6, 11, price_imax,    CURRENT_DATE + d, '18:30:00'),
        (mid, 6, 11, price_imax,    CURRENT_DATE + d, '21:30:00');
      -- Screen 12 Regular
      INSERT INTO public.showtimes (movie_id, theater_id, screen_id, price, date, show_time) VALUES
        (mid, 6, 12, price_regular, CURRENT_DATE + d, '10:00:00'),
        (mid, 6, 12, price_regular, CURRENT_DATE + d, '13:00:00'),
        (mid, 6, 12, price_regular, CURRENT_DATE + d, '16:00:00'),
        (mid, 6, 12, price_regular, CURRENT_DATE + d, '19:00:00'),
        (mid, 6, 12, price_regular, CURRENT_DATE + d, '22:00:00');

      -- ── Theater 7: INOX Nehru Place Delhi ────────────────────────────
      -- Screen 13 Regular
      INSERT INTO public.showtimes (movie_id, theater_id, screen_id, price, date, show_time) VALUES
        (mid, 7, 13, price_regular, CURRENT_DATE + d, '09:30:00'),
        (mid, 7, 13, price_regular, CURRENT_DATE + d, '12:30:00'),
        (mid, 7, 13, price_regular, CURRENT_DATE + d, '15:30:00'),
        (mid, 7, 13, price_regular, CURRENT_DATE + d, '18:30:00'),
        (mid, 7, 13, price_regular, CURRENT_DATE + d, '21:30:00');
      -- Screen 14 4DX
      INSERT INTO public.showtimes (movie_id, theater_id, screen_id, price, date, show_time) VALUES
        (mid, 7, 14, price_4dx,     CURRENT_DATE + d, '10:00:00'),
        (mid, 7, 14, price_4dx,     CURRENT_DATE + d, '13:00:00'),
        (mid, 7, 14, price_4dx,     CURRENT_DATE + d, '16:00:00'),
        (mid, 7, 14, price_4dx,     CURRENT_DATE + d, '19:00:00'),
        (mid, 7, 14, price_4dx,     CURRENT_DATE + d, '22:00:00');

      -- ── Theater 8: Cinepolis Dwarka Delhi ────────────────────────────
      -- Screen 15 Regular
      INSERT INTO public.showtimes (movie_id, theater_id, screen_id, price, date, show_time) VALUES
        (mid, 8, 15, price_regular, CURRENT_DATE + d, '09:30:00'),
        (mid, 8, 15, price_regular, CURRENT_DATE + d, '12:30:00'),
        (mid, 8, 15, price_regular, CURRENT_DATE + d, '15:30:00'),
        (mid, 8, 15, price_regular, CURRENT_DATE + d, '18:30:00'),
        (mid, 8, 15, price_regular, CURRENT_DATE + d, '21:30:00');
      -- Screen 16 IMAX
      INSERT INTO public.showtimes (movie_id, theater_id, screen_id, price, date, show_time) VALUES
        (mid, 8, 16, price_imax,    CURRENT_DATE + d, '10:00:00'),
        (mid, 8, 16, price_imax,    CURRENT_DATE + d, '13:00:00'),
        (mid, 8, 16, price_imax,    CURRENT_DATE + d, '16:00:00'),
        (mid, 8, 16, price_imax,    CURRENT_DATE + d, '19:00:00'),
        (mid, 8, 16, price_imax,    CURRENT_DATE + d, '22:00:00');

      -- ── Theater 9: PVR Orion Bangalore ───────────────────────────────
      -- Screen 17 IMAX
      INSERT INTO public.showtimes (movie_id, theater_id, screen_id, price, date, show_time) VALUES
        (mid, 9, 17, price_imax,    CURRENT_DATE + d, '09:30:00'),
        (mid, 9, 17, price_imax,    CURRENT_DATE + d, '12:30:00'),
        (mid, 9, 17, price_imax,    CURRENT_DATE + d, '15:30:00'),
        (mid, 9, 17, price_imax,    CURRENT_DATE + d, '18:30:00'),
        (mid, 9, 17, price_imax,    CURRENT_DATE + d, '21:30:00');
      -- Screen 18 Regular
      INSERT INTO public.showtimes (movie_id, theater_id, screen_id, price, date, show_time) VALUES
        (mid, 9, 18, price_regular, CURRENT_DATE + d, '10:00:00'),
        (mid, 9, 18, price_regular, CURRENT_DATE + d, '13:00:00'),
        (mid, 9, 18, price_regular, CURRENT_DATE + d, '16:00:00'),
        (mid, 9, 18, price_regular, CURRENT_DATE + d, '19:00:00'),
        (mid, 9, 18, price_regular, CURRENT_DATE + d, '22:00:00');

      -- ── Theater 10: INOX Garuda Bangalore ────────────────────────────
      -- Screen 19 Regular
      INSERT INTO public.showtimes (movie_id, theater_id, screen_id, price, date, show_time) VALUES
        (mid, 10, 19, price_regular, CURRENT_DATE + d, '09:30:00'),
        (mid, 10, 19, price_regular, CURRENT_DATE + d, '12:30:00'),
        (mid, 10, 19, price_regular, CURRENT_DATE + d, '15:30:00'),
        (mid, 10, 19, price_regular, CURRENT_DATE + d, '18:30:00'),
        (mid, 10, 19, price_regular, CURRENT_DATE + d, '21:30:00');
      -- Screen 20 4DX
      INSERT INTO public.showtimes (movie_id, theater_id, screen_id, price, date, show_time) VALUES
        (mid, 10, 20, price_4dx,     CURRENT_DATE + d, '10:00:00'),
        (mid, 10, 20, price_4dx,     CURRENT_DATE + d, '13:00:00'),
        (mid, 10, 20, price_4dx,     CURRENT_DATE + d, '16:00:00'),
        (mid, 10, 20, price_4dx,     CURRENT_DATE + d, '19:00:00'),
        (mid, 10, 20, price_4dx,     CURRENT_DATE + d, '22:00:00');

      -- ── Theater 11: Cinepolis Forum Bangalore ─────────────────────────
      -- Screen 21 Regular
      INSERT INTO public.showtimes (movie_id, theater_id, screen_id, price, date, show_time) VALUES
        (mid, 11, 21, price_regular, CURRENT_DATE + d, '09:30:00'),
        (mid, 11, 21, price_regular, CURRENT_DATE + d, '12:30:00'),
        (mid, 11, 21, price_regular, CURRENT_DATE + d, '15:30:00'),
        (mid, 11, 21, price_regular, CURRENT_DATE + d, '18:30:00'),
        (mid, 11, 21, price_regular, CURRENT_DATE + d, '21:30:00');
      -- Screen 22 IMAX
      INSERT INTO public.showtimes (movie_id, theater_id, screen_id, price, date, show_time) VALUES
        (mid, 11, 22, price_imax,    CURRENT_DATE + d, '10:00:00'),
        (mid, 11, 22, price_imax,    CURRENT_DATE + d, '13:00:00'),
        (mid, 11, 22, price_imax,    CURRENT_DATE + d, '16:00:00'),
        (mid, 11, 22, price_imax,    CURRENT_DATE + d, '19:00:00'),
        (mid, 11, 22, price_imax,    CURRENT_DATE + d, '22:00:00');

      -- ── Theater 12: PVR VR Chennai ────────────────────────────────────
      -- Screen 23 IMAX
      INSERT INTO public.showtimes (movie_id, theater_id, screen_id, price, date, show_time) VALUES
        (mid, 12, 23, price_imax,    CURRENT_DATE + d, '09:30:00'),
        (mid, 12, 23, price_imax,    CURRENT_DATE + d, '12:30:00'),
        (mid, 12, 23, price_imax,    CURRENT_DATE + d, '15:30:00'),
        (mid, 12, 23, price_imax,    CURRENT_DATE + d, '18:30:00'),
        (mid, 12, 23, price_imax,    CURRENT_DATE + d, '21:30:00');
      -- Screen 24 Regular
      INSERT INTO public.showtimes (movie_id, theater_id, screen_id, price, date, show_time) VALUES
        (mid, 12, 24, price_regular, CURRENT_DATE + d, '10:00:00'),
        (mid, 12, 24, price_regular, CURRENT_DATE + d, '13:00:00'),
        (mid, 12, 24, price_regular, CURRENT_DATE + d, '16:00:00'),
        (mid, 12, 24, price_regular, CURRENT_DATE + d, '19:00:00'),
        (mid, 12, 24, price_regular, CURRENT_DATE + d, '22:00:00');

      -- ── Theater 13: INOX Prozone Chennai ──────────────────────────────
      -- Screen 25 Regular
      INSERT INTO public.showtimes (movie_id, theater_id, screen_id, price, date, show_time) VALUES
        (mid, 13, 25, price_regular, CURRENT_DATE + d, '09:30:00'),
        (mid, 13, 25, price_regular, CURRENT_DATE + d, '12:30:00'),
        (mid, 13, 25, price_regular, CURRENT_DATE + d, '15:30:00'),
        (mid, 13, 25, price_regular, CURRENT_DATE + d, '18:30:00'),
        (mid, 13, 25, price_regular, CURRENT_DATE + d, '21:30:00');
      -- Screen 26 4DX
      INSERT INTO public.showtimes (movie_id, theater_id, screen_id, price, date, show_time) VALUES
        (mid, 13, 26, price_4dx,     CURRENT_DATE + d, '10:00:00'),
        (mid, 13, 26, price_4dx,     CURRENT_DATE + d, '13:00:00'),
        (mid, 13, 26, price_4dx,     CURRENT_DATE + d, '16:00:00'),
        (mid, 13, 26, price_4dx,     CURRENT_DATE + d, '19:00:00'),
        (mid, 13, 26, price_4dx,     CURRENT_DATE + d, '22:00:00');

      -- ── Theater 14: PVR Mani Square Kolkata ───────────────────────────
      -- Screen 27 IMAX
      INSERT INTO public.showtimes (movie_id, theater_id, screen_id, price, date, show_time) VALUES
        (mid, 14, 27, price_imax,    CURRENT_DATE + d, '09:30:00'),
        (mid, 14, 27, price_imax,    CURRENT_DATE + d, '12:30:00'),
        (mid, 14, 27, price_imax,    CURRENT_DATE + d, '15:30:00'),
        (mid, 14, 27, price_imax,    CURRENT_DATE + d, '18:30:00'),
        (mid, 14, 27, price_imax,    CURRENT_DATE + d, '21:30:00');
      -- Screen 28 Regular
      INSERT INTO public.showtimes (movie_id, theater_id, screen_id, price, date, show_time) VALUES
        (mid, 14, 28, price_regular, CURRENT_DATE + d, '10:00:00'),
        (mid, 14, 28, price_regular, CURRENT_DATE + d, '13:00:00'),
        (mid, 14, 28, price_regular, CURRENT_DATE + d, '16:00:00'),
        (mid, 14, 28, price_regular, CURRENT_DATE + d, '19:00:00'),
        (mid, 14, 28, price_regular, CURRENT_DATE + d, '22:00:00');

      -- ── Theater 15: Cinepolis Kolkata ──────────────────────────────────
      -- Screen 29 Regular
      INSERT INTO public.showtimes (movie_id, theater_id, screen_id, price, date, show_time) VALUES
        (mid, 15, 29, price_regular, CURRENT_DATE + d, '09:30:00'),
        (mid, 15, 29, price_regular, CURRENT_DATE + d, '12:30:00'),
        (mid, 15, 29, price_regular, CURRENT_DATE + d, '15:30:00'),
        (mid, 15, 29, price_regular, CURRENT_DATE + d, '18:30:00'),
        (mid, 15, 29, price_regular, CURRENT_DATE + d, '21:30:00');
      -- Screen 30 4DX
      INSERT INTO public.showtimes (movie_id, theater_id, screen_id, price, date, show_time) VALUES
        (mid, 15, 30, price_4dx,     CURRENT_DATE + d, '10:00:00'),
        (mid, 15, 30, price_4dx,     CURRENT_DATE + d, '13:00:00'),
        (mid, 15, 30, price_4dx,     CURRENT_DATE + d, '16:00:00'),
        (mid, 15, 30, price_4dx,     CURRENT_DATE + d, '19:00:00'),
        (mid, 15, 30, price_4dx,     CURRENT_DATE + d, '22:00:00');

      -- ── Theater 16: PVR Inorbit Hyderabad ─────────────────────────────
      -- Screen 31 IMAX
      INSERT INTO public.showtimes (movie_id, theater_id, screen_id, price, date, show_time) VALUES
        (mid, 16, 31, price_imax,    CURRENT_DATE + d, '09:30:00'),
        (mid, 16, 31, price_imax,    CURRENT_DATE + d, '12:30:00'),
        (mid, 16, 31, price_imax,    CURRENT_DATE + d, '15:30:00'),
        (mid, 16, 31, price_imax,    CURRENT_DATE + d, '18:30:00'),
        (mid, 16, 31, price_imax,    CURRENT_DATE + d, '21:30:00');
      -- Screen 32 Regular
      INSERT INTO public.showtimes (movie_id, theater_id, screen_id, price, date, show_time) VALUES
        (mid, 16, 32, price_regular, CURRENT_DATE + d, '10:00:00'),
        (mid, 16, 32, price_regular, CURRENT_DATE + d, '13:00:00'),
        (mid, 16, 32, price_regular, CURRENT_DATE + d, '16:00:00'),
        (mid, 16, 32, price_regular, CURRENT_DATE + d, '19:00:00'),
        (mid, 16, 32, price_regular, CURRENT_DATE + d, '22:00:00');

      -- ── Theater 17: INOX GVK Hyderabad ────────────────────────────────
      -- Screen 33 Regular
      INSERT INTO public.showtimes (movie_id, theater_id, screen_id, price, date, show_time) VALUES
        (mid, 17, 33, price_regular, CURRENT_DATE + d, '09:30:00'),
        (mid, 17, 33, price_regular, CURRENT_DATE + d, '12:30:00'),
        (mid, 17, 33, price_regular, CURRENT_DATE + d, '15:30:00'),
        (mid, 17, 33, price_regular, CURRENT_DATE + d, '18:30:00'),
        (mid, 17, 33, price_regular, CURRENT_DATE + d, '21:30:00');
      -- Screen 34 4DX
      INSERT INTO public.showtimes (movie_id, theater_id, screen_id, price, date, show_time) VALUES
        (mid, 17, 34, price_4dx,     CURRENT_DATE + d, '10:00:00'),
        (mid, 17, 34, price_4dx,     CURRENT_DATE + d, '13:00:00'),
        (mid, 17, 34, price_4dx,     CURRENT_DATE + d, '16:00:00'),
        (mid, 17, 34, price_4dx,     CURRENT_DATE + d, '19:00:00'),
        (mid, 17, 34, price_4dx,     CURRENT_DATE + d, '22:00:00');

      -- ── Theater 18: Cinepolis Hyderabad ───────────────────────────────
      -- Screen 35 Regular
      INSERT INTO public.showtimes (movie_id, theater_id, screen_id, price, date, show_time) VALUES
        (mid, 18, 35, price_regular, CURRENT_DATE + d, '09:30:00'),
        (mid, 18, 35, price_regular, CURRENT_DATE + d, '12:30:00'),
        (mid, 18, 35, price_regular, CURRENT_DATE + d, '15:30:00'),
        (mid, 18, 35, price_regular, CURRENT_DATE + d, '18:30:00'),
        (mid, 18, 35, price_regular, CURRENT_DATE + d, '21:30:00');
      -- Screen 36 IMAX
      INSERT INTO public.showtimes (movie_id, theater_id, screen_id, price, date, show_time) VALUES
        (mid, 18, 36, price_imax,    CURRENT_DATE + d, '10:00:00'),
        (mid, 18, 36, price_imax,    CURRENT_DATE + d, '13:00:00'),
        (mid, 18, 36, price_imax,    CURRENT_DATE + d, '16:00:00'),
        (mid, 18, 36, price_imax,    CURRENT_DATE + d, '19:00:00'),
        (mid, 18, 36, price_imax,    CURRENT_DATE + d, '22:00:00');

    END LOOP; -- movies
  END LOOP;   -- days
END $$;