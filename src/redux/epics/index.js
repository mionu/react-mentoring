import { combineEpics } from 'redux-observable';
import {
    getMoviesListEpic,
    setOptionsEpic,
    loadMoreEpic,
    getMovieByIdEpic,
    addMovieEpic,
    editMovieEpic,
    deleteMovieEpic,
} from './movies-epics';

export default combineEpics(
    getMoviesListEpic,
    setOptionsEpic,
    loadMoreEpic,
    getMovieByIdEpic,
    addMovieEpic,
    editMovieEpic,
    deleteMovieEpic,
);
