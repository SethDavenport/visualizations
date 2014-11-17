const MAX_COLOR_CLASSES = 6;

class Controller {
  constructor($http, prettifier, Point, Circle, Rosette) {
    this.$http = $http;
    this.prettifier = prettifier;
    this.rosette = new Rosette(
      new Circle(new Point(400, 400), 430),
      530,
      20);

    this.inlayStyles = [
      { label: 'Linear', value: 'LINEAR' },
      { label: 'Arc', value: 'ARC' },
      { label: 'Quadratic Bezier', value: 'QBEZIER' },
    ];

    this.mode = 'GRID_ARCS';
    this.inlaySize = 70;
    this.drawCellInlays = true;
    this.inlayStyle = this.inlayStyles[2];
    $http.get('svg.css').then((response) => this.svgCss = response.data);
    this.hideSource();
    this.recompute();
  }

  recompute() {
    this.rosette.recompute();

    for (let cellsForAngle of this.rosette.cells) {
      let i = 0;
      for (let cell of cellsForAngle) {
        cell.cssClass = "grid-cell-" + (i % MAX_COLOR_CLASSES);
        ++i;
      }
    }

    for (let radial of this.rosette.radials) {
      radial.labelCoords = radial.vertices[radial.vertices.length - 1];
    }
  }

  getInlayPathSpec(cell) {
    let resizedCell = cell.resize(this.inlaySize/100);
    switch(this.inlayStyle.value) {
      case 'LINEAR': return resizedCell.toPolygonSVG();
      case 'ARC':    return resizedCell.toArcsSVG(this.rosette.radius);
    }
    return resizedCell.toQuadraticSVG();
  }

  showSource() {
    let svgSource = '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" ' +
      '"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">' +
      angular.element('#rendering').html();
    svgSource = svgSource.replace(/<svg.*?>/, '<svg><defs>' +
      '<style type="text/css"><![CDATA[' +
      this.svgCss +
      ']]></style>' +
      '</defs>');

    angular.element('#svg-source').html(this.prettifier.prettify(svgSource, ['ng-']));
    this.srcVisible = true;
  }

  hideSource() {
    this.srcVisible = false;
  }

  selectSource() {
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
}

export default Controller;
