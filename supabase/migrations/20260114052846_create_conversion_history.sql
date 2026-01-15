/*
  # Create Conversion History Table

  1. New Tables
    - `conversion_history`
      - `id` (uuid, primary key) - Unique identifier for each conversion
      - `file_name` (text) - Original file name
      - `from_format` (text) - Source file format
      - `to_format` (text) - Target conversion format
      - `file_size` (bigint) - File size in bytes
      - `status` (text) - Conversion status (pending, processing, completed, failed)
      - `created_at` (timestamptz) - When the conversion was initiated
      - `completed_at` (timestamptz) - When the conversion finished
  
  2. Security
    - Enable RLS on `conversion_history` table
    - Add policy for public read access (no auth required for MVP)
*/

CREATE TABLE IF NOT EXISTS conversion_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  file_name text NOT NULL,
  from_format text NOT NULL,
  to_format text NOT NULL,
  file_size bigint NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

ALTER TABLE conversion_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to conversion history"
  ON conversion_history
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Allow public insert to conversion history"
  ON conversion_history
  FOR INSERT
  TO public
  WITH CHECK (true);