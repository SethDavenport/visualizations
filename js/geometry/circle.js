'use strict'

angular.module('geometry.circle', [
  'geometry.circle'
  ])
  .factory('Circle', [
    'Point',

    function(Point) {
      function Circle(center, radius) {
        if (!center instanceof Point) throw TypeError("center must be a Point");
        if (!isFinite(radius))        throw TypeError("radius must be a finite Number");

        this.center = center;
        this.radius = radius;
      }

      Circle.prototype.getNPointsOnPerimeter = function(n) {
        if (!isFinite(n)) throw TypeError("n must be an finite Number");

        var alpha = Math.PI * 2 / n;
        var self = this;

        return _.map(
          _.range(0, n),
          function(i) {
            var theta = alpha * i;
            return new Point(
              Math.cos(theta) * self.radius,
              Math.sin(theta) * self.radius)
            .add(self.center);
          });
      }

      return Circle;
    }
  ]);