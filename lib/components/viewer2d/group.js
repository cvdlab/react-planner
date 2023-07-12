"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactIf = _interopRequireDefault(require("../../utils/react-if"));
var sharedStyles = _interopRequireWildcard(require("../../styles/shared-style"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var cx = 0;
var cy = 0;
var radius = 5;
var STYLE_CIRCLE = {
  fill: sharedStyles.MATERIAL_COLORS[500].orange,
  stroke: sharedStyles.MATERIAL_COLORS[500].orange,
  cursor: 'default'
};
var Group = function Group(_ref) {
  var layer = _ref.layer,
    group = _ref.group,
    scene = _ref.scene,
    catalog = _ref.catalog;
  var _useContext = (0, _react.useContext)(ReactPlannerContext),
    translator = _useContext.translator;
  return /*#__PURE__*/_react["default"].createElement("g", {
    "data-element-root": true,
    "data-prototype": group.prototype,
    "data-id": group.id,
    "data-selected": group.selected,
    "data-layer": layer.id,
    style: group.selected ? {
      cursor: 'move'
    } : {},
    transform: "translate(".concat(group.x, ",").concat(group.y, ") rotate(").concat(group.rotation, ")")
  }, /*#__PURE__*/_react["default"].createElement(_reactIf["default"], {
    condition: group.selected
  }, /*#__PURE__*/_react["default"].createElement("g", {
    "data-element-root": true,
    "data-prototype": group.prototype,
    "data-id": group.id,
    "data-selected": group.selected,
    "data-layer": layer.id,
    "data-part": "rotation-anchor"
  }, /*#__PURE__*/_react["default"].createElement("circle", {
    cx: cx,
    cy: cy,
    r: radius,
    style: STYLE_CIRCLE
  }, /*#__PURE__*/_react["default"].createElement("title", null, translator.t('Group\'s Barycenter'))))));
};
Group.propTypes = {
  group: _propTypes["default"].object.isRequired,
  layer: _propTypes["default"].object.isRequired,
  scene: _propTypes["default"].object.isRequired,
  catalog: _propTypes["default"].object.isRequired
};
var _default = Group;
exports["default"] = _default;