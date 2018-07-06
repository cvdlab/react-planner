'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _immutable = require('immutable');

var _export = require('./export');

var _export2 = require('../utils/export');

var _models = require('../models');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var sameSet = function sameSet(set1, set2) {
  return set1.size === set2.size && set1.isSuperset(set2) && set1.isSubset(set2);
};

var Layer = function () {
  function Layer() {
    _classCallCheck(this, Layer);
  }

  _createClass(Layer, null, [{
    key: 'create',
    value: function create(state, name, altitude) {
      var layerID = _export2.IDBroker.acquireID();
      name = name || 'layer ' + layerID;
      altitude = altitude || 0;

      var layer = new _models.Layer({ id: layerID, name: name, altitude: altitude });

      state = state.setIn(['scene', 'selectedLayer'], layerID);
      state = state.setIn(['scene', 'layers', layerID], layer);

      return { updatedState: state };
    }
  }, {
    key: 'select',
    value: function select(state, layerID) {
      if (!state.get('alterate')) state = _export.Project.unselectAll(state).updatedState;
      state = state.setIn(['scene', 'selectedLayer'], layerID);

      return { updatedState: state };
    }
  }, {
    key: 'selectElement',
    value: function selectElement(state, layerID, elementPrototype, elementID) {
      state = state.setIn(['scene', 'layers', layerID, elementPrototype, elementID, 'selected'], true);
      state = state.updateIn(['scene', 'layers', layerID, 'selected', elementPrototype], function (elems) {
        return elems.push(elementID);
      });

      return { updatedState: state };
    }
  }, {
    key: 'unselect',
    value: function unselect(state, layerID, elementPrototype, elementID) {
      state = state.setIn(['scene', 'layers', layerID, elementPrototype, elementID, 'selected'], false);
      state = state.updateIn(['scene', 'layers', layerID, 'selected', elementPrototype], function (elems) {
        return elems.filter(function (el) {
          return el.id === elementID;
        });
      });
      return { updatedState: state };
    }
  }, {
    key: 'unselectAll',
    value: function unselectAll(state, layerID) {
      var _state$getIn = state.getIn(['scene', 'layers', layerID]),
          lines = _state$getIn.lines,
          holes = _state$getIn.holes,
          items = _state$getIn.items,
          areas = _state$getIn.areas;

      if (lines) lines.forEach(function (line) {
        state = _export.Line.unselect(state, layerID, line.id).updatedState;
      });
      if (holes) holes.forEach(function (hole) {
        state = _export.Hole.unselect(state, layerID, hole.id).updatedState;
      });
      if (items) items.forEach(function (item) {
        state = _export.Item.unselect(state, layerID, item.id).updatedState;
      });
      if (areas) areas.forEach(function (area) {
        state = _export.Area.unselect(state, layerID, area.id).updatedState;
      });

      return { updatedState: state };
    }
  }, {
    key: 'setProperties',
    value: function setProperties(state, layerID, properties) {
      state = state.mergeIn(['scene', 'layers', layerID], properties);
      state = state.updateIn(['scene', 'layers'], function (layers) {
        return layers.sort(function (a, b) {
          return a.altitude !== b.altitude ? a.altitude - b.altitude : a.order - b.order;
        });
      });

      return { updatedState: state };
    }
  }, {
    key: 'remove',
    value: function remove(state, layerID) {
      state = state.removeIn(['scene', 'layers', layerID]);

      state = state.setIn(['scene', 'selectedLayer'], state.scene.selectedLayer !== layerID ? state.scene.selectedLayer : state.scene.layers.first().id);

      return { updatedState: state };
    }
  }, {
    key: 'removeElement',
    value: function removeElement(state, layerID, elementPrototype, elementID) {
      state = state.deleteIn(['scene', 'layers', layerID, elementPrototype, elementID]);

      return { updatedState: state };
    }
  }, {
    key: 'detectAndUpdateAreas',
    value: function detectAndUpdateAreas(state, layerID) {

      var verticesArray = []; //array with vertices coords
      var linesArray = void 0; //array with edges

      var vertexID_to_verticesArrayIndex = {};
      var verticesArrayIndex_to_vertexID = {};

      state.getIn(['scene', 'layers', layerID, 'vertices']).forEach(function (vertex) {
        var verticesCount = verticesArray.push([vertex.x, vertex.y]);
        var latestVertexIndex = verticesCount - 1;
        vertexID_to_verticesArrayIndex[vertex.id] = latestVertexIndex;
        verticesArrayIndex_to_vertexID[latestVertexIndex] = vertex.id;
      });

      linesArray = state.getIn(['scene', 'layers', layerID, 'lines']).map(function (line) {
        return line.vertices.map(function (vertexID) {
          return vertexID_to_verticesArrayIndex[vertexID];
        }).toArray();
      });

      var innerCyclesByVerticesArrayIndex = _export2.GraphInnerCycles.calculateInnerCycles(verticesArray, linesArray);

      var innerCyclesByVerticesID = new _immutable.List(innerCyclesByVerticesArrayIndex).map(function (cycle) {
        return new _immutable.List(cycle.map(function (vertexIndex) {
          return verticesArrayIndex_to_vertexID[vertexIndex];
        }));
      });

      // All area vertices should be ordered in counterclockwise order
      innerCyclesByVerticesID = innerCyclesByVerticesID.map(function (area) {
        return _export2.GraphInnerCycles.isClockWiseOrder(area.map(function (vertexID) {
          return state.getIn(['scene', 'layers', layerID, 'vertices', vertexID]);
        })) ? area.reverse() : area;
      });

      var areaIDs = [];

      //remove areas
      state.getIn(['scene', 'layers', layerID, 'areas']).forEach(function (area) {
        var areaInUse = innerCyclesByVerticesID.some(function (vertices) {
          return sameSet(vertices, area.vertices);
        });
        if (!areaInUse) {
          state = _export.Area.remove(state, layerID, area.id).updatedState;
        }
      });

      //add new areas
      innerCyclesByVerticesID.forEach(function (cycle, ind) {
        var areaInUse = state.getIn(['scene', 'layers', layerID, 'areas']).find(function (area) {
          return sameSet(area.vertices, cycle);
        });

        if (areaInUse) {
          areaIDs[ind] = areaInUse.id;
          state = state.setIn(['scene', 'layers', layerID, 'areas', areaIDs[ind], 'holes'], new _immutable.List());
        } else {
          var areaVerticesCoords = cycle.map(function (vertexID) {
            return state.getIn(['scene', 'layers', layerID, 'vertices', vertexID]);
          });
          var resultAdd = _export.Area.add(state, layerID, 'area', areaVerticesCoords, state.catalog);

          areaIDs[ind] = resultAdd.area.id;
          state = resultAdd.updatedState;
        }
      });

      // Build a relationship between areas and their coordinates
      var verticesCoordsForArea = areaIDs.map(function (id) {
        var vertices = state.getIn(['scene', 'layers', layerID, 'areas', id]).vertices.map(function (vertexID) {
          var _state$getIn2 = state.getIn(['scene', 'layers', layerID, 'vertices', vertexID]),
              x = _state$getIn2.x,
              y = _state$getIn2.y;

          return new _immutable.List([x, y]);
        });
        return { id: id, vertices: vertices };
      });

      // Find all holes for an area
      var i = void 0,
          j = void 0;
      for (i = 0; i < verticesCoordsForArea.length; i++) {
        var holesList = new _immutable.List(); // The holes for this area
        var areaVerticesList = verticesCoordsForArea[i].vertices.flatten().toArray();
        for (j = 0; j < verticesCoordsForArea.length; j++) {
          if (i !== j) {
            var isHole = _export2.GeometryUtils.ContainsPoint(areaVerticesList, verticesCoordsForArea[j].vertices.get(0).get(0), verticesCoordsForArea[j].vertices.get(0).get(1));
            if (isHole) {
              holesList = holesList.push(verticesCoordsForArea[j].id);
            }
          }
        }
        state = state.setIn(['scene', 'layers', layerID, 'areas', verticesCoordsForArea[i].id, 'holes'], holesList);
      }

      // Remove holes which are already holes for other areas
      areaIDs.forEach(function (areaID) {
        var doubleHoles = new Set();
        var areaHoles = state.getIn(['scene', 'layers', layerID, 'areas', areaID, 'holes']);
        areaHoles.forEach(function (areaHoleID) {
          var holesOfholes = state.getIn(['scene', 'layers', layerID, 'areas', areaHoleID, 'holes']);
          holesOfholes.forEach(function (holeID) {
            if (areaHoles.indexOf(holeID) !== -1) doubleHoles.add(holeID);
          });
        });
        doubleHoles.forEach(function (doubleHoleID) {
          areaHoles = areaHoles.remove(areaHoles.indexOf(doubleHoleID));
        });
        state = state.setIn(['scene', 'layers', layerID, 'areas', areaID, 'holes'], areaHoles);
      });

      return { updatedState: state };
    }
  }, {
    key: 'removeZeroLengthLines',
    value: function removeZeroLengthLines(state, layerID) {
      var updatedState = state.getIn(['scene', 'layers', layerID, 'lines']).reduce(function (newState, line) {
        var v_id0 = line.getIn(['vertices', 0]);
        var v_id1 = line.getIn(['vertices', 1]);

        var v0 = newState.getIn(['scene', 'layers', layerID, 'vertices', v_id0]);
        var v1 = newState.getIn(['scene', 'layers', layerID, 'vertices', v_id1]);

        if (_export2.GeometryUtils.verticesDistance(v0, v1) === 0) {
          newState = _export.Line.remove(newState, layerID, line.id).updatedState;
        }

        return newState;
      }, state);

      return { updatedState: updatedState };
    }
  }, {
    key: 'mergeEqualsVertices',
    value: function mergeEqualsVertices(state, layerID, vertexID) {
      //1. find vertices to remove
      var vertex = state.getIn(['scene', 'layers', layerID, 'vertices', vertexID]);

      var doubleVertices = state.getIn(['scene', 'layers', layerID, 'vertices']).filter(function (v) {
        return v.id !== vertexID && _export2.GeometryUtils.samePoints(vertex, v) // &&
        //!v.lines.contains( vertexID ) &&
        //!v.areas.contains( vertexID )
        ;
      });

      if (doubleVertices.isEmpty()) return { updatedState: state };

      doubleVertices.forEach(function (doubleVertex) {
        var reduced = doubleVertex.lines.reduce(function (reducedState, lineID) {

          reducedState = reducedState.updateIn(['scene', 'layers', layerID, 'lines', lineID, 'vertices'], function (vertices) {
            if (vertices) {
              return vertices.map(function (v) {
                return v === doubleVertex.id ? vertexID : v;
              });
            }
          });
          reducedState = _export.Vertex.addElement(reducedState, layerID, vertexID, 'lines', lineID).updatedState;

          return reducedState;
        }, state);

        var biReduced = doubleVertex.areas.reduce(function (reducedState, areaID) {

          reducedState = reducedState.updateIn(['scene', 'layers', layerID, 'areas', areaID, 'vertices'], function (vertices) {
            if (vertices) return vertices.map(function (v) {
              return v === doubleVertex.id ? vertexID : v;
            });
          });
          reducedState = _export.Vertex.addElement(reducedState, layerID, vertexID, 'areas', areaID).updatedState;

          return reducedState;
        }, reduced);

        state = _export.Vertex.remove(biReduced, layerID, doubleVertex.id, null, null, true).updatedState;
      });

      return { updatedState: state };
    }
  }, {
    key: 'setPropertiesOnSelected',
    value: function setPropertiesOnSelected(state, layerID, properties) {
      var selected = state.getIn(['scene', 'layers', layerID, 'selected']);

      selected.lines.forEach(function (lineID) {
        return state = _export.Line.setProperties(state, layerID, lineID, properties).updatedState;
      });
      selected.holes.forEach(function (holeID) {
        return state = _export.Hole.setProperties(state, layerID, holeID, properties).updatedState;
      });
      selected.areas.forEach(function (areaID) {
        return state = _export.Area.setProperties(state, layerID, areaID, properties).updatedState;
      });
      selected.items.forEach(function (itemID) {
        return state = _export.Item.setProperties(state, layerID, itemID, properties).updatedState;
      });

      return { updatedState: state };
    }
  }, {
    key: 'updatePropertiesOnSelected',
    value: function updatePropertiesOnSelected(state, layerID, properties) {
      var selected = state.getIn(['scene', 'layers', layerID, 'selected']);

      selected.lines.forEach(function (lineID) {
        return state = _export.Line.updateProperties(state, layerID, lineID, properties).updatedState;
      });
      selected.holes.forEach(function (holeID) {
        return state = _export.Hole.updateProperties(state, layerID, holeID, properties).updatedState;
      });
      selected.areas.forEach(function (areaID) {
        return state = _export.Area.updateProperties(state, layerID, areaID, properties).updatedState;
      });
      selected.items.forEach(function (itemID) {
        return state = _export.Item.updateProperties(state, layerID, itemID, properties).updatedState;
      });

      return { updatedState: state };
    }
  }, {
    key: 'setAttributesOnSelected',
    value: function setAttributesOnSelected(state, layerID, attributes) {
      var selected = state.getIn(['scene', 'layers', layerID, 'selected']);

      selected.lines.forEach(function (lineID) {
        return state = _export.Line.setAttributes(state, layerID, lineID, attributes).updatedState;
      });
      selected.holes.forEach(function (holeID) {
        return state = _export.Hole.setAttributes(state, layerID, holeID, attributes).updatedState;
      });
      selected.items.forEach(function (itemID) {
        return state = _export.Item.setAttributes(state, layerID, itemID, attributes).updatedState;
      });
      //selected.areas.forEach(areaID => state = Area.setAttributes( state, layerID, areaID, attributes ).updatedState);

      return { updatedState: state };
    }
  }]);

  return Layer;
}();

exports.default = Layer;