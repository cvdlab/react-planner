'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state, action) {
  switch (action.type) {
    case _constants.SELECT_TOOL_3D_VIEW:
      return state.set('mode', _constants.MODE_3D_VIEW);

    case _constants.SELECT_TOOL_3D_FIRST_PERSON:
      return state.set('mode', _constants.MODE_3D_FIRST_PERSON);

    default:
      return state;
  }
};

var _constants = require('../constants');