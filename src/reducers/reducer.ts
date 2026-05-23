import {
  PROJECT_ACTIONS,
  VIEWER2D_ACTIONS,
  VIEWER3D_ACTIONS,
  GROUP_ACTIONS,
  ITEMS_ACTIONS,
  HOLE_ACTIONS,
  LINE_ACTIONS,
  AREA_ACTIONS,
  SCENE_ACTIONS,
  VERTEX_ACTIONS
} from '../constants';

import {
  ReactPlannerAreasReducer,
  ReactPlannerHolesReducer,
  ReactPlannerItemsReducer,
  ReactPlannerLinesReducer,
  ReactPlannerGroupsReducer,
  ReactPlannerProjectReducer,
  ReactPlannerSceneReducer,
  ReactPlannerVerticesReducer,
  ReactPlannerViewer2dReducer,
  ReactPlannerViewer3dReducer
} from './export';

import { State } from '../models';

export const initialState = new State();

export default function appReducer(state: any, action: any): any {
  if ((PROJECT_ACTIONS as any)[action.type]) return ReactPlannerProjectReducer.apply(null, arguments as any);
  if ((VIEWER2D_ACTIONS as any)[action.type]) return ReactPlannerViewer2dReducer.apply(null, arguments as any);
  if ((VIEWER3D_ACTIONS as any)[action.type]) return ReactPlannerViewer3dReducer.apply(null, arguments as any);
  if ((ITEMS_ACTIONS as any)[action.type]) return ReactPlannerItemsReducer.apply(null, arguments as any);
  if ((HOLE_ACTIONS as any)[action.type]) return ReactPlannerHolesReducer.apply(null, arguments as any);
  if ((LINE_ACTIONS as any)[action.type]) return ReactPlannerLinesReducer.apply(null, arguments as any);
  if ((AREA_ACTIONS as any)[action.type]) return ReactPlannerAreasReducer.apply(null, arguments as any);
  if ((GROUP_ACTIONS as any)[action.type]) return ReactPlannerGroupsReducer.apply(null, arguments as any);
  if ((SCENE_ACTIONS as any)[action.type]) return ReactPlannerSceneReducer.apply(null, arguments as any);
  if ((VERTEX_ACTIONS as any)[action.type]) return ReactPlannerVerticesReducer.apply(null, arguments as any);

  return state || initialState;
}
