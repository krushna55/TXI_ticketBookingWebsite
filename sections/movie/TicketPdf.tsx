import { BookingDetail } from "@/app/tickets/[id]/ticket/page"
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
  pdf
} from "@react-pdf/renderer"


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

export function TicketPDF({ booking, qrCodeData }: { booking: BookingDetail, qrCodeData: string }) {
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
            Booking ID: {booking?.id?.slice(0, 8).toUpperCase()} | Date: {booking?.created_at ? new Date(booking.created_at).toLocaleDateString() : "-"}
          </Text>
        </View>

        {/* Movie Details */}
        <View style={[styles.section, { borderBottom: '1px solid #E5E7EB', paddingBottom: 12 }]}>
          <Text style={[styles.bold, { fontSize: 16, marginBottom: 6 }]}>
            {booking?.showtimes?.movies?.name || "Movie Name"}
          </Text>
          <Text>Theater: {booking?.showtimes?.theater?.name || "-"}</Text>
          <Text>Date: {booking?.showtimes?.date?.split('T')[0] || "-"}</Text>
          <Text>Showtime: {booking?.showtimes?.show_time?.replace(":00", "") || "-"}</Text>
          <Text>Screen: {booking?.showtimes?.screen?.type || "Regular 2D"}</Text>
        </View>

        {/* Seats */}
        <View style={[styles.section, { borderBottom: '1px solid #E5E7EB', paddingBottom: 12 }]}>
          <Text style={styles.bold}>Seats:</Text>
          <Text>{booking?.seats?.join(", ") || "-"}</Text>
        </View>

        {/* Booking */}
        <View style={[styles.section, { borderBottom: '1px solid #E5E7EB', paddingBottom: 12 }]}>
          <Text>Booking Code: {booking?.id?.slice(0, 8).toUpperCase()}</Text>
          <Text>Password Key: {payment?.stripe_session_id?.slice(-6).toUpperCase() ?? "------"}</Text>
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
            <Text>Rs. 30</Text>
          </View>
          <View style={[styles.row, { marginBottom: 8 }]}>
            <Text>Discount</Text>
            <Text>- Rs. {booking?.discount_amount ?? 0}</Text>
          </View>
          <View style={[styles.row, { borderTop: '1px solid #374151', paddingTop: 8 }]}>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Total</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 16 }}>Rs. {booking?.total_amount?.toLocaleString()}</Text>
          </View>
        </View>

        {/* QR */}
        {qrCodeData && (
          <View style={{ marginTop: 30, textAlign: 'center' }}>
            <Text style={{ fontSize: 10, marginBottom: 6 }}>Scan Ticket</Text>
            <Image src={qrCodeData} style={{ width: 120, height: 120, alignSelf: 'center' }} />
          </View>
        )}
      </Page>
    </Document>
  )
}