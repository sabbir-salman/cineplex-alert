<script lang="ts">
  import { supabase } from '$lib/supabase'
  import { addNotification } from '$lib/stores/notifications.store'
  import { goto } from '$app/navigation'
  import { writable } from 'svelte/store'

  const { movieId, title } = $props()
  const requested = writable(false)

  async function handleNotify() {
    const { data } = await supabase.auth.getSession()
    const user = data.session?.user ?? null
    if (!user) {
      goto('/login')
      return
    }

    addNotification({ movieId, title, createdAt: new Date().toISOString() })
    requested.set(true)
  }
</script>

  <button class="btn btn-ghost" onclick={handleNotify} disabled={$requested} style="padding:8px 10px;font-size:14px;">
  {#if $requested}
    Requested
  {:else}
    Notify me
  {/if}
</button>
