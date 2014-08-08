angular.element(document).ready ->
  angular.module 'rosette', ['geometry']
    .controller 'Controller', [
      '$scope',
      'Point',
      'Circle',
      'Rosette',

      ($scope, Point, Circle, Rosette) ->
        $scope.rosette = new Rosette(
          new Circle(new Point(400, 400), 70),
          199,
          14)

        $scope.mode = 'CIRCLES'
        $scope.wireFrame = false
        $scope.plotRadials = false
        $scope.plotVertices = false
        $scope.circles = []
        $scope.vertices = []

        $scope.getShapeClass = () ->
          return if $scope.wireFrame then 'shape-wireframe' else 'shape-normal'

        $scope.getHtmlClass = () ->
          return if $scope.wireFrame then 'html-wireframe' else 'html-normal'

        $scope.getVertexClass = (angle) ->
          return ('vertex-' + _.indexOf($scope.angles, angle) % 6)

        $scope.getTextClass = (angle) ->
          return ('text-' + _.indexOf($scope.angles, angle) % 6)

        $scope.getRadialClass = (angle) ->
          return ('radial-' + _.indexOf($scope.angles, angle) % 6)

        $scope.getRadialPath = (angle) ->
          result = ''
          _.each($scope.vertices[angle], (v) ->
            result += (if !result then 'M' else 'L')
            result += "#{v.x} #{v.y} ")
          result += "Z"
          return result

        $scope.getRadialLabelCoords = (angle) ->
          [..., last] = $scope.vertices[angle]
          return last;

        $scope.recompute = () ->
          $scope.circles = $scope.rosette.computeCircles()
          $scope.vertices = $scope.rosette.computeVertices()
          $scope.angles = _.keys $scope.vertices

        $scope.recompute()
      ]
  angular.bootstrap document, ['rosette']
