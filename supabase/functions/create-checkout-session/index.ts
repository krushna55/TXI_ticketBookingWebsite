import Stripe from "https://esm.sh/stripe@14.21.0";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const stripe = new Stripe(Deno.env.get("STRIPE_SECRET_KEY")!, {
  apiVersion: "2024-06-20",
  httpClient: Stripe.createFetchHttpClient(),
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

async function getOrCreateStripeCoupon(
  stripe: Stripe,
  code: string,
  percent: number,
): Promise<string> {
  try {
    const existing = await stripe.coupons.retrieve(code);
    return existing.id;
  } catch {
    const coupon = await stripe.coupons.create({
      id: code,
      percent_off: percent,
      duration: "once",
      name: code,
    });
    return coupon.id;
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: corsHeaders,
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );

    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();
    if (userError || !user) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), {
        status: 401,
        headers: corsHeaders,
      });
    }

    const {
      seats,
      showtime_id,
      price_per_seat,
      movie_name,
      show_time,
      discount_code,
      discount_pct,
      discount_amount,
    } = await req.json();

    const serviceFee = 30;
    const total_amount =
      seats.length * price_per_seat + serviceFee - (discount_amount ?? 0);

    const adminSupabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    const { data: booking, error: bookingError } = await adminSupabase
      .from("bookings")
      .insert({
        user_id: user.id,
        showtime_id,
        seats,
        total_amount,
        booking_status: "pending",
        discount_code: discount_code ?? null, // ✅ save coupon
        discount_amount: discount_amount ?? 0,
      })
      .select()
      .single();

    if (bookingError) throw new Error(bookingError.message);

    const appUrl = Deno.env.get("APP_URL") ?? "http://localhost:3000";

    // build stripe discounts if coupon applied
    const stripeDiscounts: { coupon: string }[] = [];
    if (discount_code && discount_pct) {
      const couponId = await getOrCreateStripeCoupon(
        stripe,
        discount_code,
        discount_pct,
      );
      stripeDiscounts.push({ coupon: couponId });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      ...(stripeDiscounts.length > 0 && { discounts: stripeDiscounts }),
      line_items: [
        {
          price_data: {
            currency: "inr",
            product_data: {
              name: movie_name,
              description: `Seats: ${seats.join(", ")} | Show: ${show_time}`,
            },
            unit_amount: price_per_seat * 100,
          },
          quantity: seats.length,
        },
        {
          price_data: {
            currency: "inr",
            product_data: { name: "Service Fee" },
            unit_amount: serviceFee * 100,
          },
          quantity: 1,
        },
      ],
      metadata: {
        booking_id: booking.id,
        showtime_id: String(showtime_id),
        seats: seats.join(","),
        user_id: user.id,
        discount_code: discount_code ?? "",
        discount_amount: String(discount_amount ?? 0),
      },
      success_url: `${appUrl}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/payment/cancel?session_id={CHECKOUT_SESSION_ID}`,
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
    });

    await adminSupabase.from("payments").insert({
      booking_id: booking.id,
      user_id: user.id,
      stripe_session_id: session.id,
      amount: total_amount,
      payment_status: "processing",
      payment_method: "card",
    });

    return new Response(
      JSON.stringify({
        url: session.url,
        session_id: session.id,
        booking_id: booking.id,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (e) {
    console.error("edge function error:", e);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
