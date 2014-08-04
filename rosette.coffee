angular.element(document).ready ->
  angular.module 'rosette', ['geometry']
    .controller 'Controller', [
      '$scope',
      'Point',
      'Circle',

      ($scope, Point, Circle) ->
        $scope.guideCircle = new Circle(new Point(400, 400), 300)
        $scope.radius = 300
        $scope.numSamples = 32
        $scope.wireFrame = false

        $scope.intersections = [];

        $scope.getShapeClass = () ->
          return if $scope.wireFrame then 'shape-wireframe' else 'shape-normal'

        $scope.getHtmlClass = () ->
          return if $scope.wireFrame then 'html-wireframe' else 'html-normal'

        $scope.computeSamples = () ->
          samples = $scope.guideCircle.getNPointsOnPerimeter $scope.numSamples
          circles = (new Circle(point, $scope.radius) for point in samples)

          intersections = []
          for circle1 in circles
            for circle2 in circles
              intersections = intersections.concat circle1.getIntersectionPoints circle2

          $scope.samples = samples
          $scope.intersections = intersections

        $scope.computeSamples()
      ]
  angular.bootstrap document, ['rosette']
