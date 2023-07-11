"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = PropertyNumber;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _export = require("../../components/style/export");
var _sharedPropertyStyle = _interopRequireDefault(require("./shared-property-style"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function PropertyNumber(_ref) {
  var value = _ref.value,
    onUpdate = _ref.onUpdate,
    onValid = _ref.onValid,
    configs = _ref.configs,
    sourceElement = _ref.sourceElement,
    internalState = _ref.internalState,
    state = _ref.state;
  var update = function update(val) {
    var number = parseFloat(val);
    if (isNaN(number)) {
      number = 0;
    }
    if (configs.hook) {
      return configs.hook(number, sourceElement, internalState, state).then(function (_val) {
        return onUpdate(_val);
      });
    }
    return onUpdate(number);
  };
  return /*#__PURE__*/_react["default"].createElement("table", {
    className: "PropertyNumber",
    style: _sharedPropertyStyle["default"].tableStyle
  }, /*#__PURE__*/_react["default"].createElement("tbody", null, /*#__PURE__*/_react["default"].createElement("tr", null, /*#__PURE__*/_react["default"].createElement("td", {
    style: _sharedPropertyStyle["default"].firstTdStyle
  }, /*#__PURE__*/_react["default"].createElement(_export.FormLabel, null, configs.label)), /*#__PURE__*/_react["default"].createElement("td", null, /*#__PURE__*/_react["default"].createElement(_export.FormNumberInput, {
    value: value,
    onChange: function onChange(event) {
      return update(event.target.value);
    },
    onValid: onValid,
    min: configs.min,
    max: configs.max
  })))));
}
PropertyNumber.propTypes = {
  value: _propTypes["default"].any.isRequired,
  onUpdate: _propTypes["default"].func.isRequired,
  onValid: _propTypes["default"].func,
  configs: _propTypes["default"].object.isRequired,
  sourceElement: _propTypes["default"].object,
  internalState: _propTypes["default"].object,
  state: _propTypes["default"].object.isRequired
};