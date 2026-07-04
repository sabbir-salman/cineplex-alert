<script lang="ts">
  const { id = '', title = 'Untitled', meta = 'Action · 2h', poster = '' } = $props()
  import NotifyButton from './NotifyButton.svelte'
</script>

<article class="movie-card card" style="display:flex;gap:12px;align-items:center;padding:12px;">
  {#if poster}
    <img src={poster} alt={title} style="width:84px;height:84px;border-radius:8px;object-fit:cover;" />
  {:else}
    <div class="thumb" aria-hidden="true" style="width:84px;height:84px;border-radius:8px;background:linear-gradient(135deg,#0f172a,#334155);"></div>
  {/if}
  <div class="meta">
    <div class="title">{title}</div>
    <div class="sub muted">{meta}</div>
  </div>
  <div style="margin-left:auto;">
    <NotifyButton movieId={id} title={title} />
  </div>
</article>

<style>
.movie-card .title{ font-weight:700; color:var(--text-primary); }
.movie-card .sub{ font-size:13px; }
</style>
