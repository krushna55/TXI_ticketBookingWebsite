import Skelaton from "@/components/skelaton"
import Typography from "@/components/Typography"
import { useFetchMovieByIdQuery } from "@/lib/slice/movieSupabaseApi"
import { RootState } from "@/lib/store"
import { movies, selectionMovie } from "@/types/movies"
import { formatDate, getDate } from "@/utils/getDate"
import MovieDuration from "@/utils/movieDuration"
import Image from "next/image"
import Link from "next/link"
import { memo } from "react"
import { useSelector } from "react-redux"

const MovieFrame = memo(function MovieFrame({ movieid, selectedMovie }: { movieid: string, selectedMovie: selectionMovie | undefined }) {
    function durationfunc() {
        const dur = MovieDuration(Number(movie?.duration))
        return `${dur.hour} Hour ${dur.minute} Minute`
    }
    function HandleDate(date: string | undefined) {
        const formatedate = formatDate(date)
        return `${formatedate.weekday}, ${formatedate.day} ${formatedate.month} ${formatedate.year}`
    }
    const { data: movie, isError, isLoading } = useFetchMovieByIdQuery(movieid, { skip: !movieid })
    const movieData = ['genre', 'duration', 'director', 'age_rating']

    function rendererd() {
        return movieData.map((list) => {
            const value = movie?.[list as keyof typeof movie]
            return (
                <div key={list}>
                    <div className="flex space-y-2">
                        <div className="w-2/5">
                            <p className="text-sm md:text-base capitalize text-gray-500">{list}</p>
                        </div>
                        <div className="w-3/5">
                            <p className="text-sm md:text-base">
                                {list === 'duration' ? durationfunc() : value}
                            </p>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (<>
        {isLoading ? (
            <div className="min-h-56 w-full md:w-1/2 sm:mr-2 pr-2 border space-y-4 flex flex-col justify-center">
                <Skelaton height="56" width="full" />
                <Skelaton height="10" width="full" />
                <Skelaton height="10" width="full" />
            </div>
        ) : (
            <div className="w-full md:w-1/2 sm:mr-2 pr-2 flex flex-col justify-center items-center">
                <div className="w-fit flex flex-col justify-center">
                    <Image
                        src={movie?.movie_img ?? ""}
                        alt="movie banner"
                        height={500}
                        width={500}
                        className="aspect-[3/4] w-[400px] my-2 object-cover rounded-lg"
                    />
                    <p className="font-semibold text-lg md:text-xl lg:text-2xl py-2">{movie?.name}</p>
                    {movie && rendererd()}
                    {selectedMovie ? (
                        <div className="w-full border border-[#5A637A] rounded-lg mt-5 p-2 md:p-5">
                            <p className="font-bold text-lg md:text-xl lg:text-2xl">{selectedMovie?.theaterDetails.name}</p>
                            <p className="text-gray-500 text-sm md:text-base mt-3">
                                {HandleDate(selectedMovie?.theaterDetails.date)}
                            </p>
                            <div className="text-sm md:text-base lg:text-xl flex justify-between mt-1 mb-3">
                                <p>{selectedMovie.screenDetails.type}</p>
                                <p>{selectedMovie.showtime.show_time?.replace(':00', '')}</p>
                            </div>
                            <p className="text-gray-400 text-xs md:text-sm">* Seat selection can be done after this</p>
                            <Link href={'./'}>
                                <div className="bg-royal text-gradientXXI1 w-full p-2 md:px-3 md:py-4 rounded-lg text-base md:text-lg lg:text-xl flex justify-center items-center my-2 md:my-4">
                                    Buy now
                                </div>
                            </Link>
                        </div>
                    ) : ''}
                </div>
            </div>
        )}
    </>
    )
})

export default MovieFrame