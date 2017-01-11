'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state, action) {
  switch (action.type) {
    case _constants.SELECT_ITEM:
      return selectItem(state, action.layerID, action.itemID);

    case _constants.SELECT_TOOL_DRAWING_ITEM:
      return selectToolDrawingItem(state, action.sceneComponentType);

    case _constants.UPDATE_DRAWING_ITEM:
      return updateDrawingItem(state, action.layerID, action.x, action.y);

    case _constants.END_DRAWING_ITEM:
      return endDrawingItem(state, action.layerID, action.x, action.y);

    case _constants.BEGIN_DRAGGING_ITEM:
      return beginDraggingItem(state, action.layerID, action.itemID, action.x, action.y);

    case _constants.UPDATE_DRAGGING_ITEM:
      return updateDraggingItem(state, action.x, action.y);

    case _constants.END_DRAGGING_ITEM:
      return endDraggingItem(state, action.x, action.y);

    case _constants.BEGIN_ROTATING_ITEM:
      return beginRotatingItem(state, action.layerID, action.itemID, action.x, action.y);

    case _constants.UPDATE_ROTATING_ITEM:
      return updateRotatingItem(state, action.x, action.y);

    case _constants.END_ROTATING_ITEM:
      return endRotatingItem(state, action.x, action.y);

    default:
      return state;
  }
};

var _immutable = require('immutable');

var _constants = require('../constants');

var _layerOperations = require('../utils/layer-operations');

var _geometry = require('../utils/geometry');

var Geometry = _interopRequireWildcard(_geometry);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function selectToolDrawingItem(state, sceneComponentType) {
  return state.merge({
    mode: _constants.MODE_DRAWING_ITEM,
    drawingSupport: (0, _immutable.Map)({
      type: sceneComponentType
    })
  });
}

/** holes operations **/
function updateDrawingItem(state, layerID, x, y) {
  var drawingSupport = state.drawingSupport,
      catalog = state.catalog;


  var scene = state.scene.updateIn(['layers', layerID], function (layer) {
    return layer.withMutations(function (layer) {

      if (drawingSupport.has('currentID')) {
        layer.updateIn(['items', drawingSupport.get('currentID')], function (item) {
          return item.merge({ x: x, y: y });
        });
      } else {
        var _addItem = (0, _layerOperations.addItem)(layer, drawingSupport.get('type'), x, y, 200, 100, 0, catalog),
            item = _addItem.item;

        (0, _layerOperations.select)(layer, 'items', item.id);
        drawingSupport = drawingSupport.set('currentID', item.id);
      }
    });
  });

  return state.merge({
    scene: scene,
    drawingSupport: drawingSupport
  });
}

function endDrawingItem(state, layerID, x, y) {
  var catalog = state.catalog;
  state = updateDrawingItem(state, layerID, x, y, catalog);
  var scene = state.scene.updateIn(['layers', layerID], function (layer) {
    return (0, _layerOperations.unselectAll)(layer);
  });
  return state.merge({
    scene: scene,
    sceneHistory: state.sceneHistory.push(scene),
    drawingSupport: (0, _immutable.Map)({
      type: state.drawingSupport.get('type')
    })
  });
}

function beginDraggingItem(state, layerID, itemID, x, y) {

  var item = state.getIn(['scene', 'layers', layerID, 'items', itemID]);

  return state.merge({
    mode: _constants.MODE_DRAGGING_ITEM,
    draggingSupport: (0, _immutable.Map)({
      layerID: layerID,
      itemID: itemID,
      startPointX: x,
      startPointY: y,
      originalX: item.x,
      originalY: item.y
    })
  });
}

function updateDraggingItem(state, x, y) {
  var draggingSupport = state.draggingSupport,
      scene = state.scene;


  var layerID = draggingSupport.get('layerID');
  var itemID = draggingSupport.get('itemID');
  var startPointX = draggingSupport.get('startPointX');
  var startPointY = draggingSupport.get('startPointY');
  var originalX = draggingSupport.get('originalX');
  var originalY = draggingSupport.get('originalY');

  var diffX = startPointX - x;
  var diffY = startPointY - y;

  var item = scene.getIn(['layers', layerID, 'items', itemID]);
  item = item.merge({
    x: originalX - diffX,
    y: originalY - diffY
  });

  return state.merge({
    scene: scene.mergeIn(['layers', layerID, 'items', itemID], item)
  });
}

function endDraggingItem(state, x, y) {
  state = updateDraggingItem(state, x, y);
  return state.merge({
    mode: _constants.MODE_IDLE,
    sceneHistory: state.sceneHistory.push(state.scene)
  });
}

function beginRotatingItem(state, layerID, itemID, x, y) {

  var item = state.getIn(['scene', 'layers', layerID, 'items', itemID]);

  return state.merge({
    mode: _constants.MODE_ROTATING_ITEM,
    rotatingSupport: (0, _immutable.Map)({
      layerID: layerID,
      itemID: itemID
    })
  });
}

function updateRotatingItem(state, x, y) {
  var rotatingSupport = state.rotatingSupport,
      scene = state.scene;


  var layerID = rotatingSupport.get('layerID');
  var itemID = rotatingSupport.get('itemID');
  var item = state.getIn(['scene', 'layers', layerID, 'items', itemID]);

  var deltaX = x - item.x;
  var deltaY = y - item.y;
  var rotation = Math.atan2(deltaY, deltaX) * 180 / Math.PI - 90;

  item = item.merge({
    rotation: rotation
  });

  return state.merge({
    scene: scene.mergeIn(['layers', layerID, 'items', itemID], item)
  });
}

function endRotatingItem(state, x, y) {
  state = updateRotatingItem(state, x, y);
  return state.merge({
    mode: _constants.MODE_IDLE,
    sceneHistory: state.sceneHistory.push(state.scene)
  });
}

function selectItem(state, layerID, itemID) {
  var scene = state.scene;

  scene = scene.merge({
    layers: scene.layers.map(_layerOperations.unselectAll),
    selectedLayer: layerID
  });

  scene = scene.updateIn(['layers', layerID], function (layer) {
    return layer.withMutations(function (layer) {
      var item = layer.getIn(['items', itemID]);
      (0, _layerOperations.select)(layer, 'items', itemID);
    });
  });

  return state.merge({
    scene: scene,
    sceneHistory: state.sceneHistory.push(scene)
  });
}