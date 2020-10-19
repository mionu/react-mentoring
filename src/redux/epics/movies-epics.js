import { of } from 'rxjs';
import { mergeMap, map, tap, withLatestFrom, throttleTime, distinct, finalize, catchError } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import _ from 'lodash';
import { baseUrl } from '../../env';
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

const getMoviesListEpic = (actions$, { dispatch }, { ajax }) => actions$.pipe(
    ofType(ActionTypes.GET_MOVIES_LIST),
    mergeMap(({ payload = initialState.options }) => {
        if (!payload.search) {
            return of(getMoviesListSuccess({ movies: [], options: payload }));
        }

        const params = getParamsFromObject(_.omit(payload, ['totalAmount', 'shouldReplace', 'loading']));
        const requestUrl = `${baseUrl}/movies?${params}`;

        dispatch(setLoading(payload.loading, true));
        
        return ajax.getJSON(requestUrl).pipe(
            map(({ data, ...options }) => getMoviesListSuccess({ movies: data, options, shouldReplace: payload.shouldReplace})),
            catchError((e) =>  of(getMoviesListFailure(e))),
            finalize(() => dispatch(setLoading(payload.loading, false))),
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

        return ajax.getJSON(requestUrl).pipe(
            map((movie) => getMovieByIdSuccess(movie)),
            catchError((e) =>  of(getMovieByIdFailure(e))),
        );
    }),
);

const addMovieEpic = (actions$, { dispatch }, { ajax }) => actions$.pipe(
    ofType(ActionTypes.ADD_MOVIE),
    tap(() => dispatch(setGlobalLoading(true))),
    mergeMap(({ payload }) => {
        return ajax(buildRequest({
            url: `${baseUrl}/movies`,
            method: 'POST',
            body: payload,
        })).pipe(
            map(({ response }) => addMovieSuccess(response)),
            catchError((e) =>  of(addMovieFailure(e))),
            finalize(() => dispatch(setGlobalLoading(false))),
        );
    }),
);

const editMovieEpic = (actions$, { dispatch }, { ajax }) => actions$.pipe(
    ofType(ActionTypes.EDIT_MOVIE),
    tap(() => dispatch(setGlobalLoading(true))),
    mergeMap(({ payload }) => {
        return ajax(buildRequest({
            url: `${baseUrl}/movies`,
            method: 'PUT',
            body: payload,
        })).pipe(
            map(({ response }) => editMovieSuccess(response)),
            catchError((e) =>  of(editMovieFailure(e))),
            finalize(() => dispatch(setGlobalLoading(false))),
        );
    }),
);

const deleteMovieEpic = (actions$, { dispatch }, { ajax }) => actions$.pipe(
    ofType(ActionTypes.DELETE_MOVIE),
    tap(() => dispatch(setGlobalLoading(true))),
    mergeMap(({ payload }) => {
         return ajax(buildRequest({
            url: `${baseUrl}/movies/${payload}`,
            method: 'DELETE',
        })).pipe(
            map(() => deleteMovieSuccess(payload)),
            catchError((e) =>  of(deleteMovieFailure(e))),
            finalize(() => dispatch(setGlobalLoading(false))),
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
