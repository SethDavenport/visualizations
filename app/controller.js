import Point from 'geometry/point';
import Circle from 'geometry/circle';
import Rosette from 'geometry/rosette';
import { SVG_DOCTYPE } from './prettify-markup';

const MAX_COLOR_CLASSES = 6;

class Controller {
  constructor($http) {
    this.$http = $http;
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
    this.recompute();
    this.doctype = SVG_DOCTYPE;
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
}

export default Controller;
