<script lang="ts">
  import NavBar from '$lib/components/NavBar.svelte'
  import Hero from '$lib/components/Hero.svelte'
  import MovieCard from '$lib/components/MovieCard.svelte'
  import { movies as staticMovies } from '../features/landing/hero-carousel/data/movies'
  import { onMount } from 'svelte'
  import { writable } from 'svelte/store'

  interface MovieItem {
    id: string
    title: string
    poster: string
    genre: string[]
    duration: string
    meta: string
  }

  const movies = writable<MovieItem[]>(staticMovies.map((m) => ({
    id: m.id,
    title: m.title,
    poster: m.poster,
    genre: m.genre ?? [],
    duration: m.duration ?? '',
    meta: `${m.genre?.join(' · ') ?? ''}${m.duration ? ' · ' + m.duration : ''}`
  })))
  const usedFallback = writable(false)

  onMount(async () => {
    try {
      const portsToTry = [8080, 8081]
      let data: unknown = null

      for (const p of portsToTry) {
        try {
          const base = `${location.protocol}//${location.hostname}:${p}`
          console.log('trying backend', base + '/movies')
          const res = await fetch(base + '/movies')
          if (res.ok) {
            data = await res.json()
            break
          }
        } catch (err) {
          console.warn('fetch attempt failed for port', p, err)
          continue
        }
      }

      if (Array.isArray(data)) {
        movies.set(data.map((m: any) => {
          const genre = Array.isArray(m.genre) ? m.genre : m.genre ? String(m.genre).split(/[ ,\s]+/) : []
          const duration = m.duration ?? (m.release_date ? m.release_date : '')
          return {
            id: String(m.id ?? m.slug ?? m.title ?? 'unknown'),
            title: String(m.title ?? m.slug ?? 'Untitled'),
            poster: String(m.poster_url ?? m.poster ?? m.img ?? ''),
            genre,
            duration,
            meta: `${genre.join(' · ')}${duration ? ' · ' + duration : ''}`
          }
        }))
        usedFallback.set(false)
      } else {
        console.warn('no backend responded, using static data')
        usedFallback.set(true)
      }
    } catch (e) {
      console.warn('failed to fetch movies from backend, using static data', e)
      usedFallback.set(true)
    }
  })
</script>

<NavBar />

<main>
  <Hero />
  <div style="padding:8px 16px;color:var(--text-secondary);font-size:13px;">
    {#if $usedFallback}
      Using fallback static data ({$movies.length} movies)
    {:else}
      Using backend data ({$movies.length} movies)
    {/if}
  </div>

  <section style="padding:24px 16px;">
    <h3 style="color:var(--text-primary);font-weight:700;margin-bottom:12px;">Featured</h3>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:12px;">
      {#each $movies as m}
        <MovieCard id={m.id} title={m.title} meta={`${m.genre.join(' · ')} · ${m.duration}`} poster={m.poster} />
      {/each}
    </div>
  </section>

  <footer style="border-top:1px solid var(--border);padding:20px 16px;background:transparent;">
    <h4 style="color:var(--text-secondary);margin-bottom:12px;">Now Showing</h4>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;">
      {#each $movies as m}
        <MovieCard id={m.id} title={m.title} meta={`${m.genre.join(' · ')} · ${m.duration}`} poster={m.poster} />
      {/each}
    </div>
  </footer>
</main>
