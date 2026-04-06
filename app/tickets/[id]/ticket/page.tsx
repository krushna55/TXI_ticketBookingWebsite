// 'use client'

// import { useEffect, useState } from "react"
// import { useParams, useRouter } from "next/navigation"
// import { createClient } from "@/lib/supabase/client"
// import QRCode from "qrcode"
// import {
//   Document,
//   Page,
//   Text,
//   View,
//   StyleSheet,
//   Image,
//   pdf
// } from "@react-pdf/renderer"
// import { FaArrowLeft } from "react-icons/fa6"
// import Skelaton from "@/components/skelaton"
// import { TicketPDF } from "@/sections/movie/TicketPdf"

// export type BookingDetail = {
//   id: string;
//   seats: string[];
//   total_amount: number;
//   booking_status: string | null;
//   created_at: string | null;
//   discount_code: string | null;
//   discount_amount: number | null;
//   showtimes: {
//     show_time: string | null;
//     date: string | null;
//     price: number | null;
//     movies: { name: string; movie_img: string | null };
//     screen: { name: string; type: string | null };
//     theater: { name: string; complete_address: string | null };
//   };
//   payments: {
//     stripe_session_id: string;
//     amount: number;
//     payment_status: "cancelled" | "succeeded" | "processing" | "requires_action" | "requires_payment_action" | null;
//     payment_method: "card" | "upi" | "netbanking" | "wallet" | null;
//   }[];
// };



// export default function TicketPage({id}) {
  

//   const [booking, setBooking] = useState<BookingDetail | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [qrCodeData, setQrCodeData] = useState("")

//    const downloadPdf = async (booking: BookingDetail, qr: string) => {
//     const blob = await pdf(<TicketPDF booking={booking} qrCodeData={qr} />).toBlob()
//     const url = URL.createObjectURL(blob)

//     const a = document.createElement("a")
//     a.href = url
//     a.download = `ticket-${booking.id}.pdf`
//     document.body.appendChild(a)
//     a.click()
//     document.body.removeChild(a)

//     URL.revokeObjectURL(url)
//   }

//   useEffect(() => {
//     const fetchBooking = async () => {
//       const supabase = createClient()

//       const { data, error } = await supabase
//         .from('bookings')
//         .select(`
//           id,
//           seats,
//           discount_code,
//           total_amount,
//           booking_status,
//           created_at,
//           discount_amount,
//           showtimes (
//             show_time,
//             date,
//             price,
//             movies ( name, movie_img ),
//             screen ( name, type ),
//             theater ( name, complete_address )
//           ),
//           payments (
//             stripe_session_id,
//             amount,
//             payment_status,
//             payment_method
//           )
//         `)
//         .eq("id", id as string)
//         .single()

//       if (!error && data) {
//         setBooking(data)

//         const qr = await QRCode.toDataURL(
//           `https://txi-ticket-booking-website.vercel.app/tickets/${data.id}/ticket`
//         )

//         setQrCodeData(qr)

//         // ✅ Auto download
//         await downloadPdf(data, qr)
//       }

//       setLoading(false)
//     }

//     if (id) fetchBooking()
//   }, [id])

//   if (loading) return <Skelaton height="500px" className="w-full my-10" />

//   if (!booking) return <div className="flex justify-center items-center h-screen">Ticket not found</div>

//   return (
//     <div className="flex flex-col items-center justify-center h-screen gap-4">
//       <button
//         onClick={() => router.back()}
//         className="flex items-center gap-2 text-sm text-gray-500 hover:text-black"
//       >
//         <FaArrowLeft /> Back
//       </button>

//       <p>Your ticket is being downloaded...</p>

//       <button
//         onClick={() => downloadPdf(booking, qrCodeData)}
//         className="bg-blue-500 text-white px-4 py-2 rounded"
//       >
//         Download Again
//       </button>
//     </div>
//   )
// }