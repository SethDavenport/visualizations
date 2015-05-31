'use strict';

var gulp = require('gulp');
var react = require('gulp-react');
var concat = require('gulp-concat');
var gulpIf = require('gulp-if');
var uglify = require('gulp-uglify');
var copy = require('gulp-copy');
var del = require('del');

/**
 * Builds everything.
 */
gulp.task('default', ['build:rosette-generator']);

/**
 * Delete all build artifacts.
 */
gulp.task('clean', function(cb) {
  del(['dist'], cb);
});

/**
 * Builds the rosette library as a single minified JS file.
 */
gulp.task('build:rosette-lib', function () {
  return gulp.src([
    'bower_components/ramda/dist/ramda.js',
    'bower_components/react/react.js',
    'model/*.js',
    'components/*.jsx'
  ])
    .pipe(gulpIf(/\.jsx$/, react()))
    .pipe(concat('rosette.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

/**
 * Builds the rosette generator example.
 */
gulp.task(
  'build:rosette-generator',
  ['build:rosette-lib'],
  function () {
    return gulp.src('rosette-generator/*')
      .pipe(copy('dist'));
  });
