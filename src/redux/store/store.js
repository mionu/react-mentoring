import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { ajax } from 'rxjs/ajax';
import reducers from '../reducers';
import rootEpic from '../epics';

const epicMiddleware = createEpicMiddleware({
    dependencies: { ajax },
});

const rootReducer = combineReducers({
    movies: reducers.moviesReducer,
    shared: reducers.sharedReducer,
});

const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware),
);

epicMiddleware.run(rootEpic);

export default store;
