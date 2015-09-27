'use strict';

var HtmlWebpackPlugin = require('html-webpack-plugin');

var entryPoints = [];

module.exports = {
  entry: {
    'rosette-generator': './rosette-generator/index.jsx'
  },
  output: {
    path: 'dist',
    filename: '[name]-bundle.js',
    pathinfo: true
  },
  resolve: {
    extensions: ['', '.jsx', '.es6', '.js', '.scss']
  },
  devtool: 'source-map',
  plugins: [new HtmlWebpackPlugin({
    template: 'rosette-generator/index.html',
    inject: 'body'
  })],
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
