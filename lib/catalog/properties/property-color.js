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

var firstTdStyle = {
  width: '6em'
};

function PropertyColor(_ref) {
  var value = _ref.value,
      onUpdate = _ref.onUpdate,
      configs = _ref.configs;

  return _react2.default.createElement(
    'table',
    { className: 'PropertyColor', style: { width: "100%", borderSpacing: "2px 0", marginBottom: "2px" } },
    _react2.default.createElement(
      'tbody',
      null,
      _react2.default.createElement(
        'tr',
        null,
        _react2.default.createElement(
          'td',
          { style: firstTdStyle },
          _react2.default.createElement(
            _formLabel2.default,
            null,
            configs.label
          )
        ),
        _react2.default.createElement(
          'td',
          null,
          _react2.default.createElement(_formColorInput2.default, { value: value, onChange: function onChange(event) {
              return onUpdate(event.target.value);
            } })
        )
      )
    )
  );
}

PropertyColor.propTypes = {
  value: _react.PropTypes.any.isRequired,
  onUpdate: _react.PropTypes.func.isRequired,
  configs: _react.PropTypes.object.isRequired
};