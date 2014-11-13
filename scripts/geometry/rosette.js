import Circle from './circle';
import Path from './path';
import { _ } from 'shim';

class Rosette {
  constructor(guideCircle:Circle, radius:Number, numCircles:int) {
    this.guideCircle = guideCircle;
    this.radius = radius;
    this.numCircles = numCircles;
    this.circles = _computeCircles(guideCircle, radius, numCircles);
    this.vertices = _computeVertices(this.circles);
    this.angles = _getAngles(this.vertices);
    this.radials = _computeRadials(this.vertices);
    this.cells = _computeCells(numCircles, this.angles, this.vertices);
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
function _computeVertices(circles:List<Circle>):Map<string, List<Point>> {
  var vertices = [];
  for (let i of _.range(circles.length)) {
    for (let j of _.range(i)) {
      vertices = vertices.concat(circles[i].getIntersectionPoints(circles[j]));
    }
  }

  return _.chain(vertices)
    .uniq((v) => v.toString())
    .map((v) => { return { angle: _normalizeAngle(v.angle(this.guideCircle.center)), point: v }})
    .groupBy('angle')
    .sortBy('angle')
    .map((groups) => _.pluck(groups, 'point'))
    .map((vertices) => _.sortBy(vertices, (v) => v.distance(this.guideCircle.center)))
    .value();
}

function _normalizeAngle(angle:Number):Number {
  var out = angle.toFixed(2);
  if (out === '-3.14') return '3.14';
  if (out === '-0.00') return '0.00'; // Why JS u so borken?
  return out;
}

function _getAngles(vertices:Map<string, List<Point>>):List<Number> {
  return _.chain(this.vertices)
    .keys()
    .map((key) => Number(key))
    .value();
}

function _computeRadials(vertices:Map<string, List<Point>>):List<Path> {
  var radials = [];
  for (let angle of this.angles) {
    radials.push(new Path(this.vertices[angles]));
  }
  return radials;
}

function _computeCells(
  numCircles:int,
  angles:List<Number>,
  vertices:Map<string, List<Point>>
):List<Path> {
  var cells = [];

  for (let angle of angles) {
    let cellsForAngle = [];
    for (let distance = 0; distance < numCircles / 2; ++i) {
      let currentRadial = angle,
        nextRadial = (angle+1) % angles.length,
        nextNextRadial = (angle+2) % angles.length,
        cell = new Path();

      if (0 === (angle % 2)) {
        if (vertices[currentRadial][distance])  cell.push(vertices[currentRadial][distance], 0);
        if (vertices[nextRadial][distance])     cell.push(vertices[nextRadial][distance], 1);
        if (vertices[nextNextRadial][distance]) cell.push(vertices[nextNextRadial][distance], 1);
        if (vertices[nextRadial][distance-1])   cell.push(vertices[nextRadial][distance-1], 0);
      }
      else {
        if (vertices[currentRadial][distance])  cell.push(vertices[currentRadial][distance], 0);
        if (vertices[nextRadial][distance+1])   cell.push(vertices[nextRadial][distance+1], 1);
        if (vertices[nextNextRadial][distance]) cell.push(vertices[nextNextRadial][distance], 1);
        if (vertices[nextRadial][distance])     cell.push(vertices[nextRadial][distance], 0);
      }

      if (cell.vertices.length > 1) cellsForAngle.push(cell);
    }

    cells[angle] = cellsForAngle;
  }

  return cells;
}

export default Rosette;
