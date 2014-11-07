angular.module 'geometry.point', []
  .factory 'Point', ->

    class Point
      constructor: (@x, @y) ->
        throw TypeError "x must be a finite Number, was #{x}" if !isFinite(x)
        throw TypeError "y must be a finite Number, was #{y}" if !isFinite(y)

      add: (point) ->
        throw TypeError "point must be a Point, was #{point}" if point not instanceof Point
        return new Point @x + point.x, @y + point.y

      equals: (other) ->
        return false if !other instanceof Point
        return @x is other.x and @y is other.y

      distance: (other) ->
        throw TypeError "other must be a Point, was #{other}" if other not instanceof Point

        dx = @x - other.x
        dy = @y - other.y
        return Math.sqrt(dx*dx + dy*dy)

      angle: (other) ->
        throw TypeError "other must be a Point, was #{other}" if other not instanceof Point

        dx = @x - other.x
        dy = @y - other.y
        return Math.atan2 dy, dx

      median: (point) ->
        throw TypeError "point must be a Point, was #{point}" if point not instanceof Point
        return new Point (@x + point.x)/2, (@y + point.y)/2

      toString: (decimals)->
        if isFinite decimals
          return @toFixed(decimals).toString();
        return "(#{@x}, #{@y})"

      toFixed: (n) ->
        return new Point(@x.toFixed(n), @y.toFixed(n))

    return Point
