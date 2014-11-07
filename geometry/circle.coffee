angular.module 'geometry.circle', [ 'geometry.point' ]
  .factory 'Circle', (Point) ->

    class Circle
      constructor: (@center, @radius) ->
        throw TypeError "center must be a Point, was #{@center}" if @center not instanceof Point
        throw TypeError "radius must be a finite, positive Number, was #{@radius}" if !isFinite(@radius) or @radius <= 0

      equals: (other) ->
        return false if !other instanceof Circle
        return @radius is other.radius and @center.equals other.center

      getNPointsOnPerimeter: (n) ->
        throw TypeError "n must be a finite, positive Number, was #{n}" if !isFinite n

        alpha = Math.PI * 2 / n

        return _.map (_.range 0, n), (i) =>
          theta = alpha * i
          return new Point Math.cos(theta) * @radius, Math.sin(theta) * @radius
          .add @center

      getIntersectionPoints: (other) ->
        throw TypeError "other must be a Circle, was #{other}" if other not instanceof Circle
        return [] if @equals other

        a = @center.x
        b = @center.y
        c = other.center.x
        d = other.center.y
        r = @radius
        s = other.radius

        e = c - a
        f = d - b
        p = Math.sqrt(Math.abs(e*e + f*f))
        return [] if p > Math.abs(r) + Math.abs(s)

        r2 = r*r
        k = (p*p + r2 - s*s)/(2*p)

        # Performance: avoid repeating heavy operations.
        sqrtR2minusK2 = Math.sqrt(Math.abs(r2 - k*k))
        fOverP = f/p
        eOverP = e/p
        kOverP = k/p
        eTimesKOverP = e*kOverP
        fTimesKOverP = f*kOverP
        fOverPTimesSqrtR2minusK2 = fOverP*sqrtR2minusK2
        eOverPTimesSqrtR2minusK2 = eOverP*sqrtR2minusK2

        x1 = a + eTimesKOverP + fOverPTimesSqrtR2minusK2
        y1 = b + fTimesKOverP - eOverPTimesSqrtR2minusK2
        x2 = a + eTimesKOverP - fOverPTimesSqrtR2minusK2
        y2 = b + fTimesKOverP + eOverPTimesSqrtR2minusK2

        result = [
          new Point(x1, y1),
          new Point(x2, y2) ]

        return result;

    return Circle
