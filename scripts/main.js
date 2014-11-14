import Point from 'geometry/point';
import Circle from 'geometry/circle';
import Path from 'geometry/path';
import Rosette from 'geometry/rosette';
import Prettifier from 'app/prettifier';
import controller from 'app/controller';
import { angular } from 'shim';

// Expose all these non-angular modules to the angular dependency injector.
angular.module('app', [])
  .factory('Point', function() { return Point; })
  .factory('Circle', function(Point) { return Circle; })
  .factory('Path', function(Point) { return Path; })
  .factory('Rosette', function(Circle, Path) { return Rosette; })
  .factory('prettifier', function() { return new Prettifier(); })
  .controller('Controller', controller);

angular.bootstrap(document, ['app']);
