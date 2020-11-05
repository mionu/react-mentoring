import ActionTypes from './action-types';
import { LOADING } from '../../shared/constants';

const getMoviesList = (params) => ({ type: ActionTypes.GET_MOVIES_LIST, payload: params });
const getMoviesListSuccess = (payload) => ({ type: ActionTypes.GET_MOVIES_LIST_SUCCESS, payload });
const getMoviesListFailure = (error) => ({
  type: ActionTypes.GET_MOVIES_LIST_FAILURE, payload: error,
});

const setOptions = (options) => ({ type: ActionTypes.SET_OPTIONS, payload: options });
const loadMore = () => ({ type: ActionTypes.LOAD_MORE });

const getMovieById = (id) => ({ type: ActionTypes.GET_MOVIE_BY_ID, payload: id });
const getMovieByIdSuccess = (movie) => ({
  type: ActionTypes.GET_MOVIE_BY_ID_SUCCESS, payload: movie,
});
const getMovieByIdFailure = (error) => ({
  type: ActionTypes.GET_MOVIE_BY_ID_FAILURE, payload: error,
});

const addMovie = (movie) => ({ type: ActionTypes.ADD_MOVIE, payload: movie });
const addMovieSuccess = (movie) => ({ type: ActionTypes.ADD_MOVIE_SUCCESS, payload: movie });
const addMovieFailure = (error) => ({ type: ActionTypes.ADD_MOVIE_FAILURE, payload: error });

const editMovie = (movie) => ({ type: ActionTypes.EDIT_MOVIE, payload: movie });
const editMovieSuccess = (movie) => ({ type: ActionTypes.EDIT_MOVIE_SUCCESS, payload: movie });
const editMovieFailure = (error) => ({ type: ActionTypes.EDIT_MOVIE_FAILURE, payload: error });

const deleteMovie = (id) => ({ type: ActionTypes.DELETE_MOVIE, payload: id });
const deleteMovieSuccess = (id) => ({ type: ActionTypes.DELETE_MOVIE_SUCCESS, payload: id });
const deleteMovieFailure = (error) => ({ type: ActionTypes.DELETE_MOVIE_FAILURE, payload: error });

const setLoading = (type, state) => ({ type: ActionTypes.SET_LOADING, payload: { type, state } });
const setGlobalLoading = (state) => ({
  type: ActionTypes.SET_LOADING, payload: { type: LOADING.GLOBAL, state },
});
const setMoviesListLoading = (state) => ({
  type: ActionTypes.SET_LOADING, payload: { type: LOADING.MOVIES_LIST, state },
});

export {
  getMoviesList,
  getMoviesListSuccess,
  getMoviesListFailure,
  setOptions,
  loadMore,
  getMovieById,
  getMovieByIdSuccess,
  getMovieByIdFailure,
  addMovie,
  addMovieSuccess,
  addMovieFailure,
  editMovie,
  editMovieSuccess,
  editMovieFailure,
  deleteMovie,
  deleteMovieSuccess,
  deleteMovieFailure,
  setLoading,
  setGlobalLoading,
  setMoviesListLoading,
};
