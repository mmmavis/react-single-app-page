import React from 'react';
import { Router, Route } from 'react-router';
import createHistory from 'history';

module.exports = (
  <Route path="/" handler={require('./pages/home')}>
    <Route name="home" path="/" handler={require('./pages/home')} />
    <Route name="about" path="/about" handler={require('./pages/about')} />
  </Route>
);

