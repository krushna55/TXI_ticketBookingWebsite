// 'use client'
// import { useEffect, useRef, useState } from "react"
// import { createClient } from "@/lib/supabase/client"
// import { addBooking, deleteBooking } from "@/api/booking/bookingsApi"
// import { useSelector } from "react-redux"
// import { RootState } from "@/lib/store"
// import toast from "react-hot-toast"
// import { Tables } from "@/database.types"
// import { RealtimePostgresChangesPayload, User } from "@supabase/supabase-js"
// import { set } from "react-hook-form"

// type booking = Tables<'seat_reservations'>

// export default function SeatSection({
//     showtimeId,
//     selected_seat,
//     setSelected_seat
// }: {
//     showtimeId: number
//     selected_seat: string[]
//     setSelected_seat: React.Dispatch<React.SetStateAction<string[]>>
// }) {
//     const [allBookings, setAllBookings] = useState<booking[]>([])
//     const [user, setUser] = useState<User | null>(null)

//     const screenDetails = useSelector((state: RootState) => state.movieDetails.screenDetails)
//     const currentPrice = useSelector((state: RootState) => state.movieDetails.selected_showtime.price)
//     const isFetching = useRef(false)

//     useEffect(() => {
//         const supabase = createClient()

//         const init = async () => {
//             if (isFetching.current) return
//             isFetching.current = true
//             try {
//                 const { data: { user } } = await supabase.auth.getUser()
//                 setUser(user)

//                 const { data: initialData, error } = await supabase
//                     .from('seat_reservations')
//                     .select('*')
//                     .eq('showtime_id', showtimeId)
//                 console.log('initialData:', initialData)
//                 if (error) {
//                     toast.error(error.message)
//                 }

//                 if (Array.isArray(initialData)) {
//                     setAllBookings(initialData)
//                     // ✅ only pre-select 'hold' seats — not 'paid' ones
//                     const myHeldSeats = initialData
//                         .filter(b => b.user_id === user?.id && b.reservation_status === 'hold')
//                         .map(b => b.seat_no)
//                     setSelected_seat(myHeldSeats)
//                 }
//             } finally {
//                 isFetching.current = false
//             }
//         }
//         init()

//         const channel = supabase
//             .channel(`table-db-changes-${showtimeId}`)
//             .on('postgres_changes', {
//                 event: '*',
//                 schema: 'public',
//                 table: 'seat_reservations',
//                 filter: `showtime_id=eq.${showtimeId}`
//             }, (payload: RealtimePostgresChangesPayload<booking>) => {
//                 if (payload.eventType === 'INSERT') {
//                     setAllBookings(prev => [...prev, payload.new])
//                 } else if (payload.eventType === 'DELETE') {
//                     setAllBookings(prev => prev.filter(b => b.id !== payload.old.id))
//                 } else if (payload.eventType === 'UPDATE') {
//                     setAllBookings(prev =>
//                         prev.map(b => b.id === payload.new.id ? payload.new : b)
//                     )
//                 }
//             })
//             .subscribe()

//         return () => { supabase.removeChannel(channel) }
//     }, [showtimeId])

//     const handleSeatClick = async (seatLabel: string) => {
//         if (!user) return toast.error("Please login to book seats")

//         const isMySeat = selected_seat.includes(seatLabel)

//         if (isMySeat) {
//             await deleteBooking(showtimeId, seatLabel)
//             setSelected_seat(prev => prev.filter(b => b !== seatLabel))
//         } else {
//             if (selected_seat.length >= 10) {
//                 const removedSeat = selected_seat[0]
//                 await addBooking(showtimeId, seatLabel, currentPrice, 'hold')
//                 await deleteBooking(showtimeId, removedSeat)
//                 setSelected_seat(prev => [...prev.slice(1), seatLabel])
//                 toast.error("Max 10 seats allowed. Oldest selection removed.")
//                 return
//             }

//             const alreadyBooked = allBookings.find(b => b.seat_no === seatLabel)
//             if (alreadyBooked) return toast.error("Seat already taken")

//             await addBooking(showtimeId, seatLabel, currentPrice, 'hold')
//             setSelected_seat(prev => [...prev, seatLabel])
//         }
//     }

//     if (!screenDetails.screen_row) return <div className="text-center">Loading Grid...</div>

//     const rows = Array.from({ length: screenDetails.screen_row })
//     const cols = Array.from({ length: screenDetails.screen_column ?? 0 })
//     const middleGap = Math.floor((screenDetails.screen_column ?? 0) / 2)

//     return (
//         <div className="flex flex-col items-center gap-2 min-w-max p-4">
//             {rows.map((_, rowIndex) => {
//                 const rowChar = String.fromCharCode(65 + rowIndex)
//                 return (
//                     <div key={rowChar} className="flex gap-2">
//                         <span className="w-6 text-gray-400 text-sm flex items-center">{rowChar}</span>
//                         {cols.map((_, colIndex) => {
//                             const seatLabel = `${rowChar}${colIndex + 1}`
//                             const booking = allBookings.find(b => b.seat_no === seatLabel)

//                             const isPaidByMe = booking?.user_id === user?.id && booking?.reservation_status === 'paid'
//                             const isHeldByMe = booking?.user_id === user?.id && booking?.reservation_status === 'hold'
//                             const isPaidByOthers = booking?.user_id !== user?.id && booking?.reservation_status === 'paid'
//                             const isHeldByOthers = booking?.user_id !== user?.id && booking?.reservation_status === 'hold'
//                             const isSelectedByMe = selected_seat.includes(seatLabel)

//                             return (
//                                 <button
//                                     key={seatLabel}
//                                     disabled={isPaidByMe || isPaidByOthers || isHeldByOthers}
//                                     onClick={() => handleSeatClick(seatLabel)}
//                                     title={
//                                         isPaidByMe ? 'Already purchased by you'
//                                             : isPaidByOthers ? 'Already purchased'
//                                                 : isHeldByOthers ? 'On hold by someone'
//                                                     : isSelectedByMe ? 'Click to deselect'
//                                                         : 'Available'
//                                     }
//                                     className={`
//                                         w-10 h-9 rounded-md text-xs font-medium transition-all
//                                         ${colIndex + 1 === middleGap ? 'mr-24' : ''}
//                                         ${isPaidByMe
//                                             ? 'bg-royal text-white cursor-not-allowed'
//                                             : isPaidByOthers
//                                                 ? 'bg-royal text-white cursor-not-allowed'
//                                                 : isHeldByOthers
//                                                     ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                                                     : isSelectedByMe
//                                                         ? 'bg-choosenBtnColor text-white shadow-lg scale-110'
//                                                         : 'border-2 border-gray-400 hover:border-royal hover:text-royal'
//                                         }
//                                     `}
//                                 >
//                                     {colIndex + 1}
//                                 </button>
//                             )
//                         })}
//                     </div>
//                 )
//             })}
//         </div>
//     )
// }



'use client'
import { useEffect, useRef, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { addBooking, deleteBooking } from "@/api/booking/bookingsApi"
import { useSelector } from "react-redux"
import { RootState } from "@/lib/store"
import toast from "react-hot-toast"
import { Tables } from "@/database.types"
import { RealtimePostgresChangesPayload, User } from "@supabase/supabase-js"

type booking = Tables<'seat_reservations'>

export default function SeatSection({
    showtimeId,
    selected_seat,
    setSelected_seat
}: {
    showtimeId: number
    selected_seat: string[]
    setSelected_seat: React.Dispatch<React.SetStateAction<string[]>>
}) {
    const [allBookings, setAllBookings] = useState<booking[]>([])
    const [user, setUser] = useState<User | null>(null)

    const screenDetails = useSelector((state: RootState) => state.movieDetails.screenDetails)
    const currentPrice = useSelector((state: RootState) => state.movieDetails.selected_showtime.price)
    const isFetching = useRef(false)

    useEffect(() => {
        const supabase = createClient()

        const init = async () => {
            if (isFetching.current) return
            isFetching.current = true
            try {
                const { data: { user } } = await supabase.auth.getUser()
                setUser(user)

                const { data: initialData, error } = await supabase
                    .from('seat_reservations')
                    .select('*')
                    .eq('showtime_id', showtimeId)

                if (error) {
                    toast.error(error.message)
                    return
                }

                if (Array.isArray(initialData)) {
                    setAllBookings(initialData)
                    const myHeldSeats = initialData
                        .filter(b => b.user_id === user?.id && b.reservation_status === 'hold')
                        .map(b => b.seat_no)
                    setSelected_seat(myHeldSeats)
                }
            } finally {
                isFetching.current = false
            }
        }
        init()

        const channel = supabase
            .channel(`table-db-changes-${showtimeId}`)
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'seat_reservations',
                filter: `showtime_id=eq.${showtimeId}`
            }, (payload: RealtimePostgresChangesPayload<booking>) => {
                if (payload.eventType === 'INSERT') {
                    setAllBookings(prev => [...prev, payload.new])
                } else if (payload.eventType === 'DELETE') {
                    setAllBookings(prev => prev.filter(b => b.id !== payload.old.id))
                } else if (payload.eventType === 'UPDATE') {
                    setAllBookings(prev =>
                        prev.map(b => b.id === payload.new.id ? payload.new : b)
                    )
                }
            })
            .subscribe()

        return () => { supabase.removeChannel(channel) }
    }, [showtimeId])

    const handleSeatClick = async (seatLabel: string) => {
        if (!user) return toast.error("Please login to book seats")

        const isMySeat = selected_seat.includes(seatLabel)

        // --- DESELECT: remove seat ---
        if (isMySeat) {
            // Optimistically update UI first
            setSelected_seat(prev => prev.filter(b => b !== seatLabel))
            try {
                await deleteBooking(showtimeId, seatLabel)
            } catch (err) {
                // Revert UI if DB call fails
                setSelected_seat(prev => [...prev, seatLabel])
                toast.error("Failed to deselect seat. Please try again.")
            }
            return
        }

        // --- MAX 10 SEATS: swap oldest ---
        if (selected_seat.length >= 10) {
            const removedSeat = selected_seat[0]
            // Optimistically update UI
            setSelected_seat(prev => [...prev.slice(1), seatLabel])
            try {
                await addBooking(showtimeId, seatLabel, currentPrice, 'hold')
                await deleteBooking(showtimeId, removedSeat)
                toast.error("Max 10 seats allowed. Oldest selection removed.")
            } catch (err) {
                // Revert UI if either DB call fails
                setSelected_seat(prev => {
                    const reverted = prev.filter(s => s !== seatLabel)
                    return [removedSeat, ...reverted]
                })
                toast.error("Failed to update seat selection. Please try again.")
            }
            return
        }

        // --- GUARD: seat already taken ---
        const alreadyBooked = allBookings.find(b => b.seat_no === seatLabel)
        if (alreadyBooked) return toast.error("Seat already taken")

        // --- NORMAL ADD ---
        // Optimistically update UI first
        setSelected_seat(prev => [...prev, seatLabel])
        try {
            await addBooking(showtimeId, seatLabel, currentPrice, 'hold')
        } catch (err) {
            // Revert UI if DB call fails
            setSelected_seat(prev => prev.filter(s => s !== seatLabel))
            toast.error("Failed to book seat. Please try again.")
        }
    }

    if (!screenDetails.screen_row) return <div className="text-center">Loading Grid...</div>

    const rows = Array.from({ length: screenDetails.screen_row })
    const cols = Array.from({ length: screenDetails.screen_column ?? 0 })
    const middleGap = Math.floor((screenDetails.screen_column ?? 0) / 2)

    return (
        <div className="flex flex-col items-center gap-2 min-w-max p-4">
            {rows.map((_, rowIndex) => {
                const rowChar = String.fromCharCode(65 + rowIndex)
                return (
                    <div key={rowChar} className="flex gap-2">
                        <span className="w-6 text-gray-400 text-sm flex items-center">{rowChar}</span>
                        {cols.map((_, colIndex) => {
                            const seatLabel = `${rowChar}${colIndex + 1}`
                            const booking = allBookings.find(b => b.seat_no === seatLabel)

                            const isPaidByMe = booking?.user_id === user?.id && booking?.reservation_status === 'paid'
                            const isPaidByOthers = booking?.user_id !== user?.id && booking?.reservation_status === 'paid'
                            const isHeldByOthers = booking?.user_id !== user?.id && booking?.reservation_status === 'hold'
                            const isSelectedByMe = selected_seat.includes(seatLabel)

                            return (
                                <button
                                    key={seatLabel}
                                    disabled={isPaidByMe || isPaidByOthers || isHeldByOthers}
                                    onClick={() => handleSeatClick(seatLabel)}
                                    title={
                                        isPaidByMe ? 'Already purchased by you'
                                            : isPaidByOthers ? 'Already purchased'
                                                : isHeldByOthers ? 'On hold by someone'
                                                    : isSelectedByMe ? 'Click to deselect'
                                                        : 'Available'
                                    }
                                    className={`
                                        w-10 h-9 rounded-md text-xs font-medium transition-all
                                        ${colIndex + 1 === middleGap ? 'mr-24' : ''}
                                        ${isPaidByMe
                                            // FIX: distinct style — green tick to indicate user's own purchase
                                            ? 'bg-green-500 text-white cursor-not-allowed ring-2 ring-green-300'
                                            : isPaidByOthers
                                                // Taken by others — red/royal
                                                ? 'bg-royal text-white cursor-not-allowed opacity-60'
                                                : isHeldByOthers
                                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                    : isSelectedByMe
                                                        ? 'bg-choosenBtnColor text-white shadow-lg scale-110'
                                                        : 'border-2 border-gray-400 hover:border-royal hover:text-royal'
                                        }
                                    `}
                                >
                                    {/* Show ✓ for seats user has already paid for */}
                                    {isPaidByMe ? '✓' : colIndex + 1}
                                </button>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}