import { moviesReducer as reducer, initialState } from './movies-reducer';
import ActionTypes from '../actions/action-types';

/* eslint-disable no-undef */
describe('moviesReducer', () => {
  it('should return initial state', () => {
    expect(reducer(undefined, {})).toEqual(initialState);
  });

  describe('GET_MOVIES_LIST_SUCCESS', () => {
    it('should replace old movies by default', () => {
      const oldState = {
        list: [{ id: 1, title: 'movie' }],
      };
      const payload = { movies: [{ id: 123, title: 'new movie' }] };
      const action = {
        type: ActionTypes.GET_MOVIES_LIST_SUCCESS,
        payload,
      };
      const expectedState = {
        list: payload.movies,
        options: {},
      };

      expect(reducer(oldState, action)).toEqual(expectedState);
    });

    it('should add movies to the end of the list (and not save shouldReplace flag to state)', () => {
      const oldState = {
        list: [{ id: 1, title: 'movie' }],
      };
      const payload = {
        movies: [{ id: 123, title: 'new movie' }],
        shouldReplace: true,
      };
      const action = {
        type: ActionTypes.GET_MOVIES_LIST_SUCCESS,
        payload,
      };
      const expectedState = {
        list: payload.movies,
        options: {},
      };

      expect(reducer(oldState, action)).toEqual(expectedState);
    });

    it('should save options to state', () => {
      const oldState = {
        list: [{ id: 1, title: 'movie' }],
      };
      const payload = {
        movies: [{ id: 123, title: 'new movie' }],
        options: { searchBy: 'title' },
      };
      const action = {
        type: ActionTypes.GET_MOVIES_LIST_SUCCESS,
        payload,
      };
      const expectedState = {
        list: payload.movies,
        options: { searchBy: 'title' },
      };

      expect(reducer(oldState, action)).toEqual(expectedState);
    });
  });

  describe('SET_OPTIONS', () => {
    it('should save options to state and add offset', () => {
      const oldState = {
        options: {},
      };
      const payload = { searchBy: 'genres' };
      const action = {
        type: ActionTypes.SET_OPTIONS,
        payload,
      };
      const expectedState = {
        options: {
          searchBy: 'genres',
          offset: 0,
        },
      };

      expect(reducer(oldState, action)).toEqual(expectedState);
    });

    it('should not save shouldReplace flag to state', () => {
      const oldState = {
        options: {},
      };
      const payload = { searchBy: 'genres', shouldReplace: true };
      const action = {
        type: ActionTypes.SET_OPTIONS,
        payload,
      };
      const expectedState = {
        options: {
          searchBy: 'genres',
          offset: 0,
        },
      };

      expect(reducer(oldState, action)).toEqual(expectedState);
    });

    it('should rewrite existing options', () => {
      const oldState = {
        options: { searchBy: 'genres' },
      };
      const payload = { searchBy: 'title' };
      const action = {
        type: ActionTypes.SET_OPTIONS,
        payload,
      };
      const expectedState = {
        options: {
          searchBy: 'title',
          offset: 0,
        },
      };

      expect(reducer(oldState, action)).toEqual(expectedState);
    });
  });

  describe('GET_MOVIE_BY_ID_SUCCESS', () => {
    it('should set movie', () => {
      const oldState = {};
      const payload = { id: 1, title: 'movie' };
      const action = {
        type: ActionTypes.GET_MOVIE_BY_ID_SUCCESS,
        payload,
      };
      const expectedState = {
        currentMovie: payload,
      };

      expect(reducer(oldState, action)).toEqual(expectedState);
    });
  });

  describe('ADD_MOVIE_SUCCESS', () => {
    it('should place new movie first in the list instead of the last item', () => {
      const oldState = {
        list: [{ id: 1, title: 'movie 1' }],
      };
      const payload = { id: 2, title: 'movie 2' };
      const action = {
        type: ActionTypes.ADD_MOVIE_SUCCESS,
        payload,
      };
      const expectedState = {
        list: [{ id: 2, title: 'movie 2' }],
      };

      expect(reducer(oldState, action)).toEqual(expectedState);
    });
  });

  describe('EDIT_MOVIE_SUCCESS', () => {
    it('should update movie', () => {
      const oldState = {
        list: [{ id: 1, title: 'movie 1' }],
      };
      const payload = { id: 1, title: 'movie 2' };
      const action = {
        type: ActionTypes.EDIT_MOVIE_SUCCESS,
        payload,
      };
      const expectedState = {
        list: [{ id: 1, title: 'movie 2' }],
      };

      expect(reducer(oldState, action)).toEqual(expectedState);
    });
  });

  describe('DELETE_MOVIE_SUCCESS', () => {
    it('should delete movie', () => {
      const oldState = {
        list: [{ id: 1, title: 'movie 1' }, { id: 2, title: 'movie 2' }],
        options: { totalAmount: 2 },
      };
      const payload = 1;
      const action = {
        type: ActionTypes.DELETE_MOVIE_SUCCESS,
        payload,
      };
      const expectedState = {
        list: [{ id: 2, title: 'movie 2' }],
        options: { totalAmount: 1 },
      };

      expect(reducer(oldState, action)).toEqual(expectedState);
    });
  });
});
/* eslint-enable no-undef */
