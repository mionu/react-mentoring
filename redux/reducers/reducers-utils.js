import _ from 'lodash';

// eslint-disable-next-line no-confusing-arrow
export const getMoviesListUpdate = (oldMovies, { movies, shouldReplace = true }) => shouldReplace
  ? movies
  : _.concat(oldMovies, movies);

export const getOptionsUpdate = (oldOptions, newOptions) => {
  const updated = _.assign(oldOptions, newOptions, {
    offset: newOptions.offset || 0,
  });

  return _.omit(updated, ['shouldReplace']);
};

export const getMoviesWithUpdate = (movies, updatedMovie) => {
  const updated = [...movies];
  const index = movies.findIndex((m) => m.id === updatedMovie.id);

  updated[index] = updatedMovie;

  return updated;
};
