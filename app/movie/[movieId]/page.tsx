'use client'
import Typography from "@/components/Typography"
import { useFetchShowtimewithDateandMovieIdQuery } from "@/lib/slice/movieSupabaseApi"
import { RootState } from "@/lib/store"
import CitySelector from "@/sections/movie/citySelector"
import MovieDateList from "@/sections/movie/MovieDateList"
import MovieFrame from "@/sections/movie/movieFrame"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import ShowtimeTheaterSection from "@/sections/movie/showtimetheatersetion"
import { selectionMovie, TheaterEntry } from "@/types/movies"

export default function Movie() {

    const params = useParams()
    const movieid = params?.movieId as string
    const [cityvalue, setCity] = useState<number>(1)
    const [Moviedata, setDate] = useState<TheaterEntry[] | null | undefined>()
    const [query, setQuery] = useState<string>('')
    const [selectedMovie, setSelectedMovie] = useState<selectionMovie>()

    const movie_date = useSelector((state: RootState) => state.movieDetails.Movie_date)
    const { data, isLoading, isError } = useFetchShowtimewithDateandMovieIdQuery(
        { date: movie_date, movie_id: Number(movieid), city_id: cityvalue },
        { skip: !movieid }
    )

    useEffect(() => {
        console.log(data)
        setDate(data)
    }, [data])

    if (isError) {
        return <div>Error while fetching movie. Please try again later.</div>
    }

    function handleMovieQuery(query: string) {
        setQuery(query)
        if (!query.trim()) {
            setDate(data)  // reset to original data if query is empty
            return
        }
        const filtered = data?.filter((theater) =>
            theater.theaterdetails.name.toLowerCase().includes(query.toLowerCase()) ||
            theater.theaterdetails.district?.toLowerCase().includes(query.toLowerCase())
        )
        setDate(filtered)
    }

    return (
        <div className="max-w-[1400px] mx-auto pl-2 h-fit">
            <div className="flex flex-col h-full">
                <Typography size="lg" className="font-bold">Schedule</Typography>
                <Typography size="md" className="bold text-base text-gray-400 font-medium">
                    Select the cinema schedule you want to watch
                </Typography>
            </div>
            <div className="flex flex-col-reverse items-start md:flex-row w-full h-full">
                <div className="w-full md:w-1/2">
                    <div className="border-b-2 py-2">
                        <MovieDateList />
                    </div>
                    <div className="h-12 my-5">
                        <CitySelector setCity={setCity} />
                    </div>
                    <div className="w-full">
                        <div className="border border-gray-400 flex rounded-lg my-3">
                            <input
                                value={query}
                                onChange={(e) => handleMovieQuery(e.target.value)}
                                placeholder="Search theater"
                                className="py-1 px-2 w-full rounded-lg bg-white text-base outline-none"
                            />
                        </div>
                        <div>

                        </div>
                    </div>
                    {isLoading ? 'loading showtime' : <ShowtimeTheaterSection data={Moviedata} setSelectedMovie={setSelectedMovie} />}
                </div>
                <MovieFrame movieid={movieid} selectedMovie={selectedMovie} />
            </div>
        </div>
    )
}