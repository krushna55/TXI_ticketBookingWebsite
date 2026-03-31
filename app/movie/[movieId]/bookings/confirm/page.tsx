'use client'
import { useSelector, useDispatch } from "react-redux"
import { RootState } from "@/lib/store"
import { useState } from "react"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { FaArrowLeft, FaTag } from "react-icons/fa6"
import { createCheckoutSession } from "@/api/payments/payment"
import { useFetchMovieByIdQuery } from "@/lib/slice/movieSupabaseApi"
import { resetSelection } from "@/lib/slice/movieSlice"
import { createClient } from "@/lib/supabase/client"

type Discount = {
    id: number
    code: string
    discount_pct: number | null
    min_amount: number | null
    min_valid_amount: number | null
    name: string | null
}

export default function ConfirmPaymentPage() {
    const router = useRouter()
    const dispatch = useDispatch()
    const [loading, setLoading] = useState(false)
    const [showCancelModal, setShowCancelModal] = useState(false)
    const [couponCode, setCouponCode] = useState('')
    const [couponLoading, setCouponLoading] = useState(false)
    const [appliedDiscount, setAppliedDiscount] = useState<Discount | null>(null)
    const [couponError, setCouponError] = useState('')

    const { selected_showtime, screenDetails, theaterDetails, selected_seats, Movie_date, movie_id } = useSelector(
        (state: RootState) => state.movieDetails
    )
    const { data } = useFetchMovieByIdQuery(movie_id)

    const serviceFee = 30
    const totalAmount = selected_seats.length * (selected_showtime.price ?? 0)
    const discountAmount = appliedDiscount
        ? Math.floor(totalAmount * (appliedDiscount.discount_pct ?? 0) / 100)
        : 0
    const grandTotal = totalAmount + serviceFee - discountAmount

    async function handleApplyCoupon() {
        if (!couponCode.trim()) return
        setCouponLoading(true)
        setCouponError('')
        setAppliedDiscount(null)

        const supabase = createClient()
        const { data: discount, error } = await supabase
            .from('discounts')
            .select('*')
            .eq('code', couponCode.trim().toUpperCase())
            .single()

        if (error || !discount) {
            setCouponError('Invalid coupon code')
            setCouponLoading(false)
            return
        }

        if (discount.min_amount && totalAmount < discount.min_amount) {
            setCouponError(`Minimum order of ₹${discount.min_amount} required`)
            setCouponLoading(false)
            return
        }

        setAppliedDiscount(discount)
        toast.success(`${discount.name ?? discount.code} applied! ${discount.discount_pct}% off`)
        setCouponLoading(false)
    }

    function handleRemoveCoupon() {
        setAppliedDiscount(null)
        setCouponCode('')
        setCouponError('')
    }

    async function handlePayment() {
        try {
            setLoading(true)
            await createCheckoutSession({
                seats: selected_seats,
                showtime_id: selected_showtime.id,
                price_per_seat: selected_showtime.price ?? 0,
                movie_name: data?.name ?? '',
                show_time: selected_showtime.show_time ?? '',
                discount_code: appliedDiscount?.code ?? null,
                discount_pct: appliedDiscount?.discount_pct ?? null,
                discount_amount: discountAmount
            })
            dispatch(resetSelection())
        } catch (e) {
            toast.error('Payment failed. Try again.')
            setLoading(false)
        }
    }

    function handleGoBack() {
        dispatch(resetSelection())
        // router.back()
    }

    if (selected_seats.length === 0) {
        router.push('../bookings')
        return null
    }

    return (
        <div className="max-w-[1400px] mx-auto px-4 py-6">
            <h1 className="text-2xl font-bold mb-1">Confirm Payment</h1>
            <p className="text-gray-400 text-sm mb-6">Confirm payment details for your selected seats</p>

            <div className="flex flex-col md:flex-row gap-6">
                {/* LEFT */}
                <div className="md:min-w-96">
                    <h2 className="text-sm font-semibold text-gray-500 mb-4">Schedule Details</h2>
                    <div className="space-y-4 text-sm">
                        <div>
                            <p className="text-gray-400">Movie</p>
                            <p className="font-bold uppercase">{data?.name}</p>
                        </div>
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
                                <p className="font-semibold">{selected_showtime.show_time?.replace(':00', '')}</p>
                            </div>
                        </div>
                        <div>
                            <p className="text-gray-400">Seats ({selected_seats.length})</p>
                            <p className="font-semibold">{selected_seats.join(', ')}</p>
                        </div>
                        <div>
                            <p className="text-gray-400">Brand</p>
                            <div className="flex items-center gap-2">
                                {theaterDetails.brand_logo && (
                                    <img src={theaterDetails.brand_logo} alt={theaterDetails.brand_name ?? ''} className="w-8 h-8 object-contain" />
                                )}
                                <p className="font-semibold">{theaterDetails.brand_name}</p>
                            </div>
                        </div>
                    </div>
                    <button onClick={() => setShowCancelModal(true)} className="flex items-center gap-2 mt-8 text-sm text-gray-500 hover:text-black">
                        <FaArrowLeft /> Back
                    </button>
                </div>

                {/* RIGHT */}
                <div className="w-full md:w-[340px] border rounded-lg p-5 space-y-4 h-fit">
                    <h2 className="font-bold text-base">Order Summary</h2>
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

                    {/* Coupon */}
                    <div>
                        <p className="text-xs text-gray-400 mb-2">Promo & Voucher</p>
                        {!appliedDiscount ? (
                            <div className="flex gap-2">
                                <div className="flex-1 relative">
                                    <FaTag className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs" />
                                    <input
                                        type="text"
                                        value={couponCode}
                                        onChange={(e) => { setCouponCode(e.target.value.toUpperCase()); setCouponError('') }}
                                        onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                                        placeholder="Enter coupon code"
                                        className="w-full bg-white border rounded-md pl-8 pr-3 py-2 text-sm focus:outline-none focus:border-royal"
                                    />
                                </div>
                                <button
                                    onClick={handleApplyCoupon}
                                    disabled={couponLoading || !couponCode.trim()}
                                    className="bg-royal text-white px-3 py-2 rounded-md text-sm disabled:opacity-50"
                                >
                                    {couponLoading ? '...' : 'Apply'}
                                </button>
                            </div>
                        ) : (
                            <div className="flex justify-between items-center bg-green-50 border border-green-200 rounded-md px-3 py-2">
                                <div>
                                    <p className="text-xs font-semibold text-green-700">{appliedDiscount.code}</p>
                                    <p className="text-xs text-green-600">{appliedDiscount.discount_pct}% off applied</p>
                                </div>
                                <button onClick={handleRemoveCoupon} className="text-red-400 text-xs hover:text-red-600">Remove</button>
                            </div>
                        )}
                        {couponError && <p className="text-red-500 text-xs mt-1">{couponError}</p>}
                        {appliedDiscount && (
                            <div className="flex justify-between text-sm text-red-500 mt-2">
                                <span>{appliedDiscount.name ?? appliedDiscount.code}</span>
                                <span>- ₹{discountAmount.toLocaleString()}</span>
                            </div>
                        )}
                    </div>

                    <hr />

                    <div className="flex justify-between font-bold text-sm">
                        <span>Total</span>
                        <span>₹{grandTotal.toLocaleString()}</span>
                    </div>

                    <hr />

                    <button
                        onClick={handlePayment}
                        disabled={loading || selected_seats.length === 0}
                        className="w-full bg-royal text-white py-3 rounded-md font-semibold disabled:opacity-50 hover:opacity-90 transition"
                    >
                        {loading ? 'Redirecting...' : `Pay ₹${grandTotal.toLocaleString()}`}
                    </button>
                </div>
            </div>

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
                            <button onClick={() => setShowCancelModal(false)} className="border px-4 py-2 rounded text-sm">Stay</button>
                            <button onClick={handleGoBack} className="bg-royal text-white px-4 py-2 rounded text-sm">Go Back</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}