angular.module 'geometry.rosette', [ 'geometry.point', 'geometry.circle' ]
  .factory 'Rosette', [ 'Point', 'Circle', (Point, Circle) ->

    class Rosette
      constructor: (@guideCircle, @radius, @numCircles) ->
        throw TypeError "guideCircle must be a Circle, was #{guideCircle}" if guideCircle not instanceof Circle
        throw TypeError "radius must be a finite, positive Number, was #{radius}" if !isFinite(radius) or radius <= 0
        throw TypeError "numCircles must be a finite, positive Number, was #{numCircles}" if !isFinite(numCircles) or numCircles <= 0

      computeCircles: ->
        return (new Circle(point, @radius) for point in @guideCircle.getNPointsOnPerimeter @numCircles)

      computeVertices: ->
        vertices = []
        circles = @computeCircles()

        for i in [0 ... circles.length]
          for j in [0 ... i]
            vertices = vertices.concat circles[i].getIntersectionPoints circles[j]

        return _.chain vertices
          .uniq (v) -> v.toString()
          .map (v) => { angle: @normalizeAngle(v.angle(@guideCircle.center)), point: v }
          .groupBy 'angle'
          .sortBy 'angle'
          .map (groups) => _.pluck(groups, 'point')
          .map (vertices) => _.sortBy(vertices, (v) => v.distance(@guideCircle.center))
          .value()

      normalizeAngle: (angle) ->
        out = angle.toFixed(2)
        out = '0.00' if out is (2*Math.PI).toFixed(2)
        return out

    return Rosette
  ]
