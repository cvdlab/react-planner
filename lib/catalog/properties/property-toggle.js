"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = PropertyToggle;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _export = require("../../components/style/export");
var _sharedPropertyStyle = _interopRequireDefault(require("./shared-property-style"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function PropertyToggle(_ref) {
  var value = _ref.value,
    onUpdate = _ref.onUpdate,
    configs = _ref.configs,
    sourceElement = _ref.sourceElement,
    internalState = _ref.internalState,
    state = _ref.state;
  var update = function update(val) {
    if (configs.hook) {
      return configs.hook(val, sourceElement, internalState, state).then(function (_val) {
        return onUpdate(_val);
      });
    }
    return onUpdate(val);
  };
  return /*#__PURE__*/_react["default"].createElement("table", {
    className: "PropertyToggle",
    style: _sharedPropertyStyle["default"].tableStyle
  }, /*#__PURE__*/_react["default"].createElement("tbody", null, /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", {
    style: _sharedPropertyStyle["default"].firstTdStyle
  }, /*#__PURE__*/_react["default"].createElement(_export.FormLabel, null, configs.label)), /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement(_export.Button, {
    onClick: function onClick(e) {
      return update(!value);
    },
    size: "small"
  }, configs.actionName)))));
}
PropertyToggle.propTypes = {
  value: _propTypes["default"].any.isRequired,
  onUpdate: _propTypes["default"].func.isRequired,
  configs: _propTypes["default"].object.isRequired,
  sourceElement: _propTypes["default"].object,
  internalState: _propTypes["default"].object,
  state: _propTypes["default"].object.isRequired
};