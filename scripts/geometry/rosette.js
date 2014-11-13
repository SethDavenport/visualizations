import Circle from 'circle';
import Path from 'path';

class Rosette {
  constructor(guideCircle:Circle, radius:Number, numCircles:int) {
    this.guideCircle = guideCircle;
    this.radius = radius;
    this.numCircles = numCircles;
    this.circles = [];

    // Compute circles.
    for (let point of guideCircle.getNPointsOnPerimeter(numCircles)) {
      this.circles.push(new Circle(point, radius);
    }

    // Compute intersections.
    var vertices = [];
    for (let i=0; i<this.circles.length; ++i) {
      for (let j=0; j<i; ++i) {
        vertices = vertices.concat(this.circles[i].getIntersectionPoints(this.circles[j]));
      }
    }

    this.vertices = _.chain(vertices)
      .uniq((v) => v.toString())
      .map((v) => { angle: normalizeAngle(v.angle(this.guideCircle.center)), point: v })
      .groupBy('angle')
      .sortBy('angle')
      .map((groups) => _.pluck(groups, 'point'))
      .map((vertices) => _.sortBy(vertices, (v) => v.distance(this.guideCircle.center)))
      .value();

    // Compute angles.
    this.angles = _.chain this.vertices
      .keys()
      .map (key) -> Number key
      .value()

    // Compute radials.
    this.radials = (new Path this.vertices[angle] for angle in this.angles)

    // Compute cells.
    this.cells = []
    for angle in this.angles
      cellsForAngle = []
      for distance in [0..this.numCircles / 2]
        currentRadial = angle
        nextRadial = (angle+1)%this.angles.length
        nextNextRadial = (angle+2)%this.angles.length

        cell = new Path()
        if 0 is (angle % 2)
          cell.push this.vertices[currentRadial][distance], 0 if this.vertices[currentRadial][distance]
          cell.push this.vertices[nextRadial][distance], 1 if this.vertices[nextRadial][distance]
          cell.push this.vertices[nextNextRadial][distance], 1 if this.vertices[nextNextRadial][distance]
          cell.push this.vertices[nextRadial][distance-1], 0 if this.vertices[nextRadial][distance-1]
        else
          cell.push this.vertices[currentRadial][distance], 0 if this.vertices[currentRadial][distance]
          cell.push this.vertices[nextRadial][distance+1], 1 if this.vertices[nextRadial][distance+1]
          cell.push this.vertices[nextNextRadial][distance], 1 if this.vertices[nextNextRadial][distance]
          cell.push this.vertices[nextRadial][distance], 0 if this.vertices[nextRadial][distance]
        cellsForAngle.push cell if cell.vertices.length > 1
      this.cells[angle] = cellsForAngle
}

function _normalizeAngle(angle) {
  out = angle.toFixed(2)
  return '3.14' if out is '-3.14'
  return '0.00' if out is '-0.00' # Why JS u so borken?
  return out
}

export default Rosette;
