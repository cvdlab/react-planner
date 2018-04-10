'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = PropertyLengthMeasure;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _constants = require('./../../constants');

var _convertUnits = require('convert-units');

var _convertUnits2 = _interopRequireDefault(_convertUnits);

var _export = require('../../components/style/export');

var _immutable = require('immutable');

var _math = require('../../utils/math');

var _sharedPropertyStyle = require('./shared-property-style');

var _sharedPropertyStyle2 = _interopRequireDefault(_sharedPropertyStyle);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var internalTableStyle = { borderCollapse: 'collapse' };
var secondTdStyle = { padding: 0 };
var unitContainerStyle = { width: '5em' };

function PropertyLengthMeasure(_ref, _ref2) {
  var value = _ref.value,
      onUpdate = _ref.onUpdate,
      onValid = _ref.onValid,
      configs = _ref.configs,
      sourceElement = _ref.sourceElement,
      internalState = _ref.internalState,
      state = _ref.state;
  var catalog = _ref2.catalog;


  var length = value.get('length') || 0;
  var _length = value.get('_length') || length;
  var _unit = value.get('_unit') || _constants.UNIT_CENTIMETER;

  var hook = configs.hook,
      label = configs.label,
      configRest = _objectWithoutProperties(configs, ['hook', 'label']);

  var update = function update(lengthInput, unitInput) {

    var newLength = (0, _math.toFixedFloat)(lengthInput);
    var merged = value.merge({
      length: unitInput !== _constants.UNIT_CENTIMETER ? (0, _convertUnits2.default)(newLength).from(unitInput).to(_constants.UNIT_CENTIMETER) : newLength,
      _length: lengthInput,
      _unit: unitInput
    });

    if (hook) {
      return hook(merged, sourceElement, internalState, state).then(function (val) {
        return onUpdate(val);
      });
    }

    return onUpdate(merged);
  };

  return _react2.default.createElement(
    'table',
    { className: 'PropertyLengthMeasure', style: _sharedPropertyStyle2.default.tableStyle },
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
            label
          )
        ),
        _react2.default.createElement(
          'td',
          { style: secondTdStyle },
          _react2.default.createElement(
            'table',
            { style: internalTableStyle },
            _react2.default.createElement(
              'tbody',
              null,
              _react2.default.createElement(
                'tr',
                null,
                _react2.default.createElement(
                  'td',
                  null,
                  _react2.default.createElement(_export.FormNumberInput, _extends({
                    value: _length,
                    onChange: function onChange(event) {
                      return update(event.target.value, _unit);
                    },
                    onValid: onValid
                  }, configRest))
                ),
                _react2.default.createElement(
                  'td',
                  { style: unitContainerStyle },
                  _react2.default.createElement(
                    _export.FormSelect,
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
  value: _propTypes2.default.instanceOf(_immutable.Map).isRequired,
  onUpdate: _propTypes2.default.func.isRequired,
  onValid: _propTypes2.default.func,
  configs: _propTypes2.default.object.isRequired,
  sourceElement: _propTypes2.default.object,
  internalState: _propTypes2.default.object,
  state: _propTypes2.default.object.isRequired
};

PropertyLengthMeasure.contextTypes = {
  catalog: _propTypes2.default.object.isRequired
};