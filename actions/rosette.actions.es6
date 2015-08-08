'use strict';
import dispatcher from '../dispatcher/dispatcher.es6';

export const rosetteActionTypes = {
  SET_SAMPLES: 'SET_SAMPLES',
  SET_RADIUS: 'SET_RADIUS',
  SET_X: 'SET_X',
  SET_Y: 'SET_Y',
  SET_GUIDE_RADIUS: 'SET_GUIDE_RADIUS',
  SET_CELL_SIZE: 'SET_CELL_SIZE'
};

export function setSamples(numSamples) {
  dispatcher.dispatch({
    actionType: rosetteActionTypes.SET_SAMPLES,
    numSamples: +numSamples
  });
}

export function setRadius(radius) {
  dispatcher.dispatch({
    actionType: rosetteActionTypes.SET_RADIUS,
    radius: radius
  });
}

export function setX(x) {
  dispatcher.dispatch({
    actionType: rosetteActionTypes.SET_X,
    x: x
  });
}

export function setY(y) {
  dispatcher.dispatch({
    actionType: rosetteActionTypes.SET_Y,
    y: y
  });
}

export function setGuideRadius(radius) {
  dispatcher.dispatch({
    actionType: rosetteActionTypes.SET_GUIDE_RADIUS,
    radius: radius
  });
}

export function setCellSize(sizePercent) {
  dispatcher.dispatch({
    actionType: rosetteActionTypes.SET_CELL_SIZE,
    sizePercent: sizePercent
  });
}
