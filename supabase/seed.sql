-- =============================================
-- SEED DATA — Auto-ID safe version
-- IDs are never hardcoded; all cross-table
-- references use subqueries by name.
-- =============================================

-- =========================
-- 1️⃣ Cities
-- =========================
INSERT INTO cities (name, state, latitude, longitude) VALUES
  ('Mumbai',    'Maharashtra', 19.0760, 72.8777),
  ('Pune',      'Maharashtra', 18.5204, 73.8567),
  ('Delhi',     'Delhi',       28.7041, 77.1025),
  ('Bangalore', 'Karnataka',   12.9716, 77.5946),
  ('Chennai',   'Tamil Nadu',  13.0827, 80.2707),
  ('Kolkata',   'West Bengal', 22.5726, 88.3639),
  ('Hyderabad', 'Telangana',   17.3850, 78.4867);

-- =========================
-- 2️⃣ Brands
-- =========================
INSERT INTO brands (name, logo_url) VALUES
  ('PVR Cinemas', 'https://logo.clearbit.com/pvrcinemas.com'),
  ('INOX Movies',  'https://logo.clearbit.com/inoxmovies.com'),
  ('Cinepolis',    'https://logo.clearbit.com/cinepolisindia.com');

-- =========================
-- 3️⃣ Movies
-- =========================
INSERT INTO movies (name, director, duration, genre, age_rating, movies_status, movie_img) VALUES
  ('Avengers: Endgame',      'Anthony Russo',    '181', 'Action', 'U/A 13+', 'now_showing', 'https://image.tmdb.org/t/p/w500//or06FN3Dka5tukK1e9sl16pB3iy.jpg'),
  ('Inception',              'Christopher Nolan','148', 'Sci-Fi', 'U/A 13+', 'now_showing', 'https://image.tmdb.org/t/p/w500//qmDpIHrmpJINaRKAfWQfftjCdyi.jpg'),
  ('Spider-Man: No Way Home','Jon Watts',        '148', 'Action', 'U/A 13+', 'upcoming',    'https://image.tmdb.org/t/p/w500//1g0dhYtq4irTY1GPXvft6k4YLjm.jpg');

-- =========================
-- 4️⃣ Theaters
-- user_id values are pre-existing profile rows — replace if needed
-- =========================
INSERT INTO theater (name, city_id, user_id, brand_id, district, complete_address)
SELECT t.name,
       (SELECT id FROM cities WHERE name = t.city_name),
       NULL,
       (SELECT id FROM brands WHERE name = t.brand_name),
       t.district,
       t.complete_address
FROM (VALUES
  -- Mumbai
  ('PVR Juhu Mumbai',           'Mumbai',    'PVR Cinemas', 'Juhu',          'Juhu Tara Road, Juhu, Mumbai 400049'),
  ('INOX Nariman Point Mumbai', 'Mumbai',    'INOX Movies', 'Nariman Point', 'Marine Lines, Nariman Point, Mumbai 400021'),
  ('Cinepolis Thane Mumbai',    'Mumbai',    'Cinepolis',   'Thane',         'Viviana Mall, Thane West, Mumbai 400601'),
  -- Pune
  ('PVR Aundh Pune',            'Pune',      'PVR Cinemas', 'Aundh',         'Westend Mall, Aundh, Pune 411007'),
  ('Cinepolis Kothrud Pune',    'Pune',      'Cinepolis',   'Kothrud',       'Cinemax, Kothrud, Pune 411038'),
  -- Delhi
  ('PVR Select City Delhi',     'Delhi',     'PVR Cinemas', 'Saket',         'Select Citywalk Mall, Saket, Delhi 110017'),
  ('INOX Nehru Place Delhi',    'Delhi',     'INOX Movies', 'Nehru Place',   'DLF Promenade, Nehru Place, Delhi 110019'),
  ('Cinepolis Dwarka Delhi',    'Delhi',     'Cinepolis',   'Dwarka',        'DDA District Centre, Dwarka, Delhi 110075'),
  -- Bangalore
  ('PVR Orion Bangalore',       'Bangalore', 'PVR Cinemas', 'Rajajinagar',   'Orion Mall, Dr Rajkumar Rd, Bangalore 560055'),
  ('INOX Garuda Bangalore',     'Bangalore', 'INOX Movies', 'MG Road',       'Garuda Mall, Magrath Road, Bangalore 560025'),
  ('Cinepolis Forum Bangalore', 'Bangalore', 'Cinepolis',   'Koramangala',   'Forum Mall, Hosur Road, Koramangala, Bangalore 560095'),
  -- Chennai
  ('PVR VR Chennai',            'Chennai',   'PVR Cinemas', 'Anna Nagar',    'VR Chennai Mall, Anna Nagar, Chennai 600040'),
  ('INOX Prozone Chennai',      'Chennai',   'INOX Movies', 'Coimbatore',    'Prozone Mall, Avinashi Road, Chennai 600006'),
  -- Kolkata
  ('PVR Mani Square Kolkata',   'Kolkata',   'PVR Cinemas', 'EM Bypass',     'Mani Square Mall, EM Bypass, Kolkata 700107'),
  ('Cinepolis Kolkata',         'Kolkata',   'Cinepolis',   'South City',    'South City Mall, Prince Anwar Shah Rd, Kolkata 700068'),
  -- Hyderabad
  ('PVR Inorbit Hyderabad',     'Hyderabad', 'PVR Cinemas', 'Madhapur',      'Inorbit Mall, HITEC City, Hyderabad 500081'),
  ('INOX GVK Hyderabad',        'Hyderabad', 'INOX Movies', 'Banjara Hills', 'GVK One Mall, Banjara Hills, Hyderabad 500034'),
  ('Cinepolis Hyderabad',       'Hyderabad', 'Cinepolis',   'Kukatpally',    'KPHB Colony, Kukatpally, Hyderabad 500072')
) AS t(name, city_name, brand_name, district, complete_address);

-- =========================
-- 5️⃣ Screens  (2 per theater, looked up by theater name)
-- =========================
INSERT INTO screen (name, theater_id, type, screen_row, screen_column)
SELECT s.screen_name,
       (SELECT id FROM theater WHERE name = s.theater_name),
       s.type,
       s.screen_row,
       s.screen_column
FROM (VALUES
  ('Screen 1', 'PVR Juhu Mumbai',           'IMAX',    10, 15),
  ('Screen 2', 'PVR Juhu Mumbai',           'Regular',  8, 12),
  ('Screen 1', 'INOX Nariman Point Mumbai', 'Regular',  9, 14),
  ('Screen 2', 'INOX Nariman Point Mumbai', '4DX',      7, 10),
  ('Screen 1', 'Cinepolis Thane Mumbai',    'Regular', 10, 15),
  ('Screen 2', 'Cinepolis Thane Mumbai',    'IMAX',     8, 12),
  ('Screen 1', 'PVR Aundh Pune',            'Regular',  9, 13),
  ('Screen 2', 'PVR Aundh Pune',            '4DX',      7, 11),
  ('Screen 1', 'Cinepolis Kothrud Pune',    'Regular',  8, 12),
  ('Screen 2', 'Cinepolis Kothrud Pune',    'IMAX',    10, 15),
  ('Screen 1', 'PVR Select City Delhi',     'IMAX',    12, 18),
  ('Screen 2', 'PVR Select City Delhi',     'Regular',  9, 14),
  ('Screen 1', 'INOX Nehru Place Delhi',    'Regular', 10, 15),
  ('Screen 2', 'INOX Nehru Place Delhi',    '4DX',      8, 12),
  ('Screen 1', 'Cinepolis Dwarka Delhi',    'Regular',  9, 13),
  ('Screen 2', 'Cinepolis Dwarka Delhi',    'IMAX',     7, 11),
  ('Screen 1', 'PVR Orion Bangalore',       'IMAX',    11, 16),
  ('Screen 2', 'PVR Orion Bangalore',       'Regular',  8, 12),
  ('Screen 1', 'INOX Garuda Bangalore',     'Regular', 10, 15),
  ('Screen 2', 'INOX Garuda Bangalore',     '4DX',      7, 10),
  ('Screen 1', 'Cinepolis Forum Bangalore', 'Regular',  9, 13),
  ('Screen 2', 'Cinepolis Forum Bangalore', 'IMAX',     8, 12),
  ('Screen 1', 'PVR VR Chennai',            'IMAX',    10, 15),
  ('Screen 2', 'PVR VR Chennai',            'Regular',  8, 12),
  ('Screen 1', 'INOX Prozone Chennai',      'Regular',  9, 14),
  ('Screen 2', 'INOX Prozone Chennai',      '4DX',      7, 10),
  ('Screen 1', 'PVR Mani Square Kolkata',   'IMAX',    10, 15),
  ('Screen 2', 'PVR Mani Square Kolkata',   'Regular',  8, 12),
  ('Screen 1', 'Cinepolis Kolkata',         'Regular',  9, 13),
  ('Screen 2', 'Cinepolis Kolkata',         '4DX',      7, 11),
  ('Screen 1', 'PVR Inorbit Hyderabad',     'IMAX',    11, 16),
  ('Screen 2', 'PVR Inorbit Hyderabad',     'Regular',  8, 12),
  ('Screen 1', 'INOX GVK Hyderabad',        'Regular', 10, 15),
  ('Screen 2', 'INOX GVK Hyderabad',        '4DX',      7, 10),
  ('Screen 1', 'Cinepolis Hyderabad',       'Regular',  9, 13),
  ('Screen 2', 'Cinepolis Hyderabad',       'IMAX',     8, 12)
) AS s(screen_name, theater_name, type, screen_row, screen_column);

-- =========================
-- 6️⃣ Showtimes
-- All IDs resolved by name at insert time.
-- Pattern per day:
--   Movie 1 (Avengers)  → Screen 1 of each theater
--   Movie 2 (Inception) → Screen 2 of each theater
--   Movie 3 (Spider-Man)→ Screen 1 of each theater (evening only)
-- =========================

-- Helper: one reusable CTE-style approach via a single INSERT … SELECT
-- We generate all combinations of (movie, theater, screen, price, date, time)
-- using a cross-join on a date series and a values list.

INSERT INTO showtimes (movie_id, theater_id, screen_id, price, date, show_time)
SELECT
  (SELECT id FROM movies  WHERE name = st.movie_name),
  (SELECT id FROM theater WHERE name = st.theater_name),
  (SELECT id FROM screen  WHERE theater_id = (SELECT id FROM theater WHERE name = st.theater_name)
                               AND name = st.screen_name),
  st.price,
  d.show_date,
  st.show_time::time
FROM
  -- All dates: 15 days starting 2026-03-19
  (SELECT generate_series(
      '2026-03-19'::date,
      '2026-04-02'::date,
      '1 day'::interval
  )::date AS show_date) AS d,

  -- Showtime templates (movie, theater, screen, price, time)
  (VALUES
    -- ── PVR Juhu Mumbai ──────────────────────────────────────────
    ('Avengers: Endgame',       'PVR Juhu Mumbai',           'Screen 1', 250, '10:00'),
    ('Avengers: Endgame',       'PVR Juhu Mumbai',           'Screen 1', 250, '14:00'),
    ('Avengers: Endgame',       'PVR Juhu Mumbai',           'Screen 1', 250, '18:00'),
    ('Inception',               'PVR Juhu Mumbai',           'Screen 2', 300, '11:00'),
    ('Inception',               'PVR Juhu Mumbai',           'Screen 2', 300, '15:00'),
    ('Inception',               'PVR Juhu Mumbai',           'Screen 2', 300, '19:00'),
    -- ── INOX Nariman Point Mumbai ────────────────────────────────
    ('Avengers: Endgame',       'INOX Nariman Point Mumbai', 'Screen 1', 250, '10:30'),
    ('Avengers: Endgame',       'INOX Nariman Point Mumbai', 'Screen 1', 250, '14:30'),
    ('Inception',               'INOX Nariman Point Mumbai', 'Screen 2', 300, '12:00'),
    ('Inception',               'INOX Nariman Point Mumbai', 'Screen 2', 300, '16:00'),
    -- ── Cinepolis Thane Mumbai ───────────────────────────────────
    ('Avengers: Endgame',       'Cinepolis Thane Mumbai',    'Screen 1', 220, '10:00'),
    ('Avengers: Endgame',       'Cinepolis Thane Mumbai',    'Screen 1', 220, '15:00'),
    ('Inception',               'Cinepolis Thane Mumbai',    'Screen 2', 280, '13:00'),
    ('Inception',               'Cinepolis Thane Mumbai',    'Screen 2', 280, '17:00'),
    -- ── PVR Aundh Pune ──────────────────────────────────────────
    ('Avengers: Endgame',       'PVR Aundh Pune',            'Screen 1', 230, '11:00'),
    ('Avengers: Endgame',       'PVR Aundh Pune',            'Screen 1', 230, '15:30'),
    ('Inception',               'PVR Aundh Pune',            'Screen 2', 290, '13:30'),
    ('Inception',               'PVR Aundh Pune',            'Screen 2', 290, '18:00'),
    -- ── Cinepolis Kothrud Pune ───────────────────────────────────
    ('Avengers: Endgame',       'Cinepolis Kothrud Pune',    'Screen 1', 220, '10:00'),
    ('Inception',               'Cinepolis Kothrud Pune',    'Screen 2', 270, '14:00'),
    ('Spider-Man: No Way Home', 'Cinepolis Kothrud Pune',    'Screen 1', 199, '18:00'),
    -- ── PVR Select City Delhi ────────────────────────────────────
    ('Avengers: Endgame',       'PVR Select City Delhi',     'Screen 1', 350, '10:00'),
    ('Avengers: Endgame',       'PVR Select City Delhi',     'Screen 1', 350, '14:00'),
    ('Inception',               'PVR Select City Delhi',     'Screen 2', 400, '12:00'),
    ('Inception',               'PVR Select City Delhi',     'Screen 2', 400, '17:00'),
    -- ── INOX Nehru Place Delhi ───────────────────────────────────
    ('Avengers: Endgame',       'INOX Nehru Place Delhi',    'Screen 1', 280, '11:00'),
    ('Inception',               'INOX Nehru Place Delhi',    'Screen 2', 320, '13:00'),
    ('Spider-Man: No Way Home', 'INOX Nehru Place Delhi',    'Screen 1', 250, '17:00'),
    -- ── Cinepolis Dwarka Delhi ───────────────────────────────────
    ('Avengers: Endgame',       'Cinepolis Dwarka Delhi',    'Screen 1', 260, '10:30'),
    ('Inception',               'Cinepolis Dwarka Delhi',    'Screen 2', 310, '14:30'),
    ('Spider-Man: No Way Home', 'Cinepolis Dwarka Delhi',    'Screen 1', 220, '18:30'),
    -- ── PVR Orion Bangalore ──────────────────────────────────────
    ('Avengers: Endgame',       'PVR Orion Bangalore',       'Screen 1', 300, '10:00'),
    ('Avengers: Endgame',       'PVR Orion Bangalore',       'Screen 1', 300, '14:00'),
    ('Inception',               'PVR Orion Bangalore',       'Screen 2', 350, '12:00'),
    ('Inception',               'PVR Orion Bangalore',       'Screen 2', 350, '16:30'),
    -- ── INOX Garuda Bangalore ────────────────────────────────────
    ('Avengers: Endgame',       'INOX Garuda Bangalore',     'Screen 1', 280, '11:00'),
    ('Inception',               'INOX Garuda Bangalore',     'Screen 2', 330, '15:00'),
    ('Spider-Man: No Way Home', 'INOX Garuda Bangalore',     'Screen 1', 240, '19:00'),
    -- ── Cinepolis Forum Bangalore ────────────────────────────────
    ('Avengers: Endgame',       'Cinepolis Forum Bangalore', 'Screen 1', 270, '10:30'),
    ('Inception',               'Cinepolis Forum Bangalore', 'Screen 2', 320, '13:30'),
    ('Spider-Man: No Way Home', 'Cinepolis Forum Bangalore', 'Screen 1', 220, '17:30'),
    -- ── PVR VR Chennai ───────────────────────────────────────────
    ('Avengers: Endgame',       'PVR VR Chennai',            'Screen 1', 280, '10:00'),
    ('Inception',               'PVR VR Chennai',            'Screen 2', 330, '14:00'),
    ('Spider-Man: No Way Home', 'PVR VR Chennai',            'Screen 1', 240, '18:00'),
    -- ── INOX Prozone Chennai ─────────────────────────────────────
    ('Avengers: Endgame',       'INOX Prozone Chennai',      'Screen 1', 260, '11:30'),
    ('Inception',               'INOX Prozone Chennai',      'Screen 2', 310, '15:30'),
    ('Spider-Man: No Way Home', 'INOX Prozone Chennai',      'Screen 1', 220, '19:30'),
    -- ── PVR Mani Square Kolkata ──────────────────────────────────
    ('Avengers: Endgame',       'PVR Mani Square Kolkata',   'Screen 1', 270, '10:00'),
    ('Inception',               'PVR Mani Square Kolkata',   'Screen 2', 320, '13:00'),
    ('Spider-Man: No Way Home', 'PVR Mani Square Kolkata',   'Screen 1', 230, '17:00'),
    -- ── Cinepolis Kolkata ────────────────────────────────────────
    ('Avengers: Endgame',       'Cinepolis Kolkata',         'Screen 1', 250, '11:00'),
    ('Inception',               'Cinepolis Kolkata',         'Screen 2', 300, '15:00'),
    ('Spider-Man: No Way Home', 'Cinepolis Kolkata',         'Screen 1', 210, '19:00'),
    -- ── PVR Inorbit Hyderabad ────────────────────────────────────
    ('Avengers: Endgame',       'PVR Inorbit Hyderabad',     'Screen 1', 300, '10:30'),
    ('Inception',               'PVR Inorbit Hyderabad',     'Screen 2', 350, '14:30'),
    ('Spider-Man: No Way Home', 'PVR Inorbit Hyderabad',     'Screen 1', 260, '18:30'),
    -- ── INOX GVK Hyderabad ───────────────────────────────────────
    ('Avengers: Endgame',       'INOX GVK Hyderabad',        'Screen 1', 280, '11:00'),
    ('Inception',               'INOX GVK Hyderabad',        'Screen 2', 330, '15:00'),
    ('Spider-Man: No Way Home', 'INOX GVK Hyderabad',        'Screen 1', 240, '19:00'),
    -- ── Cinepolis Hyderabad ──────────────────────────────────────
    ('Avengers: Endgame',       'Cinepolis Hyderabad',       'Screen 1', 270, '10:00'),
    ('Inception',               'Cinepolis Hyderabad',       'Screen 2', 320, '14:00'),
    ('Spider-Man: No Way Home', 'Cinepolis Hyderabad',       'Screen 1', 230, '18:00')
  ) AS st(movie_name, theater_name, screen_name, price, show_time);