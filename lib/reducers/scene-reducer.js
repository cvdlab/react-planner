'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state, action) {

  state = state.merge({ sceneHistory: _export2.history.historyPush(state.sceneHistory, state.scene) });

  switch (action.type) {
    case _constants.ADD_LAYER:
      return _export.Layer.create(state, action.name, action.altitude).updatedState;

    case _constants.SELECT_LAYER:
      return _export.Layer.select(state, action.layerID).updatedState;

    case _constants.SET_LAYER_PROPERTIES:
      return _export.Layer.setProperties(state, action.layerID, action.properties).updatedState;

    case _constants.REMOVE_LAYER:
      return _export.Layer.remove(state, action.layerID).updatedState;

    default:
      return state;
  }
};

var _export = require('../class/export');

var _export2 = require('../utils/export');

var _constants = require('../constants');