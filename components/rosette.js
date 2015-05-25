var Rosette = (function() {
  return React.createClass({
    render: function() {
      var rosette = new GEO_Rosette.RosetteModel(
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
    },

    _renderGuideCircle: function _renderGuideCircle(rosette) {
      if (!this.props.showGuideCircle) {
        return null;
      }

      var cssClass = 'rosette__guide-circle--' + this.props.renderMode;
      return _circleToSVG(cssClass, rosette.guideCircle);
    },

    _renderCircles: function _renderCircles(rosette) {
      if (this.props.constructionMode !== 'overlapping-circles') {
        return null;
      }

      var cssClass = 'rosette__cell--' + this.props.renderMode;
      return R.map(
        R.curry(_circleToSVG)(cssClass),
        GEO_Rosette.computeCircles(rosette));
    },

    _renderCells: function _renderCells(rosette) {
      var cssClass = 'rosette__cell--' + this.props.renderMode;

      if (this.props.constructionMode === 'linear-cells') {
        return R.map(function(cellsForRadial) {
          return R.map(R.curry(_pathToPolygonSVG)(cssClass), cellsForRadial);
        }, GEO_Rosette.computeCells(rosette));
      }
      else if (this.props.constructionMode === 'arc-cells') {
        var radius = this.props.radius;
        return R.map(function(cellsForRadial) {
          return R.map(
            R.curry(_pathToArcsSVG)(radius, cssClass),
            cellsForRadial);
        }, GEO_Rosette.computeCells(rosette));
      }
      else if (this.props.constructionMode === 'qbezier-cells') {
        return R.map(function(cellsForRadial) {
          return R.map(R.curry(_pathToQuadraticSVG)(cssClass), cellsForRadial);
        }, GEO_Rosette.computeCells(rosette));
      }

      return null;
    }
  });

  function _circleToSVG(cssClass, circle) {
    return (<circle
      cx={circle.center.x}
      cy={circle.center.y}
      r={circle.radius}
      className={cssClass}/>);
  }

  function _pathToPolygonSVG(cssClass, path) {
    return (<path
      d={GEO_Path.toPolySVG(path)}
      className={cssClass}/>);
  }

  function _pathToArcsSVG(radius, cssClass, path) {
    return (<path
      d={GEO_Path.toArcSVG(path, radius)}
      className={cssClass}/>);
  }

  function _pathToQuadraticSVG(cssClass, path) {
    return (<path
      d={GEO_Path.toQuadBezierSVG(path)}
      className={cssClass}/>);
  }
})();
