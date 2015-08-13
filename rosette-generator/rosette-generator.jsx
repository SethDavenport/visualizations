import React from 'react';
import R from 'ramda';
import Rosette from '../components/rosette-component.jsx';
import ControlPanel from './control-panel-component.jsx';
import style from './style.scss'
import rosetteStore from '../stores/rosette.store.es6';
import renderOptionsStore from '../stores/render-options.store.es6';
import loggingStore from '../stores/logging.store.es6';

/**
 * A page that renders a rosette based on user-defined parameters.
 */
export default class RosetteGenerator extends React.Component {
  constructor(props) {
    super(props);
    this._updateState = this._updateState.bind(this);
    this.state = R.merge(
      rosetteStore.getState(),
      renderOptionsStore.getState());
  }

  componentWillMount() {
    rosetteStore.on('PUT', this._updateState);
    rosetteStore.on('CLEAR', this._updateState);
    renderOptionsStore.on('PUT', this._updateState);
    renderOptionsStore.on('CLEAR', this._updateState);
  }

  componentWillUnmount() {
    rosetteStore.off(rosetteStore.CHANGE_EVENT, this._updateState);
    renderOptionsStore.off(renderOptionsStore.CHANGE_EVENT, this._updateState);
  }

  render () {
    return (
      <div>
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <Rosette cx={this.state.center.x} cy={this.state.center.y}
            guideRadius={this.state.guideRadius}
            radius={this.state.radius}
            samples={this.state.numSamples}
            constructionMode={this.state.constructionMode}
            renderMode={this.state.renderMode}
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
          renderMode={this.state.renderMode}
          showGuideCircle={this.state.showGuideCircle}
          cellSize={this.state.cellSize}/>
      </div>
    );
  }

  _updateState() {
    this.setState(
      R.merge(
        rosetteStore.getState(),
        renderOptionsStore.getState()));
  }
};
