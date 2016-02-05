import express from 'express';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { match, RoutingContext } from 'react-router';
import routes from './Routes.jsx';
import PageWrapper from './PageWrapper.jsx';

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
  console.log("==== server hit, req.path = ", req.path);
  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      console.log("error :(");
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      console.log("redirectLocation = ", redirectLocation);
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      // [FIXME] using ReactDOMServer.renderToString gives me the following warning:
      // "Warning: render(...): Replacing React-rendered children with a new root component. 
      // If you intended to update the children of this node, you should instead have 
      // the existing children update their state and render the new components instead of calling ReactDOM.render."
      res.status(200).send('<!DOCTYPE html>'+ ReactDOMServer.renderToStaticMarkup(<PageWrapper><RoutingContext {...renderProps} /></PageWrapper>));
    } else {
      serveStaticFiles(req.path, res);
    }
  })
});

app.listen(PORT, function() {
  console.log("\n///// Server listening at "+ PORT + " /////\n");
});
