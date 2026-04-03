

'use client'

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
} from "@react-pdf/renderer"
import { FaArrowLeft } from "react-icons/fa6"
import Skelaton from "@/components/skelaton"

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


function TicketPDF({ booking }: any) {
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
            Booking ID: {booking?.id?.slice(0, 8).toUpperCase()} | Date: {new Date(booking?.created_at).toLocaleDateString()}
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

        {/* Seat Info */}
        <View style={[styles.section, { borderBottom: '1px solid #E5E7EB', paddingBottom: 12 }]}>
          <Text style={styles.bold}>Seats:</Text>
          <Text>{booking?.seats?.join(", ") || "-"}</Text>
        </View>

        {/* Booking & Password */}
        <View style={[styles.section, { borderBottom: '1px solid #E5E7EB', paddingBottom: 12 }]}>
          <Text>Booking Code: <Text style={{ fontWeight: 'bold' }}>{booking?.id?.slice(0, 8).toUpperCase()}</Text></Text>
          <Text>Password Key: <Text style={{ fontWeight: 'bold' }}>{payment?.stripe_session_id?.slice(-6).toUpperCase() ?? "------"}</Text></Text>
        </View>

        {/* Pricing Details */}
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

        {/* Footer */}
        <View style={{ marginTop: 30, borderTop: '1px solid #E5E7EB', paddingTop: 12, textAlign: 'center' }}>
          <Text style={{ fontSize: 10, color: '#6B7280' }}>
            Thank you for booking with us!<Text>{"\n"}</Text>
            For questions, contact support@example.com
          </Text>
        </View>

      </Page>
    </Document>
  )
}

export default function TicketPage() {
  const params = useParams()
  const { id } = params
  const [booking, setBooking] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBooking = async () => {
      const supabase = createClient()

      const { data, error } = await supabase
        .from("bookings")
        .select(`
          id,
          seats,
          total_amount,
          booking_status,
          created_at,
          discount_code,
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

      if (!error) setBooking(data)
      setLoading(false)
    }

    if (params?.id) fetchBooking()
  }, [params?.id])
  if (loading) {
          return (
              <div className="mx-5 flex justify-center h-screen">
                  <Skelaton height="500px" className="w-full" />
              </div>
          )
      }
  if (!booking) return <div>Ticket not found</div>
  const router = useRouter()
  return (
    <div style={{ height: "100vh" }}>
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-black mb-6"
      >
        <FaArrowLeft /> Back
      </button>
      <PDFViewer width="100%" height="100%">
        <TicketPDF booking={booking} />
      </PDFViewer>
    </div>
  )
}