import type { Movie } from "../types/movie";

export function getCardTransform(index: number, currentIndex: number) {
  const offset = index - currentIndex;
  if (offset === 0) return "translateX(0px) scale(1) rotateY(0deg)";
  const direction = offset > 0 ? 1 : -1;
  const distance = Math.min(Math.abs(offset), 2);
  const translateX = direction * 170 * distance;
  const scale = 1 - 0.12 * Math.abs(offset);
  const rotateY = direction * 12 * Math.abs(offset);
  return `translateX(${translateX}px) scale(${scale}) rotateY(${rotateY}deg)`;
}

export function getOpacity(index: number, currentIndex: number) {
  const distance = Math.abs(index - currentIndex);
  return distance > 2 ? 0 : 1 - 0.28 * distance;
}

export function getScale(index: number, currentIndex: number) {
  const distance = Math.abs(index - currentIndex);
  return Math.max(0.7, 1 - 0.1 * distance);
}

export function getZIndex(index: number, currentIndex: number) {
  const distance = Math.abs(index - currentIndex);
  if (distance === 0) return 10;
  if (distance === 1) return 8;
  if (distance === 2) return 6;
  return 4;
}

export function getRotation(index: number, currentIndex: number) {
  const offset = index - currentIndex;
  if (offset === 0) return 0;
  return offset > 0 ? -12 : 12;
}

export function getVisibleMovies(movies: Movie[], currentIndex: number) {
  return movies.map((movie, index) => ({
    movie,
    index,
    transform: getCardTransform(index, currentIndex),
    opacity: getOpacity(index, currentIndex),
    scale: getScale(index, currentIndex),
    zIndex: getZIndex(index, currentIndex),
    rotation: getRotation(index, currentIndex),
  }));
}
