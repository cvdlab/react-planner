"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = Vertex;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STYLE = { fill: "#0096fd", stroke: "#fff", cursor: "move" };

function Vertex(_ref) {
  var vertex = _ref.vertex;
  var layer = _ref.layer;
  var mode = _ref.mode;
  var x = vertex.x;
  var y = vertex.y;


  return _react2.default.createElement(
    "g",
    {
      transform: "translate(" + x + ", " + y + ")",
      "data-element-root": true,
      "data-prototype": vertex.prototype,
      "data-id": vertex.id,
      "data-selected": vertex.selected,
      "data-layer": layer.id
    },
    _react2.default.createElement("circle", { cx: "0", cy: "0", r: "7", style: STYLE })
  );
}

Vertex.propTypes = {
  vertex: _react.PropTypes.object.isRequired,
  layer: _react.PropTypes.object.isRequired,
  mode: _react.PropTypes.string.isRequired
};