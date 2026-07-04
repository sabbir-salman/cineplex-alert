Supabase Edge Function: auth-webhook

This Edge Function accepts Supabase Auth webhook events (e.g. sign_in) and inserts
a record into `user_logins` using the Service Role key. It validates an optional
shared secret header `x-webhook-secret` against the `WEBHOOK_SECRET` env var.

Deploy steps (requires `supabase` CLI):

1. Log in to supabase and select project:

```bash
supabase login
supabase link --project-ref <your-project-ref>
```

2. Deploy function:

```bash
cd supabase/functions/auth-webhook
supabase functions deploy auth-webhook --project-ref <your-project-ref>
```

3. Set environment variables for the function (SERVICE ROLE key, URL, secret):

```bash
supabase secrets set SUPABASE_SERVICE_ROLE_KEY="<your-key>" SUPABASE_URL="https://<your-project>.supabase.co/rest/v1/" WEBHOOK_SECRET="<your-secret>"
```

4. Configure Supabase Auth → Webhooks to POST sign_in events to the function URL:

```
https://<project>.functions.supabase.co/auth-webhook
```

Set header `x-webhook-secret: <your-secret>` in the Supabase webhook settings.
