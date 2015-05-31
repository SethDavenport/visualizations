'use strict';

var GEO_Path = (function GEO_Path_Init() {
  return {
    Path: Path,
    centroid: R.curry(centroid),
    resize: R.curry(resize),
    computeMedians: R.curry(computeMedians)
  }

  function Path(vertices) {
    this.vertices = vertices || [];
  }

  function centroid(path) {
    var sumX = 0;
    var sumY = 0;

    path.vertices.forEach(function (v) {
      sumX += v.x;
      sumY += v.y;
    });

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
})();
