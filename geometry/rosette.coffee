angular.module 'geometry.rosette', [ 'geometry.point', 'geometry.circle' ]
  .factory 'Rosette', [ 'Point', 'Circle', (Point, Circle) ->

    class Rosette
      constructor: (@guideCircle, @radius, @numCircles) ->
        throw TypeError "guideCircle must be Circle, was #{guideCircle}" if ! guideCircle instanceof Circle
        throw TypeError "radius must be a positive Number, was #{radius}" if !isFinite(radius) or radius <= 0
        throw TypeError "numCircles must be a positive Number, was #{numCircles}" if !isFinite(numCircles) or numCircles <= 0

      computeCircles: ->
        return (new Circle(point, @radius) for point in @guideCircle.getNPointsOnPerimeter @numCircles)

      computeVertices: ->
        vertices = []
        circles = @computeCircles()

        for circle1 in circles
          for circle2 in circles
            vertices = vertices.concat circle1.getIntersectionPoints circle2

        # Only 1 digit of subpixel precision needed.
        # TODO: compute radial resolution as < 2PI/numCircles.
        return _.chain(vertices)
          .map((v) -> v.toFixed(1)) 
          .uniq((v)-> v.toString())
          .groupBy((v) => v.angle(@guideCircle.center).toFixed(2))
          .map((vertices) => _.sortBy(vertices, (v) => v.distance(@guideCircle.center)))
          .value()

    return Rosette
  ]
