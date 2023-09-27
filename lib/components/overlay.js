"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Overlay;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function Overlay(_ref) {
  var width = _ref.width,
    height = _ref.height,
    state = _ref.state,
    customOverlays = _ref.customOverlays;
  var mode = state.get('mode');
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, customOverlays.filter(function (overlay) {
    return overlay.modes.includes(mode);
  }).map(function (overlay) {
    var Overlay = overlay.component;
    return /*#__PURE__*/_react["default"].createElement(Overlay, {
      key: overlay.key,
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