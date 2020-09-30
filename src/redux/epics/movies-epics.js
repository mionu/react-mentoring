import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { mergeMap, map, tap, withLatestFrom, throttleTime, distinct, finalize } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import _ from 'lodash';
import { baseUrl } from '../../env';
import store from '../store';
import ActionTypes from '../actions/action-types';
import {
    getMoviesListSuccess,
    getMovieByIdSuccess,
    addMovieSuccess,
    editMovieSuccess,
    deleteMovieSuccess,
    getMoviesList,
    getMoviesListFailure,
    setOptions,
    setGlobalLoading,
    setLoading,
 } from '../actions/action-creators';
import { initialState } from '../reducers/movies-reducer';
import { getParamsFromObject } from '../../shared/utils';
import { LOADING } from '../../shared/constants';

const getMoviesListEpic = actions$ => actions$.pipe(
    ofType(ActionTypes.GET_MOVIES_LIST),
    mergeMap(({ payload = initialState.options }) => {
        if (!payload.search) {
            return of(getMoviesListSuccess({ movies: [], payload }));
        }

        const params = getParamsFromObject(_.omit(payload, ['totalAmount', 'shouldReplace', 'loading']));
        const requestUrl = `${baseUrl}/movies?${params}`;

        store.dispatch(setLoading(payload.loading, true));
        
        return ajax.getJSON(requestUrl).pipe(
            map(({ data, ...options }) => getMoviesListSuccess({ movies: data, options, shouldReplace: payload.shouldReplace})),
            finalize(() => store.dispatch(setLoading(payload.loading, false))),
        );
    }),
);

const setOptionsEpic = (actions$, state$) => actions$.pipe(
    ofType(ActionTypes.SET_OPTIONS),
    withLatestFrom(state$),
    mergeMap(([{ payload }, { movies }]) => {
        const options = _.assign({}, movies.options, payload, {
            loading: payload.loading || LOADING.GLOBAL,
        });

        return of(getMoviesList(options));
    }),
);

const loadMoreEpic = (actions$, state$) => actions$.pipe(
    ofType(ActionTypes.LOAD_MORE),
    throttleTime(200),
    distinct(),
    withLatestFrom(state$),
    mergeMap(([, { movies }]) => {
        const { options } = movies;

        if (options.offset > options.totalAmount) {
            return of(getMoviesListFailure({ error: 'end of the list' }));
        }
        
        return of(setOptions({
            offset: options.offset + options.limit,
            shouldReplace: false,
            loading: LOADING.MOVIES_LIST,
        }));
    }),
);

const getMovieByIdEpic = actions$ => actions$.pipe(
    ofType(ActionTypes.GET_MOVIE_BY_ID),
    mergeMap(({ payload }) => {
        const requestUrl = `${baseUrl}/movies/${payload}`;

        return ajax.getJSON(requestUrl).pipe(
            map((movie) => getMovieByIdSuccess(movie)),
        );
    }),
);

const addMovieEpic = actions$ => actions$.pipe(
    ofType(ActionTypes.ADD_MOVIE),
    tap(() => store.dispatch(setGlobalLoading(true))),
    mergeMap(({ payload }) => {
        return ajax(buildRequest({
            url: `${baseUrl}/movies`,
            method: 'POST',
            body: payload,
        })).pipe(
            map(({ response }) => addMovieSuccess(response)),
            finalize(() => store.dispatch(setGlobalLoading(false))),
        );
    }),
);

const editMovieEpic = actions$ => actions$.pipe(
    ofType(ActionTypes.EDIT_MOVIE),
    tap(() => store.dispatch(setGlobalLoading(true))),
    mergeMap(({ payload }) => {
        return ajax(buildRequest({
            url: `${baseUrl}/movies`,
            method: 'PUT',
            body: payload,
        })).pipe(
            map(({ response }) => editMovieSuccess(response)),
            finalize(() => store.dispatch(setGlobalLoading(false))),
        );
    }),
);

const deleteMovieEpic = actions$ => actions$.pipe(
    ofType(ActionTypes.DELETE_MOVIE),
    tap(() => store.dispatch(setGlobalLoading(true))),
    mergeMap(({ payload }) => {
         return ajax(buildRequest({
            url: `${baseUrl}/movies/${payload}`,
            method: 'DELETE',
        })).pipe(
            map(() => deleteMovieSuccess(payload)),
            finalize(() => store.dispatch(setGlobalLoading(false))),
        );
    }),
);

const buildRequest = ({ url, method, body }) => ({
    url,
    method,
    headers: {
        'Content-Type': 'application/json',
    },
    body,
});

export {
    getMoviesListEpic,
    setOptionsEpic,
    loadMoreEpic,
    getMovieByIdEpic,
    addMovieEpic,
    editMovieEpic,
    deleteMovieEpic,
};
