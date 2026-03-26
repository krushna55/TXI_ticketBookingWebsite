import { Tables } from "@/database.types";
import { StaticImport } from "next/dist/shared/lib/get-img-props";

export type movies = Tables<'movies'>
export type showtimes = Tables<'showtimes'>

export type selectionMovie = {
    theaterDetails: TheaterDetails,
    screenDetails: screendetails,
    selected_showtime: Showtime,
    showtimes: Showtime[]
}


export type TheaterDetails = {
    id: number
    name: string
    complete_address: string | null
    district: string | null
    city_id: number | null
    brand_name: string | null
    brand_logo: string | StaticImport
    date: string | null
    distanceKm: number | null
}

export type Showtime = {
    id: number
    show_time: string | null
    price: number | null
}
export type screendetails = {
    id: number
    name: string
    type: string | null
    screen_row:number | null
    screen_column:number | null
}
export type Screen = {
    screendetails: screendetails
    showtimes: Showtime[]
}

export type TheaterEntry = {
    theaterdetails: TheaterDetails
    screens: Screen[]
}

export type TheaterMap = Map<number, TheaterEntry>