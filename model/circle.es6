'use strict'
import R from 'ramda';
import * as GEO_Point from './point.es6';

export class Circle {
  constructor(center, radius) {
    this.center = center;
    this.radius = radius;
  }
};

export function equals(c1, c2) {
  return (c1.radius === c2.radius && GEO_Point.equals(c1.center, c2.center));
};

export function computeNPointsOnPerimeter(circle, n) {
  var alpha = Math.PI * 2 / n;
  return R.map(
    function(i) {
      var theta = alpha * i;
      return GEO_Point.add(circle.center,
        new GEO_Point.Point(
          Math.cos(theta) * circle.radius,
          Math.sin(theta) * circle.radius));
    },
    R.range(0, n));
};

export function computeIntersectionPoints(c1, c2) {
  if (equals(c1, c2)) return [];

  var a = c1.center.x,
    b = c1.center.y,
    c = c2.center.x,
    d = c2.center.y,
    r = c1.radius,
    s = c2.radius,
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

  return [new GEO_Point.Point(x1, y1), new GEO_Point.Point(x2, y2)];
};
