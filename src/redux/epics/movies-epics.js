import { ajax } from 'rxjs/ajax';
import { of } from 'rxjs';
import { mergeMap, map, withLatestFrom, throttleTime } from 'rxjs/operators';
import { ofType } from 'redux-observable';
import _ from 'lodash';
import { baseUrl } from '../../env';
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
 } from '../actions/action-creators';
import { initialState } from '../reducers/movies-reducer';
import { getParamsFromObject } from '../../shared/utils';

const getMoviesListEpic = actions$ => actions$.pipe(
    ofType(ActionTypes.GET_MOVIES_LIST),
    mergeMap(({ payload = initialState.options }) => {
        const params = getParamsFromObject(_.omit(payload, ['totalAmount', 'shouldReplace']));
        const requestUrl = `${baseUrl}/movies?${params}`;
        
        return ajax.getJSON(requestUrl).pipe(
            map(({ data, ...options }) => getMoviesListSuccess({ movies: data, options, shouldReplace: payload.shouldReplace})),
        );
    }),
);

const setOptionsEpic = (actions$, state$) => actions$.pipe(
    ofType(ActionTypes.SET_OPTIONS),
    withLatestFrom(state$),
    mergeMap(([{ payload }, { moviesReducer }]) => {
        const options = _.assign({}, moviesReducer.options, payload);

        return of(getMoviesList(options));
    }),
);

const loadMoreEpic = (actions$, state$) => actions$.pipe(
    ofType(ActionTypes.LOAD_MORE),
    throttleTime(200),
    withLatestFrom(state$),
    mergeMap(([, { moviesReducer }]) => {
        const { options } = moviesReducer;

        if (options.offset > options.totalAmount) {
            return of(getMoviesListFailure({ error: 'end of the list' }));
        }
        
        return of(setOptions({
            offset: options.offset + options.limit,
            shouldReplace: false,
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
    mergeMap(({ payload }) => {
        return ajax(buildRequest({
            url: `${baseUrl}/movies`,
            method: 'POST',
            body: payload,
        })).pipe(
            map(({ response }) => addMovieSuccess(response)),
        );
    }),
);

const editMovieEpic = actions$ => actions$.pipe(
    ofType(ActionTypes.EDIT_MOVIE),
    mergeMap(({ payload }) => {
        return ajax(buildRequest({
            url: `${baseUrl}/movies`,
            method: 'PUT',
            body: payload,
        })).pipe(
            map(({ response }) => editMovieSuccess(response)),
        );
    }),
);

const deleteMovieEpic = actions$ => actions$.pipe(
    ofType(ActionTypes.DELETE_MOVIE),
    mergeMap(({ payload }) => {
         return ajax(buildRequest({
            url: `${baseUrl}/movies/${payload}`,
            method: 'DELETE',
        })).pipe(
            map(() => deleteMovieSuccess(payload)),
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
