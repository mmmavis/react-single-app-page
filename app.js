import express from 'express';
import Habitat from 'habitat';
import path from 'path';
import bodyParser from 'body-parser';
import compression from 'compression';
import React from 'react';
import { ReactDOMServer, renderToString } from 'react-dom/server';
import { Router, match, RoutingContext } from 'react-router';
import routes from './Routes';
import Homepage from './pages/home';

Habitat.load();

var app = express();
var env = new Habitat();

// app.enable('trust proxy');
// app.use(compression());
// app.use(bodyParser.json());

app.set('view engine', 'html');
app.use(express.static(__dirname));

// app.get('/', function (req, res) {
//   console.log(ReactDOMServer.renderToString(<Homepage />));
//   res.sendFile(path.join(__dirname, '../public/index.html'));
// });

// app.get('/about', function (req, res) {
//   console.log("path.join(__dirname, 'public/index.html') === ", path.join(__dirname, 'public/index.html'));
//   res.sendFile(path.join(__dirname, 'public/index.html'));
// });

// app.get('/', function home (req, res, next) {
//   console.log("\n\n\n\n\n\n\n\n\n\n\n\n //////// ",path.join(__dirname, '/public/index.html'));
//   res.render(path.join(__dirname, '/public/index.html'), {
//     reactHtml: ReactDOMServer.renderToString(<Homepage />)
//   });
// });

app.get('/*', function (req, res) {  
  console.log("\n\n\n\n //////// req.url = ", req.url);
  // res.status(200)
  //    .send(path.join(__dirname, '/public/index.html'),ReactDOMServer.renderToString(<Homepage />));

  // res.render(path.join(__dirname, '/public/index.html'), function(err, html) {
  //   console.log("\n\n\n\n ******");
  //   console.log(html);
  //   res.send(ReactDOMServer.renderToString(<Homepage />));
  // });

  // res.sendFile(path.join(__dirname, 'public/index.html'));

 match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      console.log("error :(");
      res.status(500).send(error.message)
    } else if (redirectLocation) {
      console.log("redirectLocation = ", redirectLocation);
      res.redirect(302, redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      // console.log("renderProps = ", renderProps);
      console.log("renderProps");
      res.status(200).send(renderToString(<RoutingContext {...renderProps} />))
    } else {
      console.log("else, 404");
      res.status(404).send('Not found')
    }
  })



  // Router.run(routes, req.url, Handler => {
  //   let content = React.renderToString(<Handler />);
  //   res.render('index', { content: content });
  // });
});



module.exports = app;
