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
          new Circle(new Point(400, 400), 149),
          150,
          24)

        $scope.mode = 'CIRCLES'
        $scope.plotRadials = false
        $scope.plotVertices = false

        $scope.recompute = () ->
          $scope.rosette.computeAll()

          for cellsForAngle in $scope.rosette.cells
            i = 0
            for cell in cellsForAngle
              colorIndex = i % MAX_COLOR_CLASSES
              cell.cssClass = "grid-cell-" + colorIndex
              ++i

          for radial in $scope.rosette.radials
            [..., last] = radial.vertices
            radial.labelCoords = last

        $scope.exportSvg = () ->
          console.log('foo')
          #alert($('svg').outerhtml());

        $scope.recompute()
      ]
  angular.bootstrap document, ['rosette']
