'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PropertyColor;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formLabel = require('../../components/style/form-label');

var _formLabel2 = _interopRequireDefault(_formLabel);

var _formColorInput = require('../../components/style/form-color-input');

var _formColorInput2 = _interopRequireDefault(_formColorInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PropertyColor(_ref) {
  var value = _ref.value,
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
        configs.label
      )
    ),
    _react2.default.createElement(
      'div',
      { style: { display: "inline-block", width: "70%" } },
      _react2.default.createElement(_formColorInput2.default, { value: value, onChange: function onChange(event) {
          return onUpdate(event.target.value);
        } })
    )
  );
}

PropertyColor.propTypes = {
  value: _react.PropTypes.any.isRequired,
  onUpdate: _react.PropTypes.func.isRequired,
  configs: _react.PropTypes.object.isRequired
};