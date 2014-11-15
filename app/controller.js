function controller($scope, $http, prettifier, Point, Circle, Path, Rosette) {
  const MAX_COLOR_CLASSES = 6
  $scope.rosette = new Rosette(
    new Circle(new Point(400, 400), 430),
    530,
    20);

  $scope.inlayStyles = [
    { label: 'Linear', value: 'LINEAR' },
    { label: 'Arc', value: 'ARC' },
    { label: 'Quadratic Bezier', value: 'QBEZIER' },
  ];

  $scope.mode = 'GRID_ARCS';
  $scope.inlaySize = 70;
  $scope.drawCellInlays = true;
  $scope.inlayStyle = $scope.inlayStyles[2];
  $http.get('svg.css').then((response) => $scope.svgCss = response.data);

  $scope.recompute = function() {
    $scope.rosette.recompute();

    for (let cellsForAngle of $scope.rosette.cells) {
      let i = 0;
      for (let cell of cellsForAngle) {
        cell.cssClass = "grid-cell-" + (i % MAX_COLOR_CLASSES);
        ++i;
      }
    }

    for (let radial of $scope.rosette.radials) {
      radial.labelCoords = radial.vertices[radial.vertices.length - 1];
    }
  }

  $scope.getInlayPathSpec = function(cell) {
    let resizedCell = cell.resize($scope.inlaySize/100);
    switch($scope.inlayStyle.value) {
      case 'LINEAR': return resizedCell.toPolygonSVG();
      case 'ARC':    return resizedCell.toArcsSVG($scope.rosette.radius);
    }
    return resizedCell.toQuadraticSVG();
  }

  $scope.showSource = function() {
    let svgSource = '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" ' +
      '"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">' +
      angular.element('#rendering').html();
    svgSource = svgSource.replace(/<svg.*?>/, '<svg><defs>' +
      '<style type="text/css"><![CDATA[' +
      $scope.svgCss +
      ']]></style>' +
      '</defs>');

    angular.element('#svg-source').html(prettifier.prettify(svgSource, ['ng-']));
    $scope.srcVisible = true;
  }

  $scope.hideSource = function() {
    $scope.srcVisible = false;
  }

  $scope.selectSource = function() {
    var sourceBox = document.getElementById('svg-source');

    if (document.body.createTextRange) {
      let range = document.body.createTextRange();

      range.moveToElementText(sourceBox);
      range.select();
    }

    else if (window.getSelection) {
      let selection = window.getSelection(),
        range = document.createRange();

      range.selectNodeContents(sourceBox);
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  $scope.hideSource();
  $scope.recompute();
}

export default controller;
