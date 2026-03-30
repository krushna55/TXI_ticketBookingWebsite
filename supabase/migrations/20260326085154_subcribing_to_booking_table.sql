-- 1. Ensure RLS is actually ON (safer for production)
ALTER TABLE seat_reservations ENABLE ROW LEVEL SECURITY;

-- 2. Drop the existing policy to avoid that 42710 error, then recreate it
DROP POLICY IF EXISTS "Anyone can view seat reservations" ON seat_reservations;

-- 3. IMPORTANT: Allow both Authenticated AND Anon (Realtime often uses Anon/Service roles to broadcast)
CREATE POLICY "Anyone can view seat reservations"
ON seat_reservations
FOR SELECT
USING (true); 

-- 4. Re-confirm Realtime settings
ALTER TABLE seat_reservations REPLICA IDENTITY FULL;

-- 5. Fix the Publication (This is usually why things don't update without refresh)
DROP PUBLICATION IF EXISTS supabase_realtime;
CREATE PUBLICATION supabase_realtime FOR TABLE seat_reservations;