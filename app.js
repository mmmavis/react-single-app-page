import express from 'express';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import routes from './routes.jsx';

var PORT = '9090';

var app = express();

app.set('view engine', 'html');

function serveStaticFiles(pathRequested, res) {
  if ( pathRequested === "/public/style.css" ) {
    res.sendFile( path.resolve("public/style.css") );
  } else if ( pathRequested === "/bundle.js" ) {
    res.sendFile( path.resolve("bundle.js") );
  } else {
    res.status(404).send('Not found');
  }
}

app.get('/*', function (req, res) {
  console.log("\n\n==== server hit ==== \n\n", req.path);
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
      serveStaticFiles(req.path, res);
    }
  })
});

app.listen(PORT, function() {
  console.log("\n///// Server listening at "+ PORT + " /////\n");
});
