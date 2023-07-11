"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = GridVerticalStreak;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _immutable = require("immutable");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function GridVerticalStreak(_ref) {
  var width = _ref.width,
    height = _ref.height,
    grid = _ref.grid;
  var step = grid.properties.get('step');
  var colors;
  if (grid.properties.has('color')) {
    colors = new _immutable.List([grid.properties.get('color')]);
  } else {
    colors = grid.properties.get('colors');
  }
  var rendered = [];
  var i = 0;
  for (var x = 0; x <= width; x += step) {
    var color = colors.get(i % colors.size);
    i++;
    rendered.push( /*#__PURE__*/_react["default"].createElement("line", {
      key: x,
      x1: x,
      y1: "0",
      x2: x,
      y2: height,
      strokeWidth: "1",
      stroke: color
    }));
  }
  return /*#__PURE__*/_react["default"].createElement("g", null, rendered);
}
GridVerticalStreak.propTypes = {
  width: _propTypes["default"].number.isRequired,
  height: _propTypes["default"].number.isRequired,
  grid: _propTypes["default"].object.isRequired
};