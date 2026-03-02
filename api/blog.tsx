"use server"

import { createClient } from "@/lib/supabase/server";

export async function addBlog(data) {
    const supabase = await createClient()
    const { data: insertData, error } = await supabase
        .from('blog')
        .insert([
            data
        ])
        .select()
    if (error) console.error('Error fetching users:', error);
}
export async function fetchBlogWithOffset(start=0,end=10) {
        const supabase = await createClient()

    const { data, error } = await supabase.from('blog').select("*").range(start,end).order('id',{ ascending: true });
    if (error) {
        console.error('error while fetching the blog', error);
    }
    return data
}
export async function fetchBlog() {
        const supabase = await createClient()

    const { data, error } = await supabase.from('blog').select("*").order('id',{ ascending: true });
    if (error) {
        console.error('error while fetching the blog', error);
    }
    return data
}
export async function fetchBlogWithType(type:string) {
        const supabase = await createClient()

    const {data,error}=await supabase.from('blog').select('*').eq('type',type)
    if(error){
        console.log('Error while fetching partiular type blog',error)
    }
    return data
}


export async function fetchBlogById(id:number){
        const supabase = await createClient()

    const {data,error} = await supabase.from('blog').select('*').eq('id',id)
    if(error){
        console.log('error while fetching blog with id',error)
    }
    return data
}