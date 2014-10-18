angular.element(document).ready ->
  angular.module 'rosette', ['geometry']
    .controller 'Controller', [
      '$scope'
      'Point'
      'Circle'
      'Path'
      'Rosette'

      ($scope, Point, Circle, Path, Rosette) ->
        class Model
          MAX_COLOR_CLASSES = 6

          constructor: (rosette) ->
            @circles = rosette.computeCircles()
            @vertices = rosette.computeVertices()
            @angles = rosette.computeAngles()
            @radials = rosette.computeRadials()
            @gridCells = rosette.computeCells()

            i = 0
            _.each @gridCells, (cell) ->
              colorIndex = i % MAX_COLOR_CLASSES
              cell.cssClass = "grid-cell-" + colorIndex
              ++i

            _.each @radials, (radial) =>
              [..., last] = radial.vertices
              radial.labelCoords = last

        $scope.rosette = new Rosette(
          new Circle(new Point(400, 400), 70),
          199,
          6)

        $scope.mode = 'CIRCLES'
        $scope.plotRadials = false
        $scope.plotVertices = false

        $scope.recompute = () ->
          $scope.model = new Model $scope.rosette

        $scope.exportSvg = () ->
          console.log('foo')
          #alert($('svg').outerhtml());

        $scope.recompute()
      ]
  angular.bootstrap document, ['rosette']
