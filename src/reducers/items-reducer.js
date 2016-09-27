import {List, Map} from 'immutable';

import {
  SELECT_TOOL_DRAWING_ITEM,
  UPDATE_DRAWING_ITEM,
  END_DRAWING_ITEM,

  MODE_IDLE,
  MODE_DRAWING_ITEM,
} from '../constants';

import {addItem, removeItem, unselect, select, unselectAll} from '../utils/layer-operations';

export default function (state, action) {
  switch (action.type) {
    case SELECT_TOOL_DRAWING_ITEM:
      return selectToolDrawingItem(state, action.sceneComponentType);

    case UPDATE_DRAWING_ITEM:
      return updateDrawingItem(state, action.layerID, action.x, action.y, action.catalog);

    case END_DRAWING_ITEM:
      return endDrawingItem(state, action.layerID, action.x, action.y, action.catalog);

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
  return state.merge({
    mode: MODE_IDLE,
    scene: state.scene.updateIn(['layers', layerID], layer => unselectAll(layer)),
    drawingSupport: null,
  });

}
