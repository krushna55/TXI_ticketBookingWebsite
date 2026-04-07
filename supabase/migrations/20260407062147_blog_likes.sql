-- 1. Create the likes table
CREATE TABLE public.blog_likes (
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    blog_id BIGINT REFERENCES public.blog(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    -- The magic: this ensures a user can only like a blog once
    PRIMARY KEY (user_id, blog_id)
);

-- 2. Enable Row Level Security (RLS)
ALTER TABLE public.blog_likes ENABLE ROW LEVEL SECURITY;

-- 3. Policy: Users can only insert their own likes
CREATE POLICY "Users can create their own likes" ON public.blog_likes
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- 4. Policy: Anyone can see the likes (to count them)
CREATE POLICY "Anyone can view likes" ON public.blog_likes
FOR SELECT USING (true);
