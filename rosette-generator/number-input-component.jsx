import React from 'react';

export default class NumberInput extends React.Component {
  constructor(props) {
    super(props);
    this._handleChange = this._handleChange.bind(this);
  }

  render() {
    return (
      <div className="control-panel__row">
        <label className="control-panel__label">
          {this.props.label}:
        </label>
        <input
          className="control-panel__cell"
          type="number"
          min={this.props.min}
          max={this.props.max}
          ref={this.props.name}
          defaultValue={this.props.default}
          onChange={this._handleChange}>
        </input>
      </div>
    );
  }

  _handleChange() {
    this.props.onChange(this.refs[this.props.name].getDOMNode().value);
  }
}
