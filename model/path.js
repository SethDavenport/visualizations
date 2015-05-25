'use strict';

var GEO_Path = (function GEO_Path_Init() {
  return {
    Path: Path,
    centroid: R.curry(centroid),
    resize: R.curry(resize),
    computeMedians: R.curry(computeMedians),
    toPolySVG: R.curry(toPolySVG),
    toArcSVG: R.curry(toArcSVG),
    toQuadBezierSVG: R.curry(toQuadBezierSVG)
  }

  function Path(vertices) {
    this.vertices = vertices || [];
  }

  function centroid(path) {
    var sumX = 0,
      sumY = 0;
    for (let v of path.vertices) {
      sumX += v.x;
      sumY += v.y;
    }

    return new Point(
      sumX/path.vertices.length,
      sumY/path.vertices.length);
  }

  function resize(ratio) {
    var centroid = path.centroid();
    var newVertices = path.vertices.map(function(v) {
      var deltaX = centroid.x - v.x;
      var deltaY = centroid.y - v.y;
      var point = new Point(
          v.x + (deltaX * (1 - ratio)),
          v.y + (deltaY * (1 - ratio)));

      point.arcSweep = v.arcSweep;
      return point;
    });

    return new Path(newVertices);
  }

  function computeMedians(path) {
    var num = path.vertices.length;
    return R.map(
      function getMedian(i) {
        return GEO_Point.median(
          path.vertices[i],
          path.vertices[(i+1)%num]);
      },
      R.range(0, num));
  }

  function toPolySVG(path) {
    var drawCommands = path.vertices.reduce(
      function(acc, v) {
        return acc + (acc ? _toSVGLineCommand(v) : _toSVGMoveCommand(v));
      },
      '');

    drawCommands += 'Z';
    return drawCommands;
  }

  function toArcSVG(path, radius) {
    var drawCommands = '';
    var first = path.vertices[0];

    var drawCommands = path.vertices.reduce(
      function(acc, v) {
        return acc + (acc ? _toSVGArcCommand(v, radius) : _toSVGMoveCommand(v));
      },
      '');

    drawCommands += _toSVGArcCommand(first, radius) + 'Z';
    return drawCommands;
  }

  function toQuadBezierSVG(path) {
    var drawCommands = '';
    var medians = computeMedians(path);
    var first = medians[0];

    var drawCommands;

    for (var i=0; i<path.vertices.length; ++i) {
      drawCommands += (drawCommands ?
        _toSVGQuadCommand(path.vertices[i], medians[i]) :
        _toSVGMoveCommand(medians[i]));
    }

    drawCommands += _toSVGQuadCommand(path.vertices[0], medians[0]) + 'Z';
    return drawCommands;
  }

  function _toSVGMoveCommand(point) {
    return 'M ' + point.x + ' ' + point.y + ' ';
  }

  function _toSVGLineCommand(point) {
    return 'L ' + point.x + ' ' + point.y + ' ';
  }

  function _toSVGArcCommand(point, radius) {
    return 'A ' + radius + ' ' + radius + ' 0 0 ' + point.arcSweep +
      ' ' + point.x + ' ' + point.y + ' ';
  }

  function _toSVGQuadCommand(p1, p2) {
    return 'Q ' + p1.x + ' ' + p1.y + ' ' + p2.x + ' ' + p2.y + ' ';
  }
})();
