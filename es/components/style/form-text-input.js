var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
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

var FormTextInput = function (_Component) {
  _inherits(FormTextInput, _Component);

  function FormTextInput(props) {
    _classCallCheck(this, FormTextInput);

    var _this = _possibleConstructorReturn(this, (FormTextInput.__proto__ || Object.getPrototypeOf(FormTextInput)).call(this, props));

    _this.state = { focus: false };
    return _this;
  }

  _createClass(FormTextInput, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          style = _props.style,
          rest = _objectWithoutProperties(_props, ['style']);

      var textInputStyle = _extends({}, STYLE_INPUT, style);
      if (this.state.focus) textInputStyle.border = '1px solid ' + SharedStyle.SECONDARY_COLOR.main;

      return React.createElement('input', _extends({
        onFocus: function onFocus(e) {
          return _this2.setState({ focus: true });
        },
        onBlur: function onBlur(e) {
          return _this2.setState({ focus: false });
        },
        style: textInputStyle,
        type: 'text'
      }, rest));
    }
  }]);

  return FormTextInput;
}(Component);

export default FormTextInput;


FormTextInput.defaultProps = {
  style: {}
};