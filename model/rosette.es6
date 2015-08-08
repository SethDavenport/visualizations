'use strict';
import * as GEO_Point from './point.es6';
import * as GEO_Path from './path.es6';
import * as GEO_Circle from './circle.es6';
import R from 'ramda';

export class Rosette {
  constructor(guideCircle, radius, numCircles) {
    this.guideCircle = guideCircle;
    this.radius = radius;
    this.numCircles = numCircles;
  }
}

export var computeCircles = R.curry(rosette => {
  return R.map(
    function (point) {
      return new GEO_Circle.Circle(point, rosette.radius);
    },
    GEO_Circle.computeNPointsOnPerimeter(
      rosette.guideCircle,
      rosette.numCircles));
});

export var computeVertices = R.curry(rosette => {
  var vertices = [];
  var result = {};
  var circles = computeCircles(rosette);

  R.range(0, circles.length).forEach(function forEachCircle1(i) {
    R.range(0, i).forEach(function forEachCircle2(j) {
      vertices = vertices.concat(
        GEO_Circle.computeIntersectionPoints(
          circles[i],
          circles[j]));
    });
  });

  return _organizeVerticesAround(rosette.guideCircle.center)(vertices);
});

export var computeCells = R.curry((rosette, sizePercent) => {
  var cells = [];
  var vertices = computeVertices(rosette);
  var angles = R.sort(function(a,b) {
      return a-b;
    },
    R.keys(vertices));
  var numRadials = angles.length;

  for (var i=0; i<numRadials; ++i) {
    var cellsForAngle = [];

    R.range(0, rosette.numCircles / 2).forEach(function processCell(distance) {
      var currentRadial = angles[i];
      var nextRadial = angles[(i+1) % numRadials];
      var nextNextRadial = angles[(i+2) % numRadials];
      var cell = [];

      if (0 === (i % 2)) {
        if (vertices[currentRadial][distance])  cell.push(_choose(vertices, currentRadial, distance, 0));
        if (vertices[nextRadial][distance])     cell.push(_choose(vertices, nextRadial, distance, 1));
        if (vertices[nextNextRadial][distance]) cell.push(_choose(vertices, nextNextRadial, distance, 1));
        if (vertices[nextRadial][distance-1])   cell.push(_choose(vertices, nextRadial, distance-1, 0));
      }
      else {
        if (vertices[currentRadial][distance])  cell.push(_choose(vertices, currentRadial, distance, 0));
        if (vertices[nextRadial][distance])     cell.push(_choose(vertices, nextRadial, distance, 1));
        if (vertices[nextNextRadial][distance]) cell.push(_choose(vertices, nextNextRadial, distance, 1));
        if (vertices[nextRadial][distance+1])   cell.push(_choose(vertices, nextRadial, distance+1, 0));
      }

      if (cell.length > 1) {
        let path = new GEO_Path.Path(cell);

        if (sizePercent > 0) {
          path = GEO_Path.resize(path, sizePercent / 100);
        }

        cellsForAngle.push(path);
      }
    });

    cells[i] = cellsForAngle;
  }

  return cells;
});

function _choose(vertices, radial, distance, arcSweep) {
  var vertex = vertices[radial][distance];
  var result = new GEO_Point.Point(vertex.x, vertex.y);
  result.arcSweep = arcSweep;
  return result;
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
  return R.groupBy(function getAngle(point) {
    return _normalizeAngle(GEO_Point.angle(point, center));
  });
}

function _sortByDistanceFrom(center) {
  return R.sortBy(GEO_Point.distance(center));
}
