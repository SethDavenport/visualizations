angular.module 'geometry.path', [ 'geometry.point' ]
  .factory 'Path', [ 'Point', (Point) ->
    class Path
      constructor: (@vertices = []) ->
        _.each @vertices, (v) ->
          throw TypeError "@vertices must contain only Points, found #{v}" if v not instanceof Point

      push: (point, arcSweep) ->
        throw TypeError "point must be an instance of Point, was #{point}" if point not instanceof Point
        p = new Point point.x, point.y
        p.arcSweep = arcSweep
        @vertices.push p

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

    return Path
  ]
