import {ViewerHelper} from 'react-svg-pan-zoom';
import * as constants from '../constants';
import {Map, fromJS} from 'immutable';
import viewer2dReducer from './viewer2d';
import editingReducer from './editing';

export const initialState = new Map({
  mode: constants.MODE_IDLE,

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
      return state;

    case constants.SELECT_TOOL_PAN:
    case constants.SELECT_TOOL_ZOOM_IN:
    case constants.SELECT_TOOL_ZOOM_OUT:
      return viewer2dReducer(state, action);


    case constants.SELECT_TOOL_EDIT:
      return editingReducer(state, action);


    default:
      return state;
  }
};
