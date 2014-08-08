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

        for i in [0 ... circles.length]
          for j in [0 .. i]
            vertices = vertices.concat circles[i].getIntersectionPoints circles[j]

        # TODO: compute radial resolution as < 2PI/numCircles.
        grid = _.chain vertices
          .uniq (v) -> v.toString()
          .map (v) => { angle: v.angle(@guideCircle.center).toFixed(2), point: v }
          .groupBy 'angle'
          .sortBy 'angle'
          .map (groups) => _.pluck(groups, 'point')
          .map (vertices) => _.sortBy(vertices, (v) => v.distance(@guideCircle.center))
          .value()
        return grid

    return Rosette
  ]
