'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state, action) {

  state = state.merge({ sceneHistory: _export2.history.historyPush(state.sceneHistory, state.scene) });

  switch (action.type) {
    case _constants.SELECT_TOOL_3D_VIEW:
      state = _export.Project.rollback(state).updatedState;
      state = _export.Project.setMode(state, _constants.MODE_3D_VIEW).updatedState;
      return state;

    case _constants.SELECT_TOOL_3D_FIRST_PERSON:
      state = _export.Project.rollback(state).updatedState;
      state = _export.Project.setMode(state, _constants.MODE_3D_FIRST_PERSON).updatedState;
      return state;

    default:
      return state;
  }
};

var _constants = require('../constants');

var _export = require('../class/export');

var _export2 = require('../utils/export');