import {
  BEGIN_DRAGGING_VERTEX,
  UPDATE_DRAGGING_VERTEX,
  END_DRAGGING_VERTEX,
  MODE_DRAGGING_VERTEX,
  MODE_IDLE
} from '../constants'
import {Map, List} from 'immutable';
import {sceneSnapElements} from '../utils/snap-scene';
import {nearestSnap} from '../utils/snap';
import {detectAndUpdateAreas, removeLine, addLineAvoidingIntersections} from '../utils/layer-operations';

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

  let snapElements = sceneSnapElements(state.scene);

  return state.merge({
    mode: MODE_DRAGGING_VERTEX,
    snapElements,
    draggingSupport: Map({
      layerID, vertexID
    })
  });
}

function updateDraggingVertex(state, x, y) {
  let {draggingSupport, snapElements, scene} = state;
  let snap = nearestSnap(snapElements, x, y);
  if (snap) ({x, y} = snap.point);

  let layerID = draggingSupport.get('layerID');
  let vertexID = draggingSupport.get('vertexID');
  return state.merge({
    activeSnapElement: snap ? snap.snap : null,
    scene: scene.mergeIn(['layers', layerID, 'vertices', vertexID], {x, y})
  });
}

function endDraggingVertex(state, x, y) {
  let catalog = state.catalog;

  let {draggingSupport} = state;
  let layerID = draggingSupport.get('layerID');
  let vertexID = draggingSupport.get('vertexID');
  let lineIDs = state.scene.layers.get(layerID).vertices.get(vertexID).lines;

  let scene = state.scene.updateIn(['layers', layerID], layer => layer.withMutations(layer => {

    lineIDs.forEach(lineID =>{
      let line = layer.lines.get(lineID);

      let oldVertexID;

      if(line.vertices.get(0) === vertexID) {
        // I need to invert vertices
        oldVertexID = line.vertices.get(1);
      } else {
        oldVertexID = line.vertices.get(0);
      }

      let oldVertex = layer.vertices.get(oldVertexID);
      let vertex = layer.vertices.get(vertexID);

      removeLine(layer, lineID);
      addLineAvoidingIntersections(layer, line.type, oldVertex.x, oldVertex.y, vertex.x, vertex.y, catalog, line.properties);
    });

    detectAndUpdateAreas(layer, catalog);
  }));

  return state.merge({
    mode: MODE_IDLE,
    draggingSupport: null,
    scene,

    activeSnapElement: null,
    snapElements: new List(),
    sceneHistory: state.sceneHistory.push(scene)
  });
}
