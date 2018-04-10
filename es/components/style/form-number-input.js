var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';

var STYLE_INPUT = {
  display: 'block',
  width: '100%',
  padding: '0 2px',
  fontSize: '13px',
  lineHeight: '1.25',
  color: SharedStyle.PRIMARY_COLOR.input,
  backgroundColor: SharedStyle.COLORS.white,
  backgroundImage: 'none',
  border: '1px solid rgba(0,0,0,.15)',
  outline: 'none',
  height: '30px'
};

var FormNumberInput = function (_Component) {
  _inherits(FormNumberInput, _Component);

  function FormNumberInput(props, context) {
    _classCallCheck(this, FormNumberInput);

    var _this = _possibleConstructorReturn(this, (FormNumberInput.__proto__ || Object.getPrototypeOf(FormNumberInput)).call(this, props, context));

    _this.state = {
      focus: false,
      valid: true
    };
    return _this;
  }

  _createClass(FormNumberInput, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          value = _props.value,
          min = _props.min,
          max = _props.max,
          precision = _props.precision,
          _onChange = _props.onChange,
          onValid = _props.onValid,
          onInvalid = _props.onInvalid,
          style = _props.style,
          placeholder = _props.placeholder;

      var numericInputStyle = _extends({}, STYLE_INPUT, style);

      if (this.state.focus) numericInputStyle.border = '1px solid ' + SharedStyle.SECONDARY_COLOR.main;

      var regexp = new RegExp('^-?([0-9]+)\\.?([0-9]{0,' + precision + '})?$');

      if (!isNaN(min) && isFinite(min) && value < min) value = min;
      if (!isNaN(max) && isFinite(max) && value > max) value = max;

      value = regexp.test(value) ? value : parseFloat(value).toFixed(precision);

      return React.createElement('input', {
        type: 'text',
        value: value,
        style: numericInputStyle,
        onChange: function onChange(evt) {
          var valid = regexp.test(evt.nativeEvent.target.value);

          if (valid) {
            _onChange({ target: { value: evt.nativeEvent.target.value } });
            if (onValid) onValid(evt.nativeEvent);
          } else {
            if (onInvalid) onInvalid(evt.nativeEvent);
          }
          _this2.setState({ valid: valid });
        },
        onFocus: function onFocus(e) {
          return _this2.setState({ focus: true });
        },
        onBlur: function onBlur(e) {
          return _this2.setState({ focus: false });
        },
        placeholder: placeholder
      });
    }
  }]);

  return FormNumberInput;
}(Component);

export default FormNumberInput;


FormNumberInput.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  style: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onValid: PropTypes.func,
  onInvalid: PropTypes.func,
  min: PropTypes.number,
  max: PropTypes.number,
  precision: PropTypes.number,
  placeholder: PropTypes.string
};

FormNumberInput.defaultProps = {
  value: 0,
  style: {},
  min: Number.MIN_SAFE_INTEGER,
  max: Number.MAX_SAFE_INTEGER,
  precision: 3
};