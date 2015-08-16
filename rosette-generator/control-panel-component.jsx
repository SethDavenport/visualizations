import React from 'react';
import R from 'ramda';
import NumberInput from './number-input-component.jsx';
import SelectInput from './select-input-component.jsx';
import * as rosetteActions from '../actions/rosette.actions.es6';
import * as renderActions from '../actions/render-options.actions.es6';
import { ConstructionModes, RenderModes } from '../stores/render-options.constants.es6';

export default class ControlPanel extends React.Component {
  render () {
    function _toSelectItem (pair) {
      return { value: pair[1], label: pair[0] };
    }

    var _generateSelectItems = R.pipe(
      R.toPairs,
      R.map(_toSelectItem));

    var constructionModes = _generateSelectItems(ConstructionModes);
    var renderModes = _generateSelectItems(RenderModes);

    return (
      <form className="control-panel">
        <NumberInput name="samplesInput"
          label="Number of samples"
          min="1"
          max="200"
          default={this.props.numSamples}
          onChange={newVal => rosetteActions.setSamples(newVal)}/>
        <NumberInput name="radiusInput"
          label="Radius"
          min="5"
          max="60"
          default={this.props.radius}
          onChange={newVal => rosetteActions.setRadius(newVal)}/>
        <NumberInput name="radiusInput"
          label="Guide Radius"
          min="5"
          max="60"
          default={this.props.guideRadius}
          onChange={newVal => rosetteActions.setGuideRadius(newVal)}/>
        <NumberInput name="xInput"
          label="X (%)"
          min="-100"
          max="200"
          default={this.props.x}
          onChange={newVal => rosetteActions.setX(newVal)}/>
        <NumberInput name="xInput"
          label="Y (%)"
          min="-100"
          max="200"
          default={this.props.y}
          onChange={newVal => rosetteActions.setY(newVal)}/>
        <SelectInput name="constructionModeSelect"
          label="Construction Mode"
          default={this.props.constructionMode}
          onChange={newVal => renderActions.setConstructionMode(newVal)}
          options={constructionModes}/>
        <SelectInput name="constructionModeSelect"
          label="Render Mode"
          default={this.props.renderMode}
          onChange={newVal => renderActions.setRenderMode(newVal)}
          options={renderModes}/>
        <NumberInput name="cellSize"
          label="Cell Size (%)"
          min="1"
          max="150"
          default={this.props.cellSize}
          onChange={newVal => rosetteActions.setCellSize(newVal)}/>
      </form>
    );
  }
};
