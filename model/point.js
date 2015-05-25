'use strict';

var GEO_Point = (function GEO_Point_Init() {
  return {
    Point: Point,
    add: R.curry(add),
    equals: R.curry(equals),
    distance: R.curry(distance),
    angle: R.curry(angle),
    median: R.curry(median),
    toFixed: R.curry(toFixed)
  };

  function Point(x, y) {
    this.x = x;
    this.y = y;
  }

  function add(p1, p2) {
    return new Point(p1.x + p2.x, p1.y + p2.y);
  }

  function equals(p1, p2) {
    return (p1.x === p2.x && p1.y === p2.y);
  }

  function distance(p1, p2) {
    var dx = p1.x - p2.x,
      dy = p1.y - p2.y;
    return Math.sqrt(dx*dx + dy*dy);
  }

  function angle(p1, p2) {
    var dx = p1.x - p2.x,
      dy = p1.y - p2.y;
    return Math.atan2(dy, dx);
  }

  function median(p1, p2) {
    return new Point((p1.x + p2.x)/2, (p1.y + p2.y)/2);
  }

  function toFixed(point, n) {
    return new Point(point.x.toFixed(n), point.y.toFixed(n));
  }
})();
