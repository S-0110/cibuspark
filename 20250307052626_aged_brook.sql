/*
  # Initial Schema Setup for CibusPark

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `user_type` (text, either 'hotel' or 'fpu')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `food_waste`
      - `id` (uuid, primary key)
      - `hotel_id` (uuid, references profiles)
      - `fpu_id` (uuid, references profiles, nullable)
      - `amount` (numeric)
      - `status` (text, enum: 'pending', 'accepted', 'completed')
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users
*/

-- Create profiles table
CREATE TABLE profiles (
  id uuid PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  user_type text NOT NULL CHECK (user_type IN ('hotel', 'fpu')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create food_waste table
CREATE TABLE food_waste (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  hotel_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  fpu_id uuid REFERENCES profiles(id),
  amount numeric NOT NULL CHECK (amount > 0),
  status text NOT NULL CHECK (status IN ('pending', 'accepted', 'completed')) DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE food_waste ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Users can read own profile"
  ON profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Food waste policies
CREATE POLICY "Hotels can create food waste entries"
  ON food_waste
  FOR INSERT
  TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND user_type = 'hotel'
    )
  );

CREATE POLICY "Hotels can view their own submissions"
  ON food_waste
  FOR SELECT
  TO authenticated
  USING (
    hotel_id = auth.uid()
    OR
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND user_type = 'fpu'
    )
  );

CREATE POLICY "FPUs can accept food waste"
  ON food_waste
  FOR UPDATE
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid()
      AND user_type = 'fpu'
    )
  )
  WITH CHECK (
    status = 'accepted'
    AND fpu_id = auth.uid()
  );