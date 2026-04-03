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
import { useSelector, shallowEqual, useDispatch } from "react-redux"

const MovieFrame = memo(function MovieFrame({ movieid }: { movieid: string }) {
    const { data: movie, isError, isLoading } = useFetchMovieByIdQuery(movieid, { skip: !movieid })

    // ✅ shallowEqual prevents new object reference on every render
    const selectedMovie = useSelector((state: RootState) => ({
        selected_showtime: state.movieDetails.selected_showtime,
        screenDetails: state.movieDetails.screenDetails,
        showtimes: state.movieDetails.showtimes,
        theaterDetails: state.movieDetails.theaterDetails,
    }), shallowEqual)
    const dispatch = useDispatch()
    if (isError) {
        return <div>something went wrong</div>
    }
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
                            < Typography size="body-small">{list}</ Typography>
                        </div>
                        <div className="w-3/5">
                            < Typography size="body-small">
                                {list === 'duration' ? durationfunc() : value as string}
                            </ Typography>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (
        <>
            {isLoading ? (
                <div className="min-h-56 w-full md:w-1/2 sm:mr-2 pr-2 border space-y-4 flex flex-col justify-center my-5">
                    <Skeleton height="500px" className="w-[70%] mx-auto" />
                    <Skeleton height="100px" className="w-[70%] mx-auto"/>
                    <Skeleton height="100px" className="w-[70%] mx-auto"/>
                </div>
            ) : (
                <div className="w-full md:w-1/2 sm:mr-2  md:ml-10 pr-2 flex flex-col">
                    
                    <div className="w-fit flex flex-col mx-auto justify-center ">
                        <Image
                            src={movie?.movie_img || 'https://jplpanawkbfwgpehspnm.supabase.co/storage/v1/object/public/brands_logo/e1cbc849207bcb9b33f6ad160ad7a008b19b6ba8.jpg'}
                            loading="lazy"
                            alt="movie banner"
                            height={500}
                            width={500}
                            className="aspect-[3/4] w-[400px] my-2 object-cover rounded-lg"
                        />
                        <Typography size="header-small" className="w-[80%] my-2 md:my-5">{movie?.name}</Typography>
                        {movie && rendererd()}

                        {isSelected && (  // ✅ check id instead of truthy object
                            <div className="w-full border border-[#5A637A] rounded-lg mt-5 p-2 md:p-5 ">
                                <Typography size="header-medium">{selectedMovie.theaterDetails.name}</Typography>
                                <Typography size="header-xsmall" color="font_shade_600" className="pt-2 md:pt-4" >
                                    {HandleDate(selectedMovie.theaterDetails.date)}
                                </ Typography>
                                <div className="text-sm md:text-base lg:text-xl flex justify-between mt-1 mb-3">
                                    <Typography size="header-small" className="mt-1 md:mt-3">{selectedMovie.screenDetails.type}</Typography>
                                    <Typography size="header-small" className="mt-1 md:mt-3">{selectedMovie.selected_showtime.show_time?.replace(':00', '')}</Typography>
                                </div>
                                <Typography size="body-small" color="font_shade_400">* Seat selection can be done after this</Typography>
                                <Link href={`./${movieid}/bookings`}>
                                    <div onClick={() => dispatch(setMovieId(movieid))} className="bg-royal text-gradientXXI1 w-full p-2 md:px-3 md:py-4 rounded-lg text-base md:text-lg lg:text-xl flex justify-center items-center my-2 md:my-4">
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