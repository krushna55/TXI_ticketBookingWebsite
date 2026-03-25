'use client'
import MovieFrame from "@/components/MovieFrame"
import { useFetchMoiesQuery } from "@/lib/slice/movieSupabaseApi"
import Image from "next/image"
import Link from "next/link"

export default function MoviesPage() {
    const { data: data = [], isError, isLoading } = useFetchMoiesQuery()
    if (isError) {
        return <div>Something went Wrong</div>
    }
    return (
        <div className="my-10 px-2 "> 
            <div className="flex justify-between py-5">
                <div className="w-[70%]">
                    <h1 className="text-md md:text-2xl font-semibold text-gray-700">Movies</h1>
                    <p className="text-sm md:text-md">The latest Movies for you!</p>
                </div>

                <div>
                    <Link href={'./movie'} className="text-md md:text-xl text-skyBlue">See All</Link>
                </div>
            </div>
            {
                isLoading
                    ?
                    <div>Loading Movies....</div>
                    :
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-0 sm:gap-8 md:gap-12">
                        {data?.slice(0, 3).map((movie) => (
                                <MovieFrame movie={movie} key={movie.id}/>
                        ))}
                    </div>
            }
        </div>
    );
}