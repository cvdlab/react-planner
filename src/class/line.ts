import {Map, List, fromJS} from 'immutable';
import {
  Group,
  Layer,
  Hole,
  Vertex
} from './export';
import {
  IDBroker,
  NameGenerator,
  GeometryUtils,
  SnapUtils,
  SnapSceneUtils,
} from '../utils/export';
import {
  MODE_IDLE,
  MODE_WAITING_DRAWING_LINE,
  MODE_DRAWING_LINE,
  MODE_DRAGGING_LINE
} from '../constants';

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

    return {updatedState: state, line};
  }

  static select( state, layerID, lineID ){
    state = Layer.select( state, layerID ).updatedState;

    let line = state.getIn([ 'scene','layers', layerID, 'lines', lineID ]);

    state = Layer.selectElement( state, layerID, 'lines', lineID ).updatedState;
    state = Layer.selectElement( state, layerID, 'vertices', line.vertices.get(0) ).updatedState;
    state = Layer.selectElement( state, layerID, 'vertices', line.vertices.get(1) ).updatedState;

    return {updatedState: state};
  }

  static remove( state, layerID, lineID ) {
    let line = state.getIn(['scene', 'layers', layerID, 'lines', lineID]);

    if( line ) {
      state = this.unselect( state, layerID, lineID ).updatedState;
      line.holes.forEach(holeID => state = Hole.remove(state, layerID, holeID).updatedState);
      state = Layer.removeElement( state, layerID, 'lines', lineID ).updatedState;

      line.vertices.forEach(vertexID => state = Vertex.remove( state, layerID, vertexID, 'lines', lineID ).updatedState);

      state.getIn(['scene', 'groups']).forEach( group => state = Group.removeElement(state, group.id, layerID, 'lines', lineID).updatedState );
    }

    return {updatedState: state};
  }

  static unselect( state, layerID, lineID ) {
    let line = state.getIn([ 'scene','layers', layerID, 'lines', lineID ]);

    if( line ) {
      state = Layer.unselect( state, layerID, 'vertices', line.vertices.get(0) ).updatedState;
      state = Layer.unselect( state, layerID, 'vertices', line.vertices.get(1) ).updatedState;
      state = Layer.unselect( state, layerID, 'lines', lineID ).updatedState;
    }

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

    //add splitted lines to the original line's group
    let lineGroups = state
      .getIn(['scene', 'groups'])
      .filter( group => {
        const lines = group.getIn(['elements', layerID, 'lines']);
        return lines && lines.contains(lineID);
      });

    lineGroups.forEach( group => {
      state = Group.addElement( state, group.id, layerID, 'lines', line0.id ).updatedState;
      state = Group.addElement( state, group.id, layerID, 'lines', line1.id ).updatedState;
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

    state = state.getIn(['scene', 'layers', layerID, 'lines']).reduce( ( reducedState, line ) => {
      let [v0, v1] = line.vertices.map(vertexID => reducedState.getIn(['scene', 'layers', layerID, 'vertices']).get(vertexID)).toArray();

      let hasCommonEndpoint = (
        GeometryUtils.samePoints(v0, points[0]) ||
        GeometryUtils.samePoints(v0, points[1]) ||
        GeometryUtils.samePoints(v1, points[0]) ||
        GeometryUtils.samePoints(v1, points[1])
      );

      let intersection = GeometryUtils.twoLineSegmentsIntersection( points[0], points[1], v0, v1 );

      if (intersection.type === 'colinear') {
        if (!oldHoles) { oldHoles = []; }

        let orderedVertices = GeometryUtils.orderVertices(points);

        reducedState.getIn(['scene', 'layers', layerID, 'lines', line.id, 'holes']).forEach(holeID => {
          let hole = reducedState.getIn(['scene', 'layers', layerID, 'holes', holeID]);
          let oldLineLength = GeometryUtils.pointsDistance(v0.x, v0.y, v1.x, v1.y);
          let offset = GeometryUtils.samePoints( orderedVertices[1], line.vertices.get(1) ) ? ( 1 - hole.offset ) : hole.offset;
          let offsetPosition = GeometryUtils.extendLine( v0.x, v0.y, v1.x, v1.y, oldLineLength * offset );

          oldHoles.push({hole, offsetPosition});
        });

        reducedState = this.remove( reducedState, layerID, line.id ).updatedState;

        points.push(v0, v1);
      }

      if (intersection.type === 'intersecting' && (!hasCommonEndpoint)) {
        reducedState = this.split( reducedState, layerID, line.id, intersection.point.x, intersection.point.y ).updatedState;
        points.push(intersection.point);
      }

      return reducedState;

    }, state );

    let { updatedState, lines } = Line.addFromPoints( state, layerID, type, points, oldProperties, oldHoles );

    return { updatedState, lines };
  }

  static replaceVertex ( state, layerID, lineID, vertexIndex, x, y ) {
    let vertexID = state.getIn(['scene', 'layers', layerID, 'lines', lineID, 'vertices', vertexIndex]);

    state = Vertex.remove( state, layerID, vertexID, 'lines', lineID ).updatedState;
    let { updatedState: stateV, vertex } = Vertex.add( state, layerID, x, y, 'lines', lineID );
    state = stateV;

    state = state.setIn(['scene', 'layers', layerID, 'lines', lineID, 'vertices', vertexIndex], vertex.id);
    state = state.setIn(['scene', 'layers', layerID, 'lines', lineID], state.getIn(['scene', 'layers', layerID, 'lines', lineID]) );

    return { updatedState: state, line: state.getIn(['scene', 'layers', layerID, 'lines', lineID]), vertex };
  }

  static selectToolDrawingLine(state, sceneComponentType) {
    state = state.merge({
      mode: MODE_WAITING_DRAWING_LINE,
      drawingSupport: new Map({
        type: sceneComponentType
      })
    });

    return { updatedState: state };
  }

  static beginDrawingLine(state, layerID, x, y) {
    let snapElements = SnapSceneUtils.sceneSnapElements(state.scene, new List(), state.snapMask);
    let snap = null;

    if (state.snapMask && !state.snapMask.isEmpty()) {
      snap = SnapUtils.nearestSnap(snapElements, x, y, state.snapMask);
      if (snap) ({x, y} = snap.point);

      snapElements = snapElements.withMutations(snapElements => {
        let a, b, c;
        ({a, b, c} = GeometryUtils.horizontalLine(y));
        SnapUtils.addLineSnap(snapElements, a, b, c, 10, 3, null);
        ({a, b, c} = GeometryUtils.verticalLine(x));
        SnapUtils.addLineSnap(snapElements, a, b, c, 10, 3, null);
      });
    }

    let drawingSupport = state.get('drawingSupport').set('layerID', layerID);

    state = Layer.unselectAll( state, layerID ).updatedState;

    let { updatedState: stateL, line } = Line.create( state, layerID, drawingSupport.get('type'), x, y, x, y );
    state = Line.select( stateL, layerID, line.id ).updatedState;

    state = state.merge({
      mode: MODE_DRAWING_LINE,
      snapElements,
      activeSnapElement: snap ? snap.snap : null,
      drawingSupport
    });

    return { updatedState: state };
  }

  static updateDrawingLine(state, x, y) {
    let snap = null;
    if (state.snapMask && !state.snapMask.isEmpty()) {
      snap = SnapUtils.nearestSnap(state.snapElements, x, y, state.snapMask);
      if (snap) ({x, y} = snap.point);
    }

    let layerID = state.getIn(['drawingSupport', 'layerID']);
    let lineID = state.getIn(['scene', 'layers', layerID, 'selected', 'lines']).first();

    let { updatedState: stateLV, vertex } = Line.replaceVertex( state, layerID, lineID, 1, x, y );
    state = stateLV;

    state = this.select( state, layerID, lineID ).updatedState;
    state = state.merge({ activeSnapElement: snap ? snap.snap : null });

    return { updatedState: state };
  }

  static endDrawingLine(state, x, y) {

    if (state.snapMask && !state.snapMask.isEmpty()) {
      let snap = SnapUtils.nearestSnap(state.snapElements, x, y, state.snapMask);
      if (snap) ({x, y} = snap.point);
    }

    let layerID = state.getIn(['drawingSupport', 'layerID']);
    let layer = state.getIn(['scene','layers', layerID]);

    let lineID = state.getIn(['scene', 'layers', layerID, 'selected', 'lines']).first();
    let line = state.getIn(['scene', 'layers', layerID, 'lines', lineID]);

    let v0 = layer.vertices.get(line.vertices.get(0));

    state = Line.remove( state, layerID, lineID ).updatedState;
    state = Line.createAvoidingIntersections( state, layerID, line.type, v0.x, v0.y, x, y ).updatedState;
    state = Layer.detectAndUpdateAreas( state, layerID ).updatedState;

    state = state.merge({
      mode: MODE_WAITING_DRAWING_LINE,
      snapElements: new List(),
      activeSnapElement: null
    });

    return { updatedState: state };
  }

  static beginDraggingLine(state, layerID, lineID, x, y) {

    let snapElements = SnapSceneUtils.sceneSnapElements(state.scene, new List(), state.snapMask);

    let layer = state.scene.layers.get(layerID);
    let line = layer.lines.get(lineID);

    let vertex0 = layer.vertices.get(line.vertices.get(0));
    let vertex1 = layer.vertices.get(line.vertices.get(1));

    state = state.merge({
      mode: MODE_DRAGGING_LINE,
      snapElements,
      draggingSupport: Map({
        layerID, lineID,
        startPointX: x,
        startPointY: y,
        startVertex0X: vertex0.x,
        startVertex0Y: vertex0.y,
        startVertex1X: vertex1.x,
        startVertex1Y: vertex1.y,
      })
    });

    return { updatedState: state };
  }

  static updateDraggingLine(state, x, y) {

    let draggingSupport = state.draggingSupport;
    let snapElements = state.snapElements;

    let layerID = draggingSupport.get('layerID');
    let lineID = draggingSupport.get('lineID');
    let diffX = x - draggingSupport.get('startPointX');
    let diffY = y - draggingSupport.get('startPointY');
    let newVertex0X = draggingSupport.get('startVertex0X') + diffX;
    let newVertex0Y = draggingSupport.get('startVertex0Y') + diffY;
    let newVertex1X = draggingSupport.get('startVertex1X') + diffX;
    let newVertex1Y = draggingSupport.get('startVertex1Y') + diffY;


    let activeSnapElement = null;
    let curSnap0 = null, curSnap1 = null;
    if (state.snapMask && !state.snapMask.isEmpty()) {
      curSnap0 = SnapUtils.nearestSnap(snapElements, newVertex0X, newVertex0Y, state.snapMask);
      curSnap1 = SnapUtils.nearestSnap(snapElements, newVertex1X, newVertex1Y, state.snapMask);
    }

    let deltaX = 0, deltaY = 0;
    if (curSnap0 && curSnap1) {
      if (curSnap0.point.distance < curSnap1.point.distance) {
        deltaX = curSnap0.point.x - newVertex0X;
        deltaY = curSnap0.point.y - newVertex0Y;
        activeSnapElement = curSnap0.snap;
      } else {
        deltaX = curSnap1.point.x - newVertex1X;
        deltaY = curSnap1.point.y - newVertex1Y;
        activeSnapElement = curSnap1.snap;
      }
    } else {
      if (curSnap0) {
        deltaX = curSnap0.point.x - newVertex0X;
        deltaY = curSnap0.point.y - newVertex0Y;
        activeSnapElement = curSnap0.snap;
      }
      if (curSnap1) {
        deltaX = curSnap1.point.x - newVertex1X;
        deltaY = curSnap1.point.y - newVertex1Y;
        activeSnapElement = curSnap1.snap;
      }
    }

    newVertex0X += deltaX;
    newVertex0Y += deltaY;
    newVertex1X += deltaX;
    newVertex1Y += deltaY;

    state = state.merge({
      activeSnapElement,
      scene: state.scene.updateIn(['layers', layerID], layer => layer.withMutations(layer => {
        let lineVertices = layer.getIn(['lines', lineID, 'vertices']);
        layer.updateIn(['vertices', lineVertices.get(0)], vertex => vertex.merge({x: newVertex0X, y: newVertex0Y}));
        layer.updateIn(['vertices', lineVertices.get(1)], vertex => vertex.merge({x: newVertex1X, y: newVertex1Y}));
        return layer;
      }))
    });

    return { updatedState: state };
  }

  static endDraggingLine(state, x, y) {
    let {draggingSupport} = state;
    let layerID = draggingSupport.get('layerID');
    let layer = state.scene.layers.get(layerID);
    let lineID = draggingSupport.get('lineID');
    let line = layer.lines.get(lineID);

    let vertex0 = layer.vertices.get(line.vertices.get(0));
    let vertex1 = layer.vertices.get(line.vertices.get(1));

    let maxV = GeometryUtils.maxVertex(vertex0, vertex1);
    let minV = GeometryUtils.minVertex(vertex0, vertex1);

    let lineLength = GeometryUtils.verticesDistance(minV,maxV);
    let alpha = Math.atan2(maxV.y - minV.y, maxV.x - minV.x);

    let holesWithOffsetPosition = [];
    layer.lines.get(lineID).holes.forEach(holeID => {
      let hole = layer.holes.get(holeID);
      let pointOnLine = lineLength * hole.offset;

      let offsetPosition = {
        x: pointOnLine * Math.cos(alpha) + minV.x,
        y: pointOnLine * Math.sin(alpha) + minV.y
      };

      holesWithOffsetPosition.push({hole, offsetPosition});
    });

    let diffX = x - draggingSupport.get('startPointX');
    let diffY = y - draggingSupport.get('startPointY');
    let newVertex0X = draggingSupport.get('startVertex0X') + diffX;
    let newVertex0Y = draggingSupport.get('startVertex0Y') + diffY;
    let newVertex1X = draggingSupport.get('startVertex1X') + diffX;
    let newVertex1Y = draggingSupport.get('startVertex1Y') + diffY;

    if (state.snapMask && !state.snapMask.isEmpty()) {

      let curSnap0 = SnapUtils.nearestSnap(state.snapElements, newVertex0X, newVertex0Y, state.snapMask);
      let curSnap1 = SnapUtils.nearestSnap(state.snapElements, newVertex1X, newVertex1Y, state.snapMask);

      let deltaX = 0, deltaY = 0;
      if (curSnap0 && curSnap1) {
        if (curSnap0.point.distance < curSnap1.point.distance) {
          deltaX = curSnap0.point.x - newVertex0X;
          deltaY = curSnap0.point.y - newVertex0Y;
        } else {
          deltaX = curSnap1.point.x - newVertex1X;
          deltaY = curSnap1.point.y - newVertex1Y;
        }
      } else {
        if (curSnap0) {
          deltaX = curSnap0.point.x - newVertex0X;
          deltaY = curSnap0.point.y - newVertex0Y;
        }
        if (curSnap1) {
          deltaX = curSnap1.point.x - newVertex1X;
          deltaY = curSnap1.point.y - newVertex1Y;
        }
      }

      newVertex0X += deltaX;
      newVertex0Y += deltaY;
      newVertex1X += deltaX;
      newVertex1Y += deltaY;
    }

    let lineGroups = state   //get groups membership if present
      .getIn(['scene', 'groups'])
      .filter( group => {
        const lines = group.getIn(['elements', layerID, 'lines']);
        return lines && lines.contains(lineID);
      });

    state = Layer.mergeEqualsVertices( state, layerID, line.vertices.get(0) ).updatedState;
    state = Layer.mergeEqualsVertices( state, layerID, line.vertices.get(1) ).updatedState;

    state = Line.remove( state, layerID, lineID ).updatedState;

    if(!GeometryUtils.samePoints({newVertex0X, newVertex0Y}, {newVertex1X, newVertex1Y})) {
      let ret = Line.createAvoidingIntersections(
        state,
        layerID,
        line.type,
        newVertex0X,
        newVertex0Y,
        newVertex1X,
        newVertex1Y,
        line.properties,
        holesWithOffsetPosition
      );

      state = ret.updatedState;

      //re-add to old line's groups if present
      ret.lines.forEach( addedLine => {
        lineGroups.forEach( oldLineGroup => {
          state = Group.addElement( state, oldLineGroup.id, layerID, 'lines', addedLine.id ).updatedState;
        });
      });
    }

    state = Layer.detectAndUpdateAreas( state, layerID ).updatedState;

    state = state.merge({
      mode: MODE_IDLE,
      draggingSupport: null,
      activeSnapElement: null,
      snapElements: new List()
    });

    return { updatedState: state };
  }

  static setProperties( state, layerID, lineID, properties ) {
    state = state.mergeIn(['scene', 'layers', layerID, 'lines', lineID, 'properties'], properties);

    return { updatedState: state };
  }

  static setJsProperties( state, layerID, lineID, properties ) {
    return this.setProperties( state, layerID, lineID, fromJS(properties) );
  }

  static updateProperties( state, layerID, lineID, properties) {
    properties.forEach( ( v, k ) => {
      if( state.hasIn(['scene', 'layers', layerID, 'lines', lineID, 'properties', k]) )
        state = state.mergeIn(['scene', 'layers', layerID, 'lines', lineID, 'properties', k], v);
    });

    return { updatedState: state };
  }

  static updateJsProperties( state, layerID, lineID, properties) {
    return this.updateProperties( state, layerID, lineID, fromJS(properties) );
  }

  static setAttributes( state, layerID, lineID, lineAttributes ) {

    let lAttr = lineAttributes.toJS();
    let {vertexOne, vertexTwo, lineLength} = lAttr;

    delete lAttr['vertexOne'];
    delete lAttr['vertexTwo'];
    delete lAttr['lineLength'];

    state = state
      .mergeIn(['scene', 'layers', layerID, 'lines', lineID], fromJS(lAttr))
      .mergeIn(['scene', 'layers', layerID, 'vertices', vertexOne.id], {x: vertexOne.x, y: vertexOne.y})
      .mergeIn(['scene', 'layers', layerID, 'vertices', vertexTwo.id], {x: vertexTwo.x, y: vertexTwo.y})
      .mergeIn(['scene', 'layers', layerID, 'lines', lineID, 'misc'], new Map({'_unitLength': lineLength._unit}));

    state = Layer.mergeEqualsVertices( state, layerID, vertexOne.id ).updatedState;

    if (vertexOne.x != vertexTwo.x && vertexOne.y != vertexTwo.y) {
      state = Layer.mergeEqualsVertices( state, layerID, vertexTwo.id ).updatedState;
    }

    state = Layer.detectAndUpdateAreas( state, layerID ).updatedState;

    return { updatedState: state };
  }

  static setVerticesCoords( state, layerID, lineID, x1, y1, x2, y2 ) {
    let line = state.getIn(['scene', 'layers', layerID, 'lines', lineID]);
    state = Vertex.setAttributes( state, layerID, line.vertices.get(0), new Map({ x: x1, y: y1 }) ).updatedState;
    state = Vertex.setAttributes( state, layerID, line.vertices.get(1), new Map({ x: x2, y: y2 }) ).updatedState;

    return { updatedState: state };
  }

}

export { Line as default };
