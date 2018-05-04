import {List} from 'immutable';
import {
  Group,
  Layer,
  Hole,
  Vertex
} from './export';
import {
  LayerOperations,
  history,
  IDBroker,
  NameGenerator,
  GeometryUtils
} from '../utils/export';

class Line{

  static create( state, layerID, type, x0, y0, x1, y1, properties ) {

    let lineID = IDBroker.acquireID();

    let { updatedState: stateV0, vertex: v0 } = Vertex.add( state  , layerID, x0, y0, 'lines', lineID );
    let { updatedState: stateV1, vertex: v1 } = Vertex.add( stateV0, layerID, x1, y1, 'lines', lineID );
    state = stateV1;

    let line = state.catalog.factoryElement(type, {
      id: lineID,
      name: NameGenerator.generateName('lines', state.catalog.getIn(['elements', type, 'info', 'title'])),
      vertices: new List([v0.id, v1.id]),
      type
    }, properties);

    state = state.setIn(['scene', 'layers', layerID, 'lines', lineID], line);

    //missing history?

    return {updatedState: state, line};
  }

  static select( state, layerID, lineID ){
    let line = state.getIn([ 'scene','layers', layerID, 'lines', lineID ]);

    state = state.mergeIn(['scene'], {
      layers: state.alterate ? state.scene.layers : state.scene.layers.map(LayerOperations.unselectAll),
      selectedLayer: layerID
    });

    state = Layer.select( state, layerID, 'lines', lineID ).updatedState;
    state = Layer.select( state, layerID, 'vertices', line.vertices.get(0) ).updatedState;
    state = Layer.select( state, layerID, 'vertices', line.vertices.get(1) ).updatedState;

    state = state.merge({
      sceneHistory: history.historyPush( state.sceneHistory, state.scene )
    });

    return {updatedState: state};
  }

  static remove( state, layerID, lineID ) {
    let line = state.getIn(['scene', 'layers', layerID, 'lines', lineID]);

    state = this.unselect( state, layerID, lineID ).updatedState;
    line.holes.forEach(holeID => state = Hole.remove(state, layerID, holeID).updatedState);
    state = Layer.removeElement( state, layerID, 'lines', lineID ).updatedState;

    line.vertices.forEach(vertexID => state = Vertex.remove( state, layerID, vertexID, 'lines', lineID ).updatedState);

    state.getIn(['scene', 'groups']).forEach( group => state = Group.removeElement(state, group.id, layerID, 'lines', lineID).updatedState );

    state = state.merge({
      sceneHistory: history.historyPush( state.sceneHistory, state.scene )
    });

    return {updatedState: state};
  }

  static unselect( state, layerID, lineID ) {
    let line = state.getIn([ 'scene','layers', layerID, 'lines', lineID ]);

    state = Layer.unselect( state, layerID, 'vertices', line.vertices.get(0) ).updatedState;
    state = Layer.unselect( state, layerID, 'vertices', line.vertices.get(1) ).updatedState;
    state = Layer.unselect( state, layerID, 'lines', lineID ).updatedState;

    state = state.merge({
      sceneHistory: history.historyPush( state.sceneHistory, state.scene )
    });

    return {updatedState: state};
  }

  static split( state, layerID, lineID, x, y ) {

    let line = state.getIn(['scene', 'layers', layerID, 'lines', lineID]);
    let v0 = state.getIn(['scene', 'layers', layerID, 'vertices', line.vertices.get(0)]);
    let v1 = state.getIn(['scene', 'layers', layerID, 'vertices', line.vertices.get(1)]);
    let {x: x0, y: y0} = v0;
    let {x: x1, y: y1} = v1;

    let { updatedState: stateL1, line: line0 } = Line.create( state  , layerID, line.type, x0, y0, x, y, line.get('properties'));
    let { updatedState: stateL2, line: line1 } = Line.create( stateL1, layerID, line.type, x1, y1, x, y, line.get('properties'));
    state = stateL2;

    let splitPointOffset = GeometryUtils.pointPositionOnLineSegment(x0, y0, x1, y1, x, y);
    let minVertex = GeometryUtils.minVertex(v0, v1);

    line.holes.forEach(holeID => {
      let hole = state.getIn(['scene', 'layers', layerID, 'holes', holeID]);

      let holeOffset = hole.offset;
      if (minVertex.x === x1 && minVertex.y === y1) {
        splitPointOffset = 1 - splitPointOffset;
        holeOffset = 1 - hole.offset;
      }

      if (holeOffset < splitPointOffset) {
        let offset = holeOffset / splitPointOffset;
        if (minVertex.x === x1 && minVertex.y === y1) {
          offset = 1 - offset;
        }
        state = Hole.create( state, layerID, hole.type, line0.id, offset, hole.properties ).updatedState;
      } else {
        let offset = (holeOffset - splitPointOffset) / (1 - splitPointOffset);
        if (minVertex.x === x1 && minVertex.y === y1) {
          offset = 1 - offset;
        }
        state = Hole.create( state, layerID, hole.type, line1.id, offset, hole.properties ).updatedState;
      }
    });

    state = Line.remove( state, layerID, lineID ).updatedState;

    return { updatedState: state, lines: new List([line0, line1]) };
  }

  static addFromPoints( state, layerID, type, points, properties, holes ) {
    points = new List(points)
      .sort(({x: x1, y: y1}, {x: x2, y: y2}) => x1 === x2 ? y1 - y2 : x1 - x2 );

    let pointsPair = points.zip(points.skip(1))
      .filterNot(([{x: x1, y: y1}, {x: x2, y: y2}]) => x1 === x2 && y1 === y2 );

    let lines = [];

    pointsPair.forEach( ([{x: x1, y: y1}, {x: x2, y: y2}]) => {
      let { updatedState: stateL, line } = this.create( state, layerID, type, x1, y1, x2, y2, properties );
      state = stateL;

      if( holes ) {
        holes.forEach(holeWithOffsetPoint => {
          let {x: xp, y: yp} = holeWithOffsetPoint.offsetPosition;

          if (GeometryUtils.isPointOnLineSegment(x1, y1, x2, y2, xp, yp)) {

            let newOffset = GeometryUtils.pointPositionOnLineSegment(x1, y1, x2, y2, xp, yp);

            if (newOffset >= 0 && newOffset <= 1) {
              state = Hole.create( state, layerID, holeWithOffsetPoint.hole.type, line.id, newOffset, holeWithOffsetPoint.hole.properties ).updatedState;
            }
          }
        });
      }

      lines.push( line );
    });

    return { updatedState: state, lines: new List(lines) };
  }

  static createAvoidingIntersections( state, layerID, type, x0, y0, x1, y1, oldProperties, oldHoles ) {

    let points = [{x: x0, y: y0}, {x: x1, y: y1}];

    state.getIn(['scene', 'layers', layerID, 'lines']).forEach( line => {
      let [v0, v1] = line.vertices.map(vertexID => state.getIn(['scene', 'layers', layerID, 'vertices']).get(vertexID)).toArray();

      let hasCommonEndpoint = (
        GeometryUtils.samePoints(v0, points[0]) ||
        GeometryUtils.samePoints(v0, points[1]) ||
        GeometryUtils.samePoints(v1, points[0]) ||
        GeometryUtils.samePoints(v1, points[1])
      );

      let intersection = GeometryUtils.intersectionFromTwoLineSegment( points[0], points[1], v0, v1 );

      if (intersection.type === 'colinear') {
        if (!oldHoles) { oldHoles = []; }

        let orderedVertices = GeometryUtils.orderVertices(points);

        state.getIn(['scene', 'layers', layerID, 'lines', line.id, 'holes']).forEach(holeID => {
          let hole = state.getIn(['scene', 'layers', layerID, 'holes', holeID]);
          let oldLineLength = GeometryUtils.pointsDistance(v0.x, v0.y, v1.x, v1.y);

          let alpha = Math.atan2(orderedVertices[1].y - orderedVertices[0].y,
            orderedVertices[1].x - orderedVertices[0].x);

          let offset = GeometryUtils.samePoints( orderedVertices[1], line.vertices.get(1) ) ? ( 1 - hole.offset ) : hole.offset;

          let xp = oldLineLength * offset * Math.cos(alpha) + v0.x;
          let yp = oldLineLength * offset * Math.sin(alpha) + v0.y;

          oldHoles.push({hole, offsetPosition: {x: xp, y: yp}});
        });

        state = this.remove( state, layerID, line.id ).updatedState;

        points.push(v0, v1);
      }

      if (intersection.type === 'intersecting' && (!hasCommonEndpoint)) {
        state = this.split( state, layerID, line.id, intersection.point.x, intersection.point.y ).updatedState;
        points.push(intersection.point);
      }

    });

    state = Line.addFromPoints( state, layerID, type, points, oldProperties, oldHoles ).updatedState;

    return { updatedState: state };
  }

}

export { Line as default };
