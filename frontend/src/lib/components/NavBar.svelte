<script lang="ts">
  import { supabase } from '$lib/supabase'
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import { writable } from 'svelte/store'

  const user = writable<any>(null)
  onMount(async () => {
    const { data } = await supabase.auth.getSession()
    user.set(data.session?.user ?? null)
  })

  async function handleSignIn() {
    goto('/login')
  }

  async function signOut() {
    await supabase.auth.signOut()
    goto('/login')
  }
</script>

<nav style="display:flex;justify-content:space-between;align-items:center;padding:12px 18px;border-bottom:1px solid var(--border);">
  <div style="display:flex;gap:12px;align-items:center;">
    <a href="/" style="font-weight:800;color:var(--text-primary);font-size:18px;text-decoration:none;">🎬 CineplexBD</a>
  </div>

  <div style="display:flex;gap:12px;align-items:center;">
    <a href="/" style="color:var(--text-secondary);text-decoration:none;">Home</a>
    <a href="/movies" style="color:var(--text-secondary);text-decoration:none;">Movies</a>
    {#if $user}
      <button class="btn btn-ghost" onclick={signOut}>Sign out</button>
    {:else}
      <button class="btn btn-primary" onclick={handleSignIn}>Sign in</button>
    {/if}
  </div>
</nav>
