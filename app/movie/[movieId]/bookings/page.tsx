'use client'
import { RootState } from "@/lib/store"
import Link from "next/link"
import { useParams } from "next/navigation"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { GoClock } from "react-icons/go";
import { useEffect, useRef, useState } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa6"
import { setSelectedShowtime } from "@/lib/slice/movieSlice"
import SeatSection from "@/sections/bookings/SeatsSeaction"



export default function BookingPage() {
    const params = useParams()
    const dispacth = useDispatch()
    console.log(params.movieId)
    const selectedtheater = useSelector((state: RootState) => ({
        showtimes: state.movieDetails.showtimes,
        selected_showtime:state.movieDetails.selected_showtime
    }),shallowEqual)
    console.log(selectedtheater)
    const [selected_showtime, setSelected_showtime] = useState(selectedtheater.selected_showtime)
    const [isopen, setIsopen] = useState(false)
    console.log(selected_showtime)
    const dropdownRef = useRef<HTMLDivElement>(null)
    useEffect(() => {
        function handler(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsopen(false)
            }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener('mousedown', handler)

    })



    if (selectedtheater.selected_showtime.id === 0) {
        return (<div className="max-w-[1400px] mx-auto pl-2 h-fit">
            <div className="mb-2">
                Select theater and showtime
            </div>
            <Link href={`../../`} className=" p-2 m-2 bg-royal text-white rounded-md">Back to home</Link>

        </div>)
    }




    return (
        <div className="max-w-[1400px] mx-auto pl-2 h-fit">
            <div className="mt-5 mb-10">
                <h1 className="font-bold text-lg sm:text-xl md:text-2xl">Select a Seat</h1>
                <p className="text-gray-500 text-[12px] sm:text-base">Choose the seat you will occupy during the screening</p>
            </div>
            <div className="w-full md:w-[90%] space-y-2 mx-auto border flex justify-between sm:flex-row flex-col">
                <div className="relative">
                    {<div onClick={() => setIsopen(!isopen)} className="flex  p-3  justify-between  items-center w-32 cursor-pointer">
                        <GoClock />
                        <div className="flex gap-3 items-center">
                            {selected_showtime.show_time?.
                                replace(':00', '')}
                            <FaChevronDown />
                        </div>
                    </div>}
                    {isopen && <div ref={dropdownRef} className="bg-white drop-shadow-md  absolute w-fit left-0 top-0 cursor-pointer">
                        <div onClick={() => setIsopen(!isopen)} className=" flex  justify-between  p-3 w-32  items-center">
                            <GoClock />
                            <div className="flex gap-3 items-center">
                                {selected_showtime.show_time?.
                                    replace(':00', '')}
                                <FaChevronUp />
                            </div>
                        </div>
                        <div className="p-3 w-96">
                            <div className="flex flex-wrap gap-2">
                                {selectedtheater.showtimes.map((showtime) => {
                                    return (
                                        <div onClick={
                                            () => {
                                                setIsopen(!isopen)
                                                setSelected_showtime(showtime)
                                                dispacth(setSelectedShowtime({ selected_showtime: showtime }))
                                            }
                                        }
                                            className={`${selected_showtime.id === showtime.id ? 'bg-royal text-white' : 'bg-white'} w-20 flex justify-center p-2 border rounded-md hover:bg-hoverBtnColor hover:text-white active:bg-pressedBtnColor active:text-white`} key={showtime.id}>
                                            {showtime.show_time?.
                                                replace(':00', '')}
                                        </div>
                                    )
                                })
                                }
                            </div>
                        </div>
                    </div>
                    }
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 sm:gap-2 space-y-2 md:space-y-0">
                    <div className="flex gap-2 items-center sm:mx-auto"><div className="h-4 w-4 border-2 border-gray-400"></div><p>Empty Chair</p></div>
                    <div className="flex gap-2 items-center sm:mx-auto "><div className="h-4 w-4 bg-royal"></div><p>Filled</p></div>
                    <div className="flex gap-2 items-center sm:mx-auto "><div className="h-4 w-4 bg-[#118EEA]"></div><p>Chosen</p></div>
                    <div className="flex gap-2 items-center sm:mx-auto "><div className="h-4 w-4 border-2 border-yellow-500"></div><p>On Hold</p></div>
                </div>
            </div>
            <div className="w-full h-full md:w-[90%] space-y-2 mx-auto border">
                    <SeatSection />
            </div>
        </div>
    )
}