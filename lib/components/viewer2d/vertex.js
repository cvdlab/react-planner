"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Vertex;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var SharedStyle = _interopRequireWildcard(require("../../styles/shared-style"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var STYLE = {
  fill: "#0096fd",
  stroke: SharedStyle.COLORS.white,
  cursor: "move"
};
function Vertex(_ref) {
  var vertex = _ref.vertex,
    layer = _ref.layer;
  var x = vertex.x,
    y = vertex.y;
  return /*#__PURE__*/_react["default"].createElement("g", {
    transform: "translate(".concat(x, ", ").concat(y, ")"),
    "data-element-root": true,
    "data-prototype": vertex.prototype,
    "data-id": vertex.id,
    "data-selected": vertex.selected,
    "data-layer": layer.id
  }, /*#__PURE__*/_react["default"].createElement("circle", {
    cx: "0",
    cy: "0",
    r: "7",
    style: STYLE
  }));
}
Vertex.propTypes = {
  vertex: _propTypes["default"].object.isRequired,
  layer: _propTypes["default"].object.isRequired
};