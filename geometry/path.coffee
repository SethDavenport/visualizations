angular.module 'geometry.path', [ 'geometry.point' ]
  .factory 'Path', [ 'Point', (Point) ->
    class Path
      constructor: (@vertices = []) ->
        _.each @vertices, (v) ->
          throw TypeError "@vertices must contain only Points, found #{v}" if v not instanceof Point

      push: (point) ->
        throw TypeError "point must be an instance of Point, was #{point}" if point not instanceof Point
        @vertices.push(point)

      toPolygonSVG: ->
        drawCommands = ''
        _.each(@vertices, (v) ->
          drawCommands += (if !drawCommands then 'M' else 'L')
          drawCommands += "#{v.x} #{v.y} ")
        drawCommands += "Z"
        return drawCommands

    return Path
  ]
