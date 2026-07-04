<script lang="ts">
  import type { Movie } from '../types/movie';

  const {
    movie,
    transform = 'translateX(0px) scale(1) rotateY(0deg)',
    opacity = 1,
    zIndex = 1,
    active = false,
    onClick = () => {},
  } = $props<{
    movie: Movie;
    transform?: string;
    opacity?: number;
    zIndex?: number;
    active?: boolean;
    onClick?: () => void;
  }>();
</script>

<button
  type="button"
  class="movie-card"
  style="transform: {transform}; opacity: {opacity}; z-index: {zIndex};"
  aria-label={movie.title}
  data-active={active}
  onclick={onClick}
>
  <img class="movie-poster" src={movie.poster} alt={movie.title} />
  <div class="movie-badge">{movie.rating.toFixed(1)}</div>
</button>

<style>
  .movie-card {
    position: relative;
    width: 250px;
    min-width: 250px;
    border-radius: 1.25rem;
    overflow: hidden;
    box-shadow: 0 40px 80px rgba(0, 0, 0, 0.35);
    transition: transform 0.6s ease, opacity 0.6s ease, box-shadow 0.35s ease;
    cursor: pointer;
    transform-style: preserve-3d;
  }

  .movie-card[data-active='true'] {
    box-shadow: 0 55px 110px rgba(0, 0, 0, 0.45);
  }

  .movie-card:hover {
    transform: scale(1.04);
  }

  .movie-poster {
    display: block;
    width: 100%;
    height: 380px;
    object-fit: cover;
  }

  .movie-badge {
    position: absolute;
    left: 1rem;
    bottom: 1rem;
    padding: 0.45rem 0.85rem;
    border-radius: 999px;
    background: rgba(14, 16, 20, 0.84);
    color: #f8fafc;
    font-weight: 700;
    font-size: 0.9rem;
    letter-spacing: 0.02em;
    backdrop-filter: blur(8px);
  }
</style>
