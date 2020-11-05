const GENRE_FILTER_VALUES = [
  'all',
  'documentary',
  'comedy',
  'horror',
  'crime',
];

const GENRES = [
  'Action',
  'Adventure',
  'Animation',
  'Comedy',
  'Crime',
  'Documentary',
  'Drama',
  'Family',
  'Fantasy',
  'History',
  'Horror',
  'Music',
  'Mystery',
  'Romance',
  'Science Fiction',
  'Thriller',
  'TV Movie',
  'War',
  'Western',
];

const MOVIE_FIELDS = {
  ID: 'id',
  TITLE: 'title',
  TAGLINE: 'tagline',
  RATING: 'vote_average',
  RELEASEDATE: 'release_date',
  POSTER: 'poster_path',
  GENRES: 'genres',
  OVERVIEW: 'overview',
  RUNTIME: 'runtime',
};

const LOADING = {
  GLOBAL: 'global',
  MOVIES_LIST: 'moviesList',
};

const SORT_OPTIONS = [{
  value: MOVIE_FIELDS.GENRES,
  text: 'genre',
}, {
  value: MOVIE_FIELDS.RATING,
  text: 'rating',
}, {
  value: MOVIE_FIELDS.RELEASEDATE,
  text: 'release date',
}];

const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export {
  GENRE_FILTER_VALUES,
  GENRES,
  MOVIE_FIELDS,
  LOADING,
  SORT_OPTIONS,
  SORT_ORDER,
};
