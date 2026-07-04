<script lang="ts">
  import '../app.css'
  import { onMount } from 'svelte'
  import { invalidate } from '$app/navigation'

  let { data, children } = $props<{ data?: { supabase: any; session?: any }; children?: any }>()

  let supabase = $derived(data?.supabase)
  let session = $derived(data?.session)

  onMount(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event: string, _session: unknown) => {
      if ((_session as { expires_at?: number } | null)?.expires_at !== (session as { expires_at?: number } | null)?.expires_at) {
        invalidate('supabase:auth')
      }
    })
    return () => subscription.unsubscribe()
  })
</script>

{@render children()}