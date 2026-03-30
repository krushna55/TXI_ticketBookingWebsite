// lib/actions/payment.ts
import { createClient } from "@/lib/supabase/client";

export async function createCheckoutSession({
  seats,
  showtime_id,
  price_per_seat,
  movie_name,
  show_time,
}: {
  seats: string[];
  showtime_id: number;
  price_per_seat: number;
  movie_name: string;
  show_time: string;
}) {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) throw new Error("You must be logged in");

  const res = await fetch(
    // ✅ dev tunnel so your browser can reach local edge function
    `https://2kdq7w4z-54325.inc1.devtunnels.ms/functions/v1/create-checkout-session`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        seats,
        showtime_id,
        price_per_seat,
        movie_name,
        show_time,
      }),
    },
  );

  const data = await res.json();
  if (data.error) {
    console.log(data)
    throw new Error(data.error);
  }

  // redirect to stripe hosted checkout page
  window.location.href = data.url;
}
