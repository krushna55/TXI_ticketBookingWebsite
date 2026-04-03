'use client'

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import QRCode from "qrcode"
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image
} from "@react-pdf/renderer"
import { FaArrowLeft } from "react-icons/fa6"
import Skelaton from "@/components/skelaton"
export type BookingDetail = {
  id: string;
  seats: string[];
  total_amount: number;
  booking_status: string | null;
  created_at: string | null;
  discount_code: string | null;
  discount_amount: number | null;
  showtimes: {
    show_time: string | null;
    date: string | null;
    price: number | null;
    movies: { name: string; movie_img: string | null };
    screen: { name: string; type: string | null };
    theater: { name: string; complete_address: string | null };
  };
  payments: {
    stripe_session_id: string;
    amount: number;
    payment_status: "cancelled" | "succeeded" | "processing" | "requires_action" | "requires_payment_action" | null;
    payment_method: "card" | "upi" | "netbanking" | "wallet" | null;
  }[];
};
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    backgroundColor: "#ffffff",
  },
  title: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  section: {
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  bold: {
    fontWeight: "bold",
  },
})

function TicketPDF({ booking, qrCodeData }: { booking: BookingDetail, qrCodeData: string }) {
  const payment = booking?.payments?.[0]
  const seatCount = booking?.seats?.length ?? 0
  const seatTotal = (booking?.showtimes?.price ?? 0) * seatCount

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header */}
        <View style={{ marginBottom: 20, borderBottom: '2px solid #4F46E5', paddingBottom: 10 }}>
          <Text style={[styles.title, { color: '#4F46E5' }]}>Movie Ticket</Text>
          <Text style={{ fontSize: 10, color: '#6B7280' }}>
            Booking ID: {booking?.id?.slice(0, 8).toUpperCase()} | Date: {new Date(booking?.created_at ?? Date.now()).toLocaleDateString()}
          </Text>
        </View>

        {/* Movie Details */}
        <View style={[styles.section, { borderBottom: '1px solid #E5E7EB', paddingBottom: 12 }]}>
          <Text style={[styles.bold, { fontSize: 16, marginBottom: 6 }]}>
            {booking?.showtimes?.movies?.name || "Movie Name"}
          </Text>
          <Text>Theater: <Text style={{ fontWeight: 'normal' }}>{booking?.showtimes?.theater?.name || "-"}</Text></Text>
          <Text>Date: <Text style={{ fontWeight: 'normal' }}>{booking?.showtimes?.date?.split('T')[0] || "-"}</Text></Text>
          <Text>Showtime: <Text style={{ fontWeight: 'normal' }}>{booking?.showtimes?.show_time?.replace(":00", "") || "-"}</Text></Text>
          <Text>Screen: <Text style={{ fontWeight: 'normal' }}>{booking?.showtimes?.screen?.type || "Regular 2D"}</Text></Text>
        </View>

        {/* Seats */}
        <View style={[styles.section, { borderBottom: '1px solid #E5E7EB', paddingBottom: 12 }]}>
          <Text style={styles.bold}>Seats:</Text>
          <Text>{booking?.seats?.join(", ") || "-"}</Text>
        </View>

        {/* Booking & Password */}
        <View style={[styles.section, { borderBottom: '1px solid #E5E7EB', paddingBottom: 12 }]}>
          <Text>Booking Code: <Text style={{ fontWeight: 'bold' }}>{booking?.id?.slice(0, 8).toUpperCase()}</Text></Text>
          <Text>Password Key: <Text style={{ fontWeight: 'bold' }}>{payment?.stripe_session_id?.slice(-6).toUpperCase() ?? "------"}</Text></Text>
        </View>

        {/* Pricing */}
        <View style={styles.section}>
          <Text style={[styles.bold, { fontSize: 14, marginBottom: 8 }]}>Purchase Details</Text>
          <View style={[styles.row, { marginBottom: 6 }]}>
            <Text>{booking?.showtimes?.screen?.type || "Regular"} x {seatCount}</Text>
            <Text>Rs. {seatTotal.toLocaleString()}</Text>
          </View>
          <View style={[styles.row, { marginBottom: 6 }]}>
            <Text>Service Fee</Text>
            <Text>- Rs. 30</Text>
          </View>
          <View style={[styles.row, { marginBottom: 8 }]}>
            <Text>Discount</Text>
            <Text>- Rs. {booking?.discount_amount ?? 0}</Text>
          </View>
          <View style={[styles.row, { borderTop: '1px solid #374151', paddingTop: 8 }]}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Total Amount</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Rs. {booking?.total_amount?.toLocaleString()}</Text>
          </View>
        </View>

        {/* QR Code Footer */}
        {qrCodeData && (
          <View style={{ marginTop: 30, textAlign: 'center' }}>
            <Text style={{ fontSize: 10, color: '#6B7280', marginBottom: 6 }}>
              Scan to view your ticket
            </Text>
            <Image src={qrCodeData} style={{ width: 120, height: 120, alignSelf: 'center' }} />
          </View>
        )}
      </Page>
    </Document>
  )
}

export default function TicketPage() {
  const params = useParams()
  const router = useRouter()
  const { id } = params
  const [booking, setBooking] = useState<BookingDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [qrCodeData, setQrCodeData] = useState<string>("")

  // Fetch booking data
  useEffect(() => {
    const fetchBooking = async () => {
      const supabase = createClient()
      const { data, error } = await supabase
        .from('bookings')
        .select(`
          id,
          seats,
          discount_code,   
          total_amount,
          booking_status,
          created_at,
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
        .eq("id", id as string)
        .single()

      if (!error && data) {
        setBooking(data)
        // Generate QR code
        const qr = await QRCode.toDataURL(`https://txi-ticket-booking-website.vercel.app/tickets/${data.id}/ticket`, {
          errorCorrectionLevel: "M",
          type: "image/png",
          width: 200,
          margin: 2,
          color: { dark: "#010599FF", light: "#FFBF60FF" },
        })
        setQrCodeData(qr)
      }

      setLoading(false)
    }

    if (id) fetchBooking()
  }, [id])

  if (loading) return <Skelaton height="500px" className="w-full my-10" />
  if (!booking) return <div className="flex justify-center items-center h-screen">Ticket not found</div>

  return (
    <div style={{ height: "100vh" }}>
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-6"
      >
        <FaArrowLeft /> Back
      </button>
      <PDFViewer width="100%" height="100%">
        <TicketPDF booking={booking} qrCodeData={qrCodeData} />
      </PDFViewer>
    </div>
  )
}