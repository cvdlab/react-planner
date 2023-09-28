"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Overlays;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function Overlays(_ref) {
  var width = _ref.width,
    height = _ref.height,
    state = _ref.state,
    customOverlays = _ref.customOverlays;
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, customOverlays.map(function (overlay) {
    var Overlay = overlay.component;
    return /*#__PURE__*/_react["default"].createElement(Overlay, {
      width: width,
      height: height,
      state: state
    });
  }));
}
Content.propTypes = {
  state: _propTypes["default"].object.isRequired,
  width: _propTypes["default"].number.isRequired,
  height: _propTypes["default"].number.isRequired,
  customOverlays: _propTypes["default"].arrayOf(_propTypes["default"].object)
};