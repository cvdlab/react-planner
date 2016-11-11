import {List, Map} from 'immutable';

import {
  SELECT_TOOL_DRAWING_ITEM,
  UPDATE_DRAWING_ITEM,
  END_DRAWING_ITEM,
  BEGIN_DRAGGING_ITEM,
  UPDATE_DRAGGING_ITEM,
  END_DRAGGING_ITEM,
  BEGIN_ROTATING_ITEM,
  UPDATE_ROTATING_ITEM,
  END_ROTATING_ITEM,
  SELECT_ITEM,

  MODE_IDLE,
  MODE_DRAWING_ITEM,
  MODE_DRAGGING_ITEM,
  MODE_ROTATING_ITEM
} from '../constants';

import {addItem, removeItem, unselect, select, unselectAll} from '../utils/layer-operations';
import * as Geometry from '../utils/geometry';

export default function (state, action) {
  switch (action.type) {
    case SELECT_ITEM:
      return selectItem(state, action.layerID, action.itemID);

    case SELECT_TOOL_DRAWING_ITEM:
      return selectToolDrawingItem(state, action.sceneComponentType);

    case UPDATE_DRAWING_ITEM:
      return updateDrawingItem(state, action.layerID, action.x, action.y, action.catalog);

    case END_DRAWING_ITEM:
      return endDrawingItem(state, action.layerID, action.x, action.y, action.catalog);

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
function updateDrawingItem(state, layerID, x, y, catalog) {
  let {drawingSupport} = state;

  let scene = state.scene.updateIn(['layers', layerID], layer => layer.withMutations(layer => {

    if (drawingSupport.has('currentID')) {
      layer.updateIn(['items', drawingSupport.get('currentID')], item => item.merge({x, y}));
    } else {
      let {item} = addItem(layer, drawingSupport.get('type'), x, y, 200, 100, 0, catalog);
      select(layer, 'items', item.id);
      drawingSupport = drawingSupport.set('currentID', item.id);
    }
  }));

  return state.merge({
    scene,
    drawingSupport
  });
}

function endDrawingItem(state, layerID, x, y, catalog) {
  state = updateDrawingItem(state, layerID, x, y, catalog);
  let scene = state.scene.updateIn(['layers', layerID], layer => unselectAll(layer));
  return state.merge({
    scene,
    sceneHistory: state.sceneHistory.push(scene),
    drawingSupport: Map({
      type: state.drawingSupport.get('type')
    })
  });

}

function beginDraggingItem(state, layerID, itemID, x, y) {

  let item = state.getIn(['scene', 'layers', layerID, 'items', itemID]);

  return state.merge({
    mode: MODE_DRAGGING_ITEM,
    draggingSupport: Map({
      layerID,
      itemID,
      startPointX: x,
      startPointY: y,
      originalX: item.x,
      originalY: item.y
    })
  });
}

function updateDraggingItem(state, x, y) {
  let {draggingSupport, scene} = state;

  let layerID = draggingSupport.get('layerID');
  let itemID = draggingSupport.get('itemID');
  let startPointX = draggingSupport.get('startPointX');
  let startPointY = draggingSupport.get('startPointY');
  let originalX = draggingSupport.get('originalX');
  let originalY = draggingSupport.get('originalY');

  let diffX = startPointX - x;
  let diffY = startPointY - y;

  let item = scene.getIn(['layers', layerID, 'items', itemID]);
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
    sceneHistory: state.sceneHistory.push(state.scene)
  });
}

function beginRotatingItem(state, layerID, itemID, x, y) {

  let item = state.getIn(['scene', 'layers', layerID, 'items', itemID]);

  return state.merge({
    mode: MODE_ROTATING_ITEM,
    rotatingSupport: Map({
      layerID,
      itemID
    })
  });
}

function updateRotatingItem(state, x, y) {
  let {rotatingSupport, scene} = state;

  let layerID = rotatingSupport.get('layerID');
  let itemID = rotatingSupport.get('itemID');
  let item = state.getIn(['scene', 'layers', layerID, 'items', itemID]);

  let deltaX = x - item.x;
  let deltaY = y - item.y;
  let rotation = Math.atan2(deltaY, deltaX) * 180 / Math.PI - 90;

  item = item.merge({
    rotation,
  });

  return state.merge({
    scene: scene.mergeIn(['layers', layerID, 'items', itemID], item)
  });
}

function endRotatingItem(state, x, y) {
  state = updateRotatingItem(state, x, y);
  return state.merge({
    mode: MODE_IDLE,
    sceneHistory: state.sceneHistory.push(state.scene)
  });
}

function selectItem(state, layerID, itemID) {
  let scene = state.scene;

  scene = scene.updateIn(['layers', layerID], layer => layer.withMutations(layer => {
      let item = layer.getIn(['items', itemID]);
      unselectAll(layer);
      select(layer, 'items', itemID);
    })
  );

  return state.merge({
    scene,
    sceneHistory: state.sceneHistory.push(scene)
  })
}
