import { Map, List } from 'immutable';
import { Vertex as VertexModel } from '../models';
import {
  IDBroker,
  GeometryUtils,
  SnapSceneUtils,
  SnapUtils,
  history
} from '../utils/export';
import {
  MODE_DRAGGING_VERTEX,
  MODE_IDLE
} from '../constants';
import { Layer, Line } from '../class/export';

class Vertex{

  static add( state, layerID, x, y, relatedPrototype, relatedID ) {

    let vertex = state.getIn(['scene', 'layers', layerID, 'vertices']).find(vertex => GeometryUtils.samePoints(vertex, {x, y}));

    if (vertex) {
      vertex = vertex.update(relatedPrototype, related => related.push(relatedID));
    }
    else {
      vertex = new VertexModel({
        id: IDBroker.acquireID(),
        name: 'Vertex',
        x, y,
        [relatedPrototype]: new List([relatedID])
      });
    }

    state = state.setIn(['scene', 'layers', layerID, 'vertices', vertex.id], vertex);

    return { updatedState: state, vertex };
  }

  static addElement( state, layerID, vertexID, elementPrototype, elementID ) {
    state = state.updateIn(['scene', 'layers', layerID, 'vertices', vertexID, elementPrototype], list => list.push( elementID ) );
    return { updatedState: state };
  }

  static removeElement( state, layerID, vertexID, elementPrototype, elementID ) {
    let elementIndex = state.getIn(['scene', 'layers', layerID, 'vertices', vertexID, elementPrototype]).findIndex( el => el === elementID );
    if( elementIndex !== -1 ) {
      state = state.updateIn(['scene', 'layers', layerID, 'vertices', vertexID, elementPrototype], list => list.remove( elementIndex ) );
    }
    return { updatedState: state };
  }

  static select( state, layerID, vertexID ){
    state = state.setIn(['scene', 'layers', layerID, 'vertices', vertexID, 'selected'], true);
    state = state.updateIn(['scene', 'layers', layerID, 'selected', 'vertices'], elems => elems.push(vertexID));

    return { updatedState: state };
  }

  static unselect( state, layerID, vertexID ){
    state = state.setIn(['scene', 'layers', layerID, 'vertices', vertexID, 'selected'], false);
    state = state.updateIn(['scene', 'layers', layerID, 'selected', 'vertices'], elems => elems.filter( el => el.id !== vertexID ));

    return { updatedState: state };
  }

  static remove( state, layerID, vertexID, relatedPrototype, relatedID, forceRemove ) {
    let vertex = state.getIn(['scene', 'layers', layerID, 'vertices', vertexID]);


    if( vertex ) {
      if( relatedPrototype && relatedID ) vertex = vertex.update(relatedPrototype, related => {
        let index = related.findIndex(ID => relatedID === ID);
        return related.delete(index);
      });

      let inUse = vertex.areas.size || vertex.lines.size;

      if( inUse && !forceRemove ) {
        state = state.setIn(['scene', 'layers', layerID, 'vertices', vertexID], vertex);
      }
      else {
        state = state.deleteIn(['scene', 'layers', layerID, 'vertices', vertexID]);
      }
    }

    return { updatedState: state };
  }

  static beginDraggingVertex(state, layerID, vertexID, x, y) {

    let snapElements = SnapSceneUtils.sceneSnapElements(state.scene, new List(), state.snapMask);

    state = state.merge({
      mode: MODE_DRAGGING_VERTEX,
      snapElements,
      draggingSupport: Map({
        layerID, vertexID
      })
    });

    return { updatedState: state };
  }

  static updateDraggingVertex(state, x, y) {
    let { draggingSupport, snapElements, scene } = state;

    let snap = null;
    if (state.snapMask && !state.snapMask.isEmpty()) {
      snap = SnapUtils.nearestSnap(snapElements, x, y, state.snapMask);
      if (snap) ({ x, y } = snap.point);
    }

    let layerID = draggingSupport.get('layerID');
    let vertexID = draggingSupport.get('vertexID');
    state =  state.merge({
      activeSnapElement: snap ? snap.snap : null,
      scene: scene.mergeIn(['layers', layerID, 'vertices', vertexID], { x, y })
    });

    return { updatedState: state };
  }

  static endDraggingVertex(state, x, y) {
    let { draggingSupport } = state;
    let layerID = draggingSupport.get('layerID');
    let vertexID = draggingSupport.get('vertexID');

    let reduced = state.getIn(['scene', 'layers', layerID, 'vertices', vertexID, 'lines']).reduce(
      ( reducedState, lineID ) =>
      {
        if( !reducedState.getIn(['scene', 'layers', layerID, 'lines', lineID])) return reducedState;

        let v_id0 = reducedState.getIn(['scene', 'layers', layerID, 'lines', lineID, 'vertices', 0]);
        let v_id1 = reducedState.getIn(['scene', 'layers', layerID, 'lines', lineID, 'vertices', 1]);
        let oldVertexID = v_id0 === vertexID ? v_id1 : v_id0;

        let oldVertex = reducedState.getIn(['scene', 'layers', layerID, 'vertices', oldVertexID]);
        let vertex = reducedState.getIn(['scene', 'layers', layerID, 'vertices', vertexID]);

        let oldHoles = [];

        let orderedVertices = GeometryUtils.orderVertices([oldVertex, vertex]);

        let holes = reducedState.getIn(['scene', 'layers', layerID, 'lines', lineID, 'holes']);
        if( holes.size ) holes.forEach(holeID => {
          let hole = reducedState.getIn(['scene', 'layers', layerID, 'holes', holeID]);
          let oldLineLength = GeometryUtils.pointsDistance(oldVertex.x, oldVertex.y, vertex.x, vertex.y);

          let alpha = GeometryUtils.angleBetweenTwoPoints( orderedVertices[1].x, orderedVertices[1].y, orderedVertices[0].x, orderedVertices[0].y );

          let offset = hole.offset;

          if(GeometryUtils.samePoints(
            orderedVertices[1],
            reducedState.getIn(['scene', 'layers', layerID, 'lines', lineID, 'vertices', 1])
          )) {
            offset = 1 - offset;
          }

          let xp = oldLineLength * offset * Math.cos(alpha) + orderedVertices[0].x;
          let yp = oldLineLength * offset * Math.sin(alpha) + orderedVertices[0].y;

          oldHoles.push({ hole, offsetPosition: { x: xp, y: yp } });
        });

        let lineType = reducedState.getIn(['scene', 'layers', layerID, 'lines', lineID, 'type']);
        let lineProps = reducedState.getIn(['scene', 'layers', layerID, 'lines', lineID, 'properties']);

        reducedState = Layer.removeZeroLengthLines( reducedState, layerID ).updatedState;
        reducedState = Layer.mergeEqualsVertices( reducedState, layerID, vertexID ).updatedState;
        reducedState = Line.remove( reducedState, layerID, lineID ).updatedState;

        if (!GeometryUtils.samePoints(oldVertex, vertex)) {
          reducedState = Line.createAvoidingIntersections(
            reducedState,
            layerID,
            lineType,
            oldVertex.x,
            oldVertex.y,
            vertex.x,
            vertex.y,
            lineProps,
            oldHoles
          ).updatedState;
        }

        return reducedState;
      },
      state
    );

    state = Layer.detectAndUpdateAreas( reduced, layerID ).updatedState;

    state = state.merge({
      mode: MODE_IDLE,
      draggingSupport: null,
      activeSnapElement: null,
      snapElements: new List(),
      sceneHistory: history.historyPush(state.sceneHistory, state.scene)
    });

    return { updatedState: state };
  }

}

export { Vertex as default };
