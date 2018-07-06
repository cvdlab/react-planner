'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state, action) {
  switch (action.type) {
    case _constants.SELECT_TOOL_DRAWING_HOLE:
      state = state.merge({ sceneHistory: _export2.history.historyPush(state.sceneHistory, state.scene) });
      return _export.Hole.selectToolDrawingHole(state, action.sceneComponentType).updatedState;

    case _constants.UPDATE_DRAWING_HOLE:
      return _export.Hole.updateDrawingHole(state, action.layerID, action.x, action.y).updatedState;

    case _constants.END_DRAWING_HOLE:
      state = state.merge({ sceneHistory: _export2.history.historyPush(state.sceneHistory, state.scene) });
      return _export.Hole.endDrawingHole(state, action.layerID, action.x, action.y).updatedState;

    case _constants.BEGIN_DRAGGING_HOLE:
      state = state.merge({ sceneHistory: _export2.history.historyPush(state.sceneHistory, state.scene) });
      return _export.Hole.beginDraggingHole(state, action.layerID, action.holeID, action.x, action.y).updatedState;

    case _constants.UPDATE_DRAGGING_HOLE:
      return _export.Hole.updateDraggingHole(state, action.x, action.y).updatedState;

    case _constants.END_DRAGGING_HOLE:
      state = state.merge({ sceneHistory: _export2.history.historyPush(state.sceneHistory, state.scene) });
      return _export.Hole.endDraggingHole(state, action.x, action.y).updatedState;

    case _constants.SELECT_HOLE:
      return _export.Hole.select(state, action.layerID, action.holeID).updatedState;

    default:
      return state;
  }
};

var _export = require('../class/export');

var _export2 = require('../utils/export');

var _constants = require('../constants');