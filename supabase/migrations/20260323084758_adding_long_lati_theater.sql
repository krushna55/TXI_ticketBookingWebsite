-- 0016_add_lat_lng_to_theater.sql
ALTER TABLE public.theater
ADD COLUMN latitude  NUMERIC(10, 7),
ADD COLUMN longitude NUMERIC(10, 7);

-- 0017_seed_theater_coordinates.sql

-- Mumbai
UPDATE public.theater SET latitude = 19.0858, longitude = 72.8862 WHERE id = 1;    -- PVR Phoenix Mall Mumbai
UPDATE public.theater SET latitude = 19.1075, longitude = 72.8263 WHERE id = 111;  -- PVR Juhu Mumbai
UPDATE public.theater SET latitude = 18.9220, longitude = 72.8347 WHERE id = 112;  -- INOX Nariman Point Mumbai
UPDATE public.theater SET latitude = 19.2183, longitude = 72.9781 WHERE id = 113;  -- Cinepolis Thane Mumbai

-- Pune
UPDATE public.theater SET latitude = 18.5204, longitude = 73.8567 WHERE id = 2;    -- INOX Pune City Center
UPDATE public.theater SET latitude = 18.5590, longitude = 73.8078 WHERE id = 114;  -- PVR Aundh Pune
UPDATE public.theater SET latitude = 18.5074, longitude = 73.8077 WHERE id = 115;  -- Cinepolis Kothrud Pune

-- Delhi
UPDATE public.theater SET latitude = 28.5274, longitude = 77.2190 WHERE id = 116;  -- PVR Select City Delhi
UPDATE public.theater SET latitude = 28.5491, longitude = 77.2520 WHERE id = 117;  -- INOX Nehru Place Delhi
UPDATE public.theater SET latitude = 28.5921, longitude = 77.0460 WHERE id = 118;  -- Cinepolis Dwarka Delhi

-- Bangalore
UPDATE public.theater SET latitude = 12.9716, longitude = 77.5697 WHERE id = 119;  -- PVR Orion Bangalore
UPDATE public.theater SET latitude = 12.9762, longitude = 77.6033 WHERE id = 120;  -- INOX Garuda Bangalore
UPDATE public.theater SET latitude = 12.9352, longitude = 77.6245 WHERE id = 121;  -- Cinepolis Forum Bangalore

-- Chennai
UPDATE public.theater SET latitude = 13.0827, longitude = 80.2707 WHERE id = 122;  -- PVR VR Chennai
UPDATE public.theater SET latitude = 13.0358, longitude = 80.2108 WHERE id = 123;  -- INOX Prozone Chennai

-- Kolkata
UPDATE public.theater SET latitude = 22.5354, longitude = 88.3986 WHERE id = 124;  -- PVR Mani Square Kolkata
UPDATE public.theater SET latitude = 22.4965, longitude = 88.3644 WHERE id = 125;  -- Cinepolis Kolkata

-- Hyderabad
UPDATE public.theater SET latitude = 17.4343, longitude = 78.3858 WHERE id = 126;  -- PVR Inorbit Hyderabad
UPDATE public.theater SET latitude = 17.4156, longitude = 78.4500 WHERE id = 127;  -- INOX GVK Hyderabad
UPDATE public.theater SET latitude = 17.4947, longitude = 78.3996 WHERE id = 128;  -- Cinepolis Hyderabad