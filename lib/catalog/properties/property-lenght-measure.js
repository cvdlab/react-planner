'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PropertyLengthMeasure;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('./../../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function PropertyLengthMeasure(_ref) {
  var propertyName = _ref.propertyName,
      value = _ref.value,
      onUpdate = _ref.onUpdate,
      configs = _ref.configs;
  var length = value.length,
      unit = value.unit;


  var updateLength = function updateLength(length) {
    onUpdate(Object.assign({}, value, { length: parseFloat(length) }));
  };

  var updateUnit = function updateUnit(unit) {
    onUpdate(Object.assign({}, value, { unit: unit }));
  };

  return _react2.default.createElement(
    'div',
    { style: { marginBottom: "3px" } },
    _react2.default.createElement(
      'label',
      { style: { width: "30%", display: "inline-block" } },
      propertyName
    ),
    _react2.default.createElement(
      'div',
      { style: { display: "inline-block", width: "70%" } },
      _react2.default.createElement('input', { type: 'number', style: { width: "55%" }, value: length, onChange: function onChange(event) {
          return updateLength(event.target.value);
        },
        min: configs.min, max: configs.max }),
      _react2.default.createElement(
        'select',
        { style: { width: "30%" }, value: unit, onChange: function onChange(event) {
            return updateUnit(event.target.value);
          } },
        _react2.default.createElement(
          'option',
          { key: _constants.UNIT_METER, value: _constants.UNIT_METER },
          _constants.UNIT_METER
        ),
        _react2.default.createElement(
          'option',
          { key: _constants.UNIT_CENTIMETER, value: _constants.UNIT_CENTIMETER },
          _constants.UNIT_CENTIMETER
        ),
        _react2.default.createElement(
          'option',
          { key: _constants.UNIT_MILLIMETER, value: _constants.UNIT_MILLIMETER },
          _constants.UNIT_MILLIMETER
        ),
        _react2.default.createElement(
          'option',
          { key: _constants.UNIT_INCH, value: _constants.UNIT_INCH },
          _constants.UNIT_INCH
        ),
        _react2.default.createElement(
          'option',
          { key: _constants.UNIT_FOOT, value: _constants.UNIT_FOOT },
          _constants.UNIT_FOOT
        ),
        _react2.default.createElement(
          'option',
          { key: _constants.UNIT_MILE, value: _constants.UNIT_MILE },
          _constants.UNIT_MILE
        )
      )
    )
  );
}

PropertyLengthMeasure.propTypes = {
  propertyName: _react.PropTypes.string.isRequired,
  value: _react.PropTypes.any.isRequired,
  onUpdate: _react.PropTypes.func.isRequired,
  configs: _react.PropTypes.object.isRequired
};