import type { Movie } from "../types/movie";

export const movies: Movie[] = [
  {
    id: "1",
    title: "The Dark Knight",
    description:
      "A tense Gotham thriller where Batman faces the Joker’s psychological chaos and moral choices.",
    genre: ["Action", "Crime", "Drama"],
    rating: 9.0,
    releaseYear: 2008,
    duration: "2h 32m",
    poster: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg",
    background:
      "https://image.tmdb.org/t/p/original/hqkIcbrOHL86UncnHIsHVcVmzue.jpg",
    featured: true,
  },
  {
    id: "2",
    title: "Deadpool & Wolverine",
    description:
      "The Merc with a Mouth teams up with Wolverine for a violent, hilarious time-twisting rescue mission.",
    genre: ["Action", "Comedy", "Adventure"],
    rating: 8.3,
    releaseYear: 2024,
    duration: "1h 58m",
    poster: "https://image.tmdb.org/t/p/w500/6kbAMLteGO8yyewYau6bJ683sw7.jpg",
    background:
      "https://image.tmdb.org/t/p/original/6BBZGVpW4j1AAVp2UeZ3wshP1JG.jpg",
    featured: false,
  },
  {
    id: "3",
    title: "Inception",
    description:
      "A mind-bending heist through layered dreams, where one team fights to plant an idea in a target’s subconscious.",
    genre: ["Sci-Fi", "Thriller"],
    rating: 8.8,
    releaseYear: 2010,
    duration: "2h 28m",
    poster: "https://image.tmdb.org/t/p/w500/edv5CZvWj09upOsy2Y6IwDhK8bt.jpg",
    background:
      "https://image.tmdb.org/t/p/original/s3TBrRGB1iav7gFOCNx3H31MoES.jpg",
    featured: false,
  },
  {
    id: "4",
    title: "Blade Runner 2049",
    description:
      "A new blade runner uncovers a long-buried secret that forces him to track down former blade runner Rick Deckard.",
    genre: ["Sci-Fi", "Mystery"],
    rating: 8.0,
    releaseYear: 2017,
    duration: "2h 44m",
    poster: "https://image.tmdb.org/t/p/w500/mbT8Q6aItfq6FT0bCVM5iCqInqC.jpg",
    background:
      "https://image.tmdb.org/t/p/original/fL1EEYjX23959G5A4TYNod4pJ29.jpg",
    featured: false,
  },
  {
    id: "5",
    title: "Mad Max: Fury Road",
    description:
      "In a post-apocalyptic wasteland, Max joins Imperator Furiosa to flee a tyrant and save a kidnapped tribe.",
    genre: ["Action", "Adventure"],
    rating: 8.1,
    releaseYear: 2015,
    duration: "2h 00m",
    poster: "https://image.tmdb.org/t/p/w500/kqjL17yufvn9OVLyXYpvtyrFfak.jpg",
    background:
      "https://image.tmdb.org/t/p/original/8tZYtuWezp8JbcsvHYO0O46tFbo.jpg",
    featured: false,
  },
  {
    id: "6",
    title: "Everything Everywhere All at Once",
    description:
      "A laundromat owner discovers she must connect multiple versions of herself to stop a multiverse threat.",
    genre: ["Sci-Fi", "Comedy", "Drama"],
    rating: 8.1,
    releaseYear: 2022,
    duration: "2h 19m",
    poster: "https://image.tmdb.org/t/p/w500/8UaBzzH0D4J5kQGTFbY2N7wW30J.jpg",
    background:
      "https://image.tmdb.org/t/p/original/q0R4crx2SehcEEQEkYObktdeFy.jpg",
    featured: false,
  },
];
