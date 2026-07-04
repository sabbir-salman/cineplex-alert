import type { Movie } from "../types/movie";
import { movies } from "../data/movies";

export function getHeroMovies(): Promise<Movie[]> {
  return Promise.resolve(movies);
}
