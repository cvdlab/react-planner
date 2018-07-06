'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state, action) {
  switch (action.type) {
    case _constants.SELECT_ITEM:
      return _export.Item.select(state, action.layerID, action.itemID).updatedState;

    case _constants.SELECT_TOOL_DRAWING_ITEM:
      state = state.merge({ sceneHistory: _export2.history.historyPush(state.sceneHistory, state.scene) });
      return _export.Item.selectToolDrawingItem(state, action.sceneComponentType).updatedState;

    case _constants.UPDATE_DRAWING_ITEM:
      return _export.Item.updateDrawingItem(state, action.layerID, action.x, action.y).updatedState;

    case _constants.END_DRAWING_ITEM:
      state = state.merge({ sceneHistory: _export2.history.historyPush(state.sceneHistory, state.scene) });
      return _export.Item.endDrawingItem(state, action.layerID, action.x, action.y).updatedState;

    case _constants.BEGIN_DRAGGING_ITEM:
      state = state.merge({ sceneHistory: _export2.history.historyPush(state.sceneHistory, state.scene) });
      return _export.Item.beginDraggingItem(state, action.layerID, action.itemID, action.x, action.y).updatedState;

    case _constants.UPDATE_DRAGGING_ITEM:
      return _export.Item.updateDraggingItem(state, action.x, action.y).updatedState;

    case _constants.END_DRAGGING_ITEM:
      state = state.merge({ sceneHistory: _export2.history.historyPush(state.sceneHistory, state.scene) });
      return _export.Item.endDraggingItem(state, action.x, action.y).updatedState;

    case _constants.BEGIN_ROTATING_ITEM:
      state = state.merge({ sceneHistory: _export2.history.historyPush(state.sceneHistory, state.scene) });
      return _export.Item.beginRotatingItem(state, action.layerID, action.itemID, action.x, action.y).updatedState;

    case _constants.UPDATE_ROTATING_ITEM:
      return _export.Item.updateRotatingItem(state, action.x, action.y).updatedState;

    case _constants.END_ROTATING_ITEM:
      state = state.merge({ sceneHistory: _export2.history.historyPush(state.sceneHistory, state.scene) });
      return _export.Item.endRotatingItem(state, action.x, action.y).updatedState;

    default:
      return state;
  }
};

var _export = require('../class/export');

var _export2 = require('../utils/export');

var _constants = require('../constants');