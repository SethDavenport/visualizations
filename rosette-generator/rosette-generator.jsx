import React from 'react';
import R from 'ramda';
import * as RSVG from 'rsvg-rosette';
import ControlPanel from './control-panel-component';
import style from './style'
import rosetteStore from '../stores/rosette.store';
import loggingStore from '../stores/logging.store';

/**
 * A page that renders a rosette based on user-defined parameters.
 */
export default class RosetteGenerator extends React.Component {
  constructor(props) {
    super(props);
    this._updateState = this._updateState.bind(this);
    this.state = rosetteStore.getState();
  }

  componentWillMount() {
    rosetteStore.on('PUT', this._updateState);
    rosetteStore.on('CLEAR', this._updateState);
  }

  componentWillUnmount() {
    rosetteStore.off(rosetteStore.CHANGE_EVENT, this._updateState);
    renderOptionsStore.off(renderOptionsStore.CHANGE_EVENT, this._updateState);
  }

  render () {
    return (
      <div>
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <RSVG.Rosette cx={this.state.center.x} cy={this.state.center.y}
            guideRadius={this.state.guideRadius}
            radius={this.state.radius}
            samples={this.state.numSamples}
            constructionMode={this.state.constructionMode}
            showGuideCircle={this.state.showGuideCircle}
            showRadials={this.state.showRadials}
            cellSize={this.state.cellSize}/>
        </svg>
        <ControlPanel
          x={this.state.center.x}
          y={this.state.center.y}
          radius={this.state.radius}
          guideRadius={this.state.guideRadius}
          numSamples={this.state.numSamples}
          constructionMode={this.state.constructionMode}
          showGuideCircle={this.state.showGuideCircle}
          cellSize={this.state.cellSize}/>
      </div>
    );
  }

  _updateState() {
    this.setState(rosetteStore.getState());
  }
};
