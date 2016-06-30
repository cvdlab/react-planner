import * as constants from '../constants';
import {Map, fromJS} from 'immutable';
import viewer2DReducer from './viewer2d-reducer';
import editingReducer from './editing-reducer';
import projectReducer from './project-reducer';
import viewer3DReducer from './viewer3d-reducer';
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
      return editingReducer(state, action);

    case constants.SELECT_TOOL_3D_VIEW:
      return viewer3DReducer(state, action);

    default:
      return state;
  }
};
