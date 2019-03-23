var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import * as SharedStyle from '../../shared-style';
import { MdUpdate } from 'react-icons/md';
import { KEYBOARD_BUTTON_CODE } from '../../constants';

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

var confirmStyle = {
  position: 'absolute',
  cursor: 'pointer',
  width: '2em',
  height: '2em',
  right: '0.35em',
  top: '0.35em',
  backgroundColor: SharedStyle.SECONDARY_COLOR.main,
  color: '#FFF',
  transition: 'all 0.1s linear'
};

var FormNumberInput = function (_Component) {
  _inherits(FormNumberInput, _Component);

  function FormNumberInput(props, context) {
    _classCallCheck(this, FormNumberInput);

    var _this = _possibleConstructorReturn(this, (FormNumberInput.__proto__ || Object.getPrototypeOf(FormNumberInput)).call(this, props, context));

    _this.state = {
      focus: false,
      valid: true,
      showedValue: props.value
    };
    return _this;
  }

  _createClass(FormNumberInput, [{
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (this.props.value !== nextProps.value) {
        this.setState({ showedValue: nextProps.value });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          value = _props.value,
          min = _props.min,
          max = _props.max,
          precision = _props.precision,
          onChange = _props.onChange,
          onValid = _props.onValid,
          onInvalid = _props.onInvalid,
          style = _props.style,
          placeholder = _props.placeholder;

      var numericInputStyle = _extends({}, STYLE_INPUT, style);

      if (this.state.focus) numericInputStyle.border = '1px solid ' + SharedStyle.SECONDARY_COLOR.main;

      var regexp = new RegExp('^-?([0-9]+)?\\.?([0-9]{0,' + precision + '})?$');

      if (!isNaN(min) && isFinite(min) && this.state.showedValue < min) this.setState({ showedValue: min }); // value = min;
      if (!isNaN(max) && isFinite(max) && this.state.showedValue > max) this.setState({ showedValue: max }); // value = max;

      var currValue = regexp.test(this.state.showedValue) ? this.state.showedValue : parseFloat(this.state.showedValue).toFixed(precision);

      var different = parseFloat(this.props.value).toFixed(precision) !== parseFloat(this.state.showedValue).toFixed(precision);

      var saveFn = function saveFn(e) {
        e.stopPropagation();

        if (_this2.state.valid) {
          var savedValue = _this2.state.showedValue !== '' && _this2.state.showedValue !== '-' ? parseFloat(_this2.state.showedValue) : 0;

          _this2.setState({ showedValue: savedValue });
          onChange({ target: { value: savedValue } });
        }
      };

      return React.createElement(
        'div',
        { style: { position: 'relative' } },
        React.createElement('input', {
          type: 'text',
          value: currValue,
          style: numericInputStyle,
          onChange: function onChange(evt) {
            var valid = regexp.test(evt.nativeEvent.target.value);

            if (valid) {
              _this2.setState({ showedValue: evt.nativeEvent.target.value });
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
          onKeyDown: function onKeyDown(e) {
            var keyCode = e.keyCode || e.which;
            if ((keyCode == KEYBOARD_BUTTON_CODE.ENTER || keyCode == KEYBOARD_BUTTON_CODE.TAB) && different) {
              saveFn(e);
            }
          },
          placeholder: placeholder
        }),
        React.createElement(
          'div',
          {
            onClick: function onClick(e) {
              if (different) saveFn(e);
            },
            title: this.context.translator.t('Confirm'),
            style: _extends({}, confirmStyle, { visibility: different ? 'visible' : 'hidden', opacity: different ? '1' : '0' })
          },
          React.createElement(MdUpdate, { style: { width: '100%', height: '100%', padding: '0.2em', color: '#FFF' } })
        )
      );
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

FormNumberInput.contextTypes = {
  translator: PropTypes.object.isRequired
};

FormNumberInput.defaultProps = {
  value: 0,
  style: {},
  min: Number.MIN_SAFE_INTEGER,
  max: Number.MAX_SAFE_INTEGER,
  precision: 3
};