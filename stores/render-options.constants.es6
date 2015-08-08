'use strict';

export const ConstructionModes = {
  OVERLAPPING_CIRCLES: 'overlapping-circles',
  LINEAR_CELLS: 'linear-cells',
  ARC_CELLS: 'arc-cells',
  Q_BEZIER_CELLS: 'quadratic-bezier-cells'
};

export const RenderModes = {
  LINE: 'line',
  SOLID: 'solid'
};

export const RenderDefaults = {
  CONSTRUCTION_MODE: ConstructionModes.OVERLAPPING_CIRCLES,
  RENDER_MODE: RenderModes.LINE
};
