import { SHORT_MOVIE } from './constants';

export const filterShortMovies = (data) => data.filter((movie) => movie.duration <= SHORT_MOVIE);

export const filterMovies = (data, value) => data.filter((movie) => {
  return movie.nameRU.toLowerCase().includes(value.trim().toLowerCase());
});
