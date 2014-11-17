import Circle from './circle';
import Path from './path';
import { _ } from 'shim';

class Rosette {
  constructor(guideCircle:Circle, radius:Number, numCircles:int) {
    this.guideCircle = guideCircle;
    this.radius = radius;
    this.numCircles = numCircles;
    this.recompute();
  }

  recompute() {
    this.circles = _computeCircles(this.guideCircle, this.radius, this.numCircles);
    this.vertices = _computeVertices(this.circles, this.guideCircle.center);
    this.angles = [for (key of this.vertices.keys()) key]; // Iterator expansion.
    this.radials = _computeRadials(this.vertices);
    this.cells = _computeCells(this.numCircles, this.vertices);
  }
}

function _computeCircles(guideCircle:Circle, radius:Number, numCircles:int):List<Circle> {
  var circles = [];
  for (let point of guideCircle.getNPointsOnPerimeter(numCircles)) {
    circles.push(new Circle(point, radius));
  }
  return circles;
}

// Returns the rosette's vertices grouped by their angle with respect
// to the center point.
function _computeVertices(circles:List<Circle>, center):Map<string, List<Point>> {
  var vertices = [], result = new Map();
  for (let i of _.range(circles.length)) {
    for (let j of _.range(i)) {
      vertices = vertices.concat(circles[i].getIntersectionPoints(circles[j]));
    }
  }

  vertices = _.chain(vertices)
    .uniq((v) => v.toString())
    .map((v) => { return { angle: _normalizeAngle(v.angle(center)), point: v }})
    .groupBy('angle')
    .sortBy('angle')
    .map((groups) => _.pluck(groups, 'point'))
    .map((vertices) => _.sortBy(vertices, (v) => v.distance(center)))
    .value();

  _.each(vertices, (points, angle) => { result.set(Number(angle), points); });
  return result;
}

function _normalizeAngle(angle:Number):Number {
  var out = angle.toFixed(2);
  if (out === '-3.14') return '3.14';
  if (out === '-0.00') return '0.00'; // Why JS u so borken?
  return out;
}

function _computeRadials(vertices:Map<string, List<Point>>):List<Path> {
  var radials = [];
  for (let angle of vertices.keys()) {
    radials.push(new Path(vertices.get(angle)));
  }
  return radials;
}

function _computeCells(
  numCircles:int,
  vertices:Map<string, List<Point>>
):List<Path> {
  var cells = [];

  for (let angle of vertices.keys()) {
    let cellsForAngle = [];
    for (let distance of _.range(numCircles / 2)) {
      let currentRadial = angle,
        nextRadial = (angle+1) % vertices.size,
        nextNextRadial = (angle+2) % vertices.size,
        cell = new Path();

      if (0 === (angle % 2)) {
        if (vertices.get(currentRadial)[distance])  cell.push(vertices.get(currentRadial)[distance], 0);
        if (vertices.get(nextRadial)[distance])     cell.push(vertices.get(nextRadial)[distance], 1);
        if (vertices.get(nextNextRadial)[distance]) cell.push(vertices.get(nextNextRadial)[distance], 1);
        if (vertices.get(nextRadial)[distance-1])   cell.push(vertices.get(nextRadial)[distance-1], 0);
      }
      else {
        if (vertices.get(currentRadial)[distance])  cell.push(vertices.get(currentRadial)[distance], 0);
        if (vertices.get(nextRadial)[distance+1])   cell.push(vertices.get(nextRadial)[distance+1], 1);
        if (vertices.get(nextNextRadial)[distance]) cell.push(vertices.get(nextNextRadial)[distance], 1);
        if (vertices.get(nextRadial)[distance])     cell.push(vertices.get(nextRadial)[distance], 0);
      }

      if (cell.vertices.length > 1) cellsForAngle.push(cell);
    }

    cells[angle] = cellsForAngle;
  }

  return cells;
}

export default Rosette;
