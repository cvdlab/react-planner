"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = FormSlider;
var _react = _interopRequireDefault(require("react"));
var _reactRange = _interopRequireDefault(require("react-range"));
var _formTextInput = _interopRequireDefault(require("./form-text-input"));
var _excluded = ["value", "onChange"];
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
var sliderContainerTrackStyle = {
  display: 'inline-block',
  width: '80%',
  marginRight: '5%'
};
var sliderContainerThumbStyle = {
  display: 'inline-block',
  width: '',
  marginRight: '5%'
};
var sliderStyle = {
  display: 'block',
  width: '100%',
  height: '30px'
};
var textContainerStyle = {
  display: 'inline-block',
  width: '15%',
  "float": 'right'
};
var textStyle = {
  height: '34px',
  textAlign: 'center'
};

// TODO(pg): port this component
function FormSlider(_ref) {
  var value = _ref.value,
    onChange = _ref.onChange,
    rest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement("div", {
    style: sliderContainerStyle
  }, /*#__PURE__*/_react["default"].createElement(_reactRange["default"], _extends({
    style: sliderStyle,
    onChange: onChange,
    value: [value]
  }, rest))), /*#__PURE__*/_react["default"].createElement("div", {
    style: textContainerStyle
  }, /*#__PURE__*/_react["default"].createElement(_formTextInput["default"], {
    value: value,
    onChange: onChange,
    style: textStyle
  })));
}