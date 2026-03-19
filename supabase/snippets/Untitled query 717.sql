SELECT 
    s.id AS showtime_id,
    s.show_time,
    s.price,
    s.date,
    t.name AS theater_name,
    t.district,
    sc.name AS screen_name,
    sc.type AS screen_type
FROM showtimes s
JOIN theater t ON s.theater_id = t.id
JOIN screen sc ON s.screen_id = sc.id
WHERE s.movie_id = 2 AND s.date = '2026-03-19'     
ORDER BY t.name, s.show_time;