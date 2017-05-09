import { PROJECT_ACTIONS, VIEWER2D_ACTIONS, VIEWER3D_ACTIONS, ITEMS_ACTIONS, HOLE_ACTIONS, LINE_ACTIONS, AREA_ACTIONS, SCENE_ACTIONS, VERTEX_ACTIONS } from '../constants';
import viewer2DReducer from './viewer2d-reducer';
import projectReducer from './project-reducer';
import viewer3DReducer from './viewer3d-reducer';
import holesReducer from './holes-reducer';
import linesReducer from './lines-reducer';
import sceneReducer from './scene-reducer';
import verticesReducer from './vertices-reducer';
import itemsReducer from './items-reducer';
import areaReducer from './areas-reducer';

import { State } from '../models';

export var initialState = new State();

export default function appReducer(state, action) {
  state = state || initialState;

  if (PROJECT_ACTIONS[action.type]) return projectReducer.apply(undefined, arguments);
  if (VIEWER2D_ACTIONS[action.type]) return viewer2DReducer.apply(undefined, arguments);
  if (VIEWER3D_ACTIONS[action.type]) return viewer3DReducer.apply(undefined, arguments);
  if (ITEMS_ACTIONS[action.type]) return itemsReducer.apply(undefined, arguments);
  if (HOLE_ACTIONS[action.type]) return holesReducer.apply(undefined, arguments);
  if (LINE_ACTIONS[action.type]) return linesReducer.apply(undefined, arguments);
  if (AREA_ACTIONS[action.type]) return areaReducer.apply(undefined, arguments);
  if (SCENE_ACTIONS[action.type]) return sceneReducer.apply(undefined, arguments);
  if (VERTEX_ACTIONS[action.type]) return verticesReducer.apply(undefined, arguments);
  return state;
};