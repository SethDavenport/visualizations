var Rosette = (function() {
  return React.createClass({
    render: function() {
      var vm = this;
      var rosette = new RosetteModel(
        new Circle(
          new Point(+vm.props.cx, +vm.props.cy),
          vm.props.guideRadius),
        vm.props.radius,
        vm.props.samples);

      var guideCircleCssClass = "rosette__guide-circle--" + vm.props.renderMode;
      var circleCssClass = "rosette__circle--" + vm.props.renderMode;

      return (
        <g>
          {vm.props.showGuideCircle ?
            _circleToSVG(guideCircleCssClass, rosette.guideCircle) :
            null}

          {_getCirclesAsSVG(circleCssClass, rosette.circles)}
        </g>
      );
    }
  });

  function _getCirclesAsSVG(cssClass, circles) {
    return R.map(R.curry(_circleToSVG)(cssClass), circles);
  }

  function _circleToSVG(cssClass, circle) {
    return (<circle
      cx={circle.center.x}
      cy={circle.center.y}
      r={circle.radius}
      className={cssClass}/>);
  }
})();
