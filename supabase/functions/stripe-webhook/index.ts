// supabase/functions/stripe-webhook/index.ts
import Stripe from 'https://esm.sh/stripe@14.21.0'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY')!, {
  apiVersion: '2024-06-20',
  httpClient: Stripe.createFetchHttpClient()
})

Deno.serve(async (req) => {
  console.log('webhook hit:', req.method) // ✅ debug
  const signature = req.headers.get('stripe-signature')
  const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!
  const body = await req.text()

  let event: Stripe.Event
  try {
    event = await stripe.webhooks.constructEventAsync(body, signature!, webhookSecret)
  } catch (e) {
    console.error('Webhook signature failed:', e.message)
    return new Response(JSON.stringify({ error: e.message }), { status: 400 })
  }

  // always use service role in webhooks — no user auth header here
  const supabase = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  )

  const session = event.data.object as Stripe.Checkout.Session
  const { booking_id, showtime_id, seats, user_id } = session.metadata!
  const seatArray = seats.split(',')

  if (event.type === 'checkout.session.completed') {
    console.log('Payment completed for booking:', booking_id)

    // 1. update seat_reservaions hold -> paid
    await supabase
      .from('seat_reservations')
      .update({ reservation_status: 'paid' })
      .eq('showtime_id', Number(showtime_id))
      .eq('user_id', user_id)
      .in('seat_no', seatArray)

    // 2. update booking -> paid
    await supabase
      .from('bookings')
      .update({ booking_status: 'paid', updated_at: new Date().toISOString() })
      .eq('id', booking_id)

    // 3. update payment -> succeeded
    await supabase
      .from('payments')
      .update({ payment_status: 'succeeded', updated_at: new Date().toISOString() })
      .eq('stripe_session_id', session.id)
  }

  if (event.type === 'checkout.session.expired') {
    console.log('Payment expired for booking:', booking_id)

    // 1. delete held seats so others can book
    await supabase
      .from('seat_reservations')
      .delete()
      .eq('showtime_id', Number(showtime_id))
      .eq('user_id', user_id)
      .in('seat_no', seatArray)
      .eq('reservation_status', 'hold')

    // 2. update booking -> cancelled
    await supabase
      .from('bookings')
      .update({ booking_status: 'cancelled', updated_at: new Date().toISOString() })
      .eq('id', booking_id)

    // 3. update payment -> cancelled
    await supabase
      .from('payments')
      .update({ payment_status: 'cancelled', updated_at: new Date().toISOString() })
      .eq('stripe_session_id', session.id)
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 })
})