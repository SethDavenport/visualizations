var Rosette = (function() {
  return React.createClass({
    render: function() {
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
    },

    _renderGuideCircle: function _renderGuideCircle(rosette) {
      if (!this.props.showGuideCircle) {
        return null;
      }

      var cssClass = 'rosette__guide-circle--' + this.props.renderMode;
      return (<Circle x={rosette.guideCircle.center.x}
        y={rosette.guideCircle.center.y}
        radius={rosette.guideCircle.radius}
        className={cssClass}/>);
    },

    _renderCircles: function _renderCircles(rosette) {
      if (this.props.constructionMode !== 'overlapping-circles') {
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
    },

    _renderCells: function _renderCells(rosette) {
      var cssClass = 'rosette__cell--' + this.props.renderMode;
      var positionalCssClassPrefix = 'rosette__cell-';
      var constructionMode = this.props.constructionMode;
      if (constructionMode === 'overlapping-circles') {
        return null;
      }

      var i = -1;
      var j = -1;
      return R.map(function(cellsForRadial) {
        ++i;
        return R.map(function(path) {
          ++j;
          return (<Path geometry={path}
            className={cssClass + ' ' + positionalCssClassPrefix + i + '-' + j}
            constructionMode={constructionMode}
            arcRadius={rosette.radius}/>);
        }, cellsForRadial);
      }, GEO_Rosette.computeCells(rosette));
    }
  });
})();
