'use strict';

function RosetteModel(guideCircle, radius, numCircles) {
  this.guideCircle = guideCircle;
  this.radius = radius;
  this.numCircles = numCircles;

  this.circles = _computeCircles(this.guideCircle, this.radius, this.numCircles);
  this.vertices = _computeVertices(this.circles, this.guideCircle.center);
  this.angles = R.keys(this.vertices);
  this.radials = _computeRadials(this.vertices);
  this.cells = _computeCells(this.numCircles, this.vertices);

  function _computeCircles(guideCircle, radius, numCircles) {
    return guideCircle.getNPointsOnPerimeter(numCircles)
      .map(function(point) {
        return new Circle(point, radius);
      });
  }

  // Returns the rosette's vertices grouped by their angle with respect
  // to the center point.
  function _computeVertices(circles, center) {
    var vertices = [];
    var result = {};

    R.range(0, circles.length).forEach(function(i) {
      R.range(0, i).forEach(function(j) {
        vertices = vertices.concat(circles[i].getIntersectionPoints(circles[j]));
      });
    });

    var distanceFromCenter = function distanceFromCenter(point) {
      return point.distance(center);
    }

    var organizeVertices = R.pipe(
      R.uniq,
      R.map(R.curry(_toAngleMapRecord)(center)),
      R.groupBy(R.prop('angle')),
      R.mapObj(
        R.pipe(
          R.pluck('point'),
          R.sort(distanceFromCenter))));

    return organizeVertices(vertices);
  }

  function _toAngleMapRecord(center, vertex) {
    return {
      angle: _normalizeAngle(vertex.angle(center)),
      point: vertex
    };
  }

  function _normalizeAngle(angle) {
    var out = angle.toFixed(2);
    if (out === '-3.14') return '3.14';
    if (out === '-0.00') return '0.00'; // Why JS u so borken?
    return out;
  }

  function _computeRadials(vertices) {
    var toRadial = function toPath(points) {
      return new Path(points);
    }

    return R.mapObj(toRadial, vertices);
  }

  function _computeCells(
    numCircles,
    vertices
  ) {
    var cells = [];
    var numRadials = R.keys(vertices).length;
/* BOrken. fix.
    R.keys(vertices).forEach(function processAngles(angle) {
      var cellsForAngle = [];

      R.range(0, numCircles / 2).forEach(function processCell(distance) {
        var currentRadial = angle;
        var nextRadial = (angle+1) % numRadials;
        var nextNextRadial = (angle+2) % numRadials;
        var cell = new Path();
        console.log(angle, currentRadial, nextRadial, nextNextRadial)
        if (0 === (angle % 2)) {
          if (vertices[currentRadial][distance])  cell.push(vertices[currentRadial][distance], 0);
          if (vertices[nextRadial][distance])     cell.push(vertices[nextRadial][distance], 1);
          if (vertices[nextNextRadial][distance]) cell.push(vertices[nextNextRadial][distance], 1);
          if (vertices[nextRadial][distance-1])   cell.push(vertices[nextRadial][distance-1], 0);
        }
        else {
          if (vertices[currentRadial][distance])  cell.push(vertices[currentRadial][distance], 0);
          if (vertices[nextNextRadial][distance]) cell.push(vertices[nextNextRadial][distance], 1);
          if (vertices[nextRadial][distance+1])   cell.push(vertices[nextRadial][distance+1], 1);
          if (vertices[nextRadial][distance])     cell.push(vertices[nextRadial][distance], 0);
        }

        if (cell.vertices.length > 1) cellsForAngle.push(cell);
      });

      cells[angle] = cellsForAngle;
    });
*/
    return cells;
  }
}
