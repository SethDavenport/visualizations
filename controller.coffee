angular.element(document).ready ->
  angular.module 'rosette', ['geometry']
    .controller 'Controller', [
      '$scope'
      'Point'
      'Circle'
      'Path'
      'Rosette'

      ($scope, Point, Circle, Path, Rosette) ->
        MAX_COLOR_CLASSES = 6
        $scope.rosette = new Rosette(
          new Circle(new Point(400, 400), 70),
          199,
          6)

        $scope.mode = 'CIRCLES'
        $scope.plotRadials = false
        $scope.plotVertices = false

        $scope.recompute = () ->
          $scope.rosette.computeAll()

          i = 0
          _.each $scope.rosette.cells, (cell) ->
            colorIndex = i % MAX_COLOR_CLASSES
            cell.cssClass = "grid-cell-" + colorIndex
            ++i

          _.each $scope.rosette.radials, (radial) =>
            [..., last] = radial.vertices
            radial.labelCoords = last

        $scope.exportSvg = () ->
          console.log('foo')
          #alert($('svg').outerhtml());

        $scope.recompute()
      ]
  angular.bootstrap document, ['rosette']
