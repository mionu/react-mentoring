import { of, throwError, Subject } from 'rxjs';
import { take, toArray } from 'rxjs/operators';
import { ActionsObservable } from 'redux-observable';
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
  setGlobalLoading,
} from '../actions/action-creators';

/* eslint-disable no-undef */
const dependencies = {
  ajax: {
    getJSON: jest.fn(() => of({})),
  },
};

const postReqDependencies = {
  ajax: jest.fn(() => of({})),
};

function testEpic(epic, deps, count, action, callback, state = {}) {
  const actions = new Subject();
  const actions$ = new ActionsObservable(actions);
  const store = { getState: () => state };

  epic(actions$, store, deps).pipe(
    take(count),
    toArray(),
  ).subscribe(callback);

  if (action.length) {
    action.map((act) => actions.next(act));
  } else {
    actions.next(action);
  }
}

describe('moviesEpics', () => {
  describe('getMoviesListEpic', () => {
    it('should call getMovies endpoint', (done) => {
      const mockMovies = [{
        id: 1, title: 'a',
      }];
      const expectedActions = [
        setGlobalLoading(true),
        setGlobalLoading(false),
        getMoviesListSuccess({ movies: mockMovies, options: {} }),
      ];
      dependencies.ajax.getJSON.mockReturnValueOnce(of({ data: mockMovies }));

      testEpic(getMoviesListEpic, dependencies, 3, getMoviesList({ search: 'a', loading: 'global' }), (actions) => {
        expect(dependencies.ajax.getJSON).toHaveBeenCalled();
        expect(actions).toEqual(expectedActions);
        done();
      });
    });

    it('should not call any endpoints if no search term provided', (done) => {
      const expectedActions = [getMoviesListSuccess({ movies: [], options: initialState.options })];

      testEpic(getMoviesListEpic, dependencies, 1, getMoviesList(), (actions) => {
        expect(dependencies.ajax.getJSON).not.toHaveBeenCalled();
        expect(actions).toEqual(expectedActions);
        done();
      });
    });

    it('should return error', (done) => {
      const error = { error: 'unknown' };
      const expectedActions = [
        setGlobalLoading(true),
        setGlobalLoading(false),
        getMoviesListFailure(error),
      ];
      dependencies.ajax.getJSON.mockReturnValueOnce(throwError(error));

      testEpic(getMoviesListEpic, dependencies, 3, getMoviesList({ search: 'a', loading: 'global' }), (actions) => {
        expect(dependencies.ajax.getJSON).toHaveBeenCalled();
        expect(actions).toEqual(expectedActions);
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

      epic$.subscribe((action) => {
        expect(action).toEqual(expectedAction);
        done();
      });
    });
  });

  describe('loadMoreEpic', () => {
    it('should update offset', (done) => {
      const state$ = of({
        movies: {
          options: {
            limit: 10, totalAmount: 50, offset: 0, search: 'a',
          },
        },
      });
      const action$ = of(loadMore());
      const expectedAction = setOptions({
        offset: 10,
        shouldReplace: false,
        loading: 'moviesList',
      });

      const epic$ = loadMoreEpic(action$, state$);

      epic$.subscribe((action) => {
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

      epic$.subscribe((action) => {
        expect(action).toEqual(expectedAction);
        done();
      });
    });
  });

  describe('getMovieByIdEpic', () => {
    it('should return movie', (done) => {
      const mockMovie = {
        id: 5, title: 'a',
      };
      const expectedActions = [
        setGlobalLoading(true),
        setGlobalLoading(false),
        getMovieByIdSuccess(mockMovie),
      ];
      dependencies.ajax.getJSON.mockReturnValueOnce(of(mockMovie));

      testEpic(getMovieByIdEpic, dependencies, 3, getMovieById(5), (actions) => {
        expect(dependencies.ajax.getJSON).toHaveBeenCalled();
        expect(actions).toEqual(expectedActions);
        done();
      });
    });

    it('should handle error', (done) => {
      const error = { error: 'unknown' };
      const expectedActions = [
        setGlobalLoading(true),
        setGlobalLoading(false),
        getMovieByIdFailure(error),
      ];
      dependencies.ajax.getJSON.mockReturnValueOnce(throwError(error));

      testEpic(getMovieByIdEpic, dependencies, 3, getMovieById(5), (actions) => {
        expect(dependencies.ajax.getJSON).toHaveBeenCalled();
        expect(actions).toEqual(expectedActions);
        done();
      });
    });
  });

  describe('addMovieEpic', () => {
    it('should add movie', (done) => {
      const newMovie = { title: 'movie' };
      const addedMovie = { id: 1, title: 'movie' };
      const expectedActions = [
        setGlobalLoading(true),
        setGlobalLoading(false),
        addMovieSuccess(addedMovie),
      ];
      postReqDependencies.ajax.mockReturnValueOnce(of({ response: addedMovie }));

      testEpic(addMovieEpic, postReqDependencies, 3, addMovie(newMovie), (actions) => {
        expect(postReqDependencies.ajax).toHaveBeenCalled();
        expect(actions).toEqual(expectedActions);
        done();
      });
    });

    it('should return error', (done) => {
      const newMovie = { title: 'movie' };
      const error = { error: 'unknown' };
      const expectedActions = [
        setGlobalLoading(true),
        setGlobalLoading(false),
        addMovieFailure(error),
      ];
      postReqDependencies.ajax.mockReturnValueOnce(throwError(error));

      testEpic(addMovieEpic, postReqDependencies, 3, addMovie(newMovie), (actions) => {
        expect(postReqDependencies.ajax).toHaveBeenCalled();
        expect(actions).toEqual(expectedActions);
        done();
      });
    });
  });

  describe('editMovieEpic', () => {
    it('should edit movie', (done) => {
      const movie = { id: 1, title: 'movie' };
      const expectedActions = [
        setGlobalLoading(true),
        setGlobalLoading(false),
        editMovieSuccess(movie),
      ];
      postReqDependencies.ajax.mockReturnValueOnce(of({ response: movie }));

      testEpic(editMovieEpic, postReqDependencies, 3, editMovie(movie), (actions) => {
        expect(postReqDependencies.ajax).toHaveBeenCalled();
        expect(actions).toEqual(expectedActions);
        done();
      });
    });

    it('should return error', (done) => {
      const movie = { id: 1, title: 'movie' };
      const error = { error: 'unknown' };
      const expectedActions = [
        setGlobalLoading(true),
        setGlobalLoading(false),
        editMovieFailure(error),
      ];
      postReqDependencies.ajax.mockReturnValueOnce(throwError(error));

      testEpic(editMovieEpic, postReqDependencies, 3, editMovie(movie), (actions) => {
        expect(postReqDependencies.ajax).toHaveBeenCalled();
        expect(actions).toEqual(expectedActions);
        done();
      });
    });
  });

  describe('deleteMovieEpic', () => {
    it('should delete movie', (done) => {
      const expectedActions = [
        setGlobalLoading(true),
        setGlobalLoading(false),
        deleteMovieSuccess(1),
      ];

      testEpic(deleteMovieEpic, postReqDependencies, 3, deleteMovie(1), (actions) => {
        expect(postReqDependencies.ajax).toHaveBeenCalled();
        expect(actions).toEqual(expectedActions);
        done();
      });
    });

    it('should return error', (done) => {
      const error = { error: 'unknown' };
      const expectedActions = [
        setGlobalLoading(true),
        setGlobalLoading(false),
        deleteMovieFailure(error),
      ];
      postReqDependencies.ajax.mockReturnValueOnce(throwError(error));

      testEpic(deleteMovieEpic, postReqDependencies, 3, deleteMovie(1), (actions) => {
        expect(postReqDependencies.ajax).toHaveBeenCalled();
        expect(actions).toEqual(expectedActions);
        done();
      });
    });
  });
});
/* eslint-enable no-undef */
