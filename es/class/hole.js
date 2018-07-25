var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { Map, List, fromJS } from 'immutable';
import { Layer, Group } from './export';

import { IDBroker, NameGenerator } from '../utils/export';

import { nearestSnap, addLineSegmentSnap } from '../utils/snap';

import { MODE_IDLE, MODE_DRAWING_HOLE, MODE_DRAGGING_HOLE } from '../constants';

import { GeometryUtils } from '../utils/export';

var Hole = function () {
  function Hole() {
    _classCallCheck(this, Hole);
  }

  _createClass(Hole, null, [{
    key: 'create',
    value: function create(state, layerID, type, lineID, offset, properties) {

      var holeID = IDBroker.acquireID();

      var hole = state.catalog.factoryElement(type, {
        id: holeID,
        name: NameGenerator.generateName('holes', state.catalog.getIn(['elements', type, 'info', 'title'])),
        type: type,
        offset: offset,
        line: lineID
      }, properties);

      state = state.setIn(['scene', 'layers', layerID, 'holes', holeID], hole);
      state = state.updateIn(['scene', 'layers', layerID, 'lines', lineID, 'holes'], function (holes) {
        return holes.push(holeID);
      });

      return { updatedState: state, hole: hole };
    }
  }, {
    key: 'select',
    value: function select(state, layerID, holeID) {
      state = Layer.select(state, layerID).updatedState;
      state = Layer.selectElement(state, layerID, 'holes', holeID).updatedState;

      return { updatedState: state };
    }
  }, {
    key: 'remove',
    value: function remove(state, layerID, holeID) {
      var hole = state.getIn(['scene', 'layers', layerID, 'holes', holeID]);
      state = this.unselect(state, layerID, holeID).updatedState;
      state = Layer.removeElement(state, layerID, 'holes', holeID).updatedState;

      state = state.updateIn(['scene', 'layers', layerID, 'lines', hole.line, 'holes'], function (holes) {
        var index = holes.findIndex(function (ID) {
          return holeID === ID;
        });
        return index !== -1 ? holes.remove(index) : holes;
      });

      state.getIn(['scene', 'groups']).forEach(function (group) {
        return state = Group.removeElement(state, group.id, layerID, 'holes', holeID).updatedState;
      });

      return { updatedState: state };
    }
  }, {
    key: 'unselect',
    value: function unselect(state, layerID, holeID) {
      state = Layer.unselect(state, layerID, 'holes', holeID).updatedState;

      return { updatedState: state };
    }
  }, {
    key: 'selectToolDrawingHole',
    value: function selectToolDrawingHole(state, sceneComponentType) {

      var snapElements = new List().withMutations(function (snapElements) {
        var _state$getIn = state.getIn(['scene', 'layers', state.scene.selectedLayer]),
            lines = _state$getIn.lines,
            vertices = _state$getIn.vertices;

        lines.forEach(function (line) {
          var _vertices$get = vertices.get(line.vertices.get(0)),
              x1 = _vertices$get.x,
              y1 = _vertices$get.y;

          var _vertices$get2 = vertices.get(line.vertices.get(1)),
              x2 = _vertices$get2.x,
              y2 = _vertices$get2.y;

          addLineSegmentSnap(snapElements, x1, y1, x2, y2, 20, 1, line.id);
        });
      });

      state = state.merge({
        mode: MODE_DRAWING_HOLE,
        snapElements: snapElements,
        drawingSupport: Map({
          type: sceneComponentType
        })
      });

      return { updatedState: state };
    }
  }, {
    key: 'updateDrawingHole',
    value: function updateDrawingHole(state, layerID, x, y) {
      var catalog = state.catalog;

      //calculate snap and overwrite coords if needed
      //force snap to segment
      var snap = nearestSnap(state.snapElements, x, y, state.snapMask.merge({ SNAP_SEGMENT: true }));
      if (snap) {
        ;

        var _snap$point = snap.point;
        x = _snap$point.x;
        y = _snap$point.y;
      }var selectedHole = state.getIn(['scene', 'layers', layerID, 'selected', 'holes']).first();

      if (snap) {
        var lineID = snap.snap.related.get(0);

        var vertices = state.getIn(['scene', 'layers', layerID, 'lines', lineID, 'vertices']);

        var _state$getIn2 = state.getIn(['scene', 'layers', layerID, 'vertices', vertices.get(0)]),
            x1 = _state$getIn2.x,
            y1 = _state$getIn2.y;

        var _state$getIn3 = state.getIn(['scene', 'layers', layerID, 'vertices', vertices.get(1)]),
            x2 = _state$getIn3.x,
            y2 = _state$getIn3.y;

        // I need min and max vertices on this line segment


        var minVertex = GeometryUtils.minVertex({ x: x1, y: y1 }, { x: x2, y: y2 });
        var maxVertex = GeometryUtils.maxVertex({ x: x1, y: y1 }, { x: x2, y: y2 });
        var width = catalog.factoryElement(state.drawingSupport.get('type')).properties.getIn(['width', 'length']);

        // Now I need min and max possible coordinates for the hole on the line. They depend on the width of the hole
        var lineLength = GeometryUtils.pointsDistance(x1, y1, x2, y2);
        var alpha = GeometryUtils.absAngleBetweenTwoPoints(x1, y1, x2, y2);

        var cosAlpha = GeometryUtils.cosWithThreshold(alpha, 0.0000001);
        var sinAlpha = GeometryUtils.sinWithThreshold(alpha, 0.0000001);

        var minLeftVertexHole = {
          x: minVertex.x + width / 2 * cosAlpha,
          y: minVertex.y + width / 2 * sinAlpha
        };

        var maxRightVertexHole = {
          x: minVertex.x + lineLength * cosAlpha - width / 2 * cosAlpha,
          y: minVertex.y + lineLength * sinAlpha - width / 2 * sinAlpha
        };

        var offset = void 0;
        if (x < minLeftVertexHole.x) {
          offset = GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y, maxVertex.x, maxVertex.y, minLeftVertexHole.x, minLeftVertexHole.y);
        } else if (x > maxRightVertexHole.x) {
          offset = GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y, maxVertex.x, maxVertex.y, maxRightVertexHole.x, maxRightVertexHole.y);
        } else {

          if (x === minLeftVertexHole.x && x === maxRightVertexHole.x) {
            if (y < minLeftVertexHole.y) {
              offset = GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y, maxVertex.x, maxVertex.y, minLeftVertexHole.x, minLeftVertexHole.y);
              offset = minVertex.x === x1 && minVertex.y === y1 ? offset : 1 - offset;
            } else if (y > maxRightVertexHole.y) {
              offset = GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y, maxVertex.x, maxVertex.y, maxRightVertexHole.x, maxRightVertexHole.y);
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
          state = state.mergeIn(['scene', 'layers', layerID, 'holes', selectedHole], { offset: offset, line: lineID });

          //remove from old line ( if present )
          var index = state.getIn(['scene', 'layers', layerID, 'lines']).findEntry(function (line) {
            return line.id !== lineID && line.get('holes').contains(selectedHole);
          });

          if (index) {
            var removed = index[1].get('holes').filter(function (hl) {
              return hl !== selectedHole;
            });
            state = state.setIn(['scene', 'layers', layerID, 'lines', index[0], 'holes'], removed);
          }

          //add to line
          var line_holes = state.getIn(['scene', 'layers', layerID, 'lines', lineID, 'holes']);
          if (!line_holes.contains(selectedHole)) {
            state = state.setIn(['scene', 'layers', layerID, 'lines', lineID, 'holes'], line_holes.push(selectedHole));
          }
        } else if (!selectedHole && snap) {
          //if hole does not exist, create
          var _create = this.create(state, layerID, state.drawingSupport.get('type'), lineID, offset),
              stateH = _create.updatedState,
              hole = _create.hole;

          state = Hole.select(stateH, layerID, hole.id).updatedState;
        }
      }
      //i've lost the snap while trying to drop the hole
      else if (false && selectedHole) //think if enable
          {
            state = Hole.remove(state, layerID, selectedHole).updatedState;
          }

      return { updatedState: state };
    }
  }, {
    key: 'endDrawingHole',
    value: function endDrawingHole(state, layerID, x, y) {
      state = this.updateDrawingHole(state, layerID, x, y).updatedState;
      state = Layer.unselectAll(state, layerID).updatedState;

      return { updatedState: state };
    }
  }, {
    key: 'beginDraggingHole',
    value: function beginDraggingHole(state, layerID, holeID, x, y) {
      var layer = state.getIn(['scene', 'layers', layerID]);
      var hole = layer.getIn(['holes', holeID]);
      var line = layer.getIn(['lines', hole.line]);
      var v0 = layer.getIn(['vertices', line.vertices.get(0)]);
      var v1 = layer.getIn(['vertices', line.vertices.get(1)]);

      var snapElements = addLineSegmentSnap(List(), v0.x, v0.y, v1.x, v1.y, 9999999, 1, null);

      state = state.merge({
        mode: MODE_DRAGGING_HOLE,
        snapElements: snapElements,
        draggingSupport: Map({
          layerID: layerID,
          holeID: holeID,
          startPointX: x,
          startPointY: y
        })
      });

      return { updatedState: state };
    }
  }, {
    key: 'updateDraggingHole',
    value: function updateDraggingHole(state, x, y) {

      //calculate snap and overwrite coords if needed
      //force snap to segment
      var snap = nearestSnap(state.snapElements, x, y, state.snapMask.merge({ SNAP_SEGMENT: true }));
      if (!snap) return state;

      var _state = state,
          draggingSupport = _state.draggingSupport,
          scene = _state.scene;


      var layerID = draggingSupport.get('layerID');
      var holeID = draggingSupport.get('holeID');
      var startPointX = draggingSupport.get('startPointX');
      var startPointY = draggingSupport.get('startPointY');

      var layer = state.getIn(['scene', 'layers', layerID]);
      var hole = layer.getIn(['holes', holeID]);
      var line = layer.getIn(['lines', hole.line]);
      var v0 = layer.getIn(['vertices', line.vertices.get(0)]);
      var v1 = layer.getIn(['vertices', line.vertices.get(1)]);

      // I need min and max vertices on this line segment
      var _snap$point2 = snap.point;
      x = _snap$point2.x;
      y = _snap$point2.y;
      var minVertex = GeometryUtils.minVertex(v0, v1);
      var maxVertex = GeometryUtils.maxVertex(v0, v1);

      // Now I need min and max possible coordinates for the hole on the line. They depend on the width of the hole

      var width = hole.properties.get('width').get('length');
      var lineLength = GeometryUtils.pointsDistance(v0.x, v0.y, v1.x, v1.y);
      var alpha = Math.atan2(Math.abs(v1.y - v0.y), Math.abs(v1.x - v0.x));

      var cosWithThreshold = function cosWithThreshold(alpha) {
        var cos = Math.cos(alpha);
        return cos < 0.0000001 ? 0 : cos;
      };

      var sinWithThreshold = function sinWithThreshold(alpha) {
        var sin = Math.sin(alpha);
        return sin < 0.0000001 ? 0 : sin;
      };

      var cosAlpha = cosWithThreshold(alpha);
      var sinAlpha = sinWithThreshold(alpha);

      var minLeftVertexHole = {
        x: minVertex.x + width / 2 * cosAlpha,
        y: minVertex.y + width / 2 * sinAlpha
      };

      var maxRightVertexHole = {
        x: minVertex.x + lineLength * cosAlpha - width / 2 * cosAlpha,
        y: minVertex.y + lineLength * sinAlpha - width / 2 * sinAlpha
      };

      // Now I need to verify if the snap vertex (with coordinates x and y) is on the line segment

      var offset = void 0;

      if (x < minLeftVertexHole.x) {
        // Snap point is previous the the line
        offset = GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y, maxVertex.x, maxVertex.y, minLeftVertexHole.x, minLeftVertexHole.y);
      } else {
        // Snap point is after the line or on the line
        if (x > maxRightVertexHole.x) {
          offset = GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y, maxVertex.x, maxVertex.y, maxRightVertexHole.x, maxRightVertexHole.y);
        } else if (x === minLeftVertexHole.x && x === maxRightVertexHole.x) {
          // I am on a vertical line, I need to check y coordinates
          if (y < minLeftVertexHole.y) {
            offset = GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y, maxVertex.x, maxVertex.y, minLeftVertexHole.x, minLeftVertexHole.y);

            offset = minVertex === v0 ? offset : 1 - offset;
          } else if (y > maxRightVertexHole.y) {
            offset = GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y, maxVertex.x, maxVertex.y, maxRightVertexHole.x, maxRightVertexHole.y);

            offset = minVertex === v0 ? offset : 1 - offset;
          } else {
            offset = GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y, maxVertex.x, maxVertex.y, x, y);

            offset = minVertex === v0 ? offset : 1 - offset;
          }
        } else {
          offset = GeometryUtils.pointPositionOnLineSegment(minVertex.x, minVertex.y, maxVertex.x, maxVertex.y, x, y);
        }
      }

      hole = hole.set('offset', offset);

      state = state.merge({
        scene: scene.mergeIn(['layers', layerID, 'holes', holeID], hole)
      });

      return { updatedState: state };
    }
  }, {
    key: 'endDraggingHole',
    value: function endDraggingHole(state, x, y) {
      state = this.updateDraggingHole(state, x, y).updatedState;
      state = state.merge({ mode: MODE_IDLE });

      return { updatedState: state };
    }
  }, {
    key: 'setProperties',
    value: function setProperties(state, layerID, holeID, properties) {
      state = state.setIn(['scene', 'layers', layerID, 'holes', holeID, 'properties'], properties);

      return { updatedState: state };
    }
  }, {
    key: 'setJsProperties',
    value: function setJsProperties(state, layerID, holeID, properties) {
      return this.setProperties(state, layerID, holeID, fromJS(properties));
    }
  }, {
    key: 'updateProperties',
    value: function updateProperties(state, layerID, holeID, properties) {
      properties.forEach(function (v, k) {
        if (state.hasIn(['scene', 'layers', layerID, 'holes', holeID, 'properties', k])) state = state.mergeIn(['scene', 'layers', layerID, 'holes', holeID, 'properties', k], v);
      });

      return { updatedState: state };
    }
  }, {
    key: 'updateJsProperties',
    value: function updateJsProperties(state, layerID, holeID, properties) {
      return this.updateProperties(state, layerID, holeID, fromJS(properties));
    }
  }, {
    key: 'setAttributes',
    value: function setAttributes(state, layerID, holeID, holesAttributes) {

      var hAttr = holesAttributes.toJS();
      var offsetA = hAttr.offsetA,
          offsetB = hAttr.offsetB,
          offset = hAttr.offset;


      delete hAttr['offsetA'];
      delete hAttr['offsetB'];
      delete hAttr['offset'];

      var misc = new Map({ _unitA: offsetA._unit, _unitB: offsetB._unit });

      state = state.mergeIn(['scene', 'layers', layerID, 'holes', holeID], fromJS(hAttr)).mergeDeepIn(['scene', 'layers', layerID, 'holes', holeID], new Map({ offset: offset, misc: misc }));

      return { updatedState: state };
    }
  }]);

  return Hole;
}();

export { Hole as default };