import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import routes from './routes';
import Homepage from './pages/home';

var app = express();

app.set('view engine', 'html');
app.use(express.static(__dirname));

app.get('/*', function (req, res) {  
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      console.log("error :(");
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      console.log("redirectLocation = ", redirectLocation);
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      res.status(200).send('<!DOCTYPE html>' + ReactDOMServer.renderToString(<RoutingContext {...renderProps} />))
    } else {
      res.status(404).send('Not found')
    }
  })
});

module.exports = app;
