import {Map, List, fromJS} from 'immutable';
import {Layer, Group} from './export';

import {
  IDBroker,
  NameGenerator
} from '../utils/export';

import {
  nearestSnap,
  addLineSegmentSnap,
} from '../utils/snap';

import {
  MODE_IDLE,
  MODE_DRAWING_HOLE,
  MODE_DRAGGING_HOLE,
} from '../constants';

import {
  GeometryUtils
} from '../utils/export';

class Hole {

  static create(state, layerID, type, lineID, offset, properties) {

    let holeID = IDBroker.acquireID();

    let hole = state.catalog.factoryElement(type, {
      id: holeID,
      name: NameGenerator.generateName('holes', state.catalog.getIn(['elements', type, 'info', 'title'])),
      type,
      offset,
      line: lineID
    }, properties);

    state = state.setIn(['scene', 'layers', layerID, 'holes', holeID], hole);
    state = state.updateIn(['scene', 'layers', layerID, 'lines', lineID, 'holes'],
      holes => holes.push(holeID));

    return {updatedState: state, hole};
  }

  static select(state, layerID, holeID) {
    state = Layer.select(state, layerID).updatedState;
    state = Layer.selectElement(state, layerID, 'holes', holeID).updatedState;

    return {updatedState: state};
  }

  static remove(state, layerID, holeID) {
    let hole = state.getIn(['scene', 'layers', layerID, 'holes', holeID]);
    state = this.unselect(state, layerID, holeID).updatedState;
    state = Layer.removeElement(state, layerID, 'holes', holeID).updatedState;

    state = state.updateIn(['scene', 'layers', layerID, 'lines', hole.line, 'holes'], holes => {
      let index = holes.findIndex(ID => holeID === ID);
      return index !== -1 ? holes.remove(index) : holes;
    });

    state.getIn(['scene', 'groups']).forEach(group => state = Group.removeElement(state, group.id, layerID, 'holes', holeID).updatedState);

    return {updatedState: state};
  }

  static unselect(state, layerID, holeID) {
    state = Layer.unselect(state, layerID, 'holes', holeID).updatedState;

    return {updatedState: state};
  }

  static selectToolDrawingHole(state, sceneComponentType) {

    let snapElements = (new List()).withMutations(snapElements => {
      let {lines, vertices} = state.getIn(['scene', 'layers', state.scene.selectedLayer]);

      lines.forEach(line => {
        let {x: x1, y: y1} = vertices.get(line.vertices.get(0));
        let {x: x2, y: y2} = vertices.get(line.vertices.get(1));

        addLineSegmentSnap(snapElements, x1, y1, x2, y2, 20, 1, line.id);
      });
    });

    state = state.merge({
      mode: MODE_DRAWING_HOLE,
      snapElements,
      drawingSupport: Map({
        type: sceneComponentType
      })
    });

    return {updatedState: state};
  }

  static updateDrawingHole(state, layerID, x, y) {
    let catalog = state.catalog;

    //calculate snap and overwrite coords if needed
    //force snap to segment
    let snap = nearestSnap(state.snapElements, x, y, state.snapMask.merge({SNAP_SEGMENT: true}));
    if (snap) ({x, y} = snap.point);

    let selectedHole = state.getIn(['scene', 'layers', layerID, 'selected', 'holes']).first();

    if (snap) {
      let lineID = snap.snap.related.get(0);

      let vertices = state.getIn(['scene', 'layers', layerID, 'lines', lineID, 'vertices']);
      let {x: x1, y: y1} = state.getIn(['scene', 'layers', layerID, 'vertices', vertices.get(0)]);
      let {x: x2, y: y2} = state.getIn(['scene', 'layers', layerID, 'vertices', vertices.get(1)]);

      // I need min and max vertices on this line segment
      let minVertex = GeometryUtils.minVertex({x: x1, y: y1}, {x: x2, y: y2});
      let maxVertex = GeometryUtils.maxVertex({x: x1, y: y1}, {x: x2, y: y2});
      let width = catalog.factoryElement(state.drawingSupport.get('type')).properties.getIn(['width', 'length']);

      // Now I need min and max possible coordinates for the hole on the line. They depend on the width of the hole
      let lineLength = GeometryUtils.pointsDistance(x1, y1, x2, y2);
      let alpha = GeometryUtils.absAngleBetweenTwoPoints(x1, y1, x2, y2);

      let cosAlpha = GeometryUtils.cosWithThreshold(alpha, 0.0000001);
      let sinAlpha = GeometryUtils.sinWithThreshold(alpha, 0.0000001);

      let minLeftVertexHole = {
        x: minVertex.x + width / 2 * cosAlpha,
        y: minVertex.y + width / 2 * sinAlpha
      };

      let maxRightVertexHole = {
        x: minVertex.x + lineLength * cosAlpha - width / 2 * cosAlpha,
        y: minVertex.y + lineLength * sinAlpha - width / 2 * sinAlpha
      };

      let offset;
      if (x < minLeftVertexHole.x) {
        offset = GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y,
          maxVertex.x, maxVertex.y,
          minLeftVertexHole.x, minLeftVertexHole.y);
      } else if (x > maxRightVertexHole.x) {
        offset = GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y,
          maxVertex.x, maxVertex.y,
          maxRightVertexHole.x, maxRightVertexHole.y);
      } else {

        if (x === minLeftVertexHole.x && x === maxRightVertexHole.x) {
          if (y < minLeftVertexHole.y) {
            offset = GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y,
              maxVertex.x, maxVertex.y,
              minLeftVertexHole.x, minLeftVertexHole.y);
            offset = minVertex.x === x1 && minVertex.y === y1 ? offset : 1 - offset;
          } else if (y > maxRightVertexHole.y) {
            offset = GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y,
              maxVertex.x, maxVertex.y,
              maxRightVertexHole.x, maxRightVertexHole.y);
            offset = minVertex.x === x1 && minVertex.y === y1 ? offset : 1 - offset;
          } else {
            offset = GeometryUtils.pointPositionOnLineSegment(x1, y1, x2, y2, x, y);
          }
        } else {
          offset = GeometryUtils.pointPositionOnLineSegment(x1, y1, x2, y2, x, y);
        }
      }

      //if hole does exist, update
      if (selectedHole && snap) {
        state = state.mergeIn(['scene', 'layers', layerID, 'holes', selectedHole], {offset, line: lineID});

        //remove from old line ( if present )
        let index = state.getIn(['scene', 'layers', layerID, 'lines']).findEntry(line => {
          return line.id !== lineID && line.get('holes').contains(selectedHole);
        });

        if (index) {
          let removed = index[1].get('holes').filter(hl => hl !== selectedHole);
          state = state.setIn(['scene', 'layers', layerID, 'lines', index[0], 'holes'], removed);
        }

        //add to line
        let line_holes = state.getIn(['scene', 'layers', layerID, 'lines', lineID, 'holes']);
        if (!line_holes.contains(selectedHole)) {
          state = state.setIn(['scene', 'layers', layerID, 'lines', lineID, 'holes'], line_holes.push(selectedHole));
        }
      } else if (!selectedHole && snap) {
        //if hole does not exist, create
        let {updatedState: stateH, hole} = this.create(state, layerID, state.drawingSupport.get('type'), lineID, offset);
        state = Hole.select(stateH, layerID, hole.id).updatedState;
      }
    }
    //i've lost the snap while trying to drop the hole
    else if (false && selectedHole)  //think if enable
    {
      state = Hole.remove(state, layerID, selectedHole).updatedState;
    }

    return {updatedState: state};
  }

  static endDrawingHole(state, layerID, x, y) {
    state = this.updateDrawingHole(state, layerID, x, y).updatedState;
    state = Layer.unselectAll(state, layerID).updatedState;

    return {updatedState: state};
  }

  static beginDraggingHole(state, layerID, holeID, x, y) {
    let layer = state.getIn(['scene', 'layers', layerID]);
    let hole = layer.getIn(['holes', holeID]);
    let line = layer.getIn(['lines', hole.line]);
    let v0 = layer.getIn(['vertices', line.vertices.get(0)]);
    let v1 = layer.getIn(['vertices', line.vertices.get(1)]);

    let snapElements = addLineSegmentSnap(List(), v0.x, v0.y, v1.x, v1.y, 9999999, 1, null);

    state = state.merge({
      mode: MODE_DRAGGING_HOLE,
      snapElements,
      draggingSupport: Map({
        layerID,
        holeID,
        startPointX: x,
        startPointY: y,
      })
    });

    return {updatedState: state};
  }

  static updateDraggingHole(state, x, y) {

    //calculate snap and overwrite coords if needed
    //force snap to segment
    let snap = nearestSnap(state.snapElements, x, y, state.snapMask.merge({SNAP_SEGMENT: true}));
    if (!snap) return state;

    let {draggingSupport, scene} = state;

    let layerID = draggingSupport.get('layerID');
    let holeID = draggingSupport.get('holeID');
    let startPointX = draggingSupport.get('startPointX');
    let startPointY = draggingSupport.get('startPointY');

    let layer = state.getIn(['scene', 'layers', layerID]);
    let hole = layer.getIn(['holes', holeID]);
    let line = layer.getIn(['lines', hole.line]);
    let v0 = layer.getIn(['vertices', line.vertices.get(0)]);
    let v1 = layer.getIn(['vertices', line.vertices.get(1)]);

    ({x, y} = snap.point);

    // I need min and max vertices on this line segment
    let minVertex = GeometryUtils.minVertex(v0, v1);
    let maxVertex = GeometryUtils.maxVertex(v0, v1);

    // Now I need min and max possible coordinates for the hole on the line. They depend on the width of the hole

    let width = hole.properties.get('width').get('length');
    let lineLength = GeometryUtils.pointsDistance(v0.x, v0.y, v1.x, v1.y);
    let alpha = Math.atan2(Math.abs(v1.y - v0.y), Math.abs(v1.x - v0.x));

    let cosWithThreshold = (alpha) => {
      let cos = Math.cos(alpha);
      return cos < 0.0000001 ? 0 : cos;
    };

    let sinWithThreshold = (alpha) => {
      let sin = Math.sin(alpha);
      return sin < 0.0000001 ? 0 : sin;
    };

    let cosAlpha = cosWithThreshold(alpha);
    let sinAlpha = sinWithThreshold(alpha);

    let minLeftVertexHole = {
      x: minVertex.x + width / 2 * cosAlpha,
      y: minVertex.y + width / 2 * sinAlpha
    };

    let maxRightVertexHole = {
      x: minVertex.x + lineLength * cosAlpha - width / 2 * cosAlpha,
      y: minVertex.y + lineLength * sinAlpha - width / 2 * sinAlpha
    };

    // Now I need to verify if the snap vertex (with coordinates x and y) is on the line segment

    let offset;

    if (x < minLeftVertexHole.x) {
      // Snap point is previous the the line
      offset = GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y,
        maxVertex.x, maxVertex.y,
        minLeftVertexHole.x, minLeftVertexHole.y);
    } else {
      // Snap point is after the line or on the line
      if (x > maxRightVertexHole.x) {
        offset = GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y,
          maxVertex.x, maxVertex.y,
          maxRightVertexHole.x, maxRightVertexHole.y);
      } else if (x === minLeftVertexHole.x && x === maxRightVertexHole.x) {
        // I am on a vertical line, I need to check y coordinates
        if (y < minLeftVertexHole.y) {
          offset = GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y,
            maxVertex.x, maxVertex.y,
            minLeftVertexHole.x, minLeftVertexHole.y);

          offset = minVertex === v0 ? offset : 1 - offset;

        } else if (y > maxRightVertexHole.y) {
          offset = GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y,
            maxVertex.x, maxVertex.y,
            maxRightVertexHole.x, maxRightVertexHole.y);

          offset = minVertex === v0 ? offset : 1 - offset;

        } else {
          offset = GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y,
            maxVertex.x, maxVertex.y,
            x, y);

          offset = minVertex === v0 ? offset : 1 - offset;
        }
      } else {
        offset = GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y,
          maxVertex.x, maxVertex.y,
          x, y);
      }
    }

    hole = hole.set('offset', offset);

    state = state.merge({
      scene: scene.mergeIn(['layers', layerID, 'holes', holeID], hole)
    });

    return {updatedState: state};
  }

  static endDraggingHole(state, x, y) {
    state = this.updateDraggingHole(state, x, y).updatedState;
    state = state.merge({mode: MODE_IDLE});

    return {updatedState: state};
  }

  static setProperties(state, layerID, holeID, properties) {
    state = state.setIn(['scene', 'layers', layerID, 'holes', holeID, 'properties'], properties);

    return {updatedState: state};
  }

  static setJsProperties(state, layerID, holeID, properties) {
    return this.setProperties(state, layerID, holeID, fromJS(properties));
  }

  static updateProperties(state, layerID, holeID, properties) {
    properties.forEach((v, k) => {
      if (state.hasIn(['scene', 'layers', layerID, 'holes', holeID, 'properties', k]))
        state = state.mergeIn(['scene', 'layers', layerID, 'holes', holeID, 'properties', k], v);
    });

    return {updatedState: state};
  }

  static updateJsProperties(state, layerID, holeID, properties) {
    return this.updateProperties(state, layerID, holeID, fromJS(properties));
  }

  static setAttributes(state, layerID, holeID, holesAttributes) {

    let hAttr = holesAttributes.toJS();
    let {offsetA, offsetB, offset} = hAttr;

    delete hAttr['offsetA'];
    delete hAttr['offsetB'];
    delete hAttr['offset'];

    let misc = new Map({_unitA: offsetA._unit, _unitB: offsetB._unit});

    state = state
      .mergeIn(['scene', 'layers', layerID, 'holes', holeID], fromJS(hAttr))
      .mergeDeepIn(['scene', 'layers', layerID, 'holes', holeID], new Map({offset, misc}));

    return {updatedState: state};
  }

}

export {Hole as default};
