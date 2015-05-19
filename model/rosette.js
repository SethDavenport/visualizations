'use strict';

function RosetteModel(guideCircle, radius, numCircles) {
  this.guideCircle = guideCircle;
  this.radius = radius;
  this.numCircles = numCircles;

  this.circles = _computeCircles(this.guideCircle, this.radius, this.numCircles);
  this.vertices = _computeVertices(this.circles, this.guideCircle.center);
  this.angles = R.keys(this.vertices);
  this.cells = _computeCells(this.numCircles, this.vertices);

  function _computeCircles(guideCircle, radius, numCircles) {
    return guideCircle.getNPointsOnPerimeter(numCircles)
      .map(function(point) {
        return new Circle(point, radius);
      });
  }

  function _computeVertices(circles, center) {
    var vertices = [];
    var result = {};

    R.range(0, circles.length).forEach(function(i) {
      R.range(0, i).forEach(function(j) {
        vertices = vertices.concat(circles[i].getIntersectionPoints(circles[j]));
      });
    });

    return _organizeVerticesAround(center)(vertices);
  }

  function _normalizeAngle(angle) {
    var out = angle.toFixed(2);
    if (out === '-3.14') return '3.14';
    if (out === '-0.00') return '0.00'; // Why JS u so borken?
    return out;
  }

  function _organizeVerticesAround(center) {
    return R.pipe(
      _groupByAngleFrom(center),
      R.mapObj(_sortByDistanceFrom(center)));
  }

  function _groupByAngleFrom(center) {
    return R.groupBy(function (point) {
      return _normalizeAngle(point.angle(center));
    });
  }

  function _sortByDistanceFrom(center) {
    return R.sortBy(function (point) {
      return point.distance(center);
    });
  }

  function _computeCells(
    numCircles,
    vertices
  ) {
    var cells = [];
    var angles = R.sort(function(a,b) {
        return a-b;
      },
      R.keys(vertices));
    var numRadials = angles.length;

    for (var i=0; i<numRadials; ++i) {
      var cellsForAngle = [];

      R.range(0, numCircles / 2).forEach(function processCell(distance) {
        var currentRadial = angles[i];
        var nextRadial = angles[(i+1) % numRadials];
        var nextNextRadial = angles[(i+2) % numRadials];
        var cell = new Path();

        if (0 === (i % 2)) {
          if (vertices[currentRadial][distance])  cell.push(vertices[currentRadial][distance], 0);
          if (vertices[nextRadial][distance])     cell.push(vertices[nextRadial][distance], 1);
          if (vertices[nextNextRadial][distance]) cell.push(vertices[nextNextRadial][distance], 1);
          if (vertices[nextRadial][distance-1])   cell.push(vertices[nextRadial][distance-1], 0);
        }
        else {
          if (vertices[currentRadial][distance])  cell.push(vertices[currentRadial][distance], 0);
          if (vertices[nextRadial][distance])     cell.push(vertices[nextRadial][distance], 1);
          if (vertices[nextNextRadial][distance]) cell.push(vertices[nextNextRadial][distance], 1);
          if (vertices[nextRadial][distance+1])   cell.push(vertices[nextRadial][distance+1], 0);
        }

        if (cell.vertices.length > 1) cellsForAngle.push(cell);
      });

      cells[i] = cellsForAngle;
    }

    return cells;
  }
}
