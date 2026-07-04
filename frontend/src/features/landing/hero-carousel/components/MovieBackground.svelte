<script lang="ts">
  import type { Movie } from '../types/movie';
  const { movie } = $props<{ movie: Movie }>();
</script>

<div class="hero-background" style="background-image: url({movie.background})">
  <div class="hero-overlay"></div>
</div>

<style>
  .hero-background {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    transition: background-image 0.8s ease-in-out;
    filter: blur(0px);
  }

  .hero-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(13, 17, 23, 0.2) 0%, rgba(13, 17, 23, 0.95) 75%);
    backdrop-filter: blur(10px);
  }
</style>
