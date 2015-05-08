/**
 * A page that renders a rosette based on user-defined parameters.
 */
var RosetteGenerator = React.createClass({
  getInitialState: function() {
    return {
      numSamples: 3,
      radius: 25,
      renderMode: 'overlapping-circles',
      showGuideCircle: false,
      showRadials: false
    }
  },

  render: function() {
    return (
      <div>
        <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice">
          <Rosette cx="50" cy="50"
            guideRadius="20"
            radius={this.state.radius}
            samples={this.state.numSamples}
            renderMode={this.state.renderMode}
            showGuideCircle={this.state.showGuideCircle}
            showRadials={this.state.showRadials}/>
        </svg>
        <ControlPanel
          onUserInput={this.handleUserInput}
          radius={this.state.radius}
          numSamples={this.state.numSamples}
          renderMode={this.state.renderMode}
          showGuideCircle={this.state.showGuideCircle}/>
      </div>
    );
  },

  handleUserInput: function(newState) {
    this.setState({
      numSamples: newState.numSamples,
      radius: newState.radius,
      renderMode: newState.renderMode,
      showGuideCircle: newState.showGuideCircle,
      showRadials: newState.showRadials
    });
  }
});
