import React from 'react';
import Rosette from '../components/rosette-component.jsx';
import ControlPanel from './control-panel-component.jsx';
import style from './style.scss'

/**
 * A page that renders a rosette based on user-defined parameters.
 */
export default class RosetteGenerator extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      numSamples: 5,
      radius: 25,
      constructionMode: 'overlapping-circles',
      renderMode: 'line',
      showGuideCircle: false,
      showRadials: false
    }

    this._handleUserInput = this._handleUserInput.bind(this);
  }

  render () {
    return (
      <div>
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <Rosette cx="50" cy="50"
            guideRadius="20"
            radius={this.state.radius}
            samples={this.state.numSamples}
            constructionMode={this.state.constructionMode}
            renderMode={this.state.renderMode}
            showGuideCircle={this.state.showGuideCircle}
            showRadials={this.state.showRadials}/>
        </svg>
        <ControlPanel
          onUserInput={this._handleUserInput}
          radius={this.state.radius}
          numSamples={this.state.numSamples}
          constructionMode={this.state.constructionMode}
          renderMode={this.state.renderMode}
          showGuideCircle={this.state.showGuideCircle}/>
      </div>
    );
  }

  _handleUserInput (newState) {
    this.setState({
      numSamples: newState.numSamples,
      radius: newState.radius,
      constructionMode: newState.constructionMode,
      renderMode: newState.renderMode,
      showGuideCircle: newState.showGuideCircle
    });
  }
};
