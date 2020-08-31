import React from 'react';
import './App.scss';
import Home from './containers/Home';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import Movie from './containers/Movie';

export default function App() {
  return (
    <div className='App'>
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
    </div>
  );
}
