/*
  # Add Output Data Column to Conversion Jobs

  1. Changes
    - Add `output_data` (text) column to store base64-encoded converted file data
    - This allows the Hetzner server to store the converted file directly in the database

  2. Notes
    - Using text type for base64 data (can store large files)
    - Allows downloads without separate file storage
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'conversion_jobs' AND column_name = 'output_data'
  ) THEN
    ALTER TABLE conversion_jobs ADD COLUMN output_data text;
  END IF;
END $$;
