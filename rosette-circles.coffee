angular.element(document).ready ->
  angular.module 'rosette.circles', ['geometry']
    .controller 'Controller', [
      '$scope',
      'Point',
      'Circle',

      ($scope, Point, Circle) ->
        $scope.guideCircle = new Circle(new Point(500, 500), 300)
        $scope.radius = 300
        $scope.numSamples = 32
        $scope.wireFrame = false

        $scope.getShapeClass = () ->
          return if $scope.wireFrame then 'shape-wireframe' else 'shape-normal'
        
        $scope.getHtmlClass = () ->
          return if $scope.wireFrame then 'html-wireframe' else 'html-normal'

        $scope.computeSamples = () ->
          $scope.samples = $scope.guideCircle.getNPointsOnPerimeter $scope.numSamples

        $scope.computeSamples()
      ]
  angular.bootstrap document, ['rosette.circles']
