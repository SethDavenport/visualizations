class Point {
  constructor(x:Number, y:Number) {
    this.x = x;
    this.y = y;
  }

  add(point:Point):Point {
    return new Point(this.x + point.x, this.y + point.y);
  }

  equals(other):boolean {
    if (!other instanceof Point) {
      return false;
    }

    return (this.x === other.x && this.y === other.y);
  }

  distance(other:Point):Number {
    var dx = this.x - other.x,
      dy = this.y - other.y;
    return Math.sqrt(dx*dx + dy*dy);
  }

  angle(other:Point):Number {
    var dx = this.x - other.x,
      dy = this.y - other.y;
    return Math.atan2(dy, dx);
  }

  median(point:Point):Point {
    return new Point((this.x + point.x)/2, (this.y + point.y)/2);
  }

  toString(decimals:int):string {
    if (isFinite(decimals)) {
      return this.toFixed(decimals).toString();
    }

    return `(${this.x}, ${this.y})`;
  }

  toFixed(n:int):Point {
    return new Point(this.x.toFixed(n), this.y.toFixed(n));
  }
}

export default Point;
