/*
  # Add Conversion Jobs Table

  1. New Tables
    - `conversion_jobs`
      - `id` (uuid, primary key) - Unique job identifier
      - `filename` (text) - Original filename
      - `input_format` (text) - Input file format
      - `output_format` (text) - Desired output format
      - `file_size` (bigint) - Input file size in bytes
      - `status` (text) - Job status: pending, processing, completed, failed
      - `started_at` (timestamptz) - When processing started
      - `completed_at` (timestamptz) - When processing finished
      - `output_filename` (text) - Generated output filename
      - `output_size` (bigint) - Output file size in bytes
      - `error_message` (text) - Error details if failed
      - `created_at` (timestamptz) - When job was created
      - `updated_at` (timestamptz) - Last update timestamp

  2. Security
    - Enable RLS on `conversion_jobs` table
    - Add policy for public read access (jobs are tracked by ID only)

  3. Indexes
    - Index on status for efficient job queue queries
    - Index on created_at for cleanup queries
*/

CREATE TABLE IF NOT EXISTS conversion_jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  filename text NOT NULL,
  input_format text NOT NULL,
  output_format text NOT NULL,
  file_size bigint NOT NULL,
  status text NOT NULL DEFAULT 'pending',
  started_at timestamptz,
  completed_at timestamptz,
  output_filename text,
  output_size bigint,
  error_message text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_conversion_jobs_status ON conversion_jobs(status);
CREATE INDEX IF NOT EXISTS idx_conversion_jobs_created_at ON conversion_jobs(created_at);

ALTER TABLE conversion_jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view job status by ID"
  ON conversion_jobs
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Service role can insert jobs"
  ON conversion_jobs
  FOR INSERT
  TO service_role
  WITH CHECK (true);

CREATE POLICY "Service role can update jobs"
  ON conversion_jobs
  FOR UPDATE
  TO service_role
  USING (true)
  WITH CHECK (true);