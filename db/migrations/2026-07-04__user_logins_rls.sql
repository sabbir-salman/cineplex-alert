-- Enable Row Level Security and add policies for user_logins

-- Enable RLS
ALTER TABLE IF EXISTS public.user_logins ENABLE ROW LEVEL SECURITY;

-- Allow service role inserts (service role bypasses policies when using the service key,
-- but we add an explicit policy for clarity)
CREATE POLICY IF NOT EXISTS allow_service_role_insert ON public.user_logins
  FOR INSERT USING (auth.role() = 'service_role') WITH CHECK (auth.role() = 'service_role');

-- Allow authenticated users to SELECT only their own login records
CREATE POLICY IF NOT EXISTS select_own_logins ON public.user_logins
  FOR SELECT USING (auth.uid() = auth_user_id);

-- (Optional) Prevent ordinary users from inserting rows directly; only service role or server
-- processes should insert. If you want to allow inserts from the client for some reason,
-- adjust policies accordingly.
REVOKE ALL ON public.user_logins FROM public;
