import {
  BEGIN_DRAGGING_VERTEX,
  UPDATE_DRAGGING_VERTEX,
  END_DRAGGING_VERTEX,
  MODE_DRAGGING_VERTEX,
  MODE_IDLE
} from '../constants';
import { Map, List } from 'immutable';
import {
  LayerOperations,
  SnapSceneUtils,
  SnapUtils,
  GeometryUtils,
  history
} from '../utils/export';

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

  let snapElements = SnapSceneUtils.sceneSnapElements(state.scene, new List(), state.snapMask);

  return state.merge({
    mode: MODE_DRAGGING_VERTEX,
    snapElements,
    draggingSupport: Map({
      layerID, vertexID
    })
  });
}

function updateDraggingVertex(state, x, y) {
  let { draggingSupport, snapElements, scene } = state;

  let snap = null;
  if (state.snapMask && !state.snapMask.isEmpty()) {
    snap = SnapUtils.nearestSnap(snapElements, x, y, state.snapMask);
    if (snap) ({ x, y } = snap.point);
  }

  let layerID = draggingSupport.get('layerID');
  let vertexID = draggingSupport.get('vertexID');
  return state.merge({
    activeSnapElement: snap ? snap.snap : null,
    scene: scene.mergeIn(['layers', layerID, 'vertices', vertexID], { x, y })
  });
}

function endDraggingVertex(state, x, y) {
  let catalog = state.catalog;

  let { draggingSupport } = state;
  let layerID = draggingSupport.get('layerID');
  let vertexID = draggingSupport.get('vertexID');
  let lineIDs = state.scene.layers.get(layerID).vertices.get(vertexID).lines;

  let scene = state.scene.updateIn(['layers', layerID], layer => layer.withMutations(layer => {

    lineIDs.forEach(lineID => {
      let line = layer.lines.get(lineID);

      if (line) {

        let oldVertexID;

        if (line.vertices.get(0) === vertexID) {
          // I need to invert vertices
          oldVertexID = line.vertices.get(1);
        } else {
          oldVertexID = line.vertices.get(0);
        }

        let oldVertex = layer.vertices.get(oldVertexID);
        let vertex = layer.vertices.get(vertexID);

        let oldHoles = [];

        let orderedVertices = GeometryUtils.orderVertices([oldVertex, vertex]);

        line.holes.forEach(holeID => {
          let hole = layer.holes.get(holeID);
          let oldLineLength = GeometryUtils.pointsDistance(oldVertex.x, oldVertex.y, vertex.x, vertex.y);

          let alpha = Math.atan2(orderedVertices[1].y - orderedVertices[0].y,
            orderedVertices[1].x - orderedVertices[0].x);

          let offset = hole.offset;

          if (orderedVertices[1].x === line.vertices.get(1).x
            && orderedVertices[1].y === line.vertices(1).y) {
            offset = 1 - offset;
          }

          let xp = oldLineLength * offset * Math.cos(alpha) + orderedVertices[0].x;
          let yp = oldLineLength * offset * Math.sin(alpha) + orderedVertices[0].y;

          oldHoles.push({ hole, offsetPosition: { x: xp, y: yp } });
        });

        LayerOperations.mergeEqualsVertices(layer, vertexID);
        LayerOperations.removeLine(layer, lineID);

        if (!GeometryUtils.samePoints(oldVertex, vertex)) {
          LayerOperations.addLineAvoidingIntersections(layer, line.type,
            oldVertex.x, oldVertex.y,
            vertex.x, vertex.y,
            catalog,
            line.properties, oldHoles);
        }
      }
    });

    LayerOperations.detectAndUpdateAreas(layer, catalog);
  }));

  return state.merge({
    mode: MODE_IDLE,
    draggingSupport: null,
    scene,

    activeSnapElement: null,
    snapElements: new List(),
    sceneHistory: history.historyPush(state.sceneHistory, scene)
  });
}
