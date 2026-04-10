// app/payment/cancel/page.tsx
'use client'
import { useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { resetSelection } from "@/lib/slice/movieSlice"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"

export default function CancelPage() {
    const dispatch = useDispatch()
    // const searchParams = useSearchParams()
    const [cancelling, setCancelling] = useState(true)

    useEffect(() => {
        dispatch(resetSelection())

        const cancelBooking = async () => {
            // ✅ Stripe redirects to cancel_url — expire the session manually
            // by calling your edge function or directly updating DB
            const supabase = createClient()
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) return setCancelling(false)

            // ✅ find the most recent pending booking and cancel it
            const { data: pendingBooking } = await supabase
                .from('bookings')
                .select('id, seats, showtime_id, payments(stripe_session_id)')
                .eq('user_id', session.user.id)
                .eq('booking_status', 'pending')
                .order('created_at', { ascending: false })
                .limit(1)
                .single()

            if (pendingBooking) {
                // cancel booking
                await supabase
                    .from('bookings')
                    .update({ booking_status: 'cancelled' })
                    .eq('id', pendingBooking.id)

                // delete held seats
                await supabase
                    .from('seat_reservations')
                    .delete()
                    .eq('showtime_id', pendingBooking.showtime_id)
                    .eq('user_id', session.user.id)
                    .in('seat_no', pendingBooking.seats)
                    .eq('reservation_status', 'hold')

                // cancel payment record
                const payment = (pendingBooking.payments as any)?.[0]
                if (payment?.stripe_session_id) {
                    await supabase
                        .from('payments')
                        .update({ payment_status: 'cancelled' })
                        .eq('stripe_session_id', payment.stripe_session_id)
                }
            }

            setCancelling(false)
        }

        cancelBooking()
    }, [])

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            {cancelling ? (
                <p className="text-gray-500">Releasing your seats...</p>
            ) : (
                <>
                    <h1 className="text-3xl font-bold text-red-500">Payment Cancelled</h1>
                    <p className="text-gray-500">Your seats have been released.</p>
                    <Link href="/" className="bg-royal text-white px-6 py-2 rounded-md">
                        Try Again
                    </Link>
                </>
            )}
        </div>
    )
}