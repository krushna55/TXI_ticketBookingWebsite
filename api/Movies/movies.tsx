"use server"

import { createClient } from "@/lib/supabase/server";
import { Database } from "@/database.types";
import { Tables } from "@/database.types";
type movies = Tables<'movies'>
type showtimes = Tables<'showtimes'>

export async function fetchMovies() {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('movies')
        .select('*')

    if (error) console.error('Error fetching movies:', error);
    return data
}

export async function fetchMovieById(id: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from('movies')
        .select('*')
        .eq('id', Number(id)).single();

    if (error) console.log('Error fetching movies:', error)

    return data
}
export async function fetchShowtimeByMovieIdandDate(movie_date: string, movie_id: number) {
    const supabase = await createClient()
    const { data, error } = await supabase.from("showtimes").select("*").eq('date', movie_date).eq('movie_id', movie_id)

    if (error) console.log('Error fetching movies:', error)

    return data
}
