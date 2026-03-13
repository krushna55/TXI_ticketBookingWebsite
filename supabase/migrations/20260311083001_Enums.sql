-- ============================================================
-- 1. ENUMS
-- ============================================================

---CREATE TYPE user_role        AS ENUM ('user', 'admin');
CREATE TYPE movie_status     AS ENUM ('upcoming', 'now_showing', 'streaming');
CREATE TYPE brand_type       AS ENUM ('qtv', 'iol', 'cinepolis');
CREATE TYPE booking_status   AS ENUM ('pending', 'paid', 'cancelled');
CREATE TYPE payment_status   AS ENUM ('succeeded', 'processing', 'requires_action', 'requires_payment_action', 'cancelled');
CREATE TYPE payment_method   AS ENUM ('card', 'upi', 'netbanking', 'wallet');
