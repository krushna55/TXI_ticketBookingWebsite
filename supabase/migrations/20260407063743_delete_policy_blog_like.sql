-- Drop the old policy if it exists
DROP POLICY IF EXISTS "Users can delete their own likes" ON public.blog_likes;

-- Create a robust delete policy
CREATE POLICY "Users can delete their own likes" 
ON public.blog_likes 
FOR DELETE 
USING (auth.uid() = user_id);
