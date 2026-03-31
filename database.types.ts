export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      blog: {
        Row: {
          created_at: string
          description: string | null
          id: number
          imageUrl: string | null
          likes: number
          title: string | null
          type: string | null
          videoUrl: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: number
          imageUrl?: string | null
          likes?: number
          title?: string | null
          type?: string | null
          videoUrl?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: number
          imageUrl?: string | null
          likes?: number
          title?: string | null
          type?: string | null
          videoUrl?: string | null
        }
        Relationships: []
      }
      bookings: {
        Row: {
          booking_status: Database["public"]["Enums"]["booking_status"] | null
          created_at: string | null
          id: string
          seats: string[]
          showtime_id: number
          total_amount: number
          updated_at: string | null
          user_id: string
        }
        Insert: {
          booking_status?: Database["public"]["Enums"]["booking_status"] | null
          created_at?: string | null
          id?: string
          seats: string[]
          showtime_id: number
          total_amount: number
          updated_at?: string | null
          user_id: string
        }
        Update: {
          booking_status?: Database["public"]["Enums"]["booking_status"] | null
          created_at?: string | null
          id?: string
          seats?: string[]
          showtime_id?: number
          total_amount?: number
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "bookings_showtime_id_fkey"
            columns: ["showtime_id"]
            isOneToOne: false
            referencedRelation: "showtimes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "bookings_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
        ]
      }
      brands: {
        Row: {
          created_at: string
          id: number
          logo_url: string
          name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: never
          logo_url: string
          name: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: never
          logo_url?: string
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      cities: {
        Row: {
          id: number
          latitude: number | null
          longitude: number | null
          name: string
          state: string
        }
        Insert: {
          id?: never
          latitude?: number | null
          longitude?: number | null
          name: string
          state: string
        }
        Update: {
          id?: never
          latitude?: number | null
          longitude?: number | null
          name?: string
          state?: string
        }
        Relationships: []
      }
      discounts: {
        Row: {
          code: string
          created_at: string
          discount_pct: number | null
          id: number
          min_amount: number | null
          min_valid_amount: number | null
          name: string | null
          updated_at: string
        }
        Insert: {
          code: string
          created_at?: string
          discount_pct?: number | null
          id?: never
          min_amount?: number | null
          min_valid_amount?: number | null
          name?: string | null
          updated_at?: string
        }
        Update: {
          code?: string
          created_at?: string
          discount_pct?: number | null
          id?: never
          min_amount?: number | null
          min_valid_amount?: number | null
          name?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      movies: {
        Row: {
          age_rating: Database["public"]["Enums"]["age_rating"]
          created_at: string
          director: string | null
          duration: string | null
          genre: string | null
          id: number
          movie_img: string | null
          movies_status: Database["public"]["Enums"]["movie_status"]
          name: string
          updated_at: string
        }
        Insert: {
          age_rating?: Database["public"]["Enums"]["age_rating"]
          created_at?: string
          director?: string | null
          duration?: string | null
          genre?: string | null
          id?: never
          movie_img?: string | null
          movies_status?: Database["public"]["Enums"]["movie_status"]
          name: string
          updated_at?: string
        }
        Update: {
          age_rating?: Database["public"]["Enums"]["age_rating"]
          created_at?: string
          director?: string | null
          duration?: string | null
          genre?: string | null
          id?: never
          movie_img?: string | null
          movies_status?: Database["public"]["Enums"]["movie_status"]
          name?: string
          updated_at?: string
        }
        Relationships: []
      }
      payments: {
        Row: {
          amount: number
          booking_id: string
          created_at: string | null
          id: string
          payment_method: Database["public"]["Enums"]["payment_method"] | null
          payment_status: Database["public"]["Enums"]["payment_status"] | null
          stripe_session_id: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          amount: number
          booking_id: string
          created_at?: string | null
          id?: string
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          stripe_session_id: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          amount?: number
          booking_id?: string
          created_at?: string | null
          id?: string
          payment_method?: Database["public"]["Enums"]["payment_method"] | null
          payment_status?: Database["public"]["Enums"]["payment_status"] | null
          stripe_session_id?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "payments_booking_id_fkey"
            columns: ["booking_id"]
            isOneToOne: false
            referencedRelation: "bookings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "payments_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
        ]
      }
      profile: {
        Row: {
          address: string | null
          age: string | null
          created_at: string | null
          email: string | null
          first_name: string | null
          last_name: string | null
          mobile_no: number | null
          role: Database["public"]["Enums"]["user_role"]
          updated_at: string | null
          user_id: string
        }
        Insert: {
          address?: string | null
          age?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          last_name?: string | null
          mobile_no?: number | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id: string
        }
        Update: {
          address?: string | null
          age?: string | null
          created_at?: string | null
          email?: string | null
          first_name?: string | null
          last_name?: string | null
          mobile_no?: number | null
          role?: Database["public"]["Enums"]["user_role"]
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      screen: {
        Row: {
          created_at: string
          id: number
          name: string
          screen_column: number | null
          screen_row: number | null
          theater_id: number
          type: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: never
          name: string
          screen_column?: number | null
          screen_row?: number | null
          theater_id: number
          type?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: never
          name?: string
          screen_column?: number | null
          screen_row?: number | null
          theater_id?: number
          type?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "screen_theater_id_fkey"
            columns: ["theater_id"]
            isOneToOne: false
            referencedRelation: "theater"
            referencedColumns: ["id"]
          },
        ]
      }
      seat_reservations: {
        Row: {
          created_at: string
          expires_at: string
          id: number
          price: number | null
          reservation_status: Database["public"]["Enums"]["reservation_status"]
          seat_no: string
          showtime_id: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          expires_at?: string
          id?: never
          price?: number | null
          reservation_status?: Database["public"]["Enums"]["reservation_status"]
          seat_no: string
          showtime_id: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          expires_at?: string
          id?: never
          price?: number | null
          reservation_status?: Database["public"]["Enums"]["reservation_status"]
          seat_no?: string
          showtime_id?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "seat_reservations_showtime_id_fkey"
            columns: ["showtime_id"]
            isOneToOne: false
            referencedRelation: "showtimes"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seat_reservations_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
        ]
      }
      showtimes: {
        Row: {
          created_at: string
          date: string | null
          id: number
          movie_id: number
          price: number | null
          screen_id: number
          show_time: string | null
          theater_id: number
          updated_at: string
        }
        Insert: {
          created_at?: string
          date?: string | null
          id?: never
          movie_id: number
          price?: number | null
          screen_id: number
          show_time?: string | null
          theater_id: number
          updated_at?: string
        }
        Update: {
          created_at?: string
          date?: string | null
          id?: never
          movie_id?: number
          price?: number | null
          screen_id?: number
          show_time?: string | null
          theater_id?: number
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "showtimes_movie_id_fkey"
            columns: ["movie_id"]
            isOneToOne: false
            referencedRelation: "movies"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "showtimes_screen_id_fkey"
            columns: ["screen_id"]
            isOneToOne: false
            referencedRelation: "screen"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "showtimes_theater_id_fkey"
            columns: ["theater_id"]
            isOneToOne: false
            referencedRelation: "theater"
            referencedColumns: ["id"]
          },
        ]
      }
      theater: {
        Row: {
          brand_id: number
          city_id: number
          complete_address: string | null
          created_at: string
          district: string | null
          id: number
          latitude: number | null
          longitude: number | null
          name: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          brand_id: number
          city_id: number
          complete_address?: string | null
          created_at?: string
          district?: string | null
          id?: never
          latitude?: number | null
          longitude?: number | null
          name: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          brand_id?: number
          city_id?: number
          complete_address?: string | null
          created_at?: string
          district?: string | null
          id?: never
          latitude?: number | null
          longitude?: number | null
          name?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "theater_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brands"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "theater_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "theater_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profile"
            referencedColumns: ["user_id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_brand_screens: {
        Args: never
        Returns: {
          brand_id: number
          brand_logo: string
          brand_name: string
          screen_id: number
          screen_name: string
          screen_type: string
        }[]
      }
    }
    Enums: {
      age_rating: "U" | "U/A 7+" | "U/A 13+" | "U/A 16+" | "A" | "S"
      booking_status: "pending" | "paid" | "cancelled"
      brand_type: "qtv" | "iol" | "cinepolis"
      movie_status: "upcoming" | "now_showing" | "streaming"
      payment_method: "card" | "upi" | "netbanking" | "wallet"
      payment_status:
        | "succeeded"
        | "processing"
        | "requires_action"
        | "requires_payment_action"
        | "cancelled"
      reservation_status: "available" | "hold" | "paid"
      user_role: "user" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      age_rating: ["U", "U/A 7+", "U/A 13+", "U/A 16+", "A", "S"],
      booking_status: ["pending", "paid", "cancelled"],
      brand_type: ["qtv", "iol", "cinepolis"],
      movie_status: ["upcoming", "now_showing", "streaming"],
      payment_method: ["card", "upi", "netbanking", "wallet"],
      payment_status: [
        "succeeded",
        "processing",
        "requires_action",
        "requires_payment_action",
        "cancelled",
      ],
      reservation_status: ["available", "hold", "paid"],
      user_role: ["user", "admin"],
    },
  },
} as const

