// app/movie/[id]/bookings/confirm/page.tsx
'use client'
import { useSelector } from "react-redux"
import { RootState } from "@/lib/store"
import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { FaArrowLeft } from "react-icons/fa6"
import { createCheckoutSession } from "@/api/payments/payment"
import { fetchMovieById } from "@/api/Movies/movies"
import { useFetchMovieByIdQuery } from "@/lib/slice/movieSupabaseApi"

export default function ConfirmPaymentPage() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)
    const [showCancelModal, setShowCancelModal] = useState(false)

    // ✅ only use what exists in your slice
    const { selected_showtime, screenDetails, theaterDetails, selected_seats, Movie_date, movie_id } = useSelector(
        (state: RootState) => state.movieDetails
    )
    const { data } = useFetchMovieByIdQuery(movie_id)
    const serviceFee = 30 // adjust to your currency
    const totalAmount = selected_seats.length * (selected_showtime.price ?? 0)
    const grandTotal = totalAmount + serviceFee
    
    async function handlePayment() {
        try {
            setLoading(true)
            await createCheckoutSession({
                seats: selected_seats,
                showtime_id: selected_showtime.id,
                price_per_seat: selected_showtime.price ?? 0,
                movie_name: data?.name ?? '', // ✅ use what's available
                show_time: selected_showtime.show_time ?? ''
            })
        } catch (e) {
            toast.error('Payment failed. Try again.')
            setLoading(false)
        }
    }

    // guard — if no seats selected redirect back
    if (selected_seats.length === 0) {
        router.push('../bookings')
        return null
    }

    return (
        <div className="max-w-[1400px] mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-1">Confirm Payment</h1>
            <p className="text-gray-400 text-sm mb-6">
                Confirm payment details for your selected seats
            </p>

            <div className="flex flex-col md:flex-row gap-6">
                {/* LEFT — Schedule Details */}
                <div className="flex-1">
                    <h2 className="text-sm font-semibold text-gray-500 mb-4">Schedule Details</h2>
                    <div className="space-y-4 text-sm">

                        <div>
                            <p className="text-gray-400">Theater</p>
                            <p className="font-bold uppercase">{theaterDetails.name}</p>
                            <p className="text-gray-400 text-xs">{theaterDetails.complete_address}</p>
                        </div>

                        <div>
                            <p className="text-gray-400">Date</p>
                            <p className="font-semibold uppercase">{Movie_date}</p>
                        </div>

                        <div className="flex gap-10">
                            <div>
                                <p className="text-gray-400">Screen</p>
                                <p className="font-semibold">{screenDetails.name}</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Type</p>
                                <p className="font-semibold">{screenDetails.type ?? 'REGULAR 2D'}</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Time</p>
                                <p className="font-semibold">
                                    {selected_showtime.show_time?.replace(':00', '')}
                                </p>
                            </div>
                        </div>

                        <div>
                            <p className="text-gray-400">
                                Seats ({selected_seats.length})
                            </p>
                            <p className="font-semibold">{selected_seats.join(', ')}</p>
                        </div>

                        <div>
                            <p className="text-gray-400">Brand</p>
                            <div className="flex items-center gap-2">
                                {theaterDetails.brand_logo && (
                                    <img
                                        src={theaterDetails.brand_logo}
                                        alt={theaterDetails.brand_name ?? ''}
                                        className="w-8 h-8 object-contain"
                                    />
                                )}
                                <p className="font-semibold">{theaterDetails.brand_name}</p>
                            </div>
                        </div>
                    </div>

                    {/* Back button — triggers modal */}
                    <button
                        onClick={() => setShowCancelModal(true)}
                        className="flex items-center gap-2 mt-8 text-sm text-gray-500 hover:text-black"
                    >
                        <FaArrowLeft /> Back
                    </button>
                </div>

                {/* RIGHT — Order Summary */}
                <div className="w-full md:w-[340px] border rounded-lg p-5 space-y-4 h-fit">
                    <h2 className="font-bold text-base">Order Summary</h2>

                    {/* Transaction Detail */}
                    <div>
                        <p className="text-xs text-gray-400 mb-2">Transaction Details</p>
                        <div className="flex justify-between text-sm">
                            <span>{screenDetails.type ?? 'REGULAR'} SEAT</span>
                            <span className="flex items-center gap-2">
                                ₹{(selected_showtime.price ?? 0).toLocaleString()}
                                <span className="text-gray-400">X{selected_seats.length}</span>
                            </span>
                        </div>
                        <div className="flex justify-between text-sm mt-1 text-gray-500">
                            <span>Service Fee</span>
                            <span>₹{serviceFee.toLocaleString()}</span>
                        </div>
                    </div>

                    <hr />

                    {/* Total */}
                    <div className="flex justify-between font-bold text-sm">
                        <span>Total</span>
                        <span>₹{grandTotal.toLocaleString()}</span>
                    </div>

                    <hr />

                    {/* Pay Button */}
                    <button
                        onClick={handlePayment}
                        disabled={loading || selected_seats.length === 0}
                        className="w-full bg-royal text-white py-3 rounded-md font-semibold disabled:opacity-50 hover:opacity-90 transition"
                    >
                        {loading ? 'Redirecting...' : `Pay ₹${grandTotal.toLocaleString()}`}
                    </button>
                </div>
            </div>

            {/* Cancel Modal */}
            {showCancelModal && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-80 shadow-xl">
                        <div className="flex justify-between items-center mb-2">
                            <h3 className="font-bold">Go Back?</h3>
                            <button onClick={() => setShowCancelModal(false)}>✕</button>
                        </div>
                        <p className="text-sm text-gray-500 mb-6">
                            Your selected seats will be released and you will need to select again.
                        </p>
                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setShowCancelModal(false)}
                                className="border px-4 py-2 rounded text-sm"
                            >
                                Stay
                            </button>
                            <button
                                onClick={() => router.back()}
                                className="bg-royal text-white px-4 py-2 rounded text-sm"
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}