'use strict';

import fgeo from 'fgeo';
import nibelung from 'nibelung';
import dispatcher from '../dispatcher/dispatcher';
import { rosetteActionTypes } from '../actions/rosette.actions';
import { RosetteDefaults } from './rosette.constants';

var store = new nibelung.Hoard({
  namespace: 'rosette-',
  persistent: true,
  version: '2'
});

store.getState = function getState() {
  return {
    numSamples: this.getOne('numSamples') || RosetteDefaults.NUM_SAMPLES,
    center: new fgeo.point.Point(
      this.getOne('centerX') || RosetteDefaults.X,
      this.getOne('centerY') || RosetteDefaults.Y),
    guideRadius: this.getOne('guideRadius') || RosetteDefaults.GUIDE_RADIUS,
    radius: this.getOne('radius') || RosetteDefaults.RADIUS,
    cellSize: this.getOne('cellSize') || RosetteDefaults.CELL_SIZE,
    constructionMode: this.getOne('constructionMode') || RosetteDefaults.CONSTRUCTION_MODE
  };
};

dispatcher.register(function _processAction(action) {
  switch (action.actionType) {
    case rosetteActionTypes.SET:
      return this.putOne(action.name, action.payload);
    case rosetteActionTypes.CLEAR:
      return this.clear();
  }
}.bind(store));

export default store;
