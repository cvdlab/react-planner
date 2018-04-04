import { List, Map } from 'immutable';
import { history } from '../utils/export';

import { SELECT_TOOL_DRAWING_ITEM, UPDATE_DRAWING_ITEM, END_DRAWING_ITEM, BEGIN_DRAGGING_ITEM, UPDATE_DRAGGING_ITEM, END_DRAGGING_ITEM, BEGIN_ROTATING_ITEM, UPDATE_ROTATING_ITEM, END_ROTATING_ITEM, SELECT_ITEM, MODE_IDLE, MODE_DRAWING_ITEM, MODE_DRAGGING_ITEM, MODE_ROTATING_ITEM } from '../constants';

import { addItem, removeItem, unselect, select, unselectAll } from '../utils/layer-operations';

export default function (state, action) {
  switch (action.type) {
    case SELECT_ITEM:
      return selectItem(state, action.layerID, action.itemID);

    case SELECT_TOOL_DRAWING_ITEM:
      return selectToolDrawingItem(state, action.sceneComponentType);

    case UPDATE_DRAWING_ITEM:
      return updateDrawingItem(state, action.layerID, action.x, action.y);

    case END_DRAWING_ITEM:
      return endDrawingItem(state, action.layerID, action.x, action.y);

    case BEGIN_DRAGGING_ITEM:
      return beginDraggingItem(state, action.layerID, action.itemID, action.x, action.y);

    case UPDATE_DRAGGING_ITEM:
      return updateDraggingItem(state, action.x, action.y);

    case END_DRAGGING_ITEM:
      return endDraggingItem(state, action.x, action.y);

    case BEGIN_ROTATING_ITEM:
      return beginRotatingItem(state, action.layerID, action.itemID, action.x, action.y);

    case UPDATE_ROTATING_ITEM:
      return updateRotatingItem(state, action.x, action.y);

    case END_ROTATING_ITEM:
      return endRotatingItem(state, action.x, action.y);

    default:
      return state;
  }
}

function selectToolDrawingItem(state, sceneComponentType) {
  return state.merge({
    mode: MODE_DRAWING_ITEM,
    drawingSupport: Map({
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
        var _addItem = addItem(layer, drawingSupport.get('type'), x, y, 200, 100, 0, catalog),
            item = _addItem.item;

        select(layer, 'items', item.id);
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
    return unselectAll(layer);
  });
  return state.merge({
    scene: scene,
    sceneHistory: history.historyPush(state.sceneHistory, scene),
    drawingSupport: Map({
      type: state.drawingSupport.get('type')
    })
  });
}

function beginDraggingItem(state, layerID, itemID, x, y) {

  var item = state.getIn(['scene', 'layers', layerID, 'items', itemID]);

  return state.merge({
    mode: MODE_DRAGGING_ITEM,
    draggingSupport: Map({
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
    mode: MODE_IDLE,
    sceneHistory: history.historyPush(state.sceneHistory, state.scene)
  });
}

function beginRotatingItem(state, layerID, itemID, x, y) {

  var item = state.getIn(['scene', 'layers', layerID, 'items', itemID]);

  return state.merge({
    mode: MODE_ROTATING_ITEM,
    rotatingSupport: Map({
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

  if (-5 < rotation && rotation < 5) rotation = 0;
  if (-95 < rotation && rotation < -85) rotation = -90;
  if (-185 < rotation && rotation < -175) rotation = -180;
  if (85 < rotation && rotation < 90) rotation = 90;
  if (-270 < rotation && rotation < -265) rotation = 90;

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
    mode: MODE_IDLE,
    sceneHistory: history.historyPush(state.sceneHistory, state.scene)
  });
}

function selectItem(state, layerID, itemID) {
  var scene = state.scene;

  scene = scene.merge({
    layers: scene.layers.map(unselectAll),
    selectedLayer: layerID
  });

  scene = scene.updateIn(['layers', layerID], function (layer) {
    return layer.withMutations(function (layer) {
      select(layer, 'items', itemID);
    });
  });

  return state.merge({
    scene: scene,
    sceneHistory: history.historyPush(state.sceneHistory, scene)
  });
}