angular.element(document).ready ->
  angular.module 'rosette', ['geometry']
    .controller 'Controller', [
      '$scope',
      'Point',
      'Circle',
      'Rosette',

      ($scope, Point, Circle, Rosette) ->
        $scope.rosette = new Rosette(
          new Circle(new Point(400, 400), 300),
          300,
          32)

        $scope.wireFrame = false
        $scope.circles = []
        $scope.vertices = []
        $scope.uniqueVertices = []

        $scope.getShapeClass = () ->
          return if $scope.wireFrame then 'shape-wireframe' else 'shape-normal'

        $scope.getHtmlClass = () ->
          return if $scope.wireFrame then 'html-wireframe' else 'html-normal'

        $scope.recompute = () ->
          $scope.circles = $scope.rosette.computeCircles()
          $scope.vertices = $scope.rosette.computeVertices()

        $scope.recompute()
      ]
  angular.bootstrap document, ['rosette']
