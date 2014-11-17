import Point from 'geometry/point';
import Circle from 'geometry/circle';
import Path from 'geometry/path';
import Rosette from 'geometry/rosette';
import Prettifier from 'app/prettifier';
import Controller from 'app/controller';
import { angular } from 'shim';

// Expose all these non-angular modules to the angular dependency injector.
angular.module('app', [])
  .factory('Point',         () => Point)
  .factory('Circle',        () => Circle)
  .factory('Path',          (Point) => Path)
  .factory('Rosette',       (Circle, Path) => Rosette)
  .factory('prettifier',    () => new Prettifier())
  .controller('Controller', ($http, prettifier, Point, Circle, Rosette) => {
    return new Controller($http, prettifier, Point, Circle, Rosette);
  });

angular.bootstrap(document, ['app']);
