'use strict';
import dispatcher from '../dispatcher/dispatcher.es6';

export const renderOptionsActionTypes = {
  SET_CONSTRUCTION_MODE: 'SET_CONSTRUCTION_MODE',
  SET_RENDER_MODE: 'SET_RENDER_MODE'
};

export function setConstructionMode(constructionMode) {
  dispatcher.dispatch({
    actionType: renderOptionsActionTypes.SET_CONSTRUCTION_MODE,
    constructionMode: constructionMode
  });
}

export function setRenderMode(renderMode) {
  dispatcher.dispatch({
    actionType: renderOptionsActionTypes.SET_RENDER_MODE,
    renderMode: renderMode
  });
}
