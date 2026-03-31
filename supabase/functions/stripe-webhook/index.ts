import Stripe from 'https://esm.sh/stripe@14.21.0'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2024-06-20',
  httpClient: Stripe.createFetchHttpClient()
})

Deno.serve(async (req) => {
  console.log('webhook hit:', req.method)

  const signature = req.headers.get('stripe-signature')
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!
  const body = await req.text()

  let event: Stripe.Event
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature!, webhookSecret)
    console.log('event type:', event.type)
  } catch (e) {
    console.error('Webhook signature failed:', e.message)
    return new Response(JSON.stringify({ error: e.message }), { status: 400 })
  }

  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    { global: { fetch: fetch.bind(globalThis) } }
  )

  const session = event.data.object as Stripe.Checkout.Session
  const { booking_id, showtime_id, seats, user_id, discount_amount } = session.metadata!
  const seatArray = seats.split(',')

  if (event.type === 'checkout.session.completed') {
    console.log('Payment completed for booking:', booking_id)

    const [seatResult, bookingResult, paymentResult] = await Promise.all([
      supabase
        .from('seat_reservations')
        .update({ reservation_status: 'paid' })
        .eq('showtime_id', Number(showtime_id))
        .eq('user_id', user_id)
        .in('seat_no', seatArray),

      supabase
        .from('bookings')
        .update({ booking_status: 'paid', updated_at: new Date().toISOString() })
        .eq('id', booking_id),

      supabase
        .from('payments')
        .update({ payment_status: 'succeeded', updated_at: new Date().toISOString() })
        .eq('stripe_session_id', session.id)
    ])

    console.log('seat error:', seatResult.error)
    console.log('booking error:', bookingResult.error)
    console.log('payment error:', paymentResult.error)
  }

  if (event.type === 'checkout.session.expired') {
    console.log('Payment expired for booking:', booking_id)

    const [seatResult, bookingResult, paymentResult] = await Promise.all([
      supabase
        .from('seat_reservations')
        .delete()
        .eq('showtime_id', Number(showtime_id))
        .eq('user_id', user_id)
        .in('seat_no', seatArray)
        .eq('reservation_status', 'hold'),

      supabase
        .from('bookings')
        .update({ booking_status: 'cancelled', updated_at: new Date().toISOString() })
        .eq('id', booking_id),

      supabase
        .from('payments')
        .update({ payment_status: 'cancelled', updated_at: new Date().toISOString() })
        .eq('stripe_session_id', session.id)
    ])

    console.log('seat error:', seatResult.error)
    console.log('booking error:', bookingResult.error)
    console.log('payment error:', paymentResult.error)
  }

  return new Response(JSON.stringify({ received: true }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
})