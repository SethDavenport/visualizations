'use strict';

export const ConstructionModes = {
  OVERLAPPING_CIRCLES: 'overlapping-circles',
  LINEAR_CELLS: 'linear-cells',
  ARC_CELLS: 'arc-cells',
  Q_BEZIER_CELLS: 'quadratic-bezier-cells',
  CIRCLE_CELLS: 'circle-cells'
};

export const RosetteDefaults = {
  NUM_SAMPLES: 32,
  X: 50,
  Y: 50,
  GUIDE_RADIUS: 20,
  RADIUS: 21,
  CELL_SIZE: 80,
  CONSTRUCTION_MODE: ConstructionModes.Q_BEZIER_CELLS,
};
