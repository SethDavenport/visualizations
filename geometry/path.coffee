angular.module 'geometry.path', [ 'geometry.point' ]
  .factory 'Path', [ 'Point', (Point) ->
    class Path
      constructor: (@vertices = []) ->
        for v in @vertices
          throw TypeError "@vertices must contain only Points, found #{v}" if v not instanceof Point
        @medians = @_computeMedians()

      push: (point, arcSweep) ->
        throw TypeError "point must be an instance of Point, was #{point}" if point not instanceof Point
        p = new Point point.x, point.y
        p.arcSweep = arcSweep
        @vertices.push p
        @medians = @_computeMedians()

      centroid: ->
        sumX = 0
        sumY = 0
        for v in @vertices
          sumX += v.x
          sumY += v.y

        return new Point sumX/@vertices.length,
          sumY/@vertices.length

      resize: (ratio) ->
        newVertices = []
        centroid = @centroid()
        for v in @vertices
          deltaX = centroid.x - v.x
          deltaY = centroid.y - v.y
          point = new Point(
            v.x + (deltaX * (1 - ratio)),
            v.y + (deltaY * (1 - ratio)))
          point.arcSweep = v.arcSweep
          newVertices.push point

        return new Path newVertices

      toPolygonSVG: ->
        drawCommands = ''
        for v in @vertices
          drawCommands += (if !drawCommands then 'M' else 'L')
          drawCommands += "#{v.x} #{v.y} "
        drawCommands += "Z"
        return drawCommands

      toArcsSVG: (radius) ->
        drawCommands = ''
        for v in @vertices
          if !drawCommands
            drawCommands = "M #{v.x} #{v.y} "
          else
            drawCommands += "A #{radius} #{radius} 0 0 #{v.arcSweep} #{v.x} #{v.y} "

        v = @vertices[0]
        drawCommands += "A #{radius} #{radius} 0 0 #{v.arcSweep} #{v.x} #{v.y} Z"
        return drawCommands

      toQuadraticSVG: ->
        drawCommands = "M #{@medians[0].x} #{@medians[0].y} "
        num = @vertices.length
        for i in [1...@vertices.length]
          drawCommands += "Q #{@vertices[i].x} #{@vertices[i].y} " +
            " #{@medians[i].x} #{@medians[i].y} "

        drawCommands += "Q #{@vertices[0].x} #{@vertices[0].y} " +
            " #{@medians[0].x} #{@medians[0].y} Z"
        return drawCommands

      _computeMedians: ->
        num = @vertices.length
        return (@vertices[i].median(@vertices[(i+1)%num]) for i in [0...num])

    return Path
  ]
