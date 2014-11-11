requirejs.config({
  paths: {
    // For on-the-fly coffee-script transpilation.
    cs: '//cdnjs.cloudflare.com/ajax/libs/require-cs/0.4.2/cs.min',
    'coffee-script': '//cdnjs.cloudflare.com/ajax/libs/coffee-script/1.7.1/coffee-script.min',

    // Bring external dependencies into the requirejs module system.
    jquery: '//code.jquery.com/jquery-1.11.1.min',
    underscore: '//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.6.0/underscore-min',
    angular: '//cdnjs.cloudflare.com/ajax/libs/angular.js/1.2.20/angular',
    prettify: '//google-code-prettify.googlecode.com/svn/loader/prettify',
    markupmin: '//prettydiff.com/lib/markupmin',
    markup_beauty: '//prettydiff.com/lib/markup_beauty'
  },

  shim: {
    underscore: { exports: '_' },
    angular: { exports: 'angular' },
    prettify: { exports: 'prettyPrintOne' },
    markupmin: { exports: 'markupmin' },
    markup_beauty: { exports: 'markup_beauty' }
  }
});

require([
  'jquery',
  'underscore',
  'angular',
  'prettify',
  'markupmin',
  'markup_beauty',
  'cs!geometry/point',
  'cs!geometry/circle',
  'cs!geometry/path',
  'cs!geometry/rosette',
  'cs!app/prettifier',
  'cs!app/controller'
  ],
  function(
    jquery,
    _,
    angular,
    prettify,
    markupmin,
    markup_beauty,
    Point,
    Circle,
    Path,
    Rosette,
    prettifier,
    controller
  ) {
    // Expose all these non-angular modules to the angular dependency injector.
    angular.module('app', [])
      .factory('Point', function() { return Point; })
      .factory('Circle', function(Point) { return Circle; })
      .factory('Path', function(Point) { return Path; })
      .factory('Rosette', function(Circle, Path) { return Rosette; })
      .factory('prettifier', function() { return prettifier; })
      .controller('Controller', controller);

    angular.bootstrap(document, ['app']);
  });
