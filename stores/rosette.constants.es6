'use strict';

import * as RSVG from 'rsvg-rosette';

export const RosetteDefaults = {
  NUM_SAMPLES: 32,
  X: 50,
  Y: 50,
  GUIDE_RADIUS: 20,
  RADIUS: 21,
  CELL_SIZE: 80,
  CONSTRUCTION_MODE: RSVG.ConstructionModes.Q_BEZIER_CELLS,
};
