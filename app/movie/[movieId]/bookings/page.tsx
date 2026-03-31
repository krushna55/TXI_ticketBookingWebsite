'use client'
import { RootState } from "@/lib/store"
import Link from "next/link"
import { useDispatch, useSelector, shallowEqual } from "react-redux"
import { GoClock } from "react-icons/go"
import { useEffect, useRef, useState } from "react"
import { FaChevronDown, FaChevronUp } from "react-icons/fa6"
import { setSelectedShowtime } from "@/lib/slice/movieSlice"
import SeatSection from "@/sections/bookings/SeatsSeaction"
import PricingSection from "@/sections/bookings/pricingSection"
import SeatOptions from "@/sections/bookings/seatOptions"
import { isFuture } from "@/utils/isFuture"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"

export default function BookingPage() {
    const router = useRouter()
    const dispatch = useDispatch()
    const [isopen, setIsopen] = useState(false)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const [selected_seat, setselected_seat] = useState<string[]>([])
    
    const state = useSelector((state: RootState) => ({
        showtimes: state.movieDetails.showtimes,
        selected_showtime: state.movieDetails.selected_showtime,
        screenDetails: state.movieDetails.screenDetails,
        theater_details: state.movieDetails.theaterDetails
    }), shallowEqual)
    // const visiblity = isFuture(state.selected_showtime.show_time, state.theater_details.date)
    // if (!visiblity) {
    //     router.push('./')
    //     toast.error("Showtime has already started")
    //     console.log(visiblity)
    // }
    useEffect(() => {
        function handler(e: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
                setIsopen(false)
            }
        }
        document.addEventListener("mousedown", handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    // if (!state.selected_showtime || state.selected_showtime.id === 0) {
    //     return (
    //         <div className="max-w-[1400px] mx-auto p-10 text-center">
    //             <div className="mb-4 text-xl">Please select a theater and showtime first.</div>
    //             <Link href="/" className="p-3 bg-royal text-white rounded-md">Back to Home</Link>
    //         </div>
    //     )
    // }

    return (
        <div className="max-w-[1400px] mx-auto px-4">
            <div className="mt-5 mb-10">
                <h1 className="font-bold text-3xl">Select a Seat</h1>
                <p className="text-gray-500">Choose your preferred spot for the movie.</p>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-8">
                <div className="relative" ref={dropdownRef}>
                    <button
                        onClick={() => setIsopen(!isopen)}
                        className="flex items-center gap-3 border p-3 rounded-md min-w-[150px] justify-between"
                    >
                        <GoClock />
                        {state.selected_showtime.show_time?.replace(':00', '')}
                        {isopen ? <FaChevronUp /> : <FaChevronDown />}
                    </button>

                    {isopen && (
                        <div className="absolute z-50 mt-2 bg-white border shadow-xl p-4 rounded-lg w-64">
                            <div className="grid grid-cols-3 gap-2">
                                {state.showtimes.map((st) => (
                                    <button
                                        key={st.id}
                                        onClick={() => {
                                            dispatch(setSelectedShowtime({ selected_showtime: st }))
                                            setIsopen(false)
                                            setselected_seat([]) // Clear selection on time change
                                        }}
                                        className={`p-2 text-sm border rounded 
                                             ${isFuture(st.show_time, state.theater_details.date) ? state.selected_showtime.id === st.id ?
                                                'cursor-pointer bg-royal text-white'
                                                :
                                                'cursor-pointer hover:bg-gray-100' : 'bg-gray-500  cursor-not-allowed pointer-events-none'}
                                             }`
                                        }
                                    >
                                        {st.show_time?.replace(':00', '')}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <SeatOptions />
            </div>

            <div className="bg-gray-50 rounded-xl py-10 overflow-x-auto scrollbar-hide">
                <SeatSection
                    showtimeId={state.selected_showtime.id}
                    selected_seat={selected_seat}
                    setSelected_seat={setselected_seat}
                />
            </div>

            <div className="w-full bg-slate-800 h-16 text-white flex justify-center items-center mt-10 rounded-t-[50px] shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
                SCREEN
            </div>

            {selected_seat.length > 0 && (
                <PricingSection selected_seat={selected_seat} selectedtheater={state} />
            )}
        </div>
    )
}