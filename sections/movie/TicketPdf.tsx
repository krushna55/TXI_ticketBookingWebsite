
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer"

export type BookingDetail = {
    id: string
    seats: string[]
    total_amount: number
    booking_status: string
    created_at: string
    discount_code: string | null      
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

const styles = StyleSheet.create({
  page: { 
    padding: 40, 
    backgroundColor: '#ffffff', 
    fontFamily: 'Helvetica' 
  },
  
  headerBg: { 
    backgroundColor: '#1A2C50', 
    padding: 20, 
    borderTopLeftRadius: 10, 
    borderTopRightRadius: 10 
  },
  movieTitle: { 
    color: '#F2C96F', 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginBottom: 15 
  },
  row: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 10 
  },
  label: { 
    color: '#BDC5D4', 
    fontSize: 10, 
    marginBottom: 4 
  },
  value: { 
    color: '#ffffff', 
    fontSize: 12, 
    fontWeight: 'bold' 
  },
  
  yellowBg: { 
    backgroundColor: '#F2C96F', 
    padding: 20, 
    borderBottomLeftRadius: 10, 
    borderBottomRightRadius: 10 
  },
  yellowLabel: { 
    color: '#1A2C50', 
    fontSize: 10, 
    opacity: 0.8 
  },
  yellowValue: { 
    color: '#1A2C50', 
    fontSize: 14, 
    fontWeight: 'bold' 
  },
  
  purchaseSection: { 
    marginTop: 30, 
    paddingHorizontal: 10 
  },
  sectionTitle: { 
    fontSize: 16, 
    fontWeight: 'bold', 
    color: '#1A2C50', 
    marginBottom: 15 
  },
  purchaseRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 10 
  },
  purchaseLabel: { 
    fontSize: 12, 
    color: '#4A4E62', 
    textTransform: 'uppercase' 
  },
  purchaseValue: { 
    fontSize: 12, 
    color: '#1A2C50' 
  },
  purchaseValueBold: { 
    fontWeight: 'bold' 
  },
  discountText: { 
    color: '#16a34a' 
  },
  divider: { 
    marginVertical: 12, 
    borderBottomWidth: 1, 
    borderBottomColor: '#DADFEB' 
  },
  totalRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginTop: 5 
  },
  totalLabel: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#1A2C50' 
  },
  totalValue: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#1A2C50' 
  }
})

export function TicketPDF({ booking, qrCodeData }: { booking: BookingDetail, qrCodeData: string }) {
  const payment = booking?.payments?.[0]
  const showtime = booking.showtimes
  
  const date = showtime.date?.split('T')[0]
  const time = showtime.show_time

  const seatCount = booking.seats.length
  const seatPrice = showtime.price || 0
  const serviceFee = 30
  const discount = booking.discount_amount
  const passwordKey = payment?.stripe_session_id?.slice(-6).toUpperCase() ?? "000000"
  const seats = booking.seats.join(", ")

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        
        {/* === TICKET SECTION === */}
        <View style={styles.headerBg}>
          <Text style={styles.movieTitle}>{showtime.movies.name}</Text>
          <View style={styles.row}>
            <View>
              <Text style={styles.label}>Location</Text>
              <Text style={styles.value}>{showtime.theater.name}</Text>
            </View>
            <View>
              <Text style={styles.label}>Class</Text>
              <Text style={styles.value}>{showtime.screen.type}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View>
              <Text style={styles.label}>Date</Text>
              <Text style={styles.value}>{date}</Text>
            </View>
            <View>
              <Text style={styles.label}>Time</Text>
              <Text style={styles.value}>{time}</Text>
            </View>
          </View>
        </View>

        <View style={styles.yellowBg}>
          <View style={styles.row}>
            <Text style={styles.yellowLabel}>Booking Code</Text>
            <Text style={styles.yellowValue}>{booking.id.split('-')[0].toUpperCase()}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.yellowLabel}>Password Key</Text>
            <Text style={styles.yellowValue}>{passwordKey}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.yellowLabel}>Seats</Text>
            <Text style={styles.yellowValue}>{seats}</Text>
          </View>
        </View>

        {/* === PURCHASE DETAILS SECTION === */}
        <View style={styles.purchaseSection}>
          <Text style={styles.sectionTitle}>Purchase Details</Text>
          
          <View style={styles.purchaseRow}>
            <Text style={styles.purchaseLabel}>REGULAR SEAT</Text>
            <Text style={styles.purchaseValue}>
              Rs. {seatPrice.toLocaleString('en-IN')} X {seatCount} = Rs. {((seatPrice * seatCount).toLocaleString('en-IN'))}
            </Text>
          </View>

          <View style={styles.purchaseRow}>
            <Text style={styles.purchaseLabel}>SERVICE FEE</Text>
            <Text style={styles.purchaseValue}>
              Rs. {serviceFee.toLocaleString('en-IN')} <Text style={styles.purchaseValueBold}></Text>
            </Text>
          </View>

          {discount > 0 && (
            <View style={styles.purchaseRow}>
              <Text style={styles.purchaseLabel}>Discount ({booking.discount_code})</Text>
              <Text style={[styles.purchaseValue, styles.discountText]}>
                - Rs. {booking.discount_amount?.toLocaleString('en-IN')}
              </Text>
            </View>
          )}

          <View style={styles.divider} />
          
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>TOTAL PAYMENT</Text>
            <Text style={styles.totalValue}>Rs. {booking.total_amount?.toLocaleString('en-IN')}</Text>
          </View>
        </View>

        {/* QR Code */}
        {qrCodeData && (
          <View style={{ marginTop: 30, textAlign: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 10, marginBottom: 8, color: '#1A2C50', fontWeight: 'bold' }}>Scan Ticket</Text>
            <Image src={qrCodeData} style={{ width: 100, height: 100 }} />
          </View>
        )}

      </Page>
    </Document>
  )
}