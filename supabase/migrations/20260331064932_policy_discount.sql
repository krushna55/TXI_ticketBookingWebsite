ALTER TABLE discounts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view discounts"
ON discounts FOR SELECT
TO authenticated
USING (true);