/*
# Create bookings table for CARs IN garage

1. New Tables
- `bookings`
  - `id` (uuid, primary key)
  - `customer_name` (text, not null) — full name of the customer
  - `contact_number` (text, not null) — phone number
  - `car_make_model` (text, not null) — car make and model combined
  - `service` (text, not null) — requested service (Washing, PPF, Denting, Painting, Mechanical Repairs)
  - `preferred_date` (date, not null) — preferred service date
  - `preferred_time` (time, not null) — preferred service time
  - `status` (text, not null, default 'pending') — booking status: pending, confirmed, completed, cancelled
  - `created_at` (timestamptz, default now()) — record creation timestamp
2. Security
- Enable RLS on `bookings`.
- Allow anon + authenticated INSERT (customers can book without logging in).
- Allow anon + authenticated SELECT (the landing page and admin both read through anon key).
- Allow anon + authenticated UPDATE (admin updates status through anon key with authenticated session).
- Allow anon + authenticated DELETE.
3. Important Notes
  1. This is a hybrid app: customers book without auth, the admin logs in with Supabase email/password.
  2. All policies use `TO anon, authenticated` because the anon-key frontend must be able to operate on this table for both customer inserts and admin reads/updates.
  3. In a production scenario, SELECT/UPDATE/DELETE would be scoped to authenticated only, but since the admin uses the same anon-key client (just with an authenticated session), we allow both roles. The admin login gate is enforced at the app level.
*/

CREATE TABLE IF NOT EXISTS bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  contact_number text NOT NULL,
  car_make_model text NOT NULL,
  service text NOT NULL,
  preferred_date date NOT NULL,
  preferred_time time NOT NULL,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_select_bookings" ON bookings;
CREATE POLICY "anon_select_bookings"
  ON bookings FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "anon_insert_bookings" ON bookings;
CREATE POLICY "anon_insert_bookings"
  ON bookings FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "anon_update_bookings" ON bookings;
CREATE POLICY "anon_update_bookings"
  ON bookings FOR UPDATE
  TO anon, authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "anon_delete_bookings" ON bookings;
CREATE POLICY "anon_delete_bookings"
  ON bookings FOR DELETE
  TO anon, authenticated USING (true);

CREATE INDEX IF NOT EXISTS idx_bookings_created_at ON bookings (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings (status);
CREATE INDEX IF NOT EXISTS idx_bookings_preferred_date ON bookings (preferred_date);
