angular.element(document).ready ->
  angular.module 'rosette', ['geometry']
    .controller 'Controller', [
      '$scope'
      '$http'
      'Point'
      'Circle'
      'Path'
      'Rosette'

      ($scope, $http, Point, Circle, Path, Rosette) ->
        MAX_COLOR_CLASSES = 6
        $scope.rosette = new Rosette(
          new Circle(new Point(400, 400), 512),
          600,
          32)

        $scope.inlayStyles = [
          { label: 'Linear', value: 'LINEAR' }
          { label: 'Arc', value: 'ARC' }
          { label: 'Quadratic Bezier', value: 'QBEZIER' }
        ]

        $scope.mode = 'GRID_ARCS'
        $scope.inlaySize = 70
        $scope.drawCellInlays = true
        $scope.inlayStyle = $scope.inlayStyles[2]
        $http.get('svg.css').then (response) -> $scope.svgCss = response.data

        $scope.recompute = ->
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

        $scope.getInlayPathSpec = (cell) ->
          resizedCell = cell.resize $scope.inlaySize/100
          switch $scope.inlayStyle.value
            when 'LINEAR' then return resizedCell.toPolygonSVG()
            when 'ARC' then return resizedCell.toArcsSVG $scope.rosette.radius
          return resizedCell.toQuadraticSVG()

        $scope.showSource = ->
          angular.element('#svg-source').html(prettifyXml(getSvgSrc()))
          $scope.srcVisible = true

        $scope.hideSource = -> $scope.srcVisible = false

        getSvgSrc = ->
          rawSvg = angular.element('#rendering').html()
          rawSvg = rawSvg.replace /<!--[\s\S]*?-->/g, ''
          rawSvg = rawSvg.replace /ng-\S*?="[\s\S]*?"/g, ''
          rawSvg = rawSvg.replace /\n/g, ''
          rawSvg = '<svg>' +
            '<defs>' +
            '<style type="text/css"><![CDATA[' +
            $scope.svgCss +
            ']]></style>' +
            '</defs>' +
            rawSvg +
            '</svg>'
          return rawSvg.replace />/g, '>\n'

        escapeXml = (xml) -> angular.element('<div/>').text(xml).html()

        prettifyXml = (xml) ->
          escapedXml = escapeXml xml
          return window.prettyPrintOne escapedXml, 'xml'
        
        $scope.hideSource()
        $scope.recompute()
      ]
  angular.bootstrap document, ['rosette']
