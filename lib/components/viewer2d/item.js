"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Item;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactIf = _interopRequireDefault(require("../../utils/react-if"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var STYLE_LINE = {
  fill: "#0096fd",
  stroke: "#0096fd"
};
var STYLE_CIRCLE = {
  fill: "#0096fd",
  stroke: "#0096fd",
  cursor: "ew-resize"
};
var STYLE_CIRCLE2 = {
  fill: "none",
  stroke: "#0096fd",
  cursor: "ew-resize"
};
function Item(_ref) {
  var layer = _ref.layer,
    item = _ref.item,
    scene = _ref.scene,
    catalog = _ref.catalog;
  var x = item.x,
    y = item.y,
    rotation = item.rotation;
  var renderedItem = catalog.getElement(item.type).render2D(item, layer, scene);
  return /*#__PURE__*/_react["default"].createElement("g", {
    "data-element-root": true,
    "data-prototype": item.prototype,
    "data-id": item.id,
    "data-selected": item.selected,
    "data-layer": layer.id,
    style: item.selected ? {
      cursor: "move"
    } : {},
    transform: "translate(".concat(x, ",").concat(y, ") rotate(").concat(rotation, ")")
  }, renderedItem, /*#__PURE__*/_react["default"].createElement(_reactIf["default"], {
    condition: item.selected
  }, /*#__PURE__*/_react["default"].createElement("g", {
    "data-element-root": true,
    "data-prototype": item.prototype,
    "data-id": item.id,
    "data-selected": item.selected,
    "data-layer": layer.id,
    "data-part": "rotation-anchor"
  }, /*#__PURE__*/_react["default"].createElement("circle", {
    cx: "0",
    cy: "150",
    r: "10",
    style: STYLE_CIRCLE
  }), /*#__PURE__*/_react["default"].createElement("circle", {
    cx: "0",
    cy: "0",
    r: "150",
    style: STYLE_CIRCLE2
  }))));
}
Item.propTypes = {
  item: _propTypes["default"].object.isRequired,
  layer: _propTypes["default"].object.isRequired,
  scene: _propTypes["default"].object.isRequired,
  catalog: _propTypes["default"].object.isRequired
};