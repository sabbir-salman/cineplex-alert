import { derived, writable } from "svelte/store";
import type { Movie } from "../types/movie";
import { movies } from "../data/movies";

const initialIndex = 0;

const moviesStore = writable<Movie[]>(movies);
const currentIndexStore = writable<number>(initialIndex);

export const carouselStore = {
  movies: moviesStore,
  currentIndex: currentIndexStore,
  activeMovie: derived(
    [moviesStore, currentIndexStore],
    ([$movies, $currentIndex]) => $movies[$currentIndex],
  ),
  next: () =>
    currentIndexStore.update((currentIndex) => {
      const length = movies.length;
      return (currentIndex + 1) % length;
    }),
  previous: () =>
    currentIndexStore.update((currentIndex) => {
      const length = movies.length;
      return (currentIndex - 1 + length) % length;
    }),
  goTo: (index: number) => currentIndexStore.set(index),
};
