import {ViewerHelper} from 'react-svg-pan-zoom';
import * as constants from '../constants';
import {Map, fromJS} from 'immutable';

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
    case constants.SAVE_PROJECT_FROM_FILE:

    default:
      return state;
  }
};
