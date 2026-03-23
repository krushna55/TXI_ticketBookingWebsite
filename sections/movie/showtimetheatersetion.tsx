import { selectionMovie, Showtime, showtimes, TheaterDetails, TheaterEntry } from "@/types/movies";
import Image from "next/image";
import svgStar from '@/public/Star.svg'
import React from "react";

export default function ShowtimeTheaterSection({ data, setSelectedMovie }: { data: TheaterEntry[] | null | undefined, setSelectedMovie: React.Dispatch<React.SetStateAction<selectionMovie | undefined>> }) {
    const date = new Date()
    const isFuture = (show_time: string | null): boolean => {
        if (!show_time) return false
        const [h, m] = show_time.split(':').map(Number)
        const showMinutes = h * 60 + m
        const nowMinutes = date.getHours() * 60 + date.getMinutes()
        return showMinutes > nowMinutes
    }
    return (
        <div>
            {data?.map((theater) => {
                return (
                    <div key={theater.theaterdetails.id} className="px-2">
                        <div className="flex justify-between">
                            <div className="flex gap-3 items-center">
                                <Image alt="theater star" src={svgStar} height={30} width={30} />
                                <p className="text-base md:text-xl lg:text-2xl font-medium">{theater.theaterdetails?.name}</p>
                            </div>
                            <div className="flex justify-center items-center">
                                <Image src={theater?.theaterdetails?.brand_logo} alt="brand Logo" height={10} width={50} className="h-8 w-auto" />
                            </div>
                        </div>
                        <div className="text-gray-500 py-2">
                            <p className="text-xs md:text-sm lg:text-base">{theater.theaterdetails?.complete_address}</p>
                        </div>
                        {
                            theater.screens?.map((screen) => {
                                return (
                                    <div key={screen.screendetails.id}>
                                        <div className="flex justify-between">
                                            <p className="text-sm md:text-base lg:text-xl text-gray-500 font-bold">
                                                {screen.screendetails?.type}
                                            </p>
                                            <p className="text-sm md:text-base lg:text-xl text-gray-600">
                                                Rs. {screen.showtimes[0].price}
                                            </p>
                                        </div>
                                        <div className="flex flex-wrap w-full sm:w-[60%] md:w-[80%] lg:w-[50%] my-5">
                                            {
                                                screen.showtimes?.map((showtime) => {
                                                    return (
                                                        <div
                                                            onClick={() => {
                                                                if (!isFuture(showtime.show_time)) return
                                                                setSelectedMovie({ theaterDetails: theater.theaterdetails, screenDetails: screen.screendetails, showtime })
                                                            }}
                                                            key={showtime.id}
                                                            className={`text-xs md:text-sm lg:text-base border px-2 md:px-3 py-1 md:py-2 mb-4 rounded-md mr-3 ${isFuture(showtime.show_time)
                                                                ? 'cursor-pointer hover:bg-[#1A2C50] hover:text-white'
                                                                : 'bg-gray-500 opacity-50 cursor-not-allowed'
                                                                }`}
                                                        >
                                                            {showtime.show_time?.replace(':00', '')}
                                                        </div>
                                                    )
                                                })
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )
            })}
        </div>
    )
}