<script lang="ts">
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { supabase } from '$lib/supabase'

  async function signInGoogle() {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      // redirect to home after successful OAuth
      options: { redirectTo: `${location.origin}/` }
    })
  }

  onMount(async () => {
    const { data: { session } } = await supabase.auth.getSession()
    if (session) goto('/')
  })
</script>

<main style="
  min-height:100vh;
  background:var(--background);
  display:flex;
  align-items:center;
  justify-content:center;
  font-family:'Satoshi',sans-serif;
">
  <div style="
    background:var(--surface);
    border:1px solid var(--border);
    border-radius:16px;
    padding:48px 40px;
    width:100%;
    max-width:420px;
    display:flex;
    flex-direction:column;
    gap:32px;
  ">
    <!-- Logo -->
    <div style="text-align:center;">
      <span style="font-size:32px;">🎬</span>
      <h1 style="
        font-family:'Syne',sans-serif;
        color:var(--text-primary);
        font-size:22px;
        font-weight:800;
        margin:12px 0 6px;
      ">CineplexBD Alert</h1>
      <p style="color:var(--text-muted);font-size:14px;margin:0;">
        Sign in to manage your ticket alerts
      </p>
    </div>

    <!-- Google button -->
    <button class="btn btn-primary" style="width:100%;justify-content:center;" onclick={signInGoogle}>
      <svg width="18" height="18" viewBox="0 0 18 18">
        <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"/>
        <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z"/>
        <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707s.102-1.167.282-1.707V4.961H.957C.347 6.175 0 7.55 0 9s.348 2.825.957 4.039l3.007-2.332z"/>
        <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.961L3.964 7.293C4.672 5.166 6.656 3.58 9 3.58z"/>
      </svg>
      Continue with Google
    </button>

    <!-- Footer note -->
    <div style="text-align:center;">
      <p style="color:var(--text-muted);font-size:12px;margin:0 0 8px;">
        Free · Open source · No spam
      </p>
      <a href="/" style="color:var(--text-muted);font-size:12px;text-decoration:none;opacity:0.6;">
        ← Back to home
      </a>
    </div>
  </div>
</main>