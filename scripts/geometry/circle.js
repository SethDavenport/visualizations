import Point from './point'

class Circle {
  constructor(center:Point, radius:Number) {
    this.center = center;
    this.radius = radius;
  }

  equals(other):boolean {
    if (!other instanceof Circle) {
      return false;
    }
    return (this.radius === other.radius && this.center.equals(other.center));
  }

  getNPointsOnPerimeter(n:int):List<Point> {
    var alpha = Math.PI * 2 / n,
      result = [];

    for (i = 0; i<n; ++i) {
      let theta = alpha * i;
      result.push(
        new Point(
          Math.cos(theta) * this.radius,
          Math.sin(theta) * this.radius)
        .add(this.center));
    }

    return result;
  }

  getIntersectionPoints(other:Circle):List<Point> {
    if (this.equals(other)) return [];

    var a = this.center.x,
      b = this.center.y,
      c = other.center.x,
      d = other.center.y,
      r = this.radius,
      s = other.radius;
      e = c - a,
      f = d - b,
      p = Math.sqrt(Math.abs(e*e + f*f));
      r2 = r*r,
      k = (p*p + r2 - s*s)/(2*p);

    if (p > Math.abs(r) + Math.abs(s)) return [];

    // Performance: avoid repeating heavy operations.
    var sqrtR2minusK2 = Math.sqrt(Math.abs(r2 - k*k)),
      fOverP = f/p,
      eOverP = e/p,
      kOverP = k/p,
      eTimesKOverP = e*kOverP,
      fTimesKOverP = f*kOverP,
      fOverPTimesSqrtR2minusK2 = fOverP*sqrtR2minusK2,
      eOverPTimesSqrtR2minusK2 = eOverP*sqrtR2minusK2,
      x1 = a + eTimesKOverP + fOverPTimesSqrtR2minusK2,
      y1 = b + fTimesKOverP - eOverPTimesSqrtR2minusK2,
      x2 = a + eTimesKOverP - fOverPTimesSqrtR2minusK2,
      y2 = b + fTimesKOverP + eOverPTimesSqrtR2minusK2;

    return [new Point(x1, y1), new Point(x2, y2)];
  }
}

export default Circle;
