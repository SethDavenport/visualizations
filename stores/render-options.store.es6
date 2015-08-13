'use strict';

import nibelung from 'nibelung';
import dispatcher from '../dispatcher/dispatcher.es6';
import { renderOptionsActionTypes } from '../actions/render-options.actions.es6';
import { RenderDefaults, ConstructionModes, RenderModes } from './render-options.constants.es6';

var store = new nibelung.Hoard({
  namespace: 'renderOptions-',
  persistent: true,
  version: '1'
});

store.getState = function getState() {
  return {
    constructionMode: this.getOne('constructionMode') || RenderDefaults.CONSTRUCTION_MODE,
    renderMode: this.getOne('renderMode') || RenderDefaults.RENDER_MODE
  };
};

dispatcher.register(function _processAction(action) {
  switch (action.actionType) {
    case renderOptionsActionTypes.SET_CONSTRUCTION_MODE:
      this.putOne('constructionMode', action.constructionMode);
      break;

    case renderOptionsActionTypes.SET_RENDER_MODE:
      this.putOne('renderMode', action.renderMode);
      break;
  }
}.bind(store));

export default store;
