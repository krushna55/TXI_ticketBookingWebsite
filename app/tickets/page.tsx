'use client'
import { createClient } from "@/lib/supabase/client"
import { useEffect, useState } from "react"
import { User } from "@supabase/supabase-js"
import Link from "next/link"
import Image from "next/image"
import { MdConfirmationNumber } from "react-icons/md"
import { FaListUl } from "react-icons/fa6"
import Skelaton from "@/components/skelaton"
import Typography from "@/components/Typography"

type BookingWithDetails = {
    id: string
    seats: string[]
    total_amount: number
    booking_status: string
    created_at: string
    showtimes: {
        show_time: string | null
        date: string | null
        price: number | null
        movies: {
            name: string
            movie_img: string | null
        }
        screen: {
            name: string
            type: string | null
        }
        theater: {
            name: string
            complete_address: string | null
        }
    }
}

export default function TicketsPage() {
    const [user, setUser] = useState<User | null>(null)
    const [bookings, setBookings] = useState<BookingWithDetails[]>([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState<'active' | 'transactions'>('active')

    useEffect(() => {
        const supabase = createClient()
        const init = async () => {
            const { data: { user } } = await supabase.auth.getUser()
            setUser(user)
            if (!user) return setLoading(false)

            const { data, error } = await supabase
                .from('bookings')
                .select(`
                    id,
                    seats,
                    total_amount,
                    booking_status,
                    created_at,
                    showtimes (
                        show_time,
                        date ,
                        price,
                        movies ( name, movie_img ),
                        screen ( name, type ),
                        theater ( name, complete_address )
                    )
                `)
                .eq('user_id', user.id)
                .order('created_at', { ascending: false })
            console.log(data, error)
            if (!error && data) setBookings(data as unknown as BookingWithDetails[])
            setLoading(false)
        }
        init()
    }, [])

    const activeBookings = bookings.filter(b => b.booking_status === 'paid')
    const allTransactions = bookings

    const displayBookings = activeTab === 'active' ? activeBookings : allTransactions

    function statusBadge(status: string) {
        switch (status) {
            case 'paid': return <span className="bg-choosenBtnColor text-white text-sm sm:text-base md:text-md  px-4 py-2 rounded-md font-medium">Succeed</span>
            case 'pending': return <span className="bg-yellow-100 text-yellow-700 text-sm sm:text-base md:text-md  px-4 py-2 rounded-md font-medium">Pending</span>
            case 'cancelled': return <span className="bg-red-500 text-white text-sm sm:text-base md:text-md  px-4 py-2 rounded-md font-medium">Cancelled</span>
            default: return null
        }
    }

    if (!user) return <div className="flex justify-center items-center h-screen">Please login to view tickets</div>

    return (
        <div className="max-w-[1400px] mx-auto px-4 py-6 flex gap-6">
            {/* LEFT SIDEBAR */}
            <div className="hidden md:flex flex-col gap-2 w-48 pt-2">
                <button
                    onClick={() => setActiveTab('active')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition
                        ${activeTab === 'active' ? 'bg-royal text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                    <MdConfirmationNumber />
                    Active Ticket
                </button>
                <button
                    onClick={() => setActiveTab('transactions')}
                    className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition
                        ${activeTab === 'transactions' ? 'bg-royal text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                    <FaListUl />
                    TRANSACTION LIST
                </button>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1">
                <Typography  size="header-small" className=" mb-1">My Ticket</Typography>
                <Typography size="body-small" color="font_shade_600" className=" mb-4">
                    List of tickets and transactions you have made
                </Typography>

                {/* MOBILE TABS */}
                <div className="flex gap-2 mb-4 md:hidden">
                    <button
                        onClick={() => setActiveTab('active')}
                        className={`px-4 py-2 rounded-full text-sm font-medium
                            ${activeTab === 'active' ? 'bg-royal text-white' : 'border border-gray-300'}`}
                    >
                        ACTIVE TICKET
                    </button>
                    <button
                        onClick={() => setActiveTab('transactions')}
                        className={`px-4 py-2 rounded-full text-sm font-medium
                            ${activeTab === 'transactions' ? 'bg-royal text-white' : 'border border-gray-300'}`}
                    >
                        Transaction
                    </button>
                </div>

                {/* BOOKING LIST */}
                {loading ? (
                    <div className="text-center text-gray-400 mt-20">
                        <Skelaton height="200px" className="w-full" />
                        <Skelaton height="200px" className="w-full" />
                    </div>
                )
                    :
                    displayBookings.length === 0 ? (
                        <div className="text-center text-gray-400 mt-20">
                            <Skelaton height="200px" className="w-full" />
                            <Skelaton height="200px" className="w-full" />
                        </div>
                    ) : (
                        <div className="md:space-y-4 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-1">
                            {displayBookings.map((booking) => (
                                <Link
                                    key={booking.id}
                                    href={booking.booking_status === 'paid' ? `/tickets/${booking.id}` : '#'}
                                    className="mx-auto w-full sm:w-full md:mx-0 flex flex-col md:flex md:flex-row gap-4 border rounded-lg p-2 sm:p-4 hover:shadow-md transition cursor-pointer"
                                >
                                    {/* Movie Image */}
                                    <div className="relative rounded-md overflow-hidden flex-shrink-0 mx-auto sm:bg-gray-100">
                                        {booking.showtimes?.movies?.movie_img ? (
                                            <Image
                                                src={booking.showtimes.movies.movie_img}
                                                alt={booking.showtimes.movies.name}
                                                height={200}
                                                width={200}
                                                className="object-cover h-30 aspect-[9/16]"
                                            />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs text-gray-400">
                                                No Image
                                            </div>
                                        )}
                                    </div>

                                    {/* Details */}
                                    <div className="md:flex md:justify-center md:flex-col  flex-1 min-w-0 w-full md:max-w-full">
                                        <div className="flex w-full justify-between items-start gap-2">
                                            <div className="w-1/2">
                                                <Typography size="header-small" className="truncate">
                                                    {booking.showtimes?.movies?.name}
                                                </Typography>
                                            </div>
                                            <div>
                                                {statusBadge(booking.booking_status)}
                                            </div>
                                        </div>
                                        <p className="text-sm sm:text-base md:text-md text-font_shade_700 mt-1">
                                            {booking.showtimes?.date?.split('T')[0]} • {booking.showtimes?.show_time?.replace(':00', '')}
                                        </p>
                                        <p className="text-sm sm:text-base md:text-md text-font_shade_400 mt-1 truncate">
                                            📍 {booking.showtimes?.theater?.name} | {booking.showtimes?.screen?.type ?? 'Regular 2D'}
                                        </p>
                                        <p className="text-sm sm:text-base md:text-md text-gray-400 mt-1">
                                            Seats: {booking.seats?.join(', ')}
                                        </p>
                                    </div>

                                    {/* Amount */}
                                    {/* <div className="text-right flex-shrink-0 max-w-80 md:max-w-full">
                                    <p className="font-bold text-sm">₹{booking.total_amount?.toLocaleString()}</p>
                                </div> */}
                                </Link>
                            ))}
                        </div>
                    )
                }
            </div>
        </div>
    )
}