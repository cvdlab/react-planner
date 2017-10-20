'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactNumericInput = require('react-numeric-input');

var _reactNumericInput2 = _interopRequireDefault(_reactNumericInput);

var _sharedStyle = require('../../shared-style');

var SharedStyle = _interopRequireWildcard(_sharedStyle);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var STYLE_INPUT = {
  display: 'block',
  width: '100%',
  padding: '0 2px',
  fontSize: '13px',
  lineHeight: '1.25',
  color: '#55595c',
  backgroundColor: SharedStyle.COLORS.white,
  backgroundImage: 'none',
  border: '1px solid rgba(0,0,0,.15)',
  outline: 'none',
  height: '30px'
};

var FormNumberInput = function (_Component) {
  _inherits(FormNumberInput, _Component);

  function FormNumberInput(props) {
    _classCallCheck(this, FormNumberInput);

    var _this = _possibleConstructorReturn(this, (FormNumberInput.__proto__ || Object.getPrototypeOf(FormNumberInput)).call(this, props));

    _this.state = { focus: false };
    return _this;
  }

  _createClass(FormNumberInput, [{
    key: 'onChangeCustom',
    value: function onChangeCustom(valueAsNumber, valueAsString, input) {
      if (this.refs.realNumber.refs.input.checkValidity()) {
        this.props.onChange({ target: { value: valueAsNumber } });
        this.onValidCustom(valueAsNumber, valueAsString);
      } else {
        this.onInvalidCustom(valueAsNumber, valueAsString);
      }
    }
  }, {
    key: 'onValidCustom',
    value: function onValidCustom(valueAsNumber, valueAsString) {
      if (this.refs.realNumber) this.refs.realNumber.refs.input.style.color = STYLE_INPUT.color;
    }
  }, {
    key: 'onInvalidCustom',
    value: function onInvalidCustom(error, valueAsNumber, valueAsString) {
      if (this.refs.realNumber) this.refs.realNumber.refs.input.style.color = 'red';
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          value = _props.value,
          configs = _props.configs,
          onChange = _props.onChange,
          onValid = _props.onValid,
          style = _props.style,
          rest = _objectWithoutProperties(_props, ['value', 'configs', 'onChange', 'onValid', 'style']);

      var min = configs.min,
          max = configs.max,
          precision = configs.precision;

      var step = 1 / Math.pow(10, precision);

      return _react2.default.createElement(_reactNumericInput2.default, {
        ref: 'realNumber',
        onChange: this.onChangeCustom.bind(this),
        onInvalid: this.onInvalidCustom.bind(this),
        onInput: function onInput(evt) {
          return _this2.refs.realNumber.refs.input.style.color = evt.nativeEvent.target.checkValidity() ? STYLE_INPUT.color : 'red';
        },
        step: step,
        precision: precision,
        value: value,
        type: 'number',
        min: min,
        max: max,
        pattern: '^-?([0-9]+)\.?([0-9]+)?',
        style: {
          wrap: { width: '100%' },
          input: _extends({}, STYLE_INPUT, style, {
            border: this.state.focus ? '1px solid #66afe9' : '1px solid rgba(0,0,0,.15)'
          })
        },
        snap: true
      });
    }
  }]);

  return FormNumberInput;
}(_react.Component);

exports.default = FormNumberInput;


FormNumberInput.propTypes = {
  value: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.string]),
  style: _propTypes2.default.object,
  onChange: _propTypes2.default.func,
  onValid: _propTypes2.default.func,
  configs: _propTypes2.default.object
};

FormNumberInput.defaultProps = {
  value: 0,
  style: {},
  onChange: function onChange() {
    return console.log('onValid instead');
  },
  onValid: function onValid() {
    return console.log('onValid not defined');
  },
  onInvalid: function onInvalid() {
    return console.log('onInvalid not defined');
  },
  configs: {
    min: Number.MIN_SAFE_INTEGER,
    max: Number.MAX_SAFE_INTEGER,
    precision: 3
  }
};