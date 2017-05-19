'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = Layer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _line = require('./line');

var _line2 = _interopRequireDefault(_line);

var _area = require('./area');

var _area2 = _interopRequireDefault(_area);

var _vertex = require('./vertex');

var _vertex2 = _interopRequireDefault(_vertex);

var _item = require('./item');

var _item2 = _interopRequireDefault(_item);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Layer(_ref) {
  var layer = _ref.layer,
      scene = _ref.scene,
      catalog = _ref.catalog;
  var unit = scene.unit;
  var lines = layer.lines,
      areas = layer.areas,
      vertices = layer.vertices,
      holes = layer.holes,
      layerID = layer.id,
      items = layer.items,
      opacity = layer.opacity;


  return _react2.default.createElement(
    'g',
    { opacity: opacity },
    areas.entrySeq().map(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          areaID = _ref3[0],
          area = _ref3[1];

      return _react2.default.createElement(_area2.default, { key: areaID, layer: layer, area: area,
        unit: unit, catalog: catalog });
    }),
    lines.entrySeq().map(function (_ref4) {
      var _ref5 = _slicedToArray(_ref4, 2),
          lineID = _ref5[0],
          line = _ref5[1];

      return _react2.default.createElement(_line2.default, { key: lineID, layer: layer, line: line,
        scene: scene, catalog: catalog });
    }),
    items.entrySeq().map(function (_ref6) {
      var _ref7 = _slicedToArray(_ref6, 2),
          itemID = _ref7[0],
          item = _ref7[1];

      return _react2.default.createElement(_item2.default, { key: itemID, layer: layer, item: item,
        scene: scene, catalog: catalog });
    }),
    vertices.entrySeq().filter(function (_ref8) {
      var _ref9 = _slicedToArray(_ref8, 2),
          vertexID = _ref9[0],
          vertex = _ref9[1];

      return vertex.selected;
    }).map(function (_ref10) {
      var _ref11 = _slicedToArray(_ref10, 2),
          vertexID = _ref11[0],
          vertex = _ref11[1];

      return _react2.default.createElement(_vertex2.default, { key: vertexID, layer: layer, vertex: vertex });
    })
  );
}

Layer.propTypes = {
  layer: _propTypes2.default.object.isRequired,
  scene: _propTypes2.default.object.isRequired,
  catalog: _propTypes2.default.object.isRequired
};