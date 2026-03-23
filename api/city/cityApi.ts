"use server";

import { createClient } from "@/lib/supabase/server";
import { Database } from "@/database.types";
import { Tables } from "@/database.types";
type city = Tables<"cities">;

export async function fetchcities() {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cities")
    .select("id, name")

  if (error) console.error("Error fetching movies:", error);
  return data;
}
