import { selectionMovie, Showtime, showtimes, TheaterDetails, TheaterEntry } from "@/types/movies";
import Image from "next/image";
import svgStar from '@/public/Star.svg'
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSelection } from "@/lib/slice/movieSlice";
import { isFuture } from "@/utils/isFuture";
import { RootState } from "@/lib/store";
import Typography from "@/components/Typography";

export default function ShowtimeTheaterSection({ data }: { data: TheaterEntry[] | null | undefined }) {

    const dispatch = useDispatch()
    const selected_showtime = useSelector((state: RootState) => state.movieDetails.selected_showtime)
    console.log(selected_showtime)
    if (!data || data?.length < 1) {
        return <p>No movie found</p>
    }
    return (
        <div className="mt-5 md:mt-10">
            {data?.map((theater) => {
                return (
                    <div key={theater.theaterdetails.id} className="px-2">
                        <div className="flex justify-between">
                            <div className="flex gap-3 items-center">
                                <Image alt="theater star" src={svgStar} height={30} width={30} />
                                <Typography size="header-small">{theater.theaterdetails?.name}</Typography>
                            </div>
                            <div className="flex justify-center items-center">
                                <Image src={theater?.theaterdetails?.brand_logo} alt="brand Logo" height={10} width={50} className="h-8 w-auto" />
                            </div>
                        </div>
                        <div className="text-gray-500 py-2">
                            <Typography size="body-small" color="font_shade_600">{theater.theaterdetails?.complete_address}</Typography>
                        </div>
                        {
                            theater.screens?.map((screen) => {
                                return (
                                    <div key={screen.screendetails.id}>
                                        <div className="flex justify-between">
                                            <Typography size="header-small"  color="font_shade_600">
                                                {screen.screendetails?.type}
                                            </Typography>
                                            <Typography size="body-small" color="font_shade_600">
                                                Rs. {screen.showtimes[0].price}
                                            </Typography>
                                        </div>
                                        <div className="flex flex-wrap w-full sm:w-[60%] md:w-[80%] lg:w-[50%] my-5">
                                            {
                                                screen.showtimes?.map((showtime) => {
                                                    return (
                                                        <div
                                                            onClick={() => {
                                                                if (!isFuture(showtime.show_time, theater.theaterdetails?.date)) return
                                                                dispatch(setSelection({ theaterDetails: theater.theaterdetails, screenDetails: screen.screendetails, showtimes: screen.showtimes, selected_showtime: showtime }));
                                                            }}
                                                            key={showtime.id}
                                                            className={`text-xs md:text-sm lg:text-base border px-2 md:px-3 py-1 md:py-2 mb-4 rounded-md mr-3
                                                                    ${selected_showtime?.id === showtime.id
                                                                    ? 'bg-[#1A2C50] text-white' 
                                                                    : isFuture(showtime.show_time, theater.theaterdetails?.date)
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