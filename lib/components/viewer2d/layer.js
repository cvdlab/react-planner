'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Layer;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _export = require('./export');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Layer(_ref) {
  var layer = _ref.layer,
      scene = _ref.scene,
      catalog = _ref.catalog;
  var unit = scene.unit,
      groups = scene.groups;
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
    areas.valueSeq().map(function (area) {
      return _react2.default.createElement(_export.Area, { key: area.id, layer: layer, area: area, unit: unit, catalog: catalog });
    }),
    lines.valueSeq().map(function (line) {
      return _react2.default.createElement(_export.Line, { key: line.id, layer: layer, line: line, scene: scene, catalog: catalog });
    }),
    items.valueSeq().map(function (item) {
      return _react2.default.createElement(_export.Item, { key: item.id, layer: layer, item: item, scene: scene, catalog: catalog });
    }),
    vertices.valueSeq().filter(function (v) {
      return v.selected;
    }).map(function (vertex) {
      return _react2.default.createElement(_export.Vertex, { key: vertex.id, layer: layer, vertex: vertex });
    }),
    groups.valueSeq().filter(function (g) {
      return g.hasIn(['elements', layerID]) && g.get('selected');
    }).map(function (group) {
      return _react2.default.createElement(_export.Group, { key: group.get('id'), layer: layer, group: group, scene: scene, catalog: catalog });
    })
  );
}

Layer.propTypes = {
  layer: _propTypes2.default.object.isRequired,
  scene: _propTypes2.default.object.isRequired,
  catalog: _propTypes2.default.object.isRequired
};