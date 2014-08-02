'use strict'

angular.module('geometry.point', [])
  .factory('Point', [
    function() {
      function Point(x, y) {
        this.x = x;
        this.y = y
      }

      Point.prototype.add = function(point) {
        if (!point instanceof Point) throw TypeError("point must be a Point");

        return new Point(
          this.x + point.x,
          this.y + point.y);
      }

      return Point;
    }
  ]);