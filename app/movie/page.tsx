'use client'
import MovieFrame from "@/components/MovieFrame"
import Skelaton from "@/components/skelaton"
import { resetSelection } from "@/lib/slice/movieSlice"
import { useFetchMoiesQuery } from "@/lib/slice/movieSupabaseApi"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import Link from "next/link"
import Image from "next/image"
import Typography from "@/components/Typography"
import { NoDataFound } from "@/components/NoDataFound"

export default function MoviePage() {
    const { data: data = [], isError, isLoading } = useFetchMoiesQuery()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(resetSelection())
    }, [])
    if (isError) {
        return <div>Something Went Wrong...</div>
    }
    if(data.length === 0) {
        return <NoDataFound message="Sorry! No Movies Found" />
    }

    return (
        <div className="max-w-[1400px] mx-auto pl-2 h-fit md:px-5">
            <div className="flex justify-start py-5">
                <div className="w-[70%]">
                    <h1 className="text-md md:text-2xl font-semibold">Movies</h1>
                    <p className="text-sm md:text-md">The latest Movies for you!</p>
                </div>
            </div>
            {
                isLoading ?
                    <div className="grid gap-5 grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 mx-10">

                        {
                            Array(4).fill(0).map((_, id) => {
                                return (
                                    <div key={id} >
                                        <Skelaton height="400px" className="w-full" />
                                    </div>
                                )
                            })
                        }
                    </div>
                    :
                    <>
                        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4">
                            {
                                data?.map((movie) => {
                                    return <Link href={`./movie/${movie.id}`} key={movie.id}>
                                        <div className="justify-center items-center flex flex-col sm:px-2 pt-2 pb-5">
                                            {/* <div className="aspect-1/19"> */}
                                            <Image src={movie?.movie_img ?? ''} alt="spider-movie" width={200} height={400} className="aspect-[3/4] object-cover overflow-none w-[90%] sm:w-[500px] rounded-md  " />
                                            {/* </div> */}
                                            <span className="flex justify-center sm:min-h-16 lg:min-h-16 my-2 ">
                                                <Typography size="header-small" className="line-clamp-2 ">{movie?.name}</Typography>
                                            </span>
                                            <div className="flex h-full justify-center space-x-2 my-2">
                                                <div className="px-2 py-0.5 rounded-[4px] text-white bg-[linear-gradient(to_right,#F2C46F,#C6943F)] h-fit  text-[8px] md:text-sm xl:text-md">XXI</div>
                                                <div className="px-2 py-0.5 rounded-[4px] text-white bg-gradientRed h-fit text-[8px] md:text-sm xl:text-md  ">CGV</div>
                                                <div className="px-2 py-0.5 rounded-[4px] text-white bg-royal h-fit  text-[8px] md:text-sm xl:text-md ">CINEPOLIS</div>
                                            </div>
                                        </div>
                                    </Link>
                                })
                            }
                        </div>
                    </>
            }
        </div>
    )
}