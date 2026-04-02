CREATE POLICY "Enable read access for all users"
  ON public.blog
  FOR SELECT
  USING (true);