'use client'
import { useEffect, useRef, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { fetchBookings, addBooking, deleteBooking } from "@/api/booking/bookingsApi"
import { useSelector } from "react-redux"
import { RootState } from "@/lib/store"
import toast from "react-hot-toast"
import { Tables } from "@/database.types"
import { RealtimePostgresChangesPayload, User } from "@supabase/supabase-js"
type booking = Tables<'seat_reservations'>
export default function SeatSection({ showtimeId, selected_seat, setSelected_seat }: { showtimeId: number, selected_seat: string[], setSelected_seat: React.Dispatch<React.SetStateAction<string[]>> }) {
    const [allBookings, setAllBookings] = useState<booking[]>([])
    const [user, setUser] = useState<User | null>(null)

    const screenDetails = useSelector((state: RootState) => state.movieDetails.screenDetails)
    const currentPrice = useSelector((state: RootState) => state.movieDetails.selected_showtime.price)
    const isFetching = useRef(false)
    // 1. Initial Load: Auth + Data
    useEffect(() => {
        const supabase = createClient()

        const init = async () => {
            if (isFetching.current) return; // Exit if a request is already out
            try {

                const { data: { user } } = await supabase.auth.getUser()
                setUser(user)
                const { data: initialData, error } = await supabase
                    .from('seat_reservations')
                    .select('*')
                    .eq('showtime_id', showtimeId)

                if (error) return { error: error.message }

                console.log(initialData)
                if (Array.isArray(initialData)) {
                    setAllBookings(initialData)
                    const mySeats = initialData.filter(b => b.user_id === user?.id).map(b => b.seat_no)
                    setSelected_seat(mySeats)

                }
            }
            finally {
                isFetching.current = false;

            }
        }
        init()

        // 2. Realtime Listener
        const channel = supabase
            .channel(`table-db-changes-${showtimeId}`)
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'seat_reservations',
                filter: `showtime_id=eq.${showtimeId}`
            }, (payload: RealtimePostgresChangesPayload<booking>) => {
                if (payload.eventType === 'INSERT') {
                    setAllBookings((prev) => {
                        return [...prev, payload.new]
                    })
                } else if (payload.eventType === 'DELETE') {
                    setAllBookings(prev => prev.filter(b => b.id !== payload.old.id))
                }
            })
            .subscribe()

        return () => { supabase.removeChannel(channel) }
    }, [showtimeId])

    // Handle Click Logic
    const handleSeatClick = async (seatLabel: string) => {
        if (!user) return toast.error("Please login to book seats")

        const isMySeat = selected_seat.includes(seatLabel)

        if (isMySeat) {
            setSelected_seat(prev => prev.filter(b => b !== seatLabel))
            await deleteBooking(showtimeId, seatLabel)
        } else {
            if (selected_seat.length >= 10) { return toast.error("Max 10 seats allowed") }
            if (allBookings.map(b => b.seat_no).includes(seatLabel) || selected_seat.includes(seatLabel)) { return toast.error("Seat already selected") }
            console.log(allBookings)
            setSelected_seat(prev => {
                return [...prev, seatLabel]
            })
            await addBooking(showtimeId, seatLabel, currentPrice, 'hold')
        }
    }

    if (!screenDetails.screen_row) return <div className="text-center">Loading Grid...</div>

    // screenDetails.screen_column = screenDetails.screen_column ?? 0
    const rows = Array.from({ length: screenDetails.screen_row })
    const cols = Array.from({ length: screenDetails.screen_column ?? 0 })
    const middleGap = Math.floor(screenDetails?.screen_column  / 2)

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


                            const isTakenByOthers = booking && booking.user_id !== user?.id 
                            // const isTakenByme = booking && booking.user_id === user?.id
                            const isSelectedByMe = selected_seat.includes(seatLabel)
                            return (
                                <button
                                    key={seatLabel}
                                    disabled={isTakenByOthers}
                                    onClick={() => handleSeatClick(seatLabel)}
                                    className={`
                                        w-10 h-9 rounded-md text-xs font-medium transition-all
                                        ${colIndex + 1 === middleGap ? 'mr-24' : ''}
                                        ${isTakenByOthers
                                            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                            : isSelectedByMe
                                                ? 'bg-choosenBtnColor text-white shadow-lg scale-110'
                                                : 'border border-gray-300 hover:border-royal hover:text-royal'}
                                    `}
                                >
                                    {colIndex + 1}
                                </button>
                            )
                        })}
                    </div>
                )
            })}
        </div>
    )
}