CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1
    FROM public.profile
    WHERE user_id = auth.uid()  -- ✅ was "id", correct is "user_id"
      AND role = 'admin'
  );
END;
$$;