-- =============================================
-- SEED: Movies from remote DB → local schema
-- Maps: name, director, duration, genre,
--       age_rating, movies_status, movie_img
-- Note: id is auto-generated (serial), uuid ignored
--       audience_score has no local column, skipped
--       duration converted from interval to minutes string
-- =============================================

INSERT INTO movies (name, director, duration, genre, age_rating, movies_status, movie_img)
VALUES
  (
    'Tenet',
    'Abhishek Anil Kapur',
    '130',
    'war',
    'U/A 13+',
    'streaming',
    'https://hrcxheiyttrbccjsngkr.supabase.co/storage/v1/object/public/movies_imgs/movies-imgs/Tenet.png'
  ),
  (
    'Avengers Endgame',
    'Siddharth Anand',
    '166',
    'war',
    'U/A 13+',
    'streaming',
    'https://hrcxheiyttrbccjsngkr.supabase.co/storage/v1/object/public/movies_imgs/movies-imgs/Avengers_%20Endgame.png'
  ),
  (
    'Ghostbusters Afterlife',
    'Nag Ashwin',
    '178',
    'action',
    'U/A 13+',
    'streaming',
    'https://hrcxheiyttrbccjsngkr.supabase.co/storage/v1/object/public/movies_imgs/movies-imgs/Ghostbusters%20Afterlife.png'
  ),
  (
    'House of Gucci',
    'Amar Kaushik',
    '135',
    'horror',
    'U/A 13+',
    'streaming',
    'https://hrcxheiyttrbccjsngkr.supabase.co/storage/v1/object/public/movies_imgs/movies-imgs/House%20of%20Gucci.png'
  ),
  (
    'Resident Evil: Welcome to Raccoon City',
    'Ayan Mukerji',
    '165',
    'action',
    'U/A 13+',
    'upcoming',
    'https://hrcxheiyttrbccjsngkr.supabase.co/storage/v1/object/public/movies_imgs/movies-imgs/Resident%20Evil_%20Welcome%20to%20Raccoon%20City.png'
  ),
  (
    'Yowis Ben',
    'Sandeep Reddy Vanga',
    '201',
    'action',
    'A',
    'streaming',
    'https://hrcxheiyttrbccjsngkr.supabase.co/storage/v1/object/public/movies_imgs/movies-imgs/Yowis%20Ben.png'
  ),
  (
    'Sword Art Online: Progressive - Aria of a Starless Night',
    'Rosshan Andrrews',
    '140',
    'action',
    'U/A 13+',
    'streaming',
    'https://hrcxheiyttrbccjsngkr.supabase.co/storage/v1/object/public/movies_imgs/movies-imgs/Sword%20Art%20Online_%20Progressive%20-%20Aria%20of%20a%20Starless%20Night.png'
  ),
  (
    'John Wick Chapter 3 - Parabellum',
    'Rohit Shetty',
    '150',
    'action',
    'U/A 13+',
    'upcoming',
    'https://hrcxheiyttrbccjsngkr.supabase.co/storage/v1/object/public/movies_imgs/movies-imgs/John%20Wick_%20Chapter%203%20-%20Parabellum.png'
  ),
  (
    'The Matrix Resurrections',
    'Sriram Raghavan',
    '135',
    'thriller',
    'U/A 13+',
    'streaming',
    'https://hrcxheiyttrbccjsngkr.supabase.co/storage/v1/object/public/movies_imgs/movies-imgs/The%20Matrix%20Resurrections.png'
  ),
  (
    'Spider-Man: No Way Home',
    'Sukumar',
    '160',
    'action',
    'U/A 13+',
    'streaming',
    'https://hrcxheiyttrbccjsngkr.supabase.co/storage/v1/object/public/movies_imgs/movies-imgs/1773074609353.png'
  )
ON CONFLICT DO NOTHING;