import { Database } from "@/database.types"

type PublicSchema = Database[Extract<keyof Database, "public">]

// This creates a reusable helper for any Enum in your DB
export type Enums<T extends keyof PublicSchema["Enums"]> = PublicSchema["Enums"][T]

// Now you can use it like this:
// reservation_status: Enums<'reservation_status'>
