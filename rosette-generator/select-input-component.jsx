import React from 'react';

export default class SelectInput extends React.Component {
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
        <select className="control-panel__cell"
          ref={this.props.name}
          defaultValue={this.props.default}
          onChange={this._handleChange}>
          {this.props.options.map(this._renderOption)}
        </select>
      </div>
    );
  }

  _renderOption(option) {
    return (
      <option value={option.value}>
        {option.label}
      </option>
    );
  }

  _handleChange() {
    this.props.onChange(this.refs[this.props.name].getDOMNode().value);
  }
}
