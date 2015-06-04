'use strict';

var gulp = require('gulp');
var react = require('gulp-react');
var concat = require('gulp-concat');
var gulpIf = require('gulp-if');
var uglify = require('gulp-uglify');
var copy = require('gulp-copy');
var del = require('del');
var awspublish = require('gulp-awspublish');
var sass = require('gulp-sass');

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
  ['build:rosette-lib', 'sass:rosette-generator'],
  function () {
    return gulp.src(['rosette-generator/**.html', 'rosette-generator/**/*.js'])
      .pipe(copy('dist'));
  });

gulp.task('sass:rosette-generator', function () {
  gulp.src('rosette-generator/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/rosette-generator'));
});

gulp.task('deploy', ['build:rosette-generator'], function () {
  var publisher = awspublish.create({
    params: {
      Bucket: 'generative-art'
    }
  });

  gulp.src('dist/**/*')
    .pipe(publisher.publish())
    .pipe(publisher.sync())
    .pipe(awspublish.reporter({
      states: ['create', 'update', 'delete']
    }));
});