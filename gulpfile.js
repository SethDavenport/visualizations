'use strict';

var gulp = require('gulp');
var awspublish = require('gulp-awspublish');

// TODO: rework with webpack.
gulp.task('deploy', function () {
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
