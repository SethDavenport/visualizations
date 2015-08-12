import React from 'react';
import R from 'ramda';
import Circle from './circle-component.jsx';
import Path from './path-component.jsx';
import * as GEO_Rosette from '../model/rosette.es6';
import * as GEO_Circle from '../model/circle.es6';
import * as GEO_Point from '../model/point.es6';
import * as GEO_Path from '../model/path.es6';
import { ConstructionModes, RenderModes } from '../stores/render-options.constants.es6';

export default class Rosette extends React.Component {
  render () {
    var rosette = new GEO_Rosette.Rosette(
        new GEO_Circle.Circle(
          new GEO_Point.Point(+this.props.cx, +this.props.cy),
          this.props.guideRadius),
        this.props.radius,
        this.props.samples);

    return (
      <g>
        {this._renderGuideCircle(rosette)}
        {this._renderCircles(rosette)}
        {this._renderCells(rosette)}
      </g>
    );
  }

  _renderGuideCircle (rosette) {
    if (!this.props.showGuideCircle) {
      return null;
    }

    var cssClass = 'rosette__guide-circle--' + this.props.renderMode;
    return (<Circle x={rosette.guideCircle.center.x}
      y={rosette.guideCircle.center.y}
      radius={rosette.guideCircle.radius}
      className={cssClass}/>);
  }

  _renderCircles (rosette) {
    if (this.props.constructionMode !== ConstructionModes.OVERLAPPING_CIRCLES) {
      return null;
    }

    var cssClass = 'rosette__circle--' + this.props.renderMode;
    return R.map(
      function (circle) {
        return (<Circle x={circle.center.x}
          y={circle.center.y}
          radius={circle.radius}
          className={cssClass}/>);
      },
      GEO_Rosette.computeCircles(rosette));
  }

  _renderCells (rosette) {
    var cssClass = 'rosette__cell--' + this.props.renderMode;
    var positionalCssClassPrefix = 'rosette__cell-';
    var constructionMode = this.props.constructionMode;
    if (constructionMode === ConstructionModes.OVERLAPPING_CIRCLES) {
      return null;
    }

    var cellSize = this.props.cellSize;

    var i = -1;
    var j = -1;
    return R.map(function(cellsForRadial) {
      ++i;
      return R.map(function(path) {
        ++j;
        if (constructionMode === ConstructionModes.CIRCLE_CELLS) {
          var centroid = GEO_Path.centroid(path);
          return (<Circle className={cssClass + ' ' + positionalCssClassPrefix + i + '-' + j}
            x={centroid.x}
            y={centroid.y}
            radius={GEO_Path.computeMinDistance(path, centroid)}/>);
        }
        else {
          if (cellSize > 0) {
            path = GEO_Path.resize(path, cellSize / 100);
          }

          return (<Path geometry={path}
            className={cssClass + ' ' + positionalCssClassPrefix + i + '-' + j}
            constructionMode={constructionMode}
            arcRadius={rosette.radius}/>);
        }
      }, cellsForRadial);
    }, GEO_Rosette.computeCells(rosette));
  }
}
