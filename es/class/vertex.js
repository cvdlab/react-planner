var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

import { Map, List } from 'immutable';
import { Vertex as VertexModel } from '../models';
import { IDBroker, GeometryUtils, SnapSceneUtils, SnapUtils } from '../utils/export';
import { MODE_DRAGGING_VERTEX, MODE_IDLE } from '../constants';
import { Layer, Line, Group } from '../class/export';

var Vertex = function () {
  function Vertex() {
    _classCallCheck(this, Vertex);
  }

  _createClass(Vertex, null, [{
    key: 'add',
    value: function add(state, layerID, x, y, relatedPrototype, relatedID) {

      var vertex = state.getIn(['scene', 'layers', layerID, 'vertices']).find(function (vertex) {
        return GeometryUtils.samePoints(vertex, { x: x, y: y });
      });

      if (vertex) {
        vertex = vertex.update(relatedPrototype, function (related) {
          return related.push(relatedID);
        });
      } else {
        vertex = new VertexModel(_defineProperty({
          id: IDBroker.acquireID(),
          name: 'Vertex',
          x: x, y: y
        }, relatedPrototype, new List([relatedID])));
      }

      state = state.setIn(['scene', 'layers', layerID, 'vertices', vertex.id], vertex);

      return { updatedState: state, vertex: vertex };
    }
  }, {
    key: 'setAttributes',
    value: function setAttributes(state, layerID, vertexID, vertexAttributes) {
      state = state.mergeIn(['scene', 'layers', layerID, 'vertices', vertexID], vertexAttributes);

      return { updatedState: state };
    }
  }, {
    key: 'addElement',
    value: function addElement(state, layerID, vertexID, elementPrototype, elementID) {
      state = state.updateIn(['scene', 'layers', layerID, 'vertices', vertexID, elementPrototype], function (list) {
        return list.push(elementID);
      });
      return { updatedState: state };
    }
  }, {
    key: 'removeElement',
    value: function removeElement(state, layerID, vertexID, elementPrototype, elementID) {
      var elementIndex = state.getIn(['scene', 'layers', layerID, 'vertices', vertexID, elementPrototype]).findIndex(function (el) {
        return el === elementID;
      });
      if (elementIndex !== -1) {
        state = state.updateIn(['scene', 'layers', layerID, 'vertices', vertexID, elementPrototype], function (list) {
          return list.remove(elementIndex);
        });
      }
      return { updatedState: state };
    }
  }, {
    key: 'select',
    value: function select(state, layerID, vertexID) {
      state = state.setIn(['scene', 'layers', layerID, 'vertices', vertexID, 'selected'], true);
      state = state.updateIn(['scene', 'layers', layerID, 'selected', 'vertices'], function (elems) {
        return elems.push(vertexID);
      });

      return { updatedState: state };
    }
  }, {
    key: 'unselect',
    value: function unselect(state, layerID, vertexID) {
      state = state.setIn(['scene', 'layers', layerID, 'vertices', vertexID, 'selected'], false);
      state = state.updateIn(['scene', 'layers', layerID, 'selected', 'vertices'], function (elems) {
        return elems.filter(function (el) {
          return el.id !== vertexID;
        });
      });

      return { updatedState: state };
    }
  }, {
    key: 'remove',
    value: function remove(state, layerID, vertexID, relatedPrototype, relatedID, forceRemove) {
      var vertex = state.getIn(['scene', 'layers', layerID, 'vertices', vertexID]);

      if (vertex) {
        if (relatedPrototype && relatedID) vertex = vertex.update(relatedPrototype, function (related) {
          var index = related.findIndex(function (ID) {
            return relatedID === ID;
          });
          return related.delete(index);
        });

        var inUse = vertex.areas.size || vertex.lines.size;

        if (inUse && !forceRemove) {
          state = state.setIn(['scene', 'layers', layerID, 'vertices', vertexID], vertex);
        } else {
          state = state.deleteIn(['scene', 'layers', layerID, 'vertices', vertexID]);
        }
      }

      return { updatedState: state };
    }
  }, {
    key: 'beginDraggingVertex',
    value: function beginDraggingVertex(state, layerID, vertexID, x, y) {

      var snapElements = SnapSceneUtils.sceneSnapElements(state.scene, new List(), state.snapMask);

      state = state.merge({
        mode: MODE_DRAGGING_VERTEX,
        snapElements: snapElements,
        draggingSupport: Map({
          layerID: layerID,
          vertexID: vertexID,
          previousMode: state.get('mode')
        })
      });

      return { updatedState: state };
    }
  }, {
    key: 'updateDraggingVertex',
    value: function updateDraggingVertex(state, x, y) {
      var _state = state,
          draggingSupport = _state.draggingSupport,
          snapElements = _state.snapElements,
          scene = _state.scene;


      var snap = null;
      if (state.snapMask && !state.snapMask.isEmpty()) {
        snap = SnapUtils.nearestSnap(snapElements, x, y, state.snapMask);
        if (snap) {
          ;
          var _snap$point = snap.point;
          x = _snap$point.x;
          y = _snap$point.y;
        }
      }

      var layerID = draggingSupport.get('layerID');
      var vertexID = draggingSupport.get('vertexID');
      state = state.merge({
        activeSnapElement: snap ? snap.snap : null,
        scene: scene.mergeIn(['layers', layerID, 'vertices', vertexID], { x: x, y: y })
      });

      return { updatedState: state };
    }
  }, {
    key: 'endDraggingVertex',
    value: function endDraggingVertex(state, x, y) {
      var _state2 = state,
          draggingSupport = _state2.draggingSupport;

      var layerID = draggingSupport.get('layerID');
      var vertexID = draggingSupport.get('vertexID');
      var lines = state.getIn(['scene', 'layers', layerID, 'vertices', vertexID, 'lines']);

      if (lines) {
        state = lines.reduce(function (reducedState, lineID) {
          if (!reducedState.getIn(['scene', 'layers', layerID, 'lines', lineID])) return reducedState;

          var v_id0 = reducedState.getIn(['scene', 'layers', layerID, 'lines', lineID, 'vertices', 0]);
          var v_id1 = reducedState.getIn(['scene', 'layers', layerID, 'lines', lineID, 'vertices', 1]);
          var oldVertexID = v_id0 === vertexID ? v_id1 : v_id0;

          var oldVertex = reducedState.getIn(['scene', 'layers', layerID, 'vertices', oldVertexID]);
          var vertex = reducedState.getIn(['scene', 'layers', layerID, 'vertices', vertexID]);

          var oldHoles = [];

          var orderedVertices = GeometryUtils.orderVertices([oldVertex, vertex]);

          var holes = reducedState.getIn(['scene', 'layers', layerID, 'lines', lineID, 'holes']).forEach(function (holeID) {
            var hole = reducedState.getIn(['scene', 'layers', layerID, 'holes', holeID]);
            var oldLineLength = GeometryUtils.pointsDistance(oldVertex.x, oldVertex.y, vertex.x, vertex.y);
            var offset = GeometryUtils.samePoints(orderedVertices[1], reducedState.getIn(['scene', 'layers', layerID, 'lines', lineID, 'vertices', 1])) ? 1 - hole.offset : hole.offset;
            var offsetPosition = GeometryUtils.extendLine(oldVertex.x, oldVertex.y, vertex.x, vertex.y, oldLineLength * offset);

            oldHoles.push({ hole: hole, offsetPosition: offsetPosition });
          });

          var lineType = reducedState.getIn(['scene', 'layers', layerID, 'lines', lineID, 'type']);
          var lineProps = reducedState.getIn(['scene', 'layers', layerID, 'lines', lineID, 'properties']);
          var lineGroups = reducedState //get groups membership if present
          .getIn(['scene', 'groups']).filter(function (group) {
            var lines = group.getIn(['elements', layerID, 'lines']);
            return lines && lines.contains(lineID);
          });

          reducedState = Layer.removeZeroLengthLines(reducedState, layerID).updatedState;
          reducedState = Layer.mergeEqualsVertices(reducedState, layerID, vertexID).updatedState;
          reducedState = Line.remove(reducedState, layerID, lineID).updatedState;

          if (!GeometryUtils.samePoints(oldVertex, vertex)) {
            var ret = Line.createAvoidingIntersections(reducedState, layerID, lineType, oldVertex.x, oldVertex.y, vertex.x, vertex.y, lineProps, oldHoles);

            reducedState = ret.updatedState;

            //re-add to old line's groups if present
            ret.lines.forEach(function (addedLine) {
              lineGroups.forEach(function (oldLineGroup) {
                reducedState = Group.addElement(reducedState, oldLineGroup.id, layerID, 'lines', addedLine.id).updatedState;
              });
            });
          }

          return reducedState;
        }, state);
      }

      state = Layer.detectAndUpdateAreas(state, layerID).updatedState;

      state = state.merge({
        mode: draggingSupport.get('previousMode'),
        draggingSupport: null,
        activeSnapElement: null,
        snapElements: new List()
      });

      return { updatedState: state };
    }
  }]);

  return Vertex;
}();

export { Vertex as default };