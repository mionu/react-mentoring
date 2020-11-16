import _ from 'lodash';
import ActionTypes from '../actions/action-types';
import { SORT_ORDER, MOVIE_FIELDS } from '../../shared/constants';
import * as utils from './reducers-utils';

export const initialState = {
  currentMovie: {},
  list: [],
  options: {
    filter: [],
    limit: 12,
    offset: 0,
    search: '',
    searchBy: MOVIE_FIELDS.TITLE,
    sortBy: MOVIE_FIELDS.RELEASEDATE,
    sortOrder: SORT_ORDER.ASC,
    totalAmount: 0,
  },
};

export function moviesReducer(state = initialState, action) {
  switch (action.type) {
    case ActionTypes.GET_MOVIES_LIST_SUCCESS:
      return {
        ...state,
        list: utils.getMoviesListUpdate(state.list, action.payload),
        options: _.assign({}, state.options, action.payload.options),
      };
    case ActionTypes.SET_OPTIONS:
      return {
        ...state,
        options: utils.getOptionsUpdate(state.options, action.payload),
      };
    case ActionTypes.GET_MOVIE_BY_ID_SUCCESS:
      return {
        ...state,
        currentMovie: action.payload,
      };
    case ActionTypes.ADD_MOVIE_SUCCESS:
      return {
        ...state,
        list: [action.payload, ...state.list.slice(0, -1)],
      };
    case ActionTypes.EDIT_MOVIE_SUCCESS:
      return {
        ...state,
        list: utils.getMoviesWithUpdate(state.list, action.payload),
      };
    case ActionTypes.DELETE_MOVIE_SUCCESS:
      return {
        ...state,
        list: state.list.filter((m) => m.id !== action.payload),
        options: _.assign({}, state.options, { totalAmount: state.options.totalAmount - 1 }),
      };
    default:
      return state;
  }
}
