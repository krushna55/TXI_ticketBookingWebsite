import {
  fetchHeroMovies,
  fetchMovieById,
  fetchMovies,
  fetchShowtimeByMovieIdandDate,
} from "@/api/Movies/movies";
import { movies, showtimes, TheaterEntry, TheaterMap } from "@/types/movies";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
export const movieApi = createApi({
  reducerPath: "movieApi",
  baseQuery: fakeBaseQuery(),
  endpoints: (builder) => ({
    fetchHeroMovies: builder.query<movies[], void>({
      queryFn: async () => {
        try {
          const data = await fetchHeroMovies();
          return { data: data as movies[] };
        } catch (e) {
          return { error: { status: "FETCH_ERROR", error: e as Error } };
        }
      },
    }),
    fetchMoies: builder.query<movies[], void>({
      queryFn: async () => {
        try {
          const data = await fetchMovies();
          return { data: data as movies[] };
        } catch (e) {
          return { error: { status: "fetch_error", error: e as Error } };
        }
      },
    }),
    fetchMovieById: builder.query<movies, string>({
      queryFn: async (id: string) => {
        try {
          const data = await fetchMovieById(id);
          return { data: data as movies };
        } catch (e) {
          return {
            error: {
              status: "FAILED TO FETCH MOVIE ",
              ERROR: e as Error,
            },
          };
        }
      },
    }),
    fetchShowtimewithDateandMovieId: builder.query<
      TheaterEntry[] | null,
      {
        date: string;
        movie_id: number;
        city_id: number;
        userLat?: number | null;
        userLng?: number | null;
      }
    >({
      queryFn: async ({ date, movie_id, city_id, userLat, userLng }) => {
        try {
          const data = await fetchShowtimeByMovieIdandDate(
            date,
            movie_id,
            city_id,
            userLat,
            userLng,
          );

          return { data: data as TheaterEntry[] | null };
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

export const {
  useFetchMoiesQuery,
  useFetchHeroMoviesQuery,
  useFetchMovieByIdQuery,
  useFetchShowtimewithDateandMovieIdQuery,
} = movieApi;
