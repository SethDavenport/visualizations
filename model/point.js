'use strict';

function Point(x, y) {
  this.x = x;
  this.y = y;

  this.add = function add(point) {
    return new Point(x + point.x, y + point.y);
  };

  this.equals = function equals(other) {
    if (!other instanceof Point) {
      return false;
    }

    return (x === other.x && y === other.y);
  };

  this.distance = function distance(other) {
    var dx = x - other.x,
      dy = y - other.y;
    return Math.sqrt(dx*dx + dy*dy);
  };

  this.angle = function angle(other) {
    var dx = x - other.x,
      dy = y - other.y;
    return Math.atan2(dy, dx);
  };

  this.median = function median(point) {
    return new Point((x + point.x)/2, (y + point.y)/2);
  };

  this.toFixed = function fixed(n) {
    return new Point(x.toFixed(n), y.toFixed(n));
  }

  this.toString = function toString(decimals) {
    if (isFinite(decimals)) {
      return this.toFixed(decimals).toString();
    }

    return this.x + ', ' + this.y;
  }
}
