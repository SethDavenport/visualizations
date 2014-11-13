import Point from './point';

class Path {
  constructor(vertices:List<Point> = []) {
    this.vertices = vertices;
    this.medians = _computeMedians(vertices);
  }

  push(point:Point, arcSweep):Void {
    p = new(Point point.x, point.y);
    p.arcSweep = arcSweep;
    this.vertices.push(p);
    this.medians = _computeMedians(this.vertices);
  }

  centroid():Point {
    var sumX = 0,
      sumY = 0;
    for (let v of this.vertices) {
      sumX += v.x;
      sumY += v.y;
    }

    return new Point(
      sumX/this.vertices.length,
      sumY/this.vertices.length);
  }

  resize(ratio:Number):Path {
    var newVertices = [],
      centroid = this.centroid();
    for (let v of this.vertices) {
      let deltaX = centroid.x - v.x,
        deltaY = centroid.y - v.y
        point = new Point(
          v.x + (deltaX * (1 - ratio)),
          v.y + (deltaY * (1 - ratio)));

      point.arcSweep = v.arcSweep;
      newVertices.push(point);
    }

    return new Path(newVertices);
  }

  toPolygonSVG():string {
    var drawCommands = '';
    for (let v of this.vertices) {
      drawCommands += (!drawCommands ? 'M' : 'L');
      drawCommands += `${v.x} ${v.y} `;
    }
    drawCommands += "Z";
    return drawCommands;
  }

  toArcsSVG(radius:Number):string {
    var drawCommands = ''
      v = this.vertices[0];

    for (let v of this.vertices) {
      if (!drawCommands) {
        drawCommands = `M ${v.x} ${v.y} `;
      }
      else {
        drawCommands += `A ${radius} ${radius} 0 0 ${v.arcSweep} ${v.x} ${v.y} `;
      }
    }

    drawCommands += `A ${radius} ${radius} 0 0 ${v.arcSweep} ${v.x} ${v.y} Z`;
    return drawCommands;
  }

  toQuadraticSVG():string {
    var drawCommands = `M ${this.medians[0].x} ${this.medians[0].y} `,
      num = this.vertices.length;
    for (let i=0; i<this.vertices.length; ++i) {
      drawCommands += `Q ${this.vertices[i].x} ${this.vertices[i].y} ` +
        ` ${this.medians[i].x} ${this.medians[i].y} `;
    }

    drawCommands += `Q ${this.vertices[0].x} ${this.vertices[0].y} ` +
      ` ${this.medians[0].x} ${this.medians[0].y} Z`;

    return drawCommands;
  }
}

function _computeMedians(vertices:List<Point>):List<Point> {
  var num = vertices.length,
    medians = [];

  for (let i=0; i<vertices.length; ++i) {
    let nextVertex = vertices[(i+1)%num];
    medians.push(vertices[i].median(nextVertex));
  }

  return medians;
}

export default Path;
