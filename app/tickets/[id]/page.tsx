'use client'
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { FaArrowLeft, FaDownload } from "react-icons/fa6"

type BookingDetail = {
    id: string
    seats: string[]
    total_amount: number
    booking_status: string
    created_at: string
    discount_code: string | null      // ✅ new
    discount_amount: number | null
    showtimes: {
        show_time: string | null
        date: string | null
        price: number | null
        movies: { name: string; movie_img: string | null }
        screen: { name: string; type: string | null }
        theater: { name: string; complete_address: string | null }
    }
    payments: {
        stripe_session_id: string
        amount: number
        payment_status: string
        payment_method: string
    }[]
}

const serviceFee = 30

export default function TransactionDetailPage() {
    const params = useParams()
    const router = useRouter()
    const [booking, setBooking] = useState<BookingDetail | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const supabase = createClient()
        const init = async () => {
            const { data, error } = await supabase
                .from('bookings')
                .select(`
                    id,
                    seats,
                    total_amount,
                    booking_status,
                    created_at,
                    discount_code,     // ✅ new
                    discount_amount,
                    showtimes (
                        show_time,
                        date,
                        price,
                        movies ( name, movie_img ),
                        screen ( name, type ),
                        theater ( name, complete_address )
                    ),
                    payments (
                        stripe_session_id,
                        amount,
                        payment_status,
                        payment_method
                    )
                `)
                .eq('id', params.id)
                .single()

            if (!error && data) setBooking(data as unknown as BookingDetail)
            setLoading(false)
        }
        init()
    }, [params.id])

    if (loading) return <div className="flex justify-center items-center h-screen">Loading...</div>
    if (!booking) return <div className="flex justify-center items-center h-screen">Booking not found</div>

    const payment = booking.payments?.[0]
    const seatCount = booking.seats?.length ?? 0
    const seatTotal = (booking.showtimes?.price ?? 0) * seatCount

    return (
        <div className="max-w-2xl mx-auto px-4 py-6">
            <button
                onClick={() => router.back()}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-6"
            >
                <FaArrowLeft /> Back
            </button>

            <h1 className="text-2xl font-bold mb-6 text-center">Transaction Details</h1>

            {/* Ticket Card */}
            <div className="bg-royal rounded-t-xl pt-5 text-white mb-6 relative overflow-hidden">
                <div className="p-6">
                    <h2 className=" text-lg md:text-xl text-pastelYellow font-bold mb-4">
                        {booking.showtimes?.movies?.name}
                    </h2>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                            <p className="text-white/60 text-xs">Location</p>
                            <p className="font-medium">{booking.showtimes?.theater?.name}</p>
                        </div>
                        <div>
                            <p className="text-white/60 text-xs">Screen</p>
                            <p className="font-medium">{booking.showtimes?.screen?.type ?? 'Regular 2D'}</p>
                        </div>
                        <div>
                            <p className="text-white/60 text-xs">Date</p>
                            <p className="font-medium">{booking.showtimes?.date}</p>
                        </div>
                        <div>
                            <p className="text-white/60 text-xs">Showtime</p>
                            <p className="font-medium">{booking.showtimes?.show_time?.replace(':00', '')}</p>
                        </div>
                        <div>
                            <p className="text-white/60 text-xs">Screen Type</p>
                            <p className="font-medium">{booking.showtimes?.screen?.name}</p>
                        </div>
                    </div>
                </div>

                {/* Dashed divider */}
                <div className="border-t border-dashed border-white/30 my-4" />

                {/* Booking Code */}
                <div className="bg-[#F2C46F] text-black  p-3 ">
                    <div className="p-6 flex justify-between items-center">
                        <div>
                            <div className="flex gap-2  items-center">
                                <p className="text-xs text-black/60">Booking Code :</p>
                                <p className="font-bold text-sm">{booking.id.slice(0, 8).toUpperCase()}</p>
                            </div>
                            <div className="flex gap-2  items-center">
                                <p className="text-xs text-black/60 mt-1">Password Key :</p>
                                <p className="font-bold text-sm">{payment?.stripe_session_id?.slice(-6).toUpperCase() ?? '------'}</p>
                            </div>
                            <div className="flex gap-2  items-center">
                                <p className="text-xs text-black/60 mt-1">Seat No. :</p>
                                <p className="font-bold text-sm">{booking.seats?.join(', ')}</p>
                            </div>
                        </div>
                        <button className="bg-black/10 hover:bg-black/20 p-3 rounded-full transition">
                            <FaDownload className="text-black" />
                        </button>
                    </div>
                </div>
                <div className="flex bg-[#F2C46F] justify-around md:px-2">
                    {Array.from({ length: 16 }).map((_, idx) => (
                        <div
                            key={idx}
                            className="w-[4%] h-3 md:h-4 bg-white rounded-t-3xl"
                        ></div>
                    ))}
                </div>
            </div>

            {/* Purchase Details */}
            <div className="border rounded-lg p-5 space-y-3">
                <h3 className="font-bold text-base">Purchase Details</h3>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">
                        {booking.showtimes?.screen?.type ?? 'Regular'} x{seatCount}
                    </span>
                    <span>₹{seatTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Searvice tax</span>
                    <span>₹{serviceFee.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Discount</span>
                    <span>₹{booking.discount_amount?.toLocaleString() ?? '0'}</span>
                </div>
                <hr />
                <div className="flex justify-between font-bold text-sm">
                    <span>Total Amount</span>
                    <span>₹{booking.total_amount?.toLocaleString()}</span>
                </div>
            </div>
        </div>
    )
}