'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Vertex;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = { fill: "#0096fd", stroke: "#fff", cursor: "move" };

function Vertex(_ref) {
  var vertex = _ref.vertex,
      layer = _ref.layer;
  var x = vertex.x,
      y = vertex.y;


  return _react2.default.createElement(
    'g',
    {
      transform: 'translate(' + x + ', ' + y + ')',
      'data-element-root': true,
      'data-prototype': vertex.prototype,
      'data-id': vertex.id,
      'data-selected': vertex.selected,
      'data-layer': layer.id
    },
    _react2.default.createElement('circle', { cx: '0', cy: '0', r: '7', style: STYLE })
  );
}

Vertex.propTypes = {
  vertex: _propTypes2.default.object.isRequired,
  layer: _propTypes2.default.object.isRequired
};