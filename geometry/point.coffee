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

      distance: (other) ->
        throw TypeError "other must be a Point, was #{other}" if !other instanceof Point

        dx = @x - other.x
        dy = @y - other.y
        return Math.sqrt(dx*dx + dy*dy)

      angle: (other) ->
        throw TypeError "other must be a Point, was #{other}" if !other instanceof Point

        dx = @x - other.x
        dy = @y - other.y
        return 0 if dx is 0 and dy is 0

        if dx is 0
          return if dy < 0 then Math.PI/2 else 3*Math.PI/2

        alpha = Math.atan(Math.abs(dy/dx))
        if dx < 0
          return if dy <= 0 then alpha else 2*Math.PI - alpha

        return if dy < 0 then Math.PI - alpha else Math.PI + alpha

      toString: (decimals)->
        displayX = if isFinite(decimals) then @x.toFixed(decimals) else @x
        displayY = if isFinite(decimals) then @y.toFixed(decimals) else @y
        return "(#{displayX}, #{displayY})"

      toFixed: (n) ->
        return new Point(@x.toFixed(n), @y.toFixed(n))

    return Point
  ]
