import { Tables } from "@/database.types";
import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { createClient } from "../supabase/client";
import { fetchBookings } from "@/api/booking/bookingsApi";

type booking = Tables<"seat_reservations">;

export const bookingApi = createApi({
  reducerPath: "bookingApi",
  baseQuery: fakeBaseQuery(),

  endpoints(builder) {
    return {
      fetchBookings: builder.query<booking[], { showtime_id: number }>({
        queryFn: async ({ showtime_id }) => {
          try {
            const data = await fetchBookings(showtime_id);
            console.log("from slice", data);
            return { data: data as booking[] };
          } catch (e) {
            return {
              error: {
                status: "failed to fetch bookings",
                error: e,
              },
            };
          }
        },
        async onCacheEntryAdded(
          arg,
          { updateCachedData, cacheDataLoaded, cacheEntryRemoved },
        ) {
          // ✅ no await — createClient is not async
          const supabase = createClient();
          let channel: ReturnType<typeof supabase.channel> | null = null;

          try {
            await cacheDataLoaded;

            channel = supabase
              .channel(`bookings-${arg.showtime_id}`)
              .on(
                "postgres_changes",
                {
                  event: "*",
                  schema: "public",
                  table: "seat_reservations",
                  filter: `showtime_id=eq.${arg.showtime_id}`,
                },
                (payload) => {
                  console.log("realtime:", payload.eventType, payload);
                  updateCachedData((draft) => {
                    if (payload.eventType === "INSERT") {
                      const newBooking = payload.new as booking;
                      // ✅ prevent duplicates
                      const exists = draft.some(
                        (b) =>
                          b.seat_no === newBooking.seat_no &&
                          b.showtime_id === newBooking.showtime_id,
                      );
                      if (!exists) draft.push(newBooking);
                    } else if (payload.eventType === "DELETE") {
                      const deletedId = (payload.old as booking).id;
                      // Return the new filtered state
                      return draft.filter((b) => b.id !== deletedId);
                    } else if (payload.eventType === "UPDATE") {
                      const updated = payload.new as booking;
                      const index = draft.findIndex((b) => b.id === updated.id);
                      if (index !== -1) draft[index] = updated;
                    }
                  });
                },
              )
              .subscribe((status, err) => {
                console.log("channel status:", status);
                if (err) console.error("channel error:", err);
              });
          } catch (e) {
            // cacheDataLoaded rejected — component unmounted early
            console.error("onCacheEntryAdded error:", e);
          }

          await cacheEntryRemoved;
          if (channel) await supabase.removeChannel(channel);
        },
      }),
    };
  },
});

export const { useFetchBookingsQuery } = bookingApi;
