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

    this.modes = [
      { label: 'Overlapping Circles', value: 'CIRCLES', drawCells: false },
      { label: 'Warped Grid', value: 'LINEAR', drawCells: true },
      { label: 'Warped Grid (Arcs)', value: 'ARC', drawCells: true },
      { label: 'None', value: '', drawCells: false },
    ];

    this.mode = this.modes[2];
    this.inlaySize = 70;
    this.drawCellInlays = true;
    this.inlayStyle = this.inlayStyles[2];
    $http.get('svg.css').then((response) => this.svgCss = response.data);
    this.doctype = SVG_DOCTYPE;
    this.cellPathSpecs = new Map();
    this.inlayPathSpecs = new Map();
    this.recompute();
  }

  recompute() {
    this.rosette.recompute();

    this.cellPathSpecs.clear();
    this.cellPathSpecs.clear();
    for (let cellsForAngle of this.rosette.cells) {
      let i = 0;
      for (let cell of cellsForAngle) {
        cell.cssClass = "grid-cell-" + (i % MAX_COLOR_CLASSES);
        ++i;

        if (this.mode.drawCells) {
          this.cellPathSpecs.set(
          cell,
          getPathSpec(
            this.mode.value,
            this.rosette.radius,
            cell));
        }

        if (this.drawCellInlays) {
          this.inlayPathSpecs.set(
          cell,
          getPathSpec(
            this.inlayStyle.value,
            this.rosette.radius,
            cell.resize(this.inlaySize/100)));
        }
      }
    }

    for (let radial of this.rosette.radials) {
      radial.labelCoords = radial.vertices[radial.vertices.length - 1];
    }
  }
}

function getPathSpec(style, radius, cell) {
  switch(style) {
    case 'LINEAR': return cell.toPolygonSVG();
    case 'ARC': return cell.toArcsSVG(radius);
  }

  return cell.toQuadraticSVG();
}

export default Controller;
