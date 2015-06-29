'use strict';

var entryPoints = ['./rosette-generator/index.jsx'];
if (process.env.NODE_ENV !== 'production') {
  entryPoints.push('webpack-dev-server/client?http://localhost:8080');
}

module.exports = {
  entry: {
    'rosette-generator': entryPoints
  },
  output: {
    filename: 'dist/[name]-bundle.js',
    pathinfo: true
  },
  module: {
    loaders: [{
      test: /\.es6$/,
      loader: 'babel',
      exclude: /node_modules/
    },
    {
      test: /\.jsx$/,
      loader: 'jsx!babel',
      exclude: /node_modules/
    },
    {
      test: /\.scss$/,
      loader: 'style!css!sass?sourceMap',
      exclude: /node_modules/
    }]
  }
};
