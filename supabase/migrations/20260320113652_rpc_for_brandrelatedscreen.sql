CREATE OR REPLACE FUNCTION get_brand_screens()
RETURNS TABLE (
    brand_id int,
    brand_name varchar,
    brand_logo varchar,
    screen_id int,
    screen_name varchar,
    screen_type varchar
)
LANGUAGE sql
AS $$
    SELECT 
        b.id,
        b.name,
        b.logo_url,
        s.id,
        s.name,
        s.type
    FROM brands b
    JOIN theater t ON t.brand_id = b.id
    JOIN screen s ON s.theater_id = t.id
    ORDER BY b.id, s.id;
$$;