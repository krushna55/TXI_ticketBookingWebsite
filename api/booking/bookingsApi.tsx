"use server";

import { createClient } from "@/lib/supabase/server";
import { Enums } from "@/types/enumsType";
// type booking = Tables<'seat_reservations'>
export async function fetchBookings(showtime_id: number) {
    const supabase = await createClient();
    const { data, error } = await supabase
        .from('seat_reservations')
        .select('*')
        .eq('showtime_id', showtime_id)  // ✅ all users, not just current
    if (error) return { error: error.message }
    console.log(data)
    return data
}
export async function addBooking(showtime_id: number, seat_no: string, price: number | null, reservation_status: Enums<'reservation_status'>) {
    const supabase = await createClient()
    const { data: { user }, error: user_error } = await supabase.auth.getUser()
    if (user_error || !user) {
        return { error: "You must be logged in to delete a booking." }
    }
    const { data, error } = await supabase.from('seat_reservations').insert([
        {
            showtime_id,
            user_id: user.id,
            seat_no,
            price,
            reservation_status
        }
    ]).select()

    if (error) {
        return (error?.message)
    }
    return data
}
export async function updateBooking(showtime_id: number, seat_no: string, price: number, reservation_status: Enums<'reservation_status'>) {
    const supabase = await createClient()
    const { data: { user }, error: user_error } = await supabase.auth.getUser()
    if (user_error || !user) {
        return { error: "You must be logged in to delete a booking." }
    }
    const { data, error } = await supabase
        .from('seat_reservations')
        .update({ reservation_status })
        .eq('showtime_id', showtime_id)
        .eq('user_id', user.id)
        .eq('seat_no', seat_no)
        .eq('price', price).select()

    if (error) {
        return (error?.message)
    }
    return data
}

export async function deleteBooking(showtime_id: number, seat_no: string) {
    const supabase = await createClient()
    const { data: { user }, error: user_error } = await supabase.auth.getUser()
    if (user_error || !user) {
        return { error: "You must be logged in to delete a booking." }
    }
    const { data, error } = await supabase.from('seat_reservations')
        .delete()
        .eq('showtime_id', showtime_id)
        .eq('user_id', user.id)
        .eq('seat_no', seat_no)
        .select('*')

    if (error) {
        console.log({ error })
        return { error: error.message }
    }

    console.log({ data })

    return { data }
}
