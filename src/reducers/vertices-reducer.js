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
import {
  detectAndUpdateAreas,
  removeLine,
  addLineAvoidingIntersections,
  mergeEqualsVertices
} from '../utils/layer-operations';
import {orderVertices, pointsDistance} from "../utils/geometry";

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

  let snapElements = sceneSnapElements(state.scene);

  return state.merge({
    mode: MODE_DRAGGING_VERTEX,
    snapElements,
    draggingSupport: Map({
      layerID, vertexID
    })
  });
}

function updateDraggingVertex(state, x, y, detectSnap) {
  let {draggingSupport, snapElements, scene} = state;

  let snap = null;
  if (detectSnap) {
    snap = nearestSnap(snapElements, x, y);
    if (snap) ({x, y} = snap.point);
  }

  let layerID = draggingSupport.get('layerID');
  let vertexID = draggingSupport.get('vertexID');
  return state.merge({
    activeSnapElement: snap ? snap.snap : null,
    scene: scene.mergeIn(['layers', layerID, 'vertices', vertexID], {x, y})
  });
}

function endDraggingVertex(state, x, y, detectSnap) {
  let catalog = state.catalog;

  let {draggingSupport} = state;
  let layerID = draggingSupport.get('layerID');
  let vertexID = draggingSupport.get('vertexID');
  let lineIDs = state.scene.layers.get(layerID).vertices.get(vertexID).lines;

  /** TODO: remove this **/
  // state = updateDraggingVertex(state, x, y, detectSnap);
  // let scene = state.scene.updateIn(['layers', layerID], layer => mergeEqualsVertices(layer, vertexID));
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

  /** end TODO **/

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

        let orderedVertices = orderVertices([oldVertex, vertex]);

        line.holes.forEach(holeID => {
          let hole = layer.holes.get(holeID);
          let oldLineLength = pointsDistance(oldVertex.x, oldVertex.y, vertex.x, vertex.y);

          let alpha = Math.atan2(orderedVertices[1].y - orderedVertices[0].y,
            orderedVertices[1].x - orderedVertices[0].x);

          let offset = hole.offset;

          if (orderedVertices[1].x === line.vertices.get(1).x
            && orderedVertices[1].y === line.vertices(1).y) {
            offset = 1 - offset;
          }

          let xp = oldLineLength * offset * Math.cos(alpha) + orderedVertices[0].x;
          let yp = oldLineLength * offset * Math.sin(alpha) + orderedVertices[0].y;

          oldHoles.push({hole, offsetPosition: {x: xp, y: yp}});
        });

        console.log(oldHoles);

        removeLine(layer, lineID);
        addLineAvoidingIntersections(layer, line.type,
          oldVertex.x, oldVertex.y,
          vertex.x, vertex.y,
          catalog,
          line.properties, oldHoles);
      }
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
