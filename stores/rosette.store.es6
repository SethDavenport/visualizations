'use strict';

import EventEmitter from 'events';
import fgeo from 'fgeo';
import dispatcher from '../dispatcher/dispatcher.es6';
import { rosetteActionTypes } from '../actions/rosette.actions.es6';
import { RosetteDefaults } from './rosette.constants.es6';

class RosetteStore extends EventEmitter {
  static CHANGE_EVENT: 'changeEvent'

  constructor() {
    super();
    this.numSamples = RosetteDefaults.NUM_SAMPLES;
    this.center = new fgeo.point.Point(RosetteDefaults.X, RosetteDefaults.Y);
    this.guideRadius = RosetteDefaults.GUIDE_RADIUS;
    this.radius = RosetteDefaults.RADIUS;
    this.cellSize = RosetteDefaults.CELL_SIZE;
    this._processAction = this._processAction.bind(this);
    this._dispatchToken = dispatcher.register(this._processAction);
  }

  getState() {
    return {
      numSamples: this.numSamples,
      center: this.center,
      guideRadius: this.guideRadius,
      radius: this.radius,
      cellSize: this.cellSize
    };
  }

  _processAction(action) {
    switch (action.actionType) {
      case rosetteActionTypes.SET_SAMPLES:
        this.numSamples = action.numSamples;
        this.emit(RosetteStore.CHANGE_EVENT);
        break;

      case rosetteActionTypes.SET_RADIUS:
        this.radius = action.radius;
        this.emit(RosetteStore.CHANGE_EVENT);
        break;

      case rosetteActionTypes.SET_X:
        this.center = new fgeo.point.Point(action.x, this.center.y);
        this.emit(RosetteStore.CHANGE_EVENT);
        break;

      case rosetteActionTypes.SET_Y:
        this.center = new fgeo.point.Point(this.center.x, action.y);
        this.emit(RosetteStore.CHANGE_EVENT);
        break;

      case rosetteActionTypes.SET_GUIDE_RADIUS:
        this.guideRadius = action.radius;
        this.emit(RosetteStore.CHANGE_EVENT);
        break;

      case rosetteActionTypes.SET_CELL_SIZE:
        this.cellSize = action.sizePercent;
        this.emit(RosetteStore.CHANGE_EVENT);
        break;
    }
  }
};

export default new RosetteStore();
