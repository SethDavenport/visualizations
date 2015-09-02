'use strict';
import dispatcher from '../dispatcher/dispatcher';

export const rosetteActionTypes = {
  SET: 'SET'
};

export function setSamples(numSamples) {
  _act(rosetteActionTypes.SET, 'numSamples', +numSamples);
}

export function setRadius(radius) {
  _act(rosetteActionTypes.SET, 'radius', +radius);
}

export function setGuideRadius(guideRadius) {
  _act(rosetteActionTypes.SET, 'guideRadius', +guideRadius);
}

export function setCenterX(centerX) {
  _act(rosetteActionTypes.SET, 'centerX', +centerX);
}

export function setCenterY(centerY) {
  _act(rosetteActionTypes.SET, 'centerY', +centerY);
}

export function setCellSize(cellSize) {
  _act(rosetteActionTypes.SET, 'cellSize', +cellSize);
}

export function setConstructonMode(constructionMode) {
  _act(rosetteActionTypes.SET, 'constructionMode', constructionMode);
}

function _act(actionType, name, payload) {
  dispatcher.dispatch({
    actionType: actionType,
    name: name,
    payload: payload
  });
}
