-- Migration: create user_logins table
-- Purpose: store a record for each sign-in/login event (oauth or other)

-- Ensure UUID generation function exists (pgcrypto provides gen_random_uuid)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

CREATE TABLE IF NOT EXISTS public.user_logins (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  auth_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  provider text,
  created_at timestamptz DEFAULT now(),
  ip inet,
  user_agent text,
  metadata jsonb
);

CREATE INDEX IF NOT EXISTS idx_user_logins_auth_user_id ON public.user_logins (auth_user_id);
CREATE INDEX IF NOT EXISTS idx_user_logins_created_at ON public.user_logins (created_at);

-- Notes:
-- * Use Supabase Auth Webhooks (Project Settings → Auth → Webhooks) to POST sign_in events
--   to an endpoint that inserts into this table. Alternatively, insert from an Edge Function
--   or server endpoint after successful OAuth sign-in.
-- * Add RLS policies as needed so users can only view their own records.
