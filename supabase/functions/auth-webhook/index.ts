// Supabase Edge Function: auth-webhook
// Receives Supabase Auth webhooks (e.g. SIGN_IN) and inserts a record into
// the `user_logins` table. Validates an optional shared secret header.

export default async function (req: Request) {
  try {
    const expected = Deno.env.get("WEBHOOK_SECRET") || "";
    if (expected) {
      const got = req.headers.get("x-webhook-secret") || "";
      if (got !== expected) return new Response("forbidden", { status: 403 });
    }

    const payload = await req.json();

    // Defensive extraction
    let auth_user_id = "";
    if (payload?.user?.id) auth_user_id = payload.user.id;

    let provider = "";
    if (payload.provider) provider = payload.provider;
    else if (payload.identity?.provider) provider = payload.identity.provider;

    const ip =
      req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "";
    const user_agent = req.headers.get("user-agent") || "";

    const insert = {
      auth_user_id,
      provider,
      ip,
      user_agent,
      metadata: payload,
    };

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceKey) {
      return new Response("supabase config missing", { status: 500 });
    }

    // Ensure URL ends with /rest/v1/ (supabase functions often set REST url)
    let endpoint = supabaseUrl;
    if (!endpoint.endsWith("/")) endpoint = endpoint + "/";
    endpoint = endpoint + "user_logins";

    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
      },
      body: JSON.stringify(insert),
    });

    if (!res.ok) {
      const text = await res.text();
      return new Response(text, { status: 502 });
    }

    return new Response("ok");
  } catch (err) {
    return new Response(String(err), { status: 500 });
  }
}
