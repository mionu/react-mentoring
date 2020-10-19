import { of, throwError } from 'rxjs';
import {
    getMoviesListEpic,
    setOptionsEpic,
    loadMoreEpic,
    getMovieByIdEpic,
    addMovieEpic,
    editMovieEpic,
    deleteMovieEpic,
} from './movies-epics';
import { initialState } from '../reducers/movies-reducer';
import {
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
} from '../actions/action-creators';

const dependencies = {
    ajax: {
        getJSON: jest.fn(() => of({})),
    },
};

const postReqDependencies = {
    ajax: jest.fn(() => of({})),
};

describe('moviesEpics', () => {
    describe('getMoviesListEpic', () => {
        it('should call getMovies endpoint', (done) => {
            const dispatch = jest.fn();
            const action$ = of(getMoviesList({ search: 'a' }));
            const mockMovies = [{
               id: 1, title: 'a', 
            }];
            const expectedAction = getMoviesListSuccess({ movies: mockMovies, options: {} });
            dependencies.ajax.getJSON.mockReturnValueOnce(of({ data: mockMovies }));

            const epic$ = getMoviesListEpic(action$, { dispatch }, dependencies);

            epic$.subscribe(action => {
                expect(dependencies.ajax.getJSON).toHaveBeenCalled();
                expect(action).toEqual(expectedAction);
                done();
            });
        });

        it('should not call any endpoints if no search term provided', (done) => {
            const dispatch = jest.fn();
            const action$ = of(getMoviesList());
            const expectedAction = getMoviesListSuccess({ movies: [], options: initialState.options });

            const epic$ = getMoviesListEpic(action$, { dispatch }, dependencies);

            epic$.subscribe(action => {
                expect(dependencies.ajax.getJSON).not.toHaveBeenCalled();
                expect(action).toEqual(expectedAction);
                done();
            });
        });

        it('should return error', (done) => {
            const dispatch = jest.fn();
            const action$ = of(getMoviesList({ search: 'a' }));
            const error = { error: 'unknown' };
            const expectedAction = getMoviesListFailure(error);
            dependencies.ajax.getJSON.mockReturnValueOnce(throwError(error));

            const epic$ = getMoviesListEpic(action$, { dispatch }, dependencies);

            epic$.subscribe(action => {
                expect(dependencies.ajax.getJSON).toHaveBeenCalled();
                expect(action).toEqual(expectedAction);
                done();
            });
        });
    });

    describe('setOptionsEpic', () => {
        it('should merge state and payload', (done) => {
            const state$ = of({
                movies: {
                    options: { limit: 10, search: 'a' },
                },
            });
            const action$ = of(setOptions({ search: 'b' }));
            const expectedAction = getMoviesList({ limit: 10, search: 'b', loading: 'global' });

            const epic$ = setOptionsEpic(action$, state$);

            epic$.subscribe(action => {
                expect(action).toEqual(expectedAction);
                done();
            });
        });
    });

    describe('loadMoreEpic', () => {
        it('should update offset', (done) => {
            const state$ = of({
                movies: {
                    options: { limit: 10, totalAmount: 50, offset: 0, search: 'a' },
                },
            });
            const action$ = of(loadMore());
            const expectedAction = setOptions({
                offset: 10,
                shouldReplace: false,
                loading: 'moviesList',
            });

            const epic$ = loadMoreEpic(action$, state$);

            epic$.subscribe(action => {
                expect(action).toEqual(expectedAction);
                done();
            });
        });

        it('should return error on the end of the list', (done) => {
            const state$ = of({
                movies: {
                    options: { limit: 10, totalAmount: 50, offset: 55 },
                },
            });
            const action$ = of(loadMore());
            const expectedAction = getMoviesListFailure({ error: 'end of the list' });

            const epic$ = loadMoreEpic(action$, state$);

            epic$.subscribe(action => {
                expect(action).toEqual(expectedAction);
                done();
            });
        });
    });

    describe('getMovieByIdEpic', () => {
        it('should return movie', (done) => {
            const action$ = of(getMovieById(5));
            const mockMovie = {
               id: 5, title: 'a', 
            };
            const expectedAction = getMovieByIdSuccess(mockMovie);
            dependencies.ajax.getJSON.mockReturnValueOnce(of(mockMovie));

            const epic$ = getMovieByIdEpic(action$, null, dependencies);

            epic$.subscribe(action => {
                expect(dependencies.ajax.getJSON).toHaveBeenCalled();
                expect(action).toEqual(expectedAction);
                done();
            });
        });

        it('should handle error', (done) => {
            const action$ = of(getMovieById(5));
            const error = { error: 'unknown' };
            const expectedAction = getMovieByIdFailure(error);
            dependencies.ajax.getJSON.mockReturnValueOnce(throwError(error));

            const epic$ = getMovieByIdEpic(action$, null, dependencies);

            epic$.subscribe(action => {
                expect(dependencies.ajax.getJSON).toHaveBeenCalled();
                expect(action).toEqual(expectedAction);
                done();
            });
        });
    });

    describe('addMovieEpic', () => {
        it('should add movie', (done) => {
            const dispatch = jest.fn();
            const newMovie = { title: 'movie' };
            const addedMovie = { id: 1, title: 'movie' };
            const action$ = of(addMovie(newMovie));
            const expectedAction = addMovieSuccess(addedMovie);
            postReqDependencies.ajax.mockReturnValueOnce(of({ response: addedMovie}));

            const epic$ = addMovieEpic(action$, { dispatch }, postReqDependencies);

            epic$.subscribe(action => {
                expect(postReqDependencies.ajax).toHaveBeenCalled();
                expect(action).toEqual(expectedAction);
                done();
            });
        });

        it('should return error', (done) => {
            const dispatch = jest.fn();
            const newMovie = { title: 'movie' };
            const action$ = of(addMovie(newMovie));
            const error = { error: 'unknown' };
            const expectedAction = addMovieFailure(error);
            postReqDependencies.ajax.mockReturnValueOnce(throwError(error));

            const epic$ = addMovieEpic(action$, { dispatch }, postReqDependencies);

            epic$.subscribe(action => {
                expect(postReqDependencies.ajax).toHaveBeenCalled();
                expect(action).toEqual(expectedAction);
                done();
            });
        });
    });

    describe('editMovieEpic', () => {
        it('should edit movie', (done) => {
            const dispatch = jest.fn();
            const movie = { id: 1, title: 'movie' };
            const action$ = of(editMovie(movie));
            const expectedAction = editMovieSuccess(movie);
            postReqDependencies.ajax.mockReturnValueOnce(of({ response: movie}));

            const epic$ = editMovieEpic(action$, { dispatch }, postReqDependencies);

            epic$.subscribe(action => {
                expect(postReqDependencies.ajax).toHaveBeenCalled();
                expect(action).toEqual(expectedAction);
                done();
            });
        });

        it('should return error', (done) => {
            const dispatch = jest.fn();
            const movie = { id: 1, title: 'movie' };
            const action$ = of(editMovie(movie));
            const error = { error: 'unknown' };
            const expectedAction = editMovieFailure(error);
            postReqDependencies.ajax.mockReturnValueOnce(throwError(error));

            const epic$ = editMovieEpic(action$, { dispatch }, postReqDependencies);

            epic$.subscribe(action => {
                expect(postReqDependencies.ajax).toHaveBeenCalled();
                expect(action).toEqual(expectedAction);
                done();
            });
        });
    });

    describe('deleteMovieEpic', () => {
        it('should delete movie', (done) => {
            const dispatch = jest.fn();
            const action$ = of(deleteMovie(1));
            const expectedAction = deleteMovieSuccess(1);

            const epic$ = deleteMovieEpic(action$, { dispatch }, postReqDependencies);

            epic$.subscribe(action => {
                expect(postReqDependencies.ajax).toHaveBeenCalled();
                expect(action).toEqual(expectedAction);
                done();
            });
        });

        it('should return error', (done) => {
            const dispatch = jest.fn();
            const action$ = of(deleteMovie(1));
            const error = { error: 'unknown' };
            const expectedAction = deleteMovieFailure(error);
            postReqDependencies.ajax.mockReturnValueOnce(throwError(error));

            const epic$ = deleteMovieEpic(action$, { dispatch }, postReqDependencies);

            epic$.subscribe(action => {
                expect(postReqDependencies.ajax).toHaveBeenCalled();
                expect(action).toEqual(expectedAction);
                done();
            });
        });
    });
});
