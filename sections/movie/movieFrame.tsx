import Skelaton from "@/components/skelaton"
import Typography from "@/components/Typography"
import { useFetchMovieByIdQuery } from "@/lib/slice/movieSupabaseApi"
import { RootState } from "@/lib/store"
import { movies } from "@/types/movies"
import MovieDuration from "@/utils/movieDuration"
import Image from "next/image"
import { memo } from "react"
import { useSelector } from "react-redux"

const MovieFrame = memo(function MovieFrame({movieid}:{movieid:string}) {
    function durationfunc() {
        const dur = MovieDuration(Number(movie?.duration))
        return `${dur.hour} Hour ${dur.minute} Minute`
    }   
      
    const { data: movie, isError, isLoading } = useFetchMovieByIdQuery(movieid,{skip:!movieid})
    const movieData = ['genre', 'duration', 'director', 'age_rating']

    function rendererd() {
        return movieData.map((list) => {
            const value = movie?.[list as keyof typeof movie]
            return (
                <div key={list}>
                    <div className="flex space-y-2">
                        <div className="w-2/5">
                            <Typography size="md">{list}</Typography>
                        </div>
                        <div className="w-3/5">
                            <Typography size="md">
                                {list === 'duration' ? durationfunc() : value}
                            </Typography>
                        </div>
                    </div>
                </div>
            )
        })
    }

    return (<>
        {isLoading ?  (
                    <div className="min-h-56 w-full md:w-1/2 sm:mr-2 pr-2 border space-y-4 flex flex-col justify-center">
                        <Skelaton height="56" width="full" />
                        <Skelaton height="10" width="full" />
                        <Skelaton height="10" width="full" />
                    </div>
                ) : (
        <div className="w-full md:w-1/2 sm:mr-2 pr-2 border flex flex-col justify-center items-center">
            <div className="w-fit flex flex-col justify-center">
                <Image src={movie?.movie_img ?? ""}
                    alt="movie banner"
                    height={500}
                    width={500}
                    className="aspect-[3/4] w-[400px] my-2 object-cover rounded-lg"
                    />
                <p className="font-semibold text-xl md:text-2xl py-2">{movie?.name}</p>
                {movie && rendererd()}
            </div>
        </div>)
        }
        </>
    )
})

export default MovieFrame