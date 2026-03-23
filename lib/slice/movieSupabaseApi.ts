import { fetchMovieById, fetchMovies, fetchShowtimeByMovieIdandDate } from "@/api/Movies/movies";
import { movies, showtimes, TheaterEntry, TheaterMap } from "@/types/movies";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { createClient } from "../supabase/server";
export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    fetchMovies: builder.query<movies[], void>({
      queryFn: async () => {
        try {
          const data = await fetchMovies();
          return { data: data as movies[] };
        } catch (e) {
          return { error: { status: "FETCH_ERROR", error: e as Error } };
        }
      },
    }),
    fetchMovieById:builder.query<movies,string>({
      queryFn: async(id:string)=>{
        try{
          const data = await fetchMovieById(id);
          return {data: data as movies};
          }catch(e){
            return {
              error : {
                status : 'FAILED TO FETCH MOVIE ',
                ERROR : e as Error
              }
            }
          }
      }
    }),
    fetchShowtimewithDateandMovieId: builder.query<TheaterEntry[]|null, { date: string; movie_id: number,city_id:number }>({
      queryFn: async ( {date, movie_id,city_id} ) => {
        try {
          const data = await fetchShowtimeByMovieIdandDate(date, movie_id,city_id);
          
          return { data: data as TheaterEntry[]|null };
        } catch (e) {
          return {
            error: {
              status: "Failed to fetch showtimes",
              ERROR: e as Error,
            },
          };
        }
      },
    }),
  }),
});

export const { useFetchMoviesQuery, useFetchMovieByIdQuery, useFetchShowtimewithDateandMovieIdQuery } = movieApi;
