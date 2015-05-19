'use strict';

function Path(vertices) {
  this.vertices = vertices || [];
  this.medians = _computeMedians(this.vertices);

  this.push = function push(point, arcSweep) {
    var p = new Point(point.x, point.y);
    p.arcSweep = arcSweep;
    this.vertices.push(p);
    this.medians = _computeMedians(this.vertices);
  }

  this.centroid = function centroid() {
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

  this.resize = function resize(ratio) {
    var centroid = this.centroid();
    var newVertices = this.vertices.map(function(v) {
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

  this.toPolygonSVG = function toPolygonSVG() {
    var drawCommands = this.vertices.reduce(
      function(acc, v) {
        return acc + (acc ? _toSVGLineCommand(v) : _toSVGMoveCommand(v));
      },
      '');

    drawCommands += 'Z';
    return drawCommands;
  }


  this.toArcsSVG = function toArcsSVG(radius) {
    var drawCommands = '';
    var first = this.vertices[0];

    var drawCommands = this.vertices.reduce(
      function(acc, v) {
        return acc + (acc ? _toSVGArcCommand(v, radius) : _toSVGMoveCommand(v));
      },
      '');

    drawCommands += _toSVGArcCommand(first, radius) + 'Z';
    return drawCommands;
  }

  this.toQuadraticSVG = function toQuadraticSVG() {
    var drawCommands = '';
    var first = this.medians[0];

    var drawCommands;

    for (var i=0; i<this.vertices.length; ++i) {
      drawCommands += (drawCommands ?
        _toSVGQuadCommand(this.vertices[i], this.medians[i]) :
        _toSVGMoveCommand(this.medians[i]));
    }

    drawCommands += _toSVGQuadCommand(this.vertices[0], this.medians[0]) + 'Z';
    return drawCommands;
  }

  function _computeMedians(vertices) {
    var num = vertices.length;
    var medians = [];

    for (var i=0; i<num; ++i) {
      medians.push(vertices[i].median(vertices[(i+1)%num]));
    }

    return medians;
  }

  function _toSVGMoveCommand(point) {
    return 'M ' + point.x + ' ' + point.y + ' ';
  }

  function _toSVGLineCommand(point) {
    return 'L ' + point.x + ' ' + point.y + ' ';
  }

  function _toSVGArcCommand(point, radius) {
    return 'A ' + radius + ' ' + radius + ' 0 0 ' + point.arcSweep +
      ' ' + point.x + ' ' + point.y + ' ';
  }

  function _toSVGQuadCommand(p1, p2) {
    return 'Q ' + p1.x + ' ' + p1.y + ' ' + p2.x + ' ' + p2.y + ' ';
  }
}
