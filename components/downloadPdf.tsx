"use client"

import { createClient } from "@/lib/supabase/client"
import QRCode from "qrcode"
import { pdf } from "@react-pdf/renderer"
import { TicketPDF } from "@/sections/movie/TicketPdf"

export type BookingDetail = {
  id: string;
  seats: string[];
  total_amount: number;
  booking_status: string;
  created_at: string;
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
    payment_status: "cancelled" | "succeeded" | "processing" | "requires_action" | "requires_payment_action";
    payment_method: "card" | "upi" | "netbanking" | "wallet";
  }[];
};

export const downloadTicketPdf = async (id: string) => {
  const supabase = createClient()

  const { data, error } = await supabase
    .from("bookings")
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
    .eq("id", id)
    .single()

  if (error || !data) {
    console.error("Booking not found")
    return
  }

  const qr = await QRCode.toDataURL(
    `https://txi-ticket-booking-website.vercel.app/tickets/${data.id}`
  )

 
  const bookingData: BookingDetail = {
    ...data,
    created_at: data.created_at || new Date().toISOString(),
  } as BookingDetail
  const blob = await pdf(
    <TicketPDF booking={bookingData} qrCodeData={qr} />
  ).toBlob()

  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = `ticket-${data.id}.pdf`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)

  URL.revokeObjectURL(url)
}