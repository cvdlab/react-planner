import {ViewerHelper} from 'react-svg-pan-zoom';
import * as constants from '../constants';
import {Map, fromJS} from 'immutable';
import viewer2dReducer from './viewer2dReducer';
import editingReducer from './editingReducer';
import projectReducer from './projectReducer';
import viewer3DReducer from './viewer3d-reducer';
import {Scene} from '../models';

export const initialState = new Map({
  mode: constants.MODE_IDLE,

  scene: new Scene(),

  viewer2d: new Map({
    state: fromJS(ViewerHelper.getDefaultValue())
  })
});

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
      return viewer2dReducer(state, action);


    case constants.SELECT_TOOL_EDIT:
      return editingReducer(state, action);

    case constants.SELECT_TOOL_3D_VIEW:
      return viewer3DReducer(state, action);

    default:
      return state;
  }
};
