import { setSelected_seats } from "@/lib/slice/movieSlice";
import { screendetails, Showtime } from "@/types/movies";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { createClient } from "@/lib/supabase/client";
import { useCallback, useState } from "react";

type selectedtheater = {
    showtimes: Showtime[];
    selected_showtime: Showtime;
    screenDetails: screendetails;
}

export default function PricingSection({ selected_seat, selectedtheater }: { selected_seat: string[], selectedtheater: selectedtheater }) {
    const router = useRouter()
    const dispatch = useDispatch()
    const [isChecking, setIsChecking] = useState(false)
    const total = selected_seat.length * (selectedtheater.selected_showtime.price ?? 0)
    
    // Check if all selected seats are still available
    const checkSeatsAvailability = useCallback(async () => {
        setIsChecking(true)
        try {
            const supabase = createClient()
            const { data: bookings, error } = await supabase
                .from('seat_reservations')
                .select('*')
                .eq('showtime_id', selectedtheater.selected_showtime.id)
                .in('seat_no', selected_seat)

            if (error) throw error

            // Get current user
            const { data: { user } } = await supabase.auth.getUser()

            // Check if any seat is unavailable (paid or held by someone else)
            const unavailableSeats = bookings?.filter(b => 
                b.reservation_status === 'paid' || 
                (b.reservation_status === 'hold' && b.user_id !== user?.id)
            ) || []

            if (unavailableSeats.length > 0) {
                const unavailableSeatNumbers = unavailableSeats.map(s => s.seat_no).join(', ')
                toast.error(`Sorry! Seats ${unavailableSeatNumbers} are no longer available. Please select again.`)
                setIsChecking(false)
                return false
            }

            setIsChecking(false)
            return true
        } catch (err) {
            toast.error("Failed to verify seat availability. Please try again.")
            setIsChecking(false)
            return false
        }
    }, [selected_seat, selectedtheater.selected_showtime.id])

    async function handleConfirm() {
        // Verify seats are available before confirming
        const seatsAvailable = await checkSeatsAvailability()
        if (!seatsAvailable) return

        dispatch(setSelected_seats({ selected_seats: selected_seat }))
        router.push('bookings/confirm')
    }
    return (
        <>
            <div className="max-w-[1400px] flex flex-col  lg:flex lg:flex-row my-10 mx-auto md:pl-2 px-2">
                <div className="flex  lg:w-1/2  lg:justify-between gap-2 lg:gap-5">
                    <div className="flex flex-col justify-center items-center w-full lg:w-1/2">
                        <div>
                            <p className="text-gray-500 mb-5">
                                Total
                            </p>
                            <h1 className="text-2xl lg:text-3xl min-h-16 lg:min-h-20">
                                Rs.{selected_seat.length * (selectedtheater.selected_showtime?.price ?? 0)}
                            </h1>
                        </div>
                    </div>
                    <div className="flex flex-col justify-center  w-full lg:w-1/2">
                        <div>
                            <p className="text-gray-500 mb-5">Seat</p>
                            <div className="">
                                <div className="text-md sm:text-xl md:text-2xl lg:text-3xl flex flex-wrap gap-1 min-h-16 lg:min-h-20 w-fit">
                                    {selected_seat.map((seat, index) => (
                                        <div key={seat}> {seat}{index >= 0 && index !== selected_seat.length - 1 ? ',' : ''}</div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className="flex w-full lg:w-1/2 h-fit gap-2 lg:gap-5 my-auto justify-center items-center ">
                    <div className="bg-white  w-60 border border-royal p-1 lg:p-3  rounded-lg " >
                        <p className="text-black   text-md  md:text-lg lg:text-xl font-medium flex justify-center ">
                            back
                        </p>
                    </div>
                    <button
                        onClick={() => {
                            handleConfirm()
                            router.push('bookings/confirm')
                        }}
                        className=" bg-royal text-white px-8 py-3 rounded-md font-semibold hover:opacity-90 transition"
                    >
                        Confirm Seats
                    </button>
                </div> */}
                <div className="flex w-full lg:w-1/2 h-fit gap-4 lg:gap-6 my-auto justify-center items-center">
                    {/* Back Button - Converted to a button for accessibility */}
                    <button
                        onClick={() => router.back()}
                        className="flex-1 max-w-[160px] bg-white text-royal border-2 border-royal py-3 px-6 rounded-xl font-semibold hover:bg-royal/5 transition-all duration-200 active:scale-95 text-center"
                    >
                        Back
                    </button>

                    {/* Confirm Button */}
                    <button
                        onClick={handleConfirm}
                        disabled={isChecking}
                        className="flex-1 max-w-[200px] bg-royal text-white py-3 px-8 rounded-xl font-semibold shadow-lg shadow-royal/20 hover:bg-royal/90 hover:shadow-royal/30 transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isChecking ? 'Checking...' : 'Confirm Seats'}
                    </button>
                </div>
            </div>
        </>
    )
}



// import { useRouter } from "next/navigation"
// import { useDispatch } from "react-redux";

// export default function PricingSection({ selected_seat, selectedtheater } : { selected_seat: string[], selectedtheater: selectedtheater }) {
// const router = useRouter()
// const dispatch = useDispatch()
// const total = selected_seat.length * (selectedtheater.selected_showtime.price ?? 0)
// function handleConfirm(){
//     dispatch(setSelected_seats({selected_seats:selected_seat}))
// }

//     return (
//         <div className="fixed bottom-0 w-full bg-white shadow-lg border-t px-6 py-4 flex justify-between items-center z-40">
//             <div>
//                 <p className="text-sm text-gray-500">{selected_seat.length} Seats Selected</p>
//                 <p className="text-xl font-bold">₹{total.toLocaleString()}</p>
//                 <p className="text-xs text-gray-400">{selected_seat.join(', ')}</p>
//             </div>
//             <button
//                 onClick={() => {
//                     handleConfirm()
//                     router.push('bookings/confirm')
//                 }}
//                 className="bg-royal text-white px-8 py-3 rounded-md font-semibold hover:opacity-90 transition"
//             >
//                 Confirm Seats
//             </button>
//         </div>
//     )
// }