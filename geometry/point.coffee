angular.module 'geometry.point', []
  .factory 'Point', [ ->

    class Point
      constructor: (@x, @y) ->
        throw TypeError "x must be a finite Number, was #{x}" if !isFinite(x)
        throw TypeError "y must be a finite Number, was #{y}" if !isFinite(y)

      add: (point) ->
        throw TypeError "point must be a Point, was #{point}" if !point instanceof Point
        return new Point @x + point.x, @y + point.y

      equals: (other) ->
        return false if !other instanceof Point
        return @x is other.x and @y is other.y

    return Point
  ]
