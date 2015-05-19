var Rosette = (function() {
  return React.createClass({
    render: function() {
      var rosette = new RosetteModel(
          new Circle(
            new Point(+this.props.cx, +this.props.cy),
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
      return R.map(R.curry(_circleToSVG)(cssClass), rosette.circles);
    },

    _renderCells: function _renderCells(rosette) {
      var cssClass = 'rosette__cell--' + this.props.renderMode;

      if (this.props.constructionMode === 'linear-cells') {
        return R.map(function(cellsForRadial) {
          return R.map(R.curry(_pathToPolygonSVG)(cssClass), cellsForRadial);
        }, rosette.cells);
      }
      else if (this.props.constructionMode === 'arc-cells') {
        var radius = this.props.radius;
        return R.map(function(cellsForRadial) {
          return R.map(
            R.curry(_pathToArcsSVG)(radius, cssClass),
            cellsForRadial);
        }, rosette.cells);
      }
      else if (this.props.constructionMode === 'qbezier-cells') {
        return R.map(function(cellsForRadial) {
          return R.map(R.curry(_pathToQuadraticSVG)(cssClass), cellsForRadial);
        }, rosette.cells);
      }

      return null;
    }
  });

  function _vertexToSVG(cssClass, vertex) {
    return (<circle
      cx={vertex.x}
      cy={vertex.y}
      r="0.5"
      className={cssClass}/>);
  }

  function _circleToSVG(cssClass, circle) {
    return (<circle
      cx={circle.center.x}
      cy={circle.center.y}
      r={circle.radius}
      className={cssClass}/>);
  }

  function _pathToPolygonSVG(cssClass, path) {
    return (<path
      d={path.toPolygonSVG()}
      className={cssClass}/>);
  }

  function _pathToArcsSVG(radius, cssClass, path) {
    return (<path
      d={path.toArcsSVG(radius)}
      className={cssClass}/>);
  }

  function _pathToQuadraticSVG(cssClass, path) {
    return (<path
      d={path.toQuadraticSVG()}
      className={cssClass}/>);
  }
})();
