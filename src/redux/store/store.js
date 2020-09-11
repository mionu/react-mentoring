import { createStore, combineReducers, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import reducers from '../reducers';
import rootEpic from '../epics';

const epicMiddleware = createEpicMiddleware();

const rootReducer = combineReducers({
    moviesReducer: reducers.moviesReducer,
});

const store = createStore(
    rootReducer,
    applyMiddleware(epicMiddleware),
);

epicMiddleware.run(rootEpic);

export default store;
