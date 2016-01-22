var express = require('express');
var Habitat = require('habitat');
var path = require('path');
var bodyParser = require('body-parser');
var compression = require('compression');
var Homepage = require('./pages/home.jsx');

Habitat.load();

var app = express();
var env = new Habitat();

app.enable('trust proxy');
app.use(compression());
app.use(express.static(path.join(__dirname, 'public'), {maxAge: 3600000}));
app.use(bodyParser.json());

app.get('/', function (request, response) {
  response.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/about', function (request, response) {
  response.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/', function home (req, res, next) {
  res.render(path.join(__dirname, '/public/index.html'), {
    reactHtml: React.renderToString(React.createFactory(Homepage)({}))
  });
});

module.exports = app;
