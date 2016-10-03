'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state, action) {
  switch (action.type) {
    case _constants.SELECT_TOOL_DRAWING_ITEM:
      return selectToolDrawingItem(state, action.sceneComponentType);

    case _constants.UPDATE_DRAWING_ITEM:
      return updateDrawingItem(state, action.layerID, action.x, action.y, action.catalog);

    case _constants.END_DRAWING_ITEM:
      return endDrawingItem(state, action.layerID, action.x, action.y, action.catalog);

    default:
      return state;
  }
};

var _immutable = require('immutable');

var _constants = require('../constants');

var _layerOperations = require('../utils/layer-operations');

function selectToolDrawingItem(state, sceneComponentType) {
  return state.merge({
    mode: _constants.MODE_DRAWING_ITEM,
    drawingSupport: (0, _immutable.Map)({
      type: sceneComponentType
    })
  });
}

/** holes operations **/
function updateDrawingItem(state, layerID, x, y, catalog) {
  var drawingSupport = state.drawingSupport;


  var scene = state.scene.updateIn(['layers', layerID], function (layer) {
    return layer.withMutations(function (layer) {

      if (drawingSupport.has('currentID')) {
        layer.updateIn(['items', drawingSupport.get('currentID')], function (item) {
          return item.merge({ x: x, y: y });
        });
      } else {
        var _addItem = (0, _layerOperations.addItem)(layer, drawingSupport.get('type'), x, y, 200, 100, 0, catalog);

        var item = _addItem.item;

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

function endDrawingItem(state, layerID, x, y, catalog) {
  state = updateDrawingItem(state, layerID, x, y, catalog);
  return state.merge({
    mode: _constants.MODE_IDLE,
    scene: state.scene.updateIn(['layers', layerID], function (layer) {
      return (0, _layerOperations.unselectAll)(layer);
    }),
    drawingSupport: null
  });
}