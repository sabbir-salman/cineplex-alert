<script lang="ts">
  import { derived } from 'svelte/store';
  import { carouselStore } from '../stores/carousel.store';
  import { getVisibleMovies } from '../utils/carousel';
  import MovieBackground from './MovieBackground.svelte';
  import MovieCard from './MovieCard.svelte';
  import MovieDetails from './MovieDetails.svelte';
  import MovieIndicators from './MovieIndicators.svelte';
  import MovieNavigation from './MovieNavigation.svelte';

  import type { Movie } from '../types/movie';

  const movies = carouselStore.movies;
  const currentIndex = carouselStore.currentIndex;
  const activeMovie = carouselStore.activeMovie;
  const visibleMovies = derived([movies, currentIndex], ([$movies, $currentIndex]) =>
    getVisibleMovies($movies, $currentIndex),
  );

  function handlePrevious() {
    carouselStore.previous();
  }

  function handleNext() {
    carouselStore.next();
  }

  function handleSelect(index: number) {
    carouselStore.goTo(index);
  }
</script>

<section class="hero-section">
  {#if $activeMovie}
    <MovieBackground movie={$activeMovie} />
  {/if}

  <div class="hero-shell">
    <div class="hero-cards">
      {#each $visibleMovies as item}
        <MovieCard
          movie={item.movie}
          transform={item.transform}
          opacity={item.opacity}
          zIndex={item.zIndex}
          active={item.index === $currentIndex}
          onClick={() => handleSelect(item.index)}
        />
      {/each}
    </div>

    {#if $activeMovie}
      <div class="hero-detail-panel">
        <MovieDetails movie={$activeMovie} />
        <MovieIndicators count={$movies.length} activeIndex={$currentIndex} onSelect={handleSelect} />
        <MovieNavigation onPrevious={handlePrevious} onNext={handleNext} />
      </div>
    {/if}
  </div>
</section>

<style>
  .hero-section {
    position: relative;
    min-height: 100vh;
    overflow: hidden;
    padding: 2rem 0 4rem;
    color: #f8fafc;
  }

  .hero-shell {
    position: relative;
    z-index: 2;
    max-width: 1440px;
    margin: 0 auto;
    padding: 0 2rem;
    display: grid;
    gap: 3.5rem;
  }

  .hero-cards {
    display: flex;
    justify-content: center;
    gap: 1.5rem;
    align-items: center;
    padding: 4rem 0;
    perspective: 1500px;
  }

  .hero-detail-panel {
    display: grid;
    gap: 1.75rem;
    align-items: start;
  }

  :global(.hero-background) {
    position: absolute;
    inset: 0;
    z-index: 0;
  }
</style>
