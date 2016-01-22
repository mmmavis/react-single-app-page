import React from 'react';
import { Router, Route } from 'react-router';
import createHistory from 'history';

var routes = (
  <Route path="/" component={require('./pages/home.jsx')}>
    <Route name="home" path="/" component={require('./pages/home.jsx')} />
    <Route name="about" path="about" component={require('./pages/about.jsx')} />
  </Route>
);

React.render(<Router history={createHistory()} routes={routes}/>, document.getElementById('app'));

