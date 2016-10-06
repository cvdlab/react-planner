'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = Layer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _line = require('./line.jsx');

var _line2 = _interopRequireDefault(_line);

var _area = require('./area.jsx');

var _area2 = _interopRequireDefault(_area);

var _vertex = require('./vertex.jsx');

var _vertex2 = _interopRequireDefault(_vertex);

var _item = require('./item.jsx');

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Layer(_ref) {
  var layer = _ref.layer;
  var mode = _ref.mode;
  var scene = _ref.scene;
  var pixelPerUnit = scene.pixelPerUnit;
  var unit = scene.unit;
  var lines = layer.lines;
  var areas = layer.areas;
  var vertices = layer.vertices;
  var holes = layer.holes;
  var layerID = layer.id;
  var items = layer.items;


  return _react2.default.createElement(
    'g',
    null,
    areas.entrySeq().map(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2);

      var areaID = _ref3[0];
      var area = _ref3[1];
      return _react2.default.createElement(_area2.default, { key: areaID, layer: layer, area: area, mode: mode,
        pixelPerUnit: pixelPerUnit, unit: unit });
    }),
    lines.entrySeq().map(function (_ref4) {
      var _ref5 = _slicedToArray(_ref4, 2);

      var lineID = _ref5[0];
      var line = _ref5[1];
      return _react2.default.createElement(_line2.default, { key: lineID, layer: layer, line: line, mode: mode,
        scene: scene });
    }),
    items.entrySeq().map(function (_ref6) {
      var _ref7 = _slicedToArray(_ref6, 2);

      var itemID = _ref7[0];
      var item = _ref7[1];
      return _react2.default.createElement(_item2.default, { key: itemID, layer: layer, item: item, mode: mode,
        scene: scene });
    }),
    vertices.entrySeq().filter(function (_ref8) {
      var _ref9 = _slicedToArray(_ref8, 2);

      var vertexID = _ref9[0];
      var vertex = _ref9[1];
      return vertex.selected;
    }).map(function (_ref10) {
      var _ref11 = _slicedToArray(_ref10, 2);

      var vertexID = _ref11[0];
      var vertex = _ref11[1];
      return _react2.default.createElement(_vertex2.default, { key: vertexID, layer: layer, vertex: vertex, mode: mode });
    })
  );
}

Layer.propTypes = {
  layer: _react.PropTypes.object.isRequired,
  mode: _react.PropTypes.string.isRequired,
  scene: _react.PropTypes.object.isRequired
};