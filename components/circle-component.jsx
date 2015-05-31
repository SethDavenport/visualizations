var Circle = React.createClass({
  render: function () {
    return (<circle cx={this.props.x}
        cy={this.props.y}
        r={this.props.radius}
        className={this.props.className}/>);
  }
});
