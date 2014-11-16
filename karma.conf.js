// Karma configuration
// Generated on Thu Aug 07 2014 23:09:04 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({

    basePath: '',
    frameworks: ['requirejs', 'mocha', 'chai', 'sinon', 'traceur'],

    files: [
      { pattern: 'geometry/point.js', included: false },
      { pattern: 'spec/point.angle.spec.js', included: false },
      'test-main.js'
    ],

    exclude: ['karma.conf.js'],
    preprocessors: {
      'geometry/*.js': ['traceur'],
      'spec/*.js': ['traceur']
    },

    traceurPreprocessor: {
      options: {
        sourceMaps: true,
        modules: 'amd',
        types: true
      }
    },

    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['Chrome'],
    singleRun: false
  });
};
