function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import { fromJS } from 'immutable';
import { Layer, Vertex, Group } from './export';
import { IDBroker, NameGenerator } from '../utils/export';
var Area = /*#__PURE__*/function () {
  function Area() {
    _classCallCheck(this, Area);
  }
  _createClass(Area, null, [{
    key: "add",
    value: function add(state, layerID, type, verticesCoords, catalog) {
      var area;
      var layer = state.getIn(['scene', 'layers', layerID]);
      layer = layer.withMutations(function (layer) {
        var areaID = IDBroker.acquireID();
        var vertices = verticesCoords.map(function (v) {
          return Vertex.add(state, layerID, v.x, v.y, 'areas', areaID).vertex.id;
        });
        area = catalog.factoryElement(type, {
          id: areaID,
          name: NameGenerator.generateName('areas', catalog.getIn(['elements', type, 'info', 'title'])),
          type: type,
          prototype: 'areas',
          vertices: vertices
        });
        layer.setIn(['areas', areaID], area);
      });
      state = state.setIn(['scene', 'layers', layerID], layer);
      return {
        updatedState: state,
        area: area
      };
    }
  }, {
    key: "select",
    value: function select(state, layerID, areaID) {
      state = Layer.select(state, layerID).updatedState;
      state = Layer.selectElement(state, layerID, 'areas', areaID).updatedState;
      return {
        updatedState: state
      };
    }
  }, {
    key: "remove",
    value: function remove(state, layerID, areaID) {
      var area = state.getIn(['scene', 'layers', layerID, 'areas', areaID]);
      if (area.get('selected') === true) state = this.unselect(state, layerID, areaID).updatedState;
      area.vertices.forEach(function (vertexID) {
        state = Vertex.remove(state, layerID, vertexID, 'areas', areaID).updatedState;
      });
      state = state.deleteIn(['scene', 'layers', layerID, 'areas', areaID]);
      state.getIn(['scene', 'groups']).forEach(function (group) {
        return state = Group.removeElement(state, group.id, layerID, 'areas', areaID).updatedState;
      });
      return {
        updatedState: state
      };
    }
  }, {
    key: "unselect",
    value: function unselect(state, layerID, areaID) {
      state = Layer.unselect(state, layerID, 'areas', areaID).updatedState;
      return {
        updatedState: state
      };
    }
  }, {
    key: "setProperties",
    value: function setProperties(state, layerID, areaID, properties) {
      state = state.mergeIn(['scene', 'layers', layerID, 'areas', areaID, 'properties'], properties);
      return {
        updatedState: state
      };
    }
  }, {
    key: "setJsProperties",
    value: function setJsProperties(state, layerID, areaID, properties) {
      return this.setProperties(state, layerID, areaID, fromJS(properties));
    }
  }, {
    key: "updateProperties",
    value: function updateProperties(state, layerID, areaID, properties) {
      properties.forEach(function (v, k) {
        if (state.hasIn(['scene', 'layers', layerID, 'areas', areaID, 'properties', k])) state = state.mergeIn(['scene', 'layers', layerID, 'areas', areaID, 'properties', k], v);
      });
      return {
        updatedState: state
      };
    }
  }, {
    key: "updateJsProperties",
    value: function updateJsProperties(state, layerID, areaID, properties) {
      return this.updateProperties(state, layerID, areaID, fromJS(properties));
    }
  }, {
    key: "setAttributes",
    value: function setAttributes(state) {
      return {
        updatedState: state
      };
    }
  }]);
  return Area;
}();
export { Area as default };
