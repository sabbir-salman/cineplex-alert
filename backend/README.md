# Backend webhook receiver

This small backend accepts Supabase Auth webhook `sign_in` events and inserts them
into the `user_logins` table via the Supabase REST API using the Service Role key.

## Local setup

1. Create `backend/.env` with these values (do NOT commit the service role key):

```
PORT=8080
SUPABASE_URL=https://<your-project>.supabase.co/rest/v1/
SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
WEBHOOK_SECRET=<a-random-secret-to-validate-webhooks>
```

2. Run the server:

```bash
cd backend
go run .
```

3. Expose the server to the internet during development (ngrok example):

```bash
ngrok http 8080
# copy the https URL and add path /webhook/auth
```

4. In Supabase dashboard → Authentication → Webhooks, add the webhook URL:

```
https://<your-ngrok-id>.ngrok.io/webhook/auth
```

Set the `x-webhook-secret` header in the Supabase webhook configuration to the
value of `WEBHOOK_SECRET` you added to `backend/.env`.

## Notes

- The server uses the Service Role key to insert rows; keep it secret.
- Consider using signed webhooks/HMAC for production. This README shows a
  simple shared-secret header validation which is sufficient for local testing.
