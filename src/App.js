import React, { lazy, Suspense } from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import NotFound from './containers/NotFound';
import Loading from './components/Loading';

const Home = lazy(() => import('./containers/Home'));
const Movie = lazy(() => import('./containers/Movie'));

export default function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <Router>
          <Suspense fallback={<Loading visible={true} />}>
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route path='/film/:id'>
                <Movie />
              </Route>
              <Route path='/search/:query'>
                <Home />
              </Route>
              <Route path='*'>
                <NotFound />
              </Route>
            </Switch>
          </Suspense>
        </Router>
      </Provider>
    </div>
  );
}
