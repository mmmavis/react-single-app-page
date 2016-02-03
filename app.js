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

function htmlTemplate(appHtmlAsString) {
  return (`
    <!DOCTYPE html>
    <html>
      <head lang="en">
        <meta charSet="UTF-8" />
        <title>Simple React app with Webpack</title>
        <link href='https://fonts.googleapis.com/css?family=Open+Sans:400,300,300italic,400italic,600,600italic,700,700italic,800,800italic' rel='stylesheet' type='text/css' />
        <link href="../public/style.css" type="text/css" rel="stylesheet" />
      </head>
      <body>
        <div id="app" className="container">
          ${appHtmlAsString}
        </div>
        <script src="../bundle.js"></script>
      </body>
    </html>
  `);
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
      res.status(200).send( htmlTemplate(ReactDOMServer.renderToStaticMarkup(<RoutingContext {...renderProps} />)) );
    } else {
      serveStaticFiles(req.path, res);
    }
  })
});

app.listen(PORT, function() {
  console.log("\n///// Server listening at "+ PORT + " /////\n");
});
