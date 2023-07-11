"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = If;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
/**
 * @return {null}
 */
function If(_ref) {
  var condition = _ref.condition,
    style = _ref.style,
    children = _ref.children;
  return condition ? Array.isArray(children) ? /*#__PURE__*/_react["default"].createElement("div", {
    style: style
  }, children) : children : null;
}
If.propTypes = {
  condition: _propTypes["default"].bool.isRequired,
  style: _propTypes["default"].object
};