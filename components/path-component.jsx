'use strict';
import React from 'react';
import R from 'ramda';
import * as GEO_Path from '../model/path.es6';

export default class Path extends React.Component {
  render () {
    return (<path
      d={_getDrawCommands(
        this.props.geometry,
        this.props.constructionMode,
        this.props.arcRadius)}
      className={this.props.className}/>);
  }
};

function _getDrawCommands(geometry, constructionMode, arcRadius) {
  var startFn;
  var drawFn;

  switch(constructionMode) {
    case 'linear':
      startFn = _toSVGMoveCommand;
      drawFn = _toSVGLineCommand;
      break;

    case 'arc':
      startFn = _toSVGMoveCommand;
      drawFn = R.curry(_toSVGArcCommand)(arcRadius);
      break;

    case 'qbezier':
      var medians = GEO_Path.computeMedians(geometry);
      startFn = function () {
        return _toSVGMoveCommand(medians[0]);
      };
      drawFn = function (vertex, i) {
        return _toSVGQuadCommand(vertex, medians[i]);
      };
  }

  return _getDrawCommandsForCell(
    geometry,
    startFn,
    drawFn);
}

function _getDrawCommandsForCell(geometry, startFn, drawFn) {
  var drawCommands = R.reduceIndexed(
    function (acc, v, i) {
      return acc + (acc ? drawFn(v, i) : startFn(v));
    },
    '',
    geometry.vertices);
  drawCommands += drawFn(geometry.vertices[0], 0) + 'Z';
  return drawCommands;
}

function _toSVGMoveCommand(point) {
  return 'M ' + point.x + ' ' + point.y + ' ';
}

function _toSVGLineCommand(point) {
  return 'L ' + point.x + ' ' + point.y + ' ';
}

function _toSVGArcCommand(radius, point) {
  return 'A ' + radius + ' ' + radius + ' 0 0 ' + point.arcSweep +
    ' ' + point.x + ' ' + point.y + ' ';
}

function _toSVGQuadCommand(p1, p2) {
  return 'Q ' + p1.x + ' ' + p1.y + ' ' + p2.x + ' ' + p2.y + ' ';
}
