-- bookings table (master record of a ticket purchase)
CREATE TABLE bookings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES profile(user_id) NOT NULL,
  showtime_id int REFERENCES showtimes(id) NOT NULL,
  seats text[] NOT NULL,                          -- array of seat_no eg: ['A1','A2']
  total_amount numeric NOT NULL,
  booking_status booking_status DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- payments table (stripe payment record)
CREATE TABLE payments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  booking_id uuid REFERENCES bookings(id) NOT NULL,
  user_id uuid REFERENCES profile(user_id) NOT NULL,
  stripe_session_id text UNIQUE NOT NULL,
  amount numeric NOT NULL,
  payment_status payment_status DEFAULT 'processing',
  payment_method payment_method DEFAULT 'card',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- RLS
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own bookings"
ON bookings FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookings"
ON bookings FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings"
ON bookings FOR UPDATE TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can view own payments"
ON payments FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own payments"
ON payments FOR INSERT TO authenticated
WITH CHECK (auth.uid() = user_id);