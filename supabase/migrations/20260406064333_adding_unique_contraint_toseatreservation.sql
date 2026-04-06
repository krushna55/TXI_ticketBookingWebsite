ALTER TABLE seat_reservations
ADD CONSTRAINT seat_reservations_showtime_seat_unique 
UNIQUE (showtime_id, seat_no);
