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

var math = _interopRequireWildcard(_math);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tableStyle = {
  borderCollapse: 'collapse'
};
var firstTdStyle = {
  width: '6em'
};

function PropertyLengthMeasure(_ref, _ref2) {
  var value = _ref.value,
      onUpdate = _ref.onUpdate,
      configs = _ref.configs;
  var catalog = _ref2.catalog;


  var length = value.get('length');
  var _length = void 0,
      _unit = void 0;

  if (value.has('_length') && value.has('_unit')) {
    _length = value.get('_length');
    _unit = value.get('_unit');
  } else {
    _length = length;
    _unit = catalog.unit;
  }

  var update = function update(lengthInput, unitInput) {

    var newLength = math.toFixedFloat(lengthInput);
    var length = (0, _convertUnits2.default)(newLength).from(unitInput).to(catalog.unit);

    onUpdate(value.merge({ length: length, _length: lengthInput, _unit: unitInput }));
  };

  return _react2.default.createElement(
    'table',
    { className: 'PropertyLengthMeasure', style: { borderSpacing: "2px 0", marginBottom: "2px" } },
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
          { style: { padding: 0 } },
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
                  { style: { width: '5em' } },
                  _react2.default.createElement(
                    _formSelect2.default,
                    { value: _unit, onChange: function onChange(event) {
                        return update(_length, event.target.value);
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
  configs: _react.PropTypes.object.isRequired
};

PropertyLengthMeasure.contextTypes = {
  catalog: _react.PropTypes.object.isRequired
};