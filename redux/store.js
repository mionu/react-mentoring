import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import { createWrapper } from 'next-redux-wrapper';
import { ajax } from 'rxjs/ajax';
import reducers from './reducers';
import rootEpic from './epics';

const reducer = combineReducers({
    movies: reducers.moviesReducer,
    shared: reducers.sharedReducer,
});

const devtools = (process.browser && window.__REDUX_DEVTOOLS_EXTENSION__)
  ? window.__REDUX_DEVTOOLS_EXTENSION__()
  : f => f;

export const createAppStore = () => {
    const epicMiddleware = createEpicMiddleware({
        dependencies: { ajax },
    });
    const store = createStore(reducer, compose(
        applyMiddleware(epicMiddleware),
        devtools,
    ));

    epicMiddleware.run(rootEpic);

    return store;
};

export const wrapper = createWrapper(createAppStore);
