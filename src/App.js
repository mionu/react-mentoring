import React from 'react';
import './App.scss';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import Home from './containers/Home';
import Movie from './containers/Movie';
import store from './redux/store';

export default function App() {
  return (
    <div className='App'>
      <Provider store={store}>
        <Router>
          <Switch>
            <Route path='/movie/:id'>
              <Movie />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}
