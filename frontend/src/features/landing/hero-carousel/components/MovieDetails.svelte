<script lang="ts">
  import type { Movie } from '../types/movie';
  const { movie } = $props<{ movie: Movie }>();
</script>

<section class="movie-details">
  <div class="movie-meta">
    <span class="genre">{movie.genre.join(' • ')}</span>
    <span class="separator">•</span>
    <span class="year">{movie.releaseYear}</span>
    <span class="duration">{movie.duration}</span>
  </div>

  <h2>{movie.title}</h2>
  <p>{movie.description}</p>

  <div class="info-row">
    <span class="rating">⭐ {movie.rating.toFixed(1)}</span>
    <button class="cta-button">Browse Movies</button>
  </div>
</section>

<style>
  .movie-details {
    max-width: 680px;
    color: #f8fafc;
    display: grid;
    gap: 1rem;
  }

  .movie-meta {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    color: #94a3b8;
    font-size: 0.95rem;
    text-transform: uppercase;
    letter-spacing: 0.14em;
  }

  .movie-meta .separator {
    opacity: 0.35;
  }

  h2 {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2.7rem, 4vw, 4.5rem);
    line-height: 0.95;
    margin: 0;
  }

  p {
    color: #cbd5e1;
    font-size: 1rem;
    line-height: 1.9;
    max-width: 640px;
  }

  .info-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 1rem;
  }

  .rating {
    color: #facc15;
    font-weight: 700;
  }

  .cta-button {
    padding: 1rem 1.75rem;
    border-radius: 999px;
    border: none;
    background: linear-gradient(135deg, #7c3aed, #2563eb);
    color: #fff;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.25s ease, filter 0.25s ease;
  }

  .cta-button:hover {
    transform: translateY(-1px);
    filter: brightness(1.05);
  }
</style>
