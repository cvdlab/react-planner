"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.beginDraggingItem = beginDraggingItem;
exports.beginRotatingItem = beginRotatingItem;
exports.endDraggingItem = endDraggingItem;
exports.endDrawingItem = endDrawingItem;
exports.endRotatingItem = endRotatingItem;
exports.selectItem = selectItem;
exports.selectToolDrawingItem = selectToolDrawingItem;
exports.updateDraggingItem = updateDraggingItem;
exports.updateDrawingItem = updateDrawingItem;
exports.updateRotatingItem = updateRotatingItem;
var _constants = require("../constants");
function selectItem(layerID, itemID) {
  return {
    type: _constants.SELECT_ITEM,
    layerID: layerID,
    itemID: itemID
  };
}
function selectToolDrawingItem(sceneComponentType) {
  return {
    type: _constants.SELECT_TOOL_DRAWING_ITEM,
    sceneComponentType: sceneComponentType
  };
}
function updateDrawingItem(layerID, x, y) {
  return {
    type: _constants.UPDATE_DRAWING_ITEM,
    layerID: layerID,
    x: x,
    y: y
  };
}
function endDrawingItem(layerID, x, y) {
  return {
    type: _constants.END_DRAWING_ITEM,
    layerID: layerID,
    x: x,
    y: y
  };
}
function beginDraggingItem(layerID, itemID, x, y) {
  return {
    type: _constants.BEGIN_DRAGGING_ITEM,
    layerID: layerID,
    itemID: itemID,
    x: x,
    y: y
  };
}
function updateDraggingItem(x, y) {
  return {
    type: _constants.UPDATE_DRAGGING_ITEM,
    x: x,
    y: y
  };
}
function endDraggingItem(x, y) {
  return {
    type: _constants.END_DRAGGING_ITEM,
    x: x,
    y: y
  };
}
function beginRotatingItem(layerID, itemID, x, y) {
  return {
    type: _constants.BEGIN_ROTATING_ITEM,
    layerID: layerID,
    itemID: itemID,
    x: x,
    y: y
  };
}
function updateRotatingItem(x, y) {
  return {
    type: _constants.UPDATE_ROTATING_ITEM,
    x: x,
    y: y
  };
}
function endRotatingItem(x, y) {
  return {
    type: _constants.END_ROTATING_ITEM,
    x: x,
    y: y
  };
}