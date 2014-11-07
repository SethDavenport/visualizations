angular.module 'geometry.rosette', [ 'geometry.point', 'geometry.circle', 'geometry.path' ]
  .factory 'Rosette', (Point, Circle, Path) ->

    class Rosette
      constructor: (@guideCircle, @radius, @numCircles) ->
        throw TypeError "guideCircle must be a Circle, was #{guideCircle}" if guideCircle not instanceof Circle
        throw TypeError "radius must be a finite, positive Number, was #{radius}" if !isFinite(radius) or radius <= 0
        throw TypeError "numCircles must be a finite, positive Number, was #{numCircles}" if !isFinite(numCircles) or numCircles <= 0
        @computeAll()

      computeAll: ->
        @circles = (new Circle(point, @radius) for point in @guideCircle.getNPointsOnPerimeter @numCircles)

        vertices = []
        for i in [0 ... @circles.length]
          for j in [0 ... i]
            vertices = vertices.concat @circles[i].getIntersectionPoints @circles[j]

        @vertices = _.chain vertices
          .uniq (v) -> v.toString()
          .map (v) => { angle: @normalizeAngle(v.angle(@guideCircle.center)), point: v }
          .groupBy 'angle'
          .sortBy 'angle'
          .map (groups) => _.pluck(groups, 'point')
          .map (vertices) => _.sortBy(vertices, (v) => v.distance(@guideCircle.center))
          .value()

        @angles = _.chain @vertices
          .keys()
          .map (key) -> Number key
          .value()

        @radials = (new Path @vertices[angle] for angle in @angles)

        @cells = []
        for angle in @angles
          cellsForAngle = []
          for distance in [0..@numCircles / 2]
            currentRadial = angle
            nextRadial = (angle+1)%@angles.length
            nextNextRadial = (angle+2)%@angles.length

            cell = new Path()
            if 0 is (angle % 2)
              cell.push @vertices[currentRadial][distance], 0 if @vertices[currentRadial][distance]
              cell.push @vertices[nextRadial][distance], 1 if @vertices[nextRadial][distance]
              cell.push @vertices[nextNextRadial][distance], 1 if @vertices[nextNextRadial][distance]
              cell.push @vertices[nextRadial][distance-1], 0 if @vertices[nextRadial][distance-1]
            else
              cell.push @vertices[currentRadial][distance], 0 if @vertices[currentRadial][distance]
              cell.push @vertices[nextRadial][distance+1], 1 if @vertices[nextRadial][distance+1]
              cell.push @vertices[nextNextRadial][distance], 1 if @vertices[nextNextRadial][distance]
              cell.push @vertices[nextRadial][distance], 0 if @vertices[nextRadial][distance]
            cellsForAngle.push cell if cell.vertices.length > 1
          @cells[angle] = cellsForAngle

      normalizeAngle: (angle) ->
        out = angle.toFixed(2)
        return '3.14' if out is '-3.14'
        return '0.00' if out is '-0.00' # Why JS u so borken?
        return out

    return Rosette
