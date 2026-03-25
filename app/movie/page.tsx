'use client'
import MovieFrame from "@/components/MovieFrame"
import { useFetchMoiesQuery } from "@/lib/slice/movieSupabaseApi"
import Link from "next/link"

export default function MoviePage() {
    const { data: data = [], isError, isLoading } = useFetchMoiesQuery()
    if (isError) {
        return <div>Something Went Wrong...</div>
    }

    return (
        <div className="max-w-[1400px] mx-auto pl-2 h-fit px-5">
        <div className="flex justify-start py-5">
                <div className="w-[70%]">
                    <h1 className="text-md md:text-2xl font-semibold">Movies</h1>
                    <p className="text-sm md:text-md">The latest Movies for you!</p>
                </div>
            </div>
            {
                isLoading ?
                    <div>Loading ...</div>
                    :
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
                        {
                            data.map((movie) => {
                                return <MovieFrame movie={movie} />
                            })
                        }
                    </div>
            }
        </div>
    )
}