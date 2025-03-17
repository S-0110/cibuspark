/*
  # Fix RLS policies for profiles table

  1. Changes
    - Drop existing RLS policies
    - Add new policies for:
      - Inserting profiles (authenticated users can create their own profile)
      - Reading profiles (users can read their own profile)
      - Updating profiles (users can update their own profile)

  2. Security
    - Enable RLS on profiles table
    - Policies ensure users can only access their own data
    - Allow profile creation during signup
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Users can read own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;

-- Create new policies
CREATE POLICY "Enable insert for authenticated users only"
ON profiles FOR INSERT TO authenticated
WITH CHECK (auth.uid() = id);

CREATE POLICY "Enable read access for users based on user_id"
ON profiles FOR SELECT TO authenticated
USING (auth.uid() = id);

CREATE POLICY "Enable update for users based on user_id"
ON profiles FOR UPDATE TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);