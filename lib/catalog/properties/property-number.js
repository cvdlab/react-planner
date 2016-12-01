'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PropertyString;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formLabel = require('../../components/style/form-label');

var _formLabel2 = _interopRequireDefault(_formLabel);

var _formNumberInput = require('../../components/style/form-number-input');

var _formNumberInput2 = _interopRequireDefault(_formNumberInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PropertyString(_ref) {
  var propertyName = _ref.propertyName,
      value = _ref.value,
      onUpdate = _ref.onUpdate,
      configs = _ref.configs;

  return _react2.default.createElement(
    'div',
    { style: { marginBottom: "3px" } },
    _react2.default.createElement(
      'div',
      { style: { display: "inline-block", width: "30%" } },
      _react2.default.createElement(
        _formLabel2.default,
        null,
        propertyName
      )
    ),
    _react2.default.createElement(
      'div',
      { style: { display: "inline-block", width: "70%" } },
      _react2.default.createElement(_formNumberInput2.default, { value: value, onChange: function onChange(event) {
          return onUpdate(parseFloat(event.target.value));
        },
        min: configs.min, max: configs.max })
    )
  );
}

PropertyString.propTypes = {
  propertyName: _react.PropTypes.string.isRequired,
  value: _react.PropTypes.any.isRequired,
  onUpdate: _react.PropTypes.func.isRequired,
  configs: _react.PropTypes.object.isRequired
};