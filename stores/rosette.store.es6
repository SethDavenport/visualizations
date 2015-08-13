'use strict';

import EventEmitter from 'events';
import fgeo from 'fgeo';
import nibelung from 'nibelung';
import dispatcher from '../dispatcher/dispatcher.es6';
import { rosetteActionTypes } from '../actions/rosette.actions.es6';
import { RosetteDefaults } from './rosette.constants.es6';

var store = new nibelung.Hoard({
  namespace: 'rosette-',
  persistent: true,
  version: '1'
});

store.getState = function getState() {
  return {
    numSamples: this.getOne('num-samples') || RosetteDefaults.NUM_SAMPLES,
    center: new fgeo.point.Point(
      this.getOne('center-x') || RosetteDefaults.X,
      this.getOne('center-y') || RosetteDefaults.Y),
    guideRadius: this.getOne('guide-radius') || RosetteDefaults.GUIDE_RADIUS,
    radius: this.getOne('radius') || RosetteDefaults.RADIUS,
    cellSize: this.getOne('cell-size') || RosetteDefaults.CELL_SIZE
  };
};

dispatcher.register(function _processAction(action) {
  switch (action.actionType) {
    case rosetteActionTypes.SET_SAMPLES:
      return this.putOne('num-samples', action.numSamples);

    case rosetteActionTypes.SET_RADIUS:
      return this.putOne('radius', action.radius);

    case rosetteActionTypes.SET_X:
      return this.putOne('center-x', action.x);

    case rosetteActionTypes.SET_Y:
      return this.putOne('center-y', action.y);

    case rosetteActionTypes.SET_GUIDE_RADIUS:
      return this.putOne('guide-radius', action.radius);

    case rosetteActionTypes.SET_CELL_SIZE:
      return this.putOne('cell-size', action.sizePercent);
  }
}.bind(store));

export default store;
