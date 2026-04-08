
// 'use client'
// import { useEffect, useRef, useState } from "react"
// import { createClient } from "@/lib/supabase/client"
// import { addBooking, deleteBooking } from "@/api/booking/bookingsApi"
// import { useSelector } from "react-redux"
// import { RootState } from "@/lib/store"
// import toast from "react-hot-toast"
// import { Tables } from "@/database.types"
// import { RealtimePostgresChangesPayload, User } from "@supabase/supabase-js"

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
//                 console.log("Initial bookings:", initialData)
//                 if (error) {
//                     toast.error(error.message)
//                     return
//                 }

//                 if (Array.isArray(initialData)) {
//                     setAllBookings(initialData)
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
//         // --- DESELECT: remove seat ---
//         if (isMySeat) {
//             // Optimistically update UI first
//             setSelected_seat(prev => prev.filter(b => b !== seatLabel))
//             try {
//                 await deleteBooking(showtimeId, seatLabel)
//             } catch (err) {
//                 // Revert UI if DB call fails
//                 setSelected_seat(prev => [...prev, seatLabel])
//                 toast.error("Failed to deselect seat. Please try again.")
//             }
//             return
//         }

//         // --- MAX 10 SEATS: swap oldest ---
//         if (selected_seat.length >= 10) {
//             const removedSeat = selected_seat[0]
//             // Optimistically update UI
//             setSelected_seat(prev => [...prev.slice(1), seatLabel])
//             try {
//                 toast.error("Max 10 seats allowed. Oldest selection removed.")
//                 await addBooking(showtimeId, seatLabel, currentPrice, 'hold')
//                 await deleteBooking(showtimeId, removedSeat)
//             } catch (err) {
//                 setSelected_seat(prev => {
//                     const reverted = prev.filter(s => s !== seatLabel)
//                     return [removedSeat, ...reverted]
//                 })
//                 toast.error("Failed to update seat selection. Please try again.")
//             }
//             return
//         }

//         // --- GUARD: seat already taken ---
//         const alreadyBooked = allBookings.find(b => b.seat_no === seatLabel)
//         if (alreadyBooked) return toast.error("Seat already taken")

//         // --- NORMAL ADD ---
//         // Optimistically update UI first
//         setSelected_seat(prev => [...prev, seatLabel])
//         try {
//             await addBooking(showtimeId, seatLabel, currentPrice, 'hold')
//         } catch (err) {
//             // Revert UI if DB call fails
//             setSelected_seat(prev => prev.filter(s => s !== seatLabel))
//             toast.error("Failed to book seat. Please try again.")
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
//                                             // FIX: distinct style — green tick to indicate user's own purchase
//                                             ? 'bg-green-500 text-white cursor-not-allowed ring-2 ring-green-300'
//                                             : isPaidByOthers
//                                                 // Taken by others — red/royal
//                                                 ? 'bg-royal text-white cursor-not-allowed opacity-60'
//                                                 : isHeldByOthers
//                                                     ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                                                     : isSelectedByMe
//                                                         ? 'bg-choosenBtnColor text-white shadow-lg scale-110'
//                                                         : 'border-2 border-gray-400 hover:border-royal hover:text-royal'
//                                         }
//                                     `}
//                                 >
//                                     {/* Show ✓ for seats user has already paid for */}
//                                     {isPaidByMe ? '✓' : colIndex + 1}
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
import { useEffect, useRef, useState, useCallback } from "react"
import { createClient } from "@/lib/supabase/client"
import { syncSeats } from "@/api/booking/bookingsApi"
import { useSelector } from "react-redux"
import { RootState } from "@/lib/store"
import toast from "react-hot-toast"
import { Tables } from "@/database.types"
import { RealtimePostgresChangesPayload, User } from "@supabase/supabase-js"
import { usePathname, useRouter } from "next/navigation"

type Booking = Tables<'seat_reservations'>

// ─────────────────────────────────────────────────────────────────────────────
// computeDiff
//
// Given what's confirmed in DB (synced) and what the user wants (desired),
// returns the minimal set of changes needed:
//
//   synced  = [A1, A2]           ← confirmed in DB
//   desired = [A2, A3, A4]       ← user wants this
//   toAdd   = [A3, A4]           ← INSERT these
//   toDelete= [A1]               ← DELETE these
//
// Key benefit: if user toggles A1 on → off → on within the debounce window:
//   toAdd=[A1], toDelete=[] → 0 net change if A1 was already in synced
//   This means rapid clicking = zero wasted requests
// ─────────────────────────────────────────────────────────────────────────────
function computeDiff(synced: string[], desired: string[]) {
    const syncedSet = new Set(synced)
    const desiredSet = new Set(desired)
    return {
        toAdd: (desired ?? []).filter(s => !syncedSet.has(s)),
        toDelete: (synced ?? []).filter(s => !desiredSet.has(s)),
    }
}

export default function SeatSection({
    showtimeId,
    selected_seat,
    setSelected_seat,
    onCheckAvailability,
}: {
    showtimeId: number
    selected_seat: string[]
    setSelected_seat: React.Dispatch<React.SetStateAction<string[]>>
    onCheckAvailability?: (checker: (seats: string[]) => Promise<boolean>) => void
}) {
    const [allBookings, setAllBookings] = useState<Booking[]>([])
    const [user, setUser] = useState<User | null>(null)
    const [isSyncing, setIsSyncing] = useState(false)
    const router = useRouter()
    const screenDetails = useSelector((state: RootState) => state.movieDetails.screenDetails)
    const currentPrice = useSelector((state: RootState) => state.movieDetails.selected_showtime.price)
    const movieid = useSelector((state:RootState)=>state.movieDetails.movie_id)
    const pathName = usePathname()
    // ─────────────────────────────────────────────────────────────────────────
    // Two refs — the engine of the sync system
    //
    // lastSynced:
    //   Seats confirmed written to DB. Updated only after a successful RPC.
    //   Used as the rollback point if the RPC fails.
    //   Used as the baseline for computeDiff.
    //
    // pendingDesired:
    //   The seat list the user WANTS right now. Mirrors selected_seat via
    //   useEffect. Always has the latest value, even inside async closures
    //   (which is why it's a ref and not read from state directly).
    //
    // debounceTimer:
    //   Reset on every click. flushNow only fires after 600ms of silence.
    // ─────────────────────────────────────────────────────────────────────────
    const lastSynced = useRef<string[]>([])
    const pendingDesired = useRef<string[]>([])
    const debounceTimer = useRef<NodeJS.Timeout | null>(null)
    const isFetching = useRef(false)

    // Keep pendingDesired fresh on every UI change
    useEffect(() => {
        pendingDesired.current = selected_seat
    }, [selected_seat])

    // ─────────────────────────────────────────────────────────────────────────
    // STEP 1 — Initial fetch + realtime subscription
    //
    // Fetch all bookings for this showtime on mount.
    // Restore any seats this user already has on hold (page refresh case).
    // Seed lastSynced from DB so first diff is accurate.
    //
    // Realtime channel keeps allBookings up to date with other users'
    // activity without any polling.
    // ─────────────────────────────────────────────────────────────────────────
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

                if (error) { toast.error(error.message); return }

                if (Array.isArray(initialData)) {
                    setAllBookings(initialData)

                    const myHeldSeats = initialData
                        .filter(b => b.user_id === user?.id && b.reservation_status === 'hold')
                        .map(b => b.seat_no)

                    // Seed both refs so first diff computes against real DB state
                    lastSynced.current = myHeldSeats
                    pendingDesired.current = myHeldSeats
                    setSelected_seat(myHeldSeats)
                }
            } finally {
                isFetching.current = false
            }
        }
        init()

        const channel = supabase
            .channel(`seat-changes-${showtimeId}`)
            .on('postgres_changes', {
                event: '*',
                schema: 'public',
                table: 'seat_reservations',
                filter: `showtime_id=eq.${showtimeId}`
            }, (payload: RealtimePostgresChangesPayload<Booking>) => {
                if (payload.eventType === 'INSERT') {
                    setAllBookings(prev => [...prev, payload.new])
                } else if (payload.eventType === 'DELETE') {
                    setAllBookings(prev => prev.filter(b => b.id !== payload.old.id))
                } else if (payload.eventType === 'UPDATE') {
                    setAllBookings(prev => prev.map(b => b.id === payload.new.id ? payload.new : b))
                }
            })
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
            if (debounceTimer.current) clearTimeout(debounceTimer.current)
        }
    }, [showtimeId])

    // ─────────────────────────────────────────────────────────────────────────
    // STEP 2 — flushNow  (the actual DB write via RPC)
    //
    // This is called either by:
    //   a) scheduleFlush when the debounce timer expires
    //   b) checkSeatsAvailability when user hits confirm (force-fire)
    //
    // Flow:
    //   1. Diff pendingDesired vs lastSynced → toAdd[], toDelete[]
    //   2. If net zero (user toggled same seat back) → skip, 0 requests
    //   3. Call syncSeats RPC → 1 HTTP request → atomic transaction in DB:
    //        - conflict check (seat taken by others?)
    //        - DELETE toDelete
    //        - INSERT toAdd
    //   4. Success → advance lastSynced to pendingDesired
    //   5. Conflict → toast the specific seat, rollback UI to lastSynced
    //   6. Other error → toast generic message, rollback UI
    // ─────────────────────────────────────────────────────────────────────────
    const flushNow = useCallback(async (): Promise<boolean> => {
        const desired = pendingDesired.current
        const synced = lastSynced.current
        const { toAdd, toDelete } = computeDiff(synced, desired)

        // Net zero — user toggled seats back to exactly the synced state
        if (toAdd.length === 0 && toDelete.length === 0) return true

        setIsSyncing(true)
        try {
            const result = await syncSeats({
                showtime_id: showtimeId,
                seats_to_add: toAdd,
                seats_to_del: toDelete,
                price: currentPrice,
            })

            if (!result.success) {
                // Rollback UI to last confirmed DB state
                const rollback = lastSynced.current.slice(-10)
                pendingDesired.current = rollback
                setSelected_seat(rollback)

                if (result.error === 'SEAT_CONFLICT') {
                    toast.error(`Seat ${result.seat} was just taken by someone else. Please choose another.`)
                } else {
                    toast.error("Seat update failed. Your selection has been reset.")
                }
                return false
            }

            // Advance baseline to what DB now reflects
            // Use held_seats returned by RPC as ground truth (handles edge cases)
            const confirmedSeats = result.held_seats
            lastSynced.current = confirmedSeats

            // If DB returned something different from what we expected
            // (e.g. a seat expired mid-flight), sync UI to reality
            // if (JSON.stringify(confirmedSeats.sort()) !== JSON.stringify([...desired].sort())) {
            //     pendingDesired.current = confirmedSeats
            //     setSelected_seat(confirmedSeats)
            //     toast.error("Some seats could not be held. Your selection has been adjusted.")
            // }
            if (JSON.stringify(confirmedSeats.slice().sort()) !== JSON.stringify(desired.slice().sort())) {
                pendingDesired.current = confirmedSeats
                setSelected_seat(confirmedSeats)
                toast.error("Some seats could not be held. Your selection has been adjusted.")
            }

            return true
        } catch (err) {

            const rollback = lastSynced.current.slice(-10)  // ✅ same here
            pendingDesired.current = rollback
            setSelected_seat(rollback)
            toast.error("Network error. Your selection has been reset.")
            return false
        } finally {
            setIsSyncing(false)
        }
    }, [showtimeId, currentPrice])

    // ─────────────────────────────────────────────────────────────────────────
    // STEP 3 — scheduleFlush  (debounce wrapper around flushNow)
    //
    // Every click resets this 600ms countdown.
    // The RPC only fires after 600ms of no clicks.
    //
    // Example:
    //   User clicks 6 seats rapidly over 300ms
    //   → timer resets 6 times
    //   → 600ms silence → flushNow fires → 1 RPC with all 6 seats
    //   → 1 request total (was 6 before)
    // ─────────────────────────────────────────────────────────────────────────
    const scheduleFlush = useCallback(() => {
        if (debounceTimer.current) clearTimeout(debounceTimer.current)
        debounceTimer.current = setTimeout(flushNow, 1000)
    }, [flushNow])

    // ─────────────────────────────────────────────────────────────────────────
    // STEP 4 — handleSeatClick  (instant UI update, deferred DB)
    //
    // UI responds immediately — no waiting for DB at all.
    // DB write is batched and deferred to the debounce window.
    //
    // Guards:
    //   - Must be logged in
    //   - Cannot select seats held/paid by others (blocked in UI + DB)
    //   - Max 10 seats: FIFO swap (drop oldest, add new)
    // ─────────────────────────────────────────────────────────────────────────
    const handleSeatClick = useCallback((seatLabel: string) => {
        if (!user){
            router.push(`/login?redirect=${pathName}`)
            return toast.error("Please login to book seats")
        }

        const booking = allBookings.find(b => b.seat_no === seatLabel)
        const blockedByOther =
            (booking?.reservation_status === 'paid' && booking.user_id !== user.id) ||
            (booking?.reservation_status === 'hold' && booking.user_id !== user.id)

        if (blockedByOther) return toast.error("This seat is already taken")

        // Instant UI — DB write comes after debounce
        setSelected_seat(prev => {
            if (prev.includes(seatLabel)) {
                return prev.filter(s => s !== seatLabel)        // deselect
            }
            if (prev.length >= 10) {
                const next = [...prev.slice(-(10 - 1)), seatLabel]         // FIFO swap
                pendingDesired.current = next
                scheduleFlush()
                return next
            }
            const next = [...prev, seatLabel]
            pendingDesired.current = next       // ✅ keep ref in sync immediately
            scheduleFlush()
            return next                      // normal add
        })

        scheduleFlush()
    }, [user, allBookings, scheduleFlush])

    // ─────────────────────────────────────────────────────────────────────────
    // STEP 5 — checkSeatsAvailability  (called by PricingSection on confirm)
    //
    // Before going to payment we need to:
    //   1. Force-flush any pending debounce — can't proceed with unsynced state
    //   2. Do a fresh DB read to catch race conditions:
    //      Someone else may have grabbed a seat between our hold and confirm
    //
    // Returns true  → safe to proceed to payment
    // Returns false → toast already shown, user stays on seat selection
    //
    // Registered with parent via onCheckAvailability prop so BookingPage
    // can hand it to PricingSection without prop drilling through SeatSection.
    // ─────────────────────────────────────────────────────────────────────────
    const checkSeatsAvailability = useCallback(async (seatsToCheck: string[]): Promise<boolean> => {
        if (seatsToCheck.length === 0) return true

        // Force-fire any pending debounce immediately
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current)
            debounceTimer.current = null
            const flushed = await flushNow()
            if (!flushed) return false  // already rolled back + toasted
        }

        // Fresh DB read — verify our holds are still ours
        const supabase = createClient()
        try {
            const { data: bookings, error } = await supabase
                .from('seat_reservations')
                .select('seat_no, reservation_status, user_id')
                .eq('showtime_id', showtimeId)
                .in('seat_no', seatsToCheck)

            if (error) throw error

            const unavailable = (bookings ?? []).filter(b =>
                b.reservation_status === 'paid' ||
                (b.reservation_status === 'hold' && b.user_id !== user?.id)
            )

            if (unavailable.length > 0) {
                const nums = unavailable.map(s => s.seat_no).join(', ')
                toast.error(`Seat(s) ${nums} are no longer available. Please select again.`)
                return false
            }
            return true
        } catch {
            toast.error("Failed to verify seat availability. Please try again.")
            return false
        }
    }, [showtimeId, user?.id, flushNow])

    // Register checker with BookingPage once it's stable
    useEffect(() => {
        onCheckAvailability?.(checkSeatsAvailability)
    }, [checkSeatsAvailability, onCheckAvailability])

    // ─────────────────────────────────────────────────────────────────────────
    // RENDER
    // ─────────────────────────────────────────────────────────────────────────
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
                                            ? 'bg-green-500 text-white cursor-not-allowed ring-2 ring-green-300'
                                            : isPaidByOthers
                                                ? 'bg-royal text-white cursor-not-allowed opacity-60'
                                                : isHeldByOthers
                                                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                                    : isSelectedByMe
                                                        ? 'bg-choosenBtnColor text-white shadow-lg scale-110'
                                                        : 'border-2 border-gray-400 hover:border-royal hover:text-royal'
                                        }
                                    `}
                                >
                                    {isPaidByMe ? '✓' : colIndex + 1}
                                </button>
                            )
                        })}
                    </div>
                )
            })}
            <div className="h-3">

                {isSyncing && (
                    <p className="text-xs text-gray-400 animate-pulse mb-1">Saving selection…</p>
                )}
            </div>
        </div>
    )
}