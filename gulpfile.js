'use strict';

var gulp = require('gulp');
var awspublish = require('gulp-awspublish');
var webpack = require('webpack');
var webpackOptions = require('./webpack.config.js');

webpackOptions.plugins.push(
  new webpack.optimize.UglifyJsPlugin({minimize: true}));

gulp.task('webpack', function(callback) {
  webpack(webpackOptions, function(err, stats) {
    if (err) {
      throw err;
    }
    callback();
  });
});

gulp.task('deploy', ['webpack'], function () {
  var publisher = awspublish.create({
    params: {
      Bucket: 'generative-art'
    }
  });

  gulp.src(['dist/**/*'])
    .pipe(publisher.publish())
    .pipe(publisher.sync())
    .pipe(awspublish.reporter({
      states: ['create', 'update', 'delete']
    }));
});
