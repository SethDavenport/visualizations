import React from 'react';

export default class Circle extends React.Component {
  render () {
    return (<circle cx={this.props.x}
        cy={this.props.y}
        r={this.props.radius}
        className={this.props.className}/>);
  }
}
