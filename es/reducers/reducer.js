import { PROJECT_ACTIONS, VIEWER2D_ACTIONS, VIEWER3D_ACTIONS, GROUP_ACTIONS, ITEMS_ACTIONS, HOLE_ACTIONS, LINE_ACTIONS, AREA_ACTIONS, SCENE_ACTIONS, VERTEX_ACTIONS } from '../constants';
import { ReactPlannerAreasReducer, ReactPlannerHolesReducer, ReactPlannerItemsReducer, ReactPlannerLinesReducer, ReactPlannerGroupsReducer, ReactPlannerProjectReducer, ReactPlannerSceneReducer, ReactPlannerVerticesReducer, ReactPlannerViewer2dReducer, ReactPlannerViewer3dReducer } from './export';
import { State } from '../models';
export var initialState = new State();
export default function appReducer(state, action) {
  if (PROJECT_ACTIONS[action.type]) return ReactPlannerProjectReducer.apply(void 0, arguments);
  if (VIEWER2D_ACTIONS[action.type]) return ReactPlannerViewer2dReducer.apply(void 0, arguments);
  if (VIEWER3D_ACTIONS[action.type]) return ReactPlannerViewer3dReducer.apply(void 0, arguments);
  if (ITEMS_ACTIONS[action.type]) return ReactPlannerItemsReducer.apply(void 0, arguments);
  if (HOLE_ACTIONS[action.type]) return ReactPlannerHolesReducer.apply(void 0, arguments);
  if (LINE_ACTIONS[action.type]) return ReactPlannerLinesReducer.apply(void 0, arguments);
  if (AREA_ACTIONS[action.type]) return ReactPlannerAreasReducer.apply(void 0, arguments);
  if (GROUP_ACTIONS[action.type]) return ReactPlannerGroupsReducer.apply(void 0, arguments);
  if (SCENE_ACTIONS[action.type]) return ReactPlannerSceneReducer.apply(void 0, arguments);
  if (VERTEX_ACTIONS[action.type]) return ReactPlannerVerticesReducer.apply(void 0, arguments);
  return state || initialState;
}
;