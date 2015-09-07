import React from 'react';
import R from 'ramda';
import NumberInput from './number-input-component';
import SelectInput from './select-input-component';
import * as RosetteActions from '../actions/rosette.actions';
import { ConstructionModes } from '../stores/rosette.constants';

export default class ControlPanel extends React.Component {
  render () {
    function _toSelectItem (pair) {
      return { value: pair[1], label: pair[0] };
    }

    var _generateSelectItems = R.pipe(
      R.toPairs,
      R.map(_toSelectItem));

    var constructionModes = _generateSelectItems(ConstructionModes);

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
        <button onClick={(e) => {  e.preventDefault(); RosetteActions.clear(); }}>
          Clear
        </button>
        <button onClick={(e) => { e.preventDefault(); this._exportAsSvg(); }}>
          Export as SVG
        </button>
      </form>
    );
  }

  _exportAsSvg(svg) {
    var svgDoc = document.getElementsByTagName('svg')[0];
    var svgStyles = document.getElementsByTabName('style')[1]; // Hack
    var serializer = new XMLSerializer();
    var svgStyles = document.getElementById()
    var svgString = serializer.serializeToString(svgDoc);
    var url = 'data:image/svg+xml;base64,\n' + btoa(svgString);
    var url.cssString
//    console.log(url);
//    var svgWin = window.open(url, "svg_win");
  };
};
