'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PropertyNumber;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _export = require('../../components/style/export');

var _sharedPropertyStyle = require('./shared-property-style');

var _sharedPropertyStyle2 = _interopRequireDefault(_sharedPropertyStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PropertyNumber(_ref) {
  var value = _ref.value,
      onUpdate = _ref.onUpdate,
      onValid = _ref.onValid,
      configs = _ref.configs,
      sourceElement = _ref.sourceElement,
      internalState = _ref.internalState,
      state = _ref.state;


  var update = function update(val) {
    var number = parseFloat(val);

    if (isNaN(number)) {
      number = 0;
    }

    if (configs.hook) {
      return configs.hook(number, sourceElement, internalState, state).then(function (_val) {
        return onUpdate(_val);
      });
    }

    return onUpdate(number);
  };

  return _react2.default.createElement(
    'table',
    { className: 'PropertyNumber', style: _sharedPropertyStyle2.default.tableStyle },
    _react2.default.createElement(
      'tbody',
      null,
      _react2.default.createElement(
        'tr',
        null,
        _react2.default.createElement(
          'td',
          { style: _sharedPropertyStyle2.default.firstTdStyle },
          _react2.default.createElement(
            _export.FormLabel,
            null,
            configs.label
          )
        ),
        _react2.default.createElement(
          'td',
          null,
          _react2.default.createElement(_export.FormNumberInput, {
            value: value,
            onChange: function onChange(event) {
              return update(event.target.value);
            },
            onValid: onValid,
            min: configs.min,
            max: configs.max })
        )
      )
    )
  );
}

PropertyNumber.propTypes = {
  value: _propTypes2.default.any.isRequired,
  onUpdate: _propTypes2.default.func.isRequired,
  onValid: _propTypes2.default.func,
  configs: _propTypes2.default.object.isRequired,
  sourceElement: _propTypes2.default.object,
  internalState: _propTypes2.default.object,
  state: _propTypes2.default.object.isRequired
};