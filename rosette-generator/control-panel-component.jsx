import React from 'react';
import R from 'ramda';
import * as RSVG from 'rsvg-rosette';
import NumberInput from './number-input-component';
import SelectInput from './select-input-component';
import * as RosetteActions from '../actions/rosette.actions';

export default class ControlPanel extends React.Component {
  render () {
    function _toSelectItem (pair) {
      return { value: pair[1], label: pair[0] };
    }

    var _generateSelectItems = R.pipe(
      R.toPairs,
      R.map(_toSelectItem));

    var constructionModes = _generateSelectItems(RSVG.ConstructionModes);

    return (
      <form className="control-panel">
        <NumberInput name="samplesInput"
          label="Number of samples"
          min="1"
          max="200"
          default={this.props.numSamples}
          onChange={newVal => RosetteActions.setSamples(newVal)}/>
        <NumberInput name="radiusInput"
          label="Radius"
          min="5"
          max="60"
          default={this.props.radius}
          onChange={newVal => RosetteActions.setRadius(newVal)}/>
        <NumberInput name="radiusInput"
          label="Guide Radius"
          min="5"
          max="60"
          default={this.props.guideRadius}
          onChange={newVal => RosetteActions.setGuideRadius(newVal)}/>
        <NumberInput name="xInput"
          label="X (%)"
          min="-100"
          max="200"
          default={this.props.x}
          onChange={newVal => RosetteActions.setCenterX(newVal)}/>
        <NumberInput name="xInput"
          label="Y (%)"
          min="-100"
          max="200"
          default={this.props.y}
          onChange={newVal => RosetteActions.setCenterY(newVal)}/>
        <SelectInput name="constructionModeSelect"
          label="Construction Mode"
          default={this.props.constructionMode}
          onChange={newVal => RosetteActions.setConstructionMode(newVal)}
          options={constructionModes}/>
        <NumberInput name="cellSize"
          label="Cell Size (%)"
          min="1"
          max="150"
          default={this.props.cellSize}
          onChange={newVal => RosetteActions.setCellSize(newVal)}/>
        <button onClick={(e) => { RosetteActions.clear(); e.preventDefault(); }}>
          Clear
        </button>
      </form>
    );
  }
};
