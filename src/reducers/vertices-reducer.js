import {
  BEGIN_DRAGGING_VERTEX,
  UPDATE_DRAGGING_VERTEX,
  END_DRAGGING_VERTEX,
  MODE_DRAGGING_VERTEX,
  MODE_IDLE
} from '../constants'
import {Map} from 'immutable';

export default function (state, action) {
  switch (action.type) {
    case BEGIN_DRAGGING_VERTEX:
      return beginDraggingVertex(state, action.layerID, action.vertexID, action.x, action.y);

    case UPDATE_DRAGGING_VERTEX:
      return updateDraggingVertex(state, action.x, action.y);

    case END_DRAGGING_VERTEX:
      return endDraggingVertex(state, action.x, action.y);

    default:
      return state;
  }
}

function beginDraggingVertex(state, layerID, vertexID, x, y) {
  return state.merge({
    mode: MODE_DRAGGING_VERTEX,
    draggingSupport: Map({
      layerID, vertexID
    })
  });
}

function updateDraggingVertex(state, x, y) {
  let {draggingSupport} = state;
  let layerID = draggingSupport.get('layerID');
  let vertexID = draggingSupport.get('vertexID');
  return state.mergeIn(['scene', 'layers', layerID, 'vertices', vertexID], {x, y});
}

function endDraggingVertex(state, x, y) {
  state = updateDraggingVertex(state, x, y);
  return state.merge({
    mode: MODE_IDLE,
    draggingSupport: null,
  });
}
