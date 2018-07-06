import { PROJECT_ACTIONS, VIEWER2D_ACTIONS, VIEWER3D_ACTIONS, GROUP_ACTIONS, ITEMS_ACTIONS, HOLE_ACTIONS, LINE_ACTIONS, AREA_ACTIONS, SCENE_ACTIONS, VERTEX_ACTIONS } from '../constants';

import { ReactPlannerAreasReducer, ReactPlannerHolesReducer, ReactPlannerItemsReducer, ReactPlannerLinesReducer, ReactPlannerGroupsReducer, ReactPlannerProjectReducer, ReactPlannerSceneReducer, ReactPlannerVerticesReducer, ReactPlannerViewer2dReducer, ReactPlannerViewer3dReducer } from './export';

import { State } from '../models';

export var initialState = new State();

export default function appReducer(state, action) {
  if (PROJECT_ACTIONS[action.type]) return ReactPlannerProjectReducer.apply(undefined, arguments);
  if (VIEWER2D_ACTIONS[action.type]) return ReactPlannerViewer2dReducer.apply(undefined, arguments);
  if (VIEWER3D_ACTIONS[action.type]) return ReactPlannerViewer3dReducer.apply(undefined, arguments);
  if (ITEMS_ACTIONS[action.type]) return ReactPlannerItemsReducer.apply(undefined, arguments);
  if (HOLE_ACTIONS[action.type]) return ReactPlannerHolesReducer.apply(undefined, arguments);
  if (LINE_ACTIONS[action.type]) return ReactPlannerLinesReducer.apply(undefined, arguments);
  if (AREA_ACTIONS[action.type]) return ReactPlannerAreasReducer.apply(undefined, arguments);
  if (GROUP_ACTIONS[action.type]) return ReactPlannerGroupsReducer.apply(undefined, arguments);
  if (SCENE_ACTIONS[action.type]) return ReactPlannerSceneReducer.apply(undefined, arguments);
  if (VERTEX_ACTIONS[action.type]) return ReactPlannerVerticesReducer.apply(undefined, arguments);

  return state || initialState;
};