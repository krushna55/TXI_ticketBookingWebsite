"use server"

import { createClient } from "@/lib/supabase/server";
import { Database } from "@/database.types";
import { Tables } from "@/database.types";
type movies = Tables<'movies'>
type theater = Tables<'theater'>
type showtimes = Tables<'showtimes'>
type screen = Tables<'screen'>
import { TheaterEntry, TheaterMap } from "@/types/movies";

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
export async function fetchShowtimeByMovieIdandDate(movie_date: string, movie_id: number, city_id: number): Promise<TheaterEntry[] | null> {
    const supabase = await createClient()
    const theaterMap: TheaterMap = new Map()

    const { data, error } = await supabase.from("showtimes")
        .select(`
            id,
            show_time,
            price,
            screen_id,
            theater_id,
            date,
            theater!inner(
                id,
                name,
                complete_address,
                district,
                city_id,
                brands!inner(*)
            ),
            screen!inner(
                id,
                name,
                type
            )
        `)
        .eq('date', movie_date)
        .eq('movie_id', movie_id)
        .filter('theater.city_id', 'eq', city_id)

    if (error) {
        console.log('Error fetching showtimes:', error)
        return null
    }
    data?.forEach((showtime) => {
        const theater = showtime.theater;
        const screen = showtime.screen as screen;
        const brand = showtime.theater.brands
        if (!theaterMap.has(showtime.theater_id)) {
            theaterMap.set(showtime.theater_id, {
                theaterdetails: {
                    id: theater.id,
                    name: theater.name,
                    complete_address: theater.complete_address,
                    district: theater.district,
                    city_id: theater.city_id,
                    brand_name: brand.name,
                    brand_logo: brand.logo_url,
                    date:showtime.date
                },
                screens: []
            })
        }
        const theaterEntry = theaterMap.get(showtime.theater_id)!

        const existingScreen = theaterEntry.screens.find(
            (s) => s.screendetails.id === showtime.screen_id
        )


        if (existingScreen) {
            // Screen exists — just push the showtime
            existingScreen.showtimes.push({
                id: showtime.id,
                show_time: showtime.show_time,
                price: showtime.price,
            })
        } else {
            // Screen doesn't exist — add screen with first showtime
            theaterEntry.screens.push({
                screendetails: {
                    id: screen.id,
                    name: screen.name,
                    type: screen.type,
                },
                showtimes: [{
                    id: showtime.id,
                    show_time: showtime.show_time,
                    price: showtime.price,
                }]
            })
        }
    })
    const result = Array.from(theaterMap.values()).map((theater) => ({
        ...theater,
        screens: theater.screens.map((screen) => ({
            ...screen,
            showtimes: screen.showtimes.sort((a, b) =>
                (a.show_time ?? '').localeCompare(b.show_time ?? '')
            )
        }))
    }))

    return result
}
