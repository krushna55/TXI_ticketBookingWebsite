import Skeleton from "@/components/skelaton"
import Typography from "@/components/Typography"
import { setMovieId } from "@/lib/slice/movieSlice"
import { useFetchMovieByIdQuery } from "@/lib/slice/movieSupabaseApi"
import { RootState } from "@/lib/store"
import { selectionMovie } from "@/types/movies"
import { formatDate } from "@/utils/getDate"
import MovieDuration from "@/utils/movieDuration"
import Image from "next/image"
import Link from "next/link"
import { memo } from "react"
import { useSelector, shallowEqual, useDispatch } from "react-redux"  // 👈 shallowEqual

const MovieFrame = memo(function MovieFrame({ movieid }: { movieid: string }) {  // 👈 remove selectedMovie prop

    // ✅ shallowEqual prevents new object reference on every render
    const selectedMovie = useSelector((state: RootState) => ({
        selected_showtime: state.movieDetails.selected_showtime,
        screenDetails: state.movieDetails.screenDetails,
        showtimes:state.movieDetails.showtimes,
        theaterDetails: state.movieDetails.theaterDetails,
    }), shallowEqual)
     const dispatch = useDispatch()
    const { data: movie, isError, isLoading } = useFetchMovieByIdQuery(movieid, { skip: !movieid })
    if(isError){
        return <div>something went wrong</div>
    }
    console.log(selectedMovie)
    function durationfunc() {
        const dur = MovieDuration(Number(movie?.duration))
        return `${dur.hour} Hour ${dur.minute} Minute`
    }
    function HandleDate(date: string | null) {
        const formatedate = formatDate(date)
        return `${formatedate.weekday}, ${formatedate.day} ${formatedate.month} ${formatedate.year}`
    }

    const movieData = ['genre', 'duration', 'director', 'age_rating']

    // ✅ no need to re-declare inside render — stable reference
    const isSelected = selectedMovie.theaterDetails.id !== 0

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
                                {list === 'duration' ? durationfunc() : value as string}
                            </p>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <>
            {isLoading ? (
                <div className="min-h-56 w-full md:w-1/2 sm:mr-2 pr-2 border space-y-4 flex flex-col justify-center">
                    <Skeleton height="56" width="full" />
                    <Skeleton height="10" width="full" />
                    <Skeleton height="10" width="full" />
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

                        {isSelected && (  // ✅ check id instead of truthy object
                            <div className="w-full border border-[#5A637A] rounded-lg mt-5 p-2 md:p-5">
                                <p className="font-bold text-lg md:text-xl lg:text-2xl">{selectedMovie.theaterDetails.name}</p>
                                <p className="text-gray-500 text-sm md:text-base mt-3">
                                    {HandleDate(selectedMovie.theaterDetails.date)}
                                </p>
                                <div className="text-sm md:text-base lg:text-xl flex justify-between mt-1 mb-3">
                                    <p>{selectedMovie.screenDetails.type}</p>
                                    <p>{selectedMovie.selected_showtime.show_time?.replace(':00', '')}</p>
                                </div>
                                <p className="text-gray-400 text-xs md:text-sm">* Seat selection can be done after this</p>
                                <Link href={'../booking'}>
                                    <div onClick={()=>dispatch(setMovieId(movieid))} className="bg-royal text-gradientXXI1 w-full p-2 md:px-3 md:py-4 rounded-lg text-base md:text-lg lg:text-xl flex justify-center items-center my-2 md:my-4">
                                        Buy now
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    )
})

export default MovieFrame