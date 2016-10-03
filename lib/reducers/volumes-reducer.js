'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state, action) {
  switch (action.type) {
    case _constants.SELECT_TOOL_VOLUMES_SUMMARY:
      return state.set('mode', _constants.MODE_VOLUMES_SUMMARY);

    default:
      return state;
  }
};

var _constants = require('../constants');