'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectToolDrawingHole = selectToolDrawingHole;
exports.updateDrawingHole = updateDrawingHole;
exports.endDrawingHole = endDrawingHole;

var _constants = require('../constants');

function selectToolDrawingHole(sceneComponentType) {
  return {
    type: _constants.SELECT_TOOL_DRAWING_HOLE,
    sceneComponentType: sceneComponentType
  };
}

function updateDrawingHole(layerID, x, y) {
  return function (dispatch, getState, _ref) {
    var catalog = _ref.catalog;

    dispatch({
      type: _constants.UPDATE_DRAWING_HOLE,
      layerID: layerID, x: x, y: y, catalog: catalog
    });
  };
}

function endDrawingHole(layerID, x, y) {
  return function (dispatch, getState, _ref2) {
    var catalog = _ref2.catalog;

    dispatch({
      type: _constants.END_DRAWING_HOLE,
      layerID: layerID, x: x, y: y, catalog: catalog
    });
  };
}