import { BEGIN_DRAGGING_VERTEX, UPDATE_DRAGGING_VERTEX, END_DRAGGING_VERTEX, MODE_DRAGGING_VERTEX, MODE_IDLE } from '../constants';
import { Map, List } from 'immutable';
import { sceneSnapElements } from '../utils/snap-scene';
import { nearestSnap } from '../utils/snap';
import { detectAndUpdateAreas, removeLine, addLineAvoidingIntersections, mergeEqualsVertices } from '../utils/layer-operations';

export default function (state, action) {
  switch (action.type) {
    case BEGIN_DRAGGING_VERTEX:
      return beginDraggingVertex(state, action.layerID, action.vertexID, action.x, action.y, action.detectSnap);

    case UPDATE_DRAGGING_VERTEX:
      return updateDraggingVertex(state, action.x, action.y, action.detectSnap);

    case END_DRAGGING_VERTEX:
      return endDraggingVertex(state, action.x, action.y, action.detectSnap);

    default:
      return state;
  }
}

function beginDraggingVertex(state, layerID, vertexID, x, y, detectSnap) {

  var snapElements = sceneSnapElements(state.scene);

  return state.merge({
    mode: MODE_DRAGGING_VERTEX,
    snapElements: snapElements,
    draggingSupport: Map({
      layerID: layerID, vertexID: vertexID
    })
  });
}

function updateDraggingVertex(state, x, y, detectSnap) {
  var draggingSupport = state.draggingSupport,
      snapElements = state.snapElements,
      scene = state.scene;


  var snap = null;
  if (detectSnap) {
    snap = nearestSnap(snapElements, x, y);
    if (snap) {
      ;
      var _snap$point = snap.point;
      x = _snap$point.x;
      y = _snap$point.y;
    }
  }

  var layerID = draggingSupport.get('layerID');
  var vertexID = draggingSupport.get('vertexID');
  return state.merge({
    activeSnapElement: snap ? snap.snap : null,
    scene: scene.mergeIn(['layers', layerID, 'vertices', vertexID], { x: x, y: y })
  });
}

function endDraggingVertex(state, x, y, detectSnap) {
  var catalog = state.catalog;

  var _state = state,
      draggingSupport = _state.draggingSupport;

  var layerID = draggingSupport.get('layerID');
  var vertexID = draggingSupport.get('vertexID');
  var lineIDs = state.scene.layers.get(layerID).vertices.get(vertexID).lines;

  /** TODO: remove this **/
  state = updateDraggingVertex(state, x, y, detectSnap);
  var scene = state.scene.updateIn(['layers', layerID], function (layer) {
    return mergeEqualsVertices(layer, vertexID);
  });

  return state.merge({
    mode: MODE_IDLE,
    draggingSupport: null,
    scene: scene,

    activeSnapElement: null,
    snapElements: new List(),
    sceneHistory: state.sceneHistory.push(scene)
  });

  /** end TODO **/

  // let scene = state.scene.updateIn(['layers', layerID], layer => layer.withMutations(layer => {
  //
  //   lineIDs.forEach(lineID => {
  //     let line = layer.lines.get(lineID);
  //
  //     if (line) {
  //
  //       let oldVertexID;
  //
  //       if (line.vertices.get(0) === vertexID) {
  //         // I need to invert vertices
  //         oldVertexID = line.vertices.get(1);
  //       } else {
  //         oldVertexID = line.vertices.get(0);
  //       }
  //
  //       let oldVertex = layer.vertices.get(oldVertexID);
  //       let vertex = layer.vertices.get(vertexID);
  //
  //       removeLine(layer, lineID);
  //       addLineAvoidingIntersections(layer, line.type, oldVertex.x, oldVertex.y, vertex.x, vertex.y, catalog, line.properties);
  //     }
  //   });
  //
  //   detectAndUpdateAreas(layer, catalog);
  // }));
  //
  // return state.merge({
  //   mode: MODE_IDLE,
  //   draggingSupport: null,
  //   scene,
  //
  //   activeSnapElement: null,
  //   snapElements: new List(),
  //   sceneHistory: state.sceneHistory.push(scene)
  // });
}