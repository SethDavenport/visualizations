'use strict';

import dispatcher from '../dispatcher/dispatcher.es6';
import { rosetteActionTypes } from '../actions/rosette.actions.es6';
import { renderOptionsActionTypes } from '../actions/render-options.actions.es6';

/**
 * Not really a store - just logs all actions for debugging purposes.
 */
class LoggingStore {
  constructor () {
    this._processAction = this._processAction.bind(this);
    this._dispatchToken = dispatcher.register(this._processAction);
  }
  _processAction(action) {
    console.log('Action Received:', action);
  }
};

export default new LoggingStore();
