'use strict'

function Circle(center, radius) {
  this.center = center;
  this.radius = radius;

  this.equals = function(other) {
    if (!other instanceof Circle) {
      return false;
    }
    return (radius === other.radius && center.equals(other.center));
  };

  this.getNPointsOnPerimeter = function(n) {
    var alpha = Math.PI * 2 / n;
    return R.map(
      function(i) {
        var theta = alpha * i;
        return new Point(
          Math.cos(theta) * radius,
          Math.sin(theta) * radius)
        .add(center)
      },
      R.range(0, n));
  };

  this.getIntersectionPoints = function(other) {
    if (this.equals(other)) return [];

    var a = center.x,
      b = center.y,
      c = other.center.x,
      d = other.center.y,
      r = radius,
      s = other.radius,
      e = c - a,
      f = d - b,
      p = Math.sqrt(Math.abs(e*e + f*f)),
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
  };
};
