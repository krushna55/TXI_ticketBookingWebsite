import { createClient } from '@/lib/supabase/client'

export async function createCheckoutSession({
  seats,
  showtime_id,
  price_per_seat,
  movie_name,
  show_time,
  discount_code,
  discount_pct,
  discount_amount
}: {
  seats: string[]
  showtime_id: number
  price_per_seat: number
  movie_name: string
  show_time: string
  discount_code: string | null
  discount_pct: number | null
  discount_amount: number
}) {
  const supabase = createClient()
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) throw new Error('You must be logged in')

  const res = await fetch(
    `https://jplpanawkbfwgpehspnm.supabase.co/functions/v1/create-checkout-session`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.access_token}`
      },
      body: JSON.stringify({
        seats,
        showtime_id,
        price_per_seat,
        movie_name,
        show_time,
        discount_code,
        discount_pct,
        discount_amount
      })
    }
  )

  const data = await res.json()
  if (data.error) throw new Error(data.error)
  window.location.href = data.url
}