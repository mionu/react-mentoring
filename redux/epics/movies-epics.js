import { concat, of } from 'rxjs';
import {
  mergeMap, withLatestFrom, throttleTime, catchError,
} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { omit, assign } from 'lodash';
import { baseUrl } from '../../shared/env';
import ActionTypes from '../actions/action-types';
import {
  getMoviesListSuccess,
  getMovieByIdSuccess,
  getMovieByIdFailure,
  addMovieSuccess,
  addMovieFailure,
  editMovieSuccess,
  editMovieFailure,
  deleteMovieSuccess,
  deleteMovieFailure,
  getMoviesList,
  getMoviesListFailure,
  setOptions,
  setGlobalLoading,
  setLoading,
} from '../actions/action-creators';
import { initialState } from '../reducers/movies-reducer';
import { getParamsFromObject } from '../../shared/utils';
import { LOADING } from '../../shared/constants';

const buildRequest = ({ url, method, body }) => ({
  url,
  method,
  headers: {
    'Content-Type': 'application/json',
  },
  body,
});

const getMoviesListEpic = (actions$, _, { ajax }) => actions$.pipe(
  ofType(ActionTypes.GET_MOVIES_LIST),
  mergeMap(({ payload = initialState.options }) => {
    if (!payload.search) {
      return of(getMoviesListSuccess({ movies: [], options: payload }));
    }

    const params = getParamsFromObject(omit(payload, ['totalAmount', 'shouldReplace', 'loading']));
    const requestUrl = `${baseUrl}/movies?${params}`;

    return concat(
      of(setLoading(payload.loading, true)),
      ajax.getJSON(requestUrl).pipe(
        mergeMap(({ data, ...options }) => of(
          setLoading(payload.loading, false),
          getMoviesListSuccess({ movies: data, options, shouldReplace: payload.shouldReplace }),
        )),
        catchError((e) => of(setLoading(payload.loading, false), getMoviesListFailure(e))),
      ),
    );
  }),
);

const setOptionsEpic = (actions$, state$) => actions$.pipe(
  ofType(ActionTypes.SET_OPTIONS),
  withLatestFrom(state$),
  mergeMap(([{ payload }, { movies }]) => {
    const options = assign({}, movies.options, payload, {
      loading: payload.loading || LOADING.GLOBAL,
    });

    return of(getMoviesList(options));
  }),
);

const loadMoreEpic = (actions$, state$) => actions$.pipe(
  ofType(ActionTypes.LOAD_MORE),
  throttleTime(200),
  withLatestFrom(state$),
  mergeMap(([, { movies }]) => {
    const { options } = movies;

    if (options.offset >= options.totalAmount) {
      return of(getMoviesListFailure({ error: 'end of the list' }));
    }

    return of(setOptions({
      offset: options.offset + options.limit,
      shouldReplace: false,
      loading: LOADING.MOVIES_LIST,
    }));
  }),
);

const getMovieByIdEpic = (actions$, _, { ajax }) => actions$.pipe(
  ofType(ActionTypes.GET_MOVIE_BY_ID),
  mergeMap(({ payload }) => {
    const requestUrl = `${baseUrl}/movies/${payload}`;

    return concat(
      of(setGlobalLoading(true)),
      ajax.getJSON(requestUrl).pipe(
        mergeMap((movie) => of(setGlobalLoading(false), getMovieByIdSuccess(movie))),
        catchError((e) => of(setGlobalLoading(false), getMovieByIdFailure(e))),
      ),
    );
  }),
);

const addMovieEpic = (actions$, _, { ajax }) => actions$.pipe(
  ofType(ActionTypes.ADD_MOVIE),
  mergeMap(({ payload }) => concat(
    of(setGlobalLoading(true)),
    ajax(buildRequest({
      url: `${baseUrl}/movies`,
      method: 'POST',
      body: payload,
    })).pipe(
      mergeMap(({ response }) => of(setGlobalLoading(false), addMovieSuccess(response))),
      catchError((e) => of(setGlobalLoading(false), addMovieFailure(e))),
    ))),
);

const editMovieEpic = (actions$, _, { ajax }) => actions$.pipe(
  ofType(ActionTypes.EDIT_MOVIE),
  mergeMap(({ payload }) => concat(
    of(setGlobalLoading(true)),
    ajax(buildRequest({
      url: `${baseUrl}/movies`,
      method: 'PUT',
      body: payload,
    })).pipe(
      mergeMap(({ response }) => of(setGlobalLoading(false), editMovieSuccess(response))),
      catchError((e) => of(setGlobalLoading(false), editMovieFailure(e))),
    ),
  )),
);

const deleteMovieEpic = (actions$, _, { ajax }) => actions$.pipe(
  ofType(ActionTypes.DELETE_MOVIE),
  mergeMap(({ payload }) => concat(
    of(setGlobalLoading(true)),
    ajax(buildRequest({
      url: `${baseUrl}/movies/${payload}`,
      method: 'DELETE',
    })).pipe(
      mergeMap(() => of(setGlobalLoading(false), deleteMovieSuccess(payload))),
      catchError((e) => of(setGlobalLoading(false), deleteMovieFailure(e))),
    ),
  )),
);

export {
  getMoviesListEpic,
  setOptionsEpic,
  loadMoreEpic,
  getMovieByIdEpic,
  addMovieEpic,
  editMovieEpic,
  deleteMovieEpic,
};
