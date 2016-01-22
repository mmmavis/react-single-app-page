var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname, 'main.jsx'),
  output: {
    path: path.resolve(__dirname, path.join('public', 'build')),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [ 'babel-loader', 'eslint' ]
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css')
  ]
};


