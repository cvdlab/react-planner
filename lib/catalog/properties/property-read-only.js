"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = PropertyReadOnly;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _export = require("../../components/style/export");
var _sharedPropertyStyle = _interopRequireDefault(require("./shared-property-style"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function PropertyReadOnly(_ref) {
  var value = _ref.value,
    onUpdate = _ref.onUpdate,
    configs = _ref.configs,
    sourceElement = _ref.sourceElement,
    internalState = _ref.internalState,
    state = _ref.state;
  return /*#__PURE__*/_react["default"].createElement("table", {
    className: "PropertyReadOnly",
    style: _sharedPropertyStyle["default"].tableStyle
  }, /*#__PURE__*/_react["default"].createElement("tbody", null, /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", {
    style: _sharedPropertyStyle["default"].firstTdStyle
  }, /*#__PURE__*/_react["default"].createElement(_export.FormLabel, null, configs.label)), /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement("div", null, value)))));
}
PropertyReadOnly.propTypes = {
  value: _propTypes["default"].any.isRequired,
  onUpdate: _propTypes["default"].func.isRequired,
  configs: _propTypes["default"].object.isRequired,
  sourceElement: _propTypes["default"].object,
  internalState: _propTypes["default"].object,
  state: _propTypes["default"].object.isRequired
};