angular.module 'geometry.point', []
  .factory 'Point', [ ->

    class Point
      constructor: (@x, @y) ->
        throw TypeError "x must be a finite Number" if !isFinite(x)
        throw TypeError "y must be a finite Number" if !isFinite(y)

      add: (point) ->
        throw TypeError "point must be a Point" if !point instanceof Point
        return new Point(@x + point.x, @y + point.y)

    return Point
  ]
