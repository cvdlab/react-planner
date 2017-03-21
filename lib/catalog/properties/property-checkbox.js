'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PropertyCheckbox;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formLabel = require('../../components/style/form-label');

var _formLabel2 = _interopRequireDefault(_formLabel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PropertyCheckbox(_ref) {
  var value = _ref.value,
      onUpdate = _ref.onUpdate,
      configs = _ref.configs;

  value = value === true;

  return _react2.default.createElement(
    'div',
    { className: 'PropertyCheckbox', style: { marginBottom: "3px" } },
    _react2.default.createElement(
      'div',
      { style: { display: "inline-block", width: "30%" } },
      _react2.default.createElement(
        _formLabel2.default,
        null,
        configs.label
      )
    ),
    _react2.default.createElement(
      'div',
      { style: { display: "inline-block", width: "70%" } },
      _react2.default.createElement('input', { type: 'checkbox', checked: value, onChange: function onChange(e) {
          return onUpdate(!value);
        } })
    )
  );
}

PropertyCheckbox.propTypes = {
  value: _react.PropTypes.any.isRequired,
  onUpdate: _react.PropTypes.func.isRequired,
  configs: _react.PropTypes.object.isRequired
};