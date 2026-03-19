'use client'
import Skelaton from "@/components/skelaton"
import Typography from "@/components/Typography"
import { setMovieDate, setMovieId } from "@/lib/slice/movieSlice"
import { useFetchMovieByIdQuery, useFetchShowtimewithDateandMovieIdQuery } from "@/lib/slice/movieSupabaseApi"
import { AppDispatch, RootState } from "@/lib/store"
import MovieDateList from "@/sections/movie/MovieDateList"
import MovieFrame from "@/sections/movie/movieFrame"
import { movies } from "@/types/movies"
import { useParams } from "next/navigation"
import { useCallback, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

export default function Movie() {
    const params = useParams()
    const movieid = params?.movieId as string
    // const dispatch = useDispatch<AppDispatch>()
    const movie_date = useSelector((state: RootState) => state.movieDetails.Movie_date)
    

    const { data, isLoading, isError } = useFetchShowtimewithDateandMovieIdQuery({ date: movie_date, movie_id: Number(movieid) }, { skip:  !movieid })
    console.log(data)
    if (isError) {
        return <div>Error while fetching movie. Please try again later.</div>
    }

    return (
        <div className="max-w-[1400px] mx-auto pl-2">
            <div className="flex flex-col">
                <Typography size="md" className="font-bold">Schedule</Typography>
                <Typography size="md" className="bold text-[#5A637A]">
                    Select the cinema schedule you want to watch
                </Typography>
                <p>{data?.length}</p>
            </div>
            <div className="flex flex-col-reverse md:flex-row w-full">
                <div className="w-full md:w-1/2 border h-10">
                    <MovieDateList />
                </div>
                {/* <div className="w-full md:w-1/2 border h-full"> */}
                <MovieFrame movieid={movieid} />
                {/* </div> */}
            </div>
        </div>
    )
}