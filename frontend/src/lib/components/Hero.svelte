<script lang="ts">
  const { title = 'CineplexBD Alert', subtitle = 'Get notified when tickets go on sale for movies you care about.', ctaLabel = 'Sign in', ctaHref = '/login' } = $props()
</script>

<section class="hero">
  <div class="hero-inner card" style="padding:var(--space-6);align-items:center;">
    <div class="hero-content" style="flex:1;">
      <h1 style="font-size:32px;margin:0 0 8px;">{title}</h1>
      <p class="muted" style="margin:0 0 16px;">{subtitle}</p>
      <div class="hero-actions">
        <a href={ctaHref} class="btn btn-primary">{ctaLabel}</a>
      </div>
    </div>

    <div class="hero-media" aria-hidden="true" style="width:360px;">
      <div class="poster-grid">
        <div class="poster"></div>
        <div class="poster"></div>
        <div class="poster"></div>
      </div>
    </div>
  </div>
</section>

<style>
.hero { padding: 48px 0; }
.hero-inner { display:flex; gap:32px; align-items:center; justify-content:space-between; }
.hero-content h1 { font-size:36px; margin:0 0 12px; font-weight:800; color:var(--text-primary);} 
.hero-content p { color:var(--text-secondary); margin:0 0 18px; }
.hero-actions .btn-primary { background:var(--primary); color:#000; padding:10px 16px; border-radius:10px; font-weight:700; text-decoration:none; }
.hero-media .poster-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; }
.poster { height:120px; border-radius:10px; background:linear-gradient(135deg,#2a2a2e,#1f2937); }
@media (max-width:800px){ .hero-inner{ flex-direction:column; } .hero-media{ width:100%; } }
</style>
