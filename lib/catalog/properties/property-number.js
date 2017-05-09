'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PropertyNumber;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _formLabel = require('../../components/style/form-label');

var _formLabel2 = _interopRequireDefault(_formLabel);

var _formNumberInput = require('../../components/style/form-number-input');

var _formNumberInput2 = _interopRequireDefault(_formNumberInput);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tableStyle = { width: "100%", borderSpacing: "2px 0", marginBottom: "2px" };
var firstTdStyle = { width: '6em' };

function PropertyNumber(_ref) {
  var value = _ref.value,
      onUpdate = _ref.onUpdate,
      configs = _ref.configs,
      sourceElement = _ref.sourceElement,
      internalState = _ref.internalState;


  var update = function update(value) {
    var number = parseFloat(value);

    if (isNaN(number)) {
      number = 0;
    }
    return onUpdate(number);
  };

  return _react2.default.createElement(
    'table',
    { className: 'PropertyNumber', style: tableStyle },
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
          _react2.default.createElement(_formNumberInput2.default, {
            value: value,
            onChange: function onChange(event) {
              return update(event.target.value);
            },
            min: configs.min,
            max: configs.max })
        )
      )
    )
  );
}

PropertyNumber.propTypes = {
  value: _react.PropTypes.any.isRequired,
  onUpdate: _react.PropTypes.func.isRequired,
  configs: _react.PropTypes.object.isRequired,
  sourceElement: _react.PropTypes.object,
  internalState: _react.PropTypes.object
};