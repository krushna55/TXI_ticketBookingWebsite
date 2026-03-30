SELECT 
  s.id,
  s.date,
  s.show_time,
  s.price,
  m.id          AS movie_id,
  m.name        AS movie_name,
  t.id          AS theater_id,
  t.name        AS theater_name,
  sc.id         AS screen_id,
  sc.name       AS screen_name,
  sc.type       AS screen_type
FROM showtimes s
JOIN movies  m  ON m.id  = s.movie_id
JOIN theater t  ON t.id  = s.theater_id
JOIN screen  sc ON sc.id = s.screen_id
ORDER BY s.date, t.name, s.show_time
LIMIT 10000;