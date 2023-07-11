"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = FormColorInput;
var _react = _interopRequireDefault(require("react"));
var _formTextInput = _interopRequireDefault(require("./form-text-input"));
var _excluded = ["onChange"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var STYLE = {
  padding: 0,
  border: 0
};
var EREG_NUMBER = /^.*$/;
function FormColorInput(_ref) {
  var onChange = _ref.onChange,
    rest = _objectWithoutProperties(_ref, _excluded);
  var onChangeCustom = function onChangeCustom(event) {
    var value = event.target.value;
    if (EREG_NUMBER.test(value)) {
      onChange(event);
    }
  };
  return /*#__PURE__*/_react["default"].createElement(_formTextInput["default"], _extends({
    type: "color",
    style: STYLE,
    onChange: onChangeCustom,
    autoComplete: "off"
  }, rest));
}