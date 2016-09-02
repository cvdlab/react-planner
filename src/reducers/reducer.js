import * as constants from '../constants';
import {Map, fromJS} from 'immutable';
import viewer2DReducer from './viewer2d-reducer';
import editingReducer from './editing-reducer';
import projectReducer from './project-reducer';
import viewer3DReducer from './viewer3d-reducer';
import volumesReducer from './volumes-reducer';
import drawingReducer from './drawing-reducer';
import sceneReducer from './scene-reducer';
import {State} from '../models';

export const initialState = new State();

export default function appReducers(state, action) {
  state = state || initialState;

  switch (action.type) {
    case constants.NEW_PROJECT:
    case constants.LOAD_PROJECT:
    case constants.SAVE_PROJECT:
    case constants.LOAD_PROJECT_FROM_FILE:
    case constants.SAVE_PROJECT_TO_FILE:
      return projectReducer(state, action);

    case constants.UPDATE_2D_CAMERA:
    case constants.SELECT_TOOL_PAN:
    case constants.SELECT_TOOL_ZOOM_IN:
    case constants.SELECT_TOOL_ZOOM_OUT:
      return viewer2DReducer(state, action);

    case constants.SELECT_TOOL_EDIT:
    case constants.SELECT_LINE:
    case constants.SELECT_AREA:
    case constants.SELECT_HOLE:
    case constants.UNSELECT_ALL:
    case constants.SET_PROPERTIES:
      return editingReducer(state, action);

    case constants.SELECT_TOOL_3D_VIEW:
    case constants.SELECT_TOOL_3D_FIRST_PERSON:
      return viewer3DReducer(state, action);

    case constants.SELECT_TOOL_VOLUMES_SUMMARY:
      return volumesReducer(state, action);

    case constants.SELECT_TOOL_DRAWING_HOLE:
    case constants.SELECT_TOOL_DRAWING_LINE:
    case constants.BEGIN_DRAWING_LINE:
    case constants.UPDATE_DRAWING_LINE:
    case constants.END_DRAWING_LINE:
    case constants.UPDATE_DRAWING_HOLE:
    case constants.END_DRAWING_HOLE:
      return drawingReducer(state, action);

    case constants.ADD_LAYER:
    case constants.SET_LAYER_PROPERTIES:
    case constants.SELECT_LAYER:
      return sceneReducer(state, action);

    default:
      return state;
  }
};
