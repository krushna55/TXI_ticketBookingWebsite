"use server"

import { createClient } from "@/lib/supabase/server";
import { Tables } from "@/database.types";
import { Database } from "@/database.types";

type blog = Tables<'blog'>

export async function addBlog(data: blog): Promise<void | null> {
    const supabase = await createClient()
    const { data: insertData, error } = await supabase
        .from('blog')
        .insert([
            data
        ])
        .select()
    if (error) console.error('Error fetching users:', error);
}
export async function fetchBlogWithOffset(start = 0, end = 10): Promise<blog[] | null> {
    const supabase = await createClient()

    const { data, error } = await supabase.from('blog').select("*").range(start, end).order('id', { ascending: true });
    if (error) {
        console.error('error while fetching the blog', error);
    }
    return data
}
export async function fetchMovies() {
    const supabase = await createClient()

    const { data, error } = await supabase.from('movies').select("*")
    if (error) {
        console.error('error while fetching the blog', error);
    }
    return data
}
export async function fetchRecommandedBlog(start = 0, end = 10, id: number) {
    const supabase = await createClient()

    const { data, error } = await supabase.from('blog').select("*").range(start, end).neq('id', id);
    if (error) {
        console.error('error while fetching the blog', error);
    }
    return data
}
export async function fetchBlog() {
    const supabase = await createClient()

    const { data, error } = await supabase.from('blog').select("*").order('id', { ascending: true });
    if (error) {
        console.error('error while fetching the blog', error);
    }
    return data
}
export async function fetchBlogWithType(col: string, type: string) {
    const supabase = await createClient()

    const { data, error } = await supabase.from('blog').select('*').eq(col, type)
    if (error) {
        console.log('Error while fetching partiular type blog', error)
    }
    return data
}
export async function fetchBlogWithtitle(col: string, type: string) {
    const supabase = await createClient()

    const { data, error } = await supabase.from('blog').select('*').ilike(col, `%${type}%`)
    if (error) {
        console.log('Error while fetching partiular type blog', error)
    }
    return data
}

export async function fetchBlogById(id: number) {
    const supabase = await createClient()

    const { data, error } = await supabase.from('blog').select('*').eq('id', id).single()
    if (error) {
        console.log('error while fetching blog with id', error)
    }

    return data
}

export async function increatelikebyId(id: number): Promise<number> {
    const supabase = await createClient()
    const { data, error } = await supabase.from('blog').select('likes').eq('id', id).single()
    if (error || !data) {
        console.log('error while fetching blog with id', error)
    }
    const updatedLikes = (data?.likes ?? 0) + 1

    const { error: updateError } = await supabase
        .from('blog')
        .update({ likes: updatedLikes })
        .eq('id', id)
    return updatedLikes
}