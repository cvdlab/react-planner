'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = PropertyLengthMeasure;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _constants = require('./../../constants');

var _convertUnits = require('convert-units');

var _convertUnits2 = _interopRequireDefault(_convertUnits);

var _formLabel = require('../../components/style/form-label');

var _formLabel2 = _interopRequireDefault(_formLabel);

var _formNumberInput = require('../../components/style/form-number-input');

var _formNumberInput2 = _interopRequireDefault(_formNumberInput);

var _formSelect = require('../../components/style/form-select');

var _formSelect2 = _interopRequireDefault(_formSelect);

var _immutable = require('immutable');

var _math = require('../../utils/math');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var propertyContainerStyle = { borderSpacing: "2px 0", marginBottom: 2 };
var tableStyle = { borderCollapse: 'collapse' };
var firstTdStyle = { width: '6em' };
var secondTdStyle = { padding: 0 };
var unitContainerStyle = { width: '5em' };

function PropertyLengthMeasure(_ref, _ref2) {
  var value = _ref.value,
      onUpdate = _ref.onUpdate,
      configs = _ref.configs,
      sourceElement = _ref.sourceElement,
      internalState = _ref.internalState;
  var catalog = _ref2.catalog;


  var _length = value.has('_length') ? value.get('_length') : value.get('length');
  var _unit = value.has('_unit') ? value.get('_unit') : _constants.UNIT_CENTIMETER;

  var update = function update(lengthInput, unitInput) {

    var newLength = (0, _math.toFixedFloat)(lengthInput);

    onUpdate(value.merge({
      length: unitInput !== _constants.UNIT_CENTIMETER ? (0, _convertUnits2.default)(newLength).from(unitInput).to(_constants.UNIT_CENTIMETER) : newLength,
      _length: lengthInput,
      _unit: unitInput
    }));
  };

  return _react2.default.createElement(
    'table',
    { className: 'PropertyLengthMeasure', style: propertyContainerStyle },
    _react2.default.createElement(
      'tbody',
      null,
      _react2.default.createElement(
        'tr',
        null,
        _react2.default.createElement(
          'td',
          { style: firstTdStyle },
          configs.label,
          ':'
        ),
        _react2.default.createElement(
          'td',
          { style: secondTdStyle },
          _react2.default.createElement(
            'table',
            { style: tableStyle },
            _react2.default.createElement(
              'tbody',
              null,
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(_formNumberInput2.default, { value: _length, onChange: function onChange(event) {
                      return update(event.target.value, _unit);
                    }, min: configs.min, max: configs.max })
                ),
                _react2.default.createElement(
                  'td',
                  { style: unitContainerStyle },
                  _react2.default.createElement(
                    _formSelect2.default,
                    { value: _unit, onChange: function onChange(event) {
                        return update(_length, event.target.value);
                      } },
                    _constants.UNITS_LENGTH.map(function (el) {
                      return _react2.default.createElement(
                        'option',
                        { key: el, value: el },
                        el
                      );
                    })
                  )
                )
              )
            )
          )
        )
      )
    )
  );
}

PropertyLengthMeasure.propTypes = {
  value: _react.PropTypes.instanceOf(_immutable.Map).isRequired,
  onUpdate: _react.PropTypes.func.isRequired,
  configs: _react.PropTypes.object.isRequired,
  sourceElement: _react.PropTypes.object,
  internalState: _react.PropTypes.object
};

PropertyLengthMeasure.contextTypes = {
  catalog: _react.PropTypes.object.isRequired
};