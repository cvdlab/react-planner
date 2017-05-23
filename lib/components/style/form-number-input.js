'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = FormNumberInput;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formTextInput = require('./form-text-input');

var _formTextInput2 = _interopRequireDefault(_formTextInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function FormNumberInput(_ref) {
  var onChange = _ref.onChange,
      rest = _objectWithoutProperties(_ref, ['onChange']);

  var onChangeCustom = function onChangeCustom(event) {
    var value = event.target.value;

    rest.min = rest.min ? parseFloat(rest.min) : -Infinity;
    rest.max = rest.max ? parseFloat(rest.max) : Infinity;

    if (parseFloat(value) <= (parseFloat(rest.min) || -Infinity) || parseFloat(value) >= (parseFloat(rest.max) || Infinity)) {
      event.target.value = rest.min;
      onChange(event);
      event.target.select();
    } else {
      if (!isNaN(parseFloat(value)) && isFinite(value)) {
        onChange(event);
      } else {
        if (value === '-') {
          if (rest.min == 0) {
            event.target.value = '0';
            event.target.select();
          }
          onChange(event);
        } else if (value === '0' || value === '') {
          event.target.value = rest.min > 0 ? rest.min : '0';
          onChange(event);
          event.target.select();
        }
      }
    }
  };

  var textProps = _extends({}, rest);
  delete textProps.state;

  return _react2.default.createElement(_formTextInput2.default, _extends({ onChange: onChangeCustom, autoComplete: 'off' }, textProps));
}