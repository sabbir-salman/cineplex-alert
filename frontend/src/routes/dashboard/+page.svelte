<script lang="ts">
  import { supabase } from '$lib/supabase'
  import { goto } from '$app/navigation'

  let { data } = $props<{ data?: { session?: { user?: any } } }>()
  let user = $derived(data?.session?.user)

  async function signOut() {
    await supabase.auth.signOut()
    goto('/login')
  }
</script>

<main style="
  min-height:100vh;
  background:var(--background);
  font-family:'Satoshi',sans-serif;
  color:var(--text-primary);
">
  <!-- Navbar -->
  <nav style="
    border-bottom:1px solid var(--border);
    padding:16px 32px;
    display:flex;align-items:center;justify-content:space-between;
  ">
    <span style="font-family:'Syne',sans-serif;font-size:18px;font-weight:800;color:var(--primary);">
      🎬 CineplexBD Alert
    </span>
    <div style="display:flex;align-items:center;gap:16px;">
      <img src={user.user_metadata.avatar_url} alt="" style="width:32px;height:32px;border-radius:50%;border:2px solid var(--border);" />
      <span style="color:var(--text-secondary);font-size:14px;">{user.user_metadata.full_name ?? user.email}</span>
      <button onclick={signOut} style="
        background:transparent;border:1px solid var(--border);
        color:var(--text-muted);border-radius:8px;padding:6px 14px;
        font-size:13px;cursor:pointer;font-family:'Satoshi',sans-serif;
      ">Sign out</button>
    </div>
  </nav>

  <!-- Dashboard body -->
  <div style="max-width:1100px;margin:0 auto;padding:40px 32px;">
    <h1 style="font-family:'Syne',sans-serif;font-size:28px;font-weight:800;margin:0 0 4px;">
      My Alerts
    </h1>
    <p style="color:var(--text-muted);font-size:14px;margin:0 0 32px;">
      Manage your active movie ticket alerts
    </p>

    <!-- Empty state -->
    <div style="
      background:var(--surface);border:1px dashed var(--border);
      border-radius:16px;padding:60px 32px;
      display:flex;flex-direction:column;align-items:center;gap:16px;
    ">
      <span style="font-size:40px;">🎟️</span>
      <p style="color:var(--text-muted);font-size:15px;margin:0;">No alerts yet</p>
      <a href="/" style="
        background:var(--primary);color:#09090B;
        border-radius:10px;padding:10px 24px;
        font-weight:700;font-size:14px;text-decoration:none;
      ">Set your first alert →</a>
    </div>
  </div>
</main>