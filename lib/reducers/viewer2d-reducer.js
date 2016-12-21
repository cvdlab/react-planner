'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _TOOL2MODE;

exports.default = function (state, action) {
  switch (action.type) {
    case _constants.UPDATE_2D_CAMERA:
      return state.merge({
        // mode: TOOL2MODE[action.value.tool],
        viewer2D: (0, _immutable.fromJS)(action.value)
      });

    case _constants.SELECT_TOOL_PAN:
      return state.set('mode', _constants.MODE_2D_PAN);

    case _constants.SELECT_TOOL_ZOOM_IN:
      return state.set('mode', _constants.MODE_2D_ZOOM_IN);

    case _constants.SELECT_TOOL_ZOOM_OUT:
      return state.set('mode', _constants.MODE_2D_ZOOM_OUT);
  }
};

var _constants = require('../constants');

var _immutable = require('immutable');

var _reactSvgPanZoom = require('react-svg-pan-zoom');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var TOOL2MODE = (_TOOL2MODE = {}, _defineProperty(_TOOL2MODE, _reactSvgPanZoom.TOOL_NONE, _constants.MODE_IDLE), _defineProperty(_TOOL2MODE, _reactSvgPanZoom.TOOL_ZOOM_IN, _constants.MODE_2D_ZOOM_IN), _defineProperty(_TOOL2MODE, _reactSvgPanZoom.TOOL_ZOOM_OUT, _constants.MODE_2D_ZOOM_OUT), _defineProperty(_TOOL2MODE, _reactSvgPanZoom.TOOL_PAN, _constants.MODE_2D_PAN), _TOOL2MODE);