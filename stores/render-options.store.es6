'use strict';

import { EventEmitter } from 'events';
import dispatcher from '../dispatcher/dispatcher.es6';
import { renderOptionsActionTypes } from '../actions/render-options.actions.es6';
import { RenderDefaults, ConstructionModes, RenderModes } from './render-options.constants.es6';

class RenderOptionsStore extends EventEmitter {
  static CHANGE_EVENT: 'changeEvent'

  constructor() {
    super();

    this.constructionMode = RenderDefaults.CONSTRUCTION_MODE;
    this.renderMode = RenderDefaults.RENDER_MODE;
    this._processAction = this._processAction.bind(this);

    dispatcher.register(this._processAction);
  }

  getState() {
    return {
      constructionMode: this.constructionMode,
      renderMode: this.renderMode
    };
  }

  _processAction(action) {
    switch (action.actionType) {
      case renderOptionsActionTypes.SET_CONSTRUCTION_MODE:
        this.constructionMode = action.constructionMode;
        this.emit(RenderOptionsStore.CHANGE_EVENT);
        break;

      case renderOptionsActionTypes.SET_RENDER_MODE:
        this.renderMode = action.renderMode;
        this.emit(RenderOptionsStore.CHANGE_EVENT);
        break;
    }
  }
}

export default new RenderOptionsStore();
