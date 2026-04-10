ALTER TABLE public.theater ENABLE ROW LEVEL SECURITY;
-- ✅ SELECT: Admin can read all theaters
CREATE POLICY "Admin can select theater"
ON public.theater
FOR SELECT
TO authenticated
USING (
  (SELECT public.is_admin())
);

-- ✅ INSERT: Admin can add new theaters
CREATE POLICY "Admin can insert theater"
ON public.theater
FOR INSERT
TO authenticated
WITH CHECK (
  (SELECT public.is_admin())
);

-- ✅ UPDATE: Admin can edit theaters
CREATE POLICY "Admin can update theater"
ON public.theater
FOR UPDATE
TO authenticated
USING (
  (SELECT public.is_admin())
)
WITH CHECK (
  (SELECT public.is_admin())
);

-- ✅ DELETE: Admin can delete theaters
CREATE POLICY "Admin can delete theater"
ON public.theater
FOR DELETE
TO authenticated
USING (
  (SELECT public.is_admin())
);