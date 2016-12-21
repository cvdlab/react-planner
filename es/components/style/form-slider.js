var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { PropTypes, Component } from 'react';
import ReactRange from 'react-range';
import FormTextInput from './form-text-input';

var STYLE_INPUT = {
  display: "block",
  width: "100%",
  height: "30px"
};

export default function FormNumberInput(_ref) {
  var value = _ref.value,
      onChange = _ref.onChange,
      rest = _objectWithoutProperties(_ref, ['value', 'onChange']);

  return React.createElement(
    'div',
    null,
    React.createElement(
      'div',
      { style: { display: "inline-block", width: "85%", marginRight: "5%" } },
      React.createElement(ReactRange, _extends({ type: 'range', style: STYLE_INPUT, onChange: onChange, value: value }, rest))
    ),
    React.createElement(
      'div',
      { style: { display: "inline-block", width: "10%" } },
      React.createElement(FormTextInput, { value: value, onChange: onChange })
    )
  );
}