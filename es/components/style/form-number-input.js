var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

import React, { PropTypes, Component } from 'react';
import FormTextInput from './form-text-input';

var EREG_NUMBER = /^[0-9]*$/;

export default function FormNumberInput(_ref) {
  var onChange = _ref.onChange,
      rest = _objectWithoutProperties(_ref, ['onChange']);

  var onChangeCustom = function onChangeCustom(event) {
    var value = event.target.value;
    if (EREG_NUMBER.test(value)) {
      onChange(event);
    }
  };

  return React.createElement(FormTextInput, _extends({ onChange: onChangeCustom, autoComplete: 'off' }, rest));
}