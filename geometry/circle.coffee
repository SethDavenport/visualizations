angular.module 'geometry.circle', [ 'geometry.point' ]
  .factory 'Circle', [ 'Point', (Point) ->

    class Circle
      constructor: (@center, @radius) ->
        throw TypeError "center must be a Point" if !@center instanceof Point
        throw TypeError "radius must be a finite Number" if !isFinite @radius

      getNPointsOnPerimeter: (n) ->
        throw TypeError "n must be an finite Number" if !isFinite n

        alpha = Math.PI * 2 / n

        return _.map (_.range 0, n), (i) =>
          theta = alpha * i
          return new Point Math.cos(theta) * @radius, Math.sin(theta) * @radius
          .add @center

      getIntersectionPoints: (other) ->
        throw TypeError "other must be a Circle" if !other instanceof Circle 

        # TODO
        return []

    return Circle;
  ]
