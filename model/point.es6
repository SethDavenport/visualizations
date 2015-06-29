'use strict';
import R from 'ramda';

export class Point {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

export var add = R.curry((p1, p2) => {
  return new Point(p1.x + p2.x, p1.y + p2.y);
});

export var equals = R.curry((p1, p2) => {
  return (p1.x === p2.x && p1.y === p2.y);
});

export var distance = R.curry((p1, p2) => {
  var dx = p1.x - p2.x,
    dy = p1.y - p2.y;
  return Math.sqrt(dx*dx + dy*dy);
});

export var angle = R.curry((p1, p2) => {
  var dx = p1.x - p2.x,
    dy = p1.y - p2.y;
  return Math.atan2(dy, dx);
});

export var median = R.curry((p1, p2) => {
  return new Point((p1.x + p2.x)/2, (p1.y + p2.y)/2);
});

export var toFixed = R.curry((point, n) => {
  return new Point(point.x.toFixed(n), point.y.toFixed(n));
});
