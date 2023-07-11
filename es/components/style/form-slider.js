var _excluded = ["value", "onChange"];
function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }
function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }
function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }
import React from 'react';
import Range from 'react-range';
import FormTextInput from './form-text-input';
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
export default function FormSlider(_ref) {
  var value = _ref.value,
    onChange = _ref.onChange,
    rest = _objectWithoutProperties(_ref, _excluded);
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: sliderContainerStyle
  }, /*#__PURE__*/React.createElement(Range, _extends({
    style: sliderStyle,
    onChange: onChange,
    value: [value]
  }, rest))), /*#__PURE__*/React.createElement("div", {
    style: textContainerStyle
  }, /*#__PURE__*/React.createElement(FormTextInput, {
    value: value,
    onChange: onChange,
    style: textStyle
  })));
}