"use server";

import { createClient } from "@/lib/supabase/server";
import { Enums } from "@/types/enumsType";

// ─────────────────────────────────────────────────────────────────────────────
// Typed shape of what the Postgres RPC actually returns
// ─────────────────────────────────────────────────────────────────────────────
type SyncRPCResponse =
    | { success: true;  held_seats: string[] }
    | { success: false; error: string; seat?: string }

// ─────────────────────────────────────────────────────────────────────────────
// fetchBookings — unchanged
// ─────────────────────────────────────────────────────────────────────────────
export async function fetchBookings(showtime_id: number) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('seat_reservations')
        .select('*')
        .eq('showtime_id', showtime_id)
    if (error) return { error: error.message }
    return data
}

// ─────────────────────────────────────────────────────────────────────────────
// syncSeats — 1 RPC call, atomic transaction, conflict check included
// ─────────────────────────────────────────────────────────────────────────────
export async function syncSeats({
    showtime_id,
    seats_to_add,
    seats_to_del,
    price,
}: {
    showtime_id:  number
    seats_to_add: string[]
    seats_to_del: string[]
    price:        number | null
}): Promise<SyncRPCResponse> {
    const supabase = await createClient()

    const { data, error } = await supabase.rpc('sync_seat_reservations', {
        p_showtime_id:  showtime_id,
        p_seats_to_add: seats_to_add,
        p_seats_to_del: seats_to_del,
        p_price:        price  as number,
    })

    // Supabase network / auth level error
    if (error) return { success: false, error: error.message }

    // Cast Json → our known shape. The Postgres function always returns this
    // exact structure so the cast is safe.
    const result = data as unknown as SyncRPCResponse

    return result
}

// ─────────────────────────────────────────────────────────────────────────────
// updateBooking — unchanged, used when marking seats as 'paid'
// ─────────────────────────────────────────────────────────────────────────────
export async function updateBooking(
    showtime_id: number,
    seat_no: string,
    price: number,
    reservation_status: Enums<'reservation_status'>
) {
    const supabase = await createClient()
    const { data: { user }, error: user_error } = await supabase.auth.getUser()
    if (user_error || !user) return { error: "You must be logged in." }

    const { data, error } = await supabase
        .from('seat_reservations')
        .update({ reservation_status })
        .eq('showtime_id', showtime_id)
        .eq('user_id', user.id)
        .eq('seat_no', seat_no)
        .eq('price', price)
        .select()

    if (error) return { error: error.message }
    return data
}