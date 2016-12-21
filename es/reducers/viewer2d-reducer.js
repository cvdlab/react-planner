var _TOOL2MODE;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { UPDATE_2D_CAMERA, SELECT_TOOL_PAN, SELECT_TOOL_ZOOM_IN, SELECT_TOOL_ZOOM_OUT, MODE_IDLE, MODE_2D_PAN, MODE_2D_ZOOM_IN, MODE_2D_ZOOM_OUT } from '../constants';
import { fromJS } from 'immutable';
import { TOOL_NONE, TOOL_ZOOM_OUT, TOOL_ZOOM_IN, TOOL_PAN } from 'react-svg-pan-zoom';

var TOOL2MODE = (_TOOL2MODE = {}, _defineProperty(_TOOL2MODE, TOOL_NONE, MODE_IDLE), _defineProperty(_TOOL2MODE, TOOL_ZOOM_IN, MODE_2D_ZOOM_IN), _defineProperty(_TOOL2MODE, TOOL_ZOOM_OUT, MODE_2D_ZOOM_OUT), _defineProperty(_TOOL2MODE, TOOL_PAN, MODE_2D_PAN), _TOOL2MODE);

export default function (state, action) {
  switch (action.type) {
    case UPDATE_2D_CAMERA:
      return state.merge({
        // mode: TOOL2MODE[action.value.tool],
        viewer2D: fromJS(action.value)
      });

    case SELECT_TOOL_PAN:
      return state.set('mode', MODE_2D_PAN);

    case SELECT_TOOL_ZOOM_IN:
      return state.set('mode', MODE_2D_ZOOM_IN);

    case SELECT_TOOL_ZOOM_OUT:
      return state.set('mode', MODE_2D_ZOOM_OUT);
  }
}