'use strict';
import R from 'ramda';
import * as GEO_Point from './point.es6';

export class Path {
  constructor(vertices) {
    this.vertices = vertices || [];
  }
}

export function centroid(path) {
  var sumX = 0;
  var sumY = 0;

  path.vertices.forEach(function (v) {
    sumX += v.x;
    sumY += v.y;
  });

  return new GEO_Point.Point(
    sumX/path.vertices.length,
    sumY/path.vertices.length);
}

export function resize(path, ratio) {
  var c = centroid(path);
  var newVertices = path.vertices.map(function(v) {
    var deltaX = c.x - v.x;
    var deltaY = c.y - v.y;
    var point = new GEO_Point.Point(
        v.x + (deltaX * (1 - ratio)),
        v.y + (deltaY * (1 - ratio)));

    point.arcSweep = v.arcSweep;
    return point;
  });

  return new Path(newVertices);
}

export function computeMedians(path) {
  var num = path.vertices.length;
  return R.map(
    function getMedian(i) {
      return GEO_Point.median(
        path.vertices[i],
        path.vertices[(i+1)%num]);
    },
    R.range(0, num));
}
