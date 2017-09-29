import React from 'react';
import PropTypes from 'prop-types';
import { UNITS_LENGTH, UNIT_CENTIMETER } from './../../constants';
import convert from 'convert-units';
import FormLabel from '../../components/style/form-label';
import FormNumberInput from '../../components/style/form-number-input';
import FormSelect from '../../components/style/form-select';
import { Map } from 'immutable';
import { toFixedFloat } from '../../utils/math';

var propertyContainerStyle = { borderSpacing: "2px 0", marginBottom: 2 };
var tableStyle = { borderCollapse: 'collapse' };
var firstTdStyle = { width: '6em' };
var secondTdStyle = { padding: 0 };
var unitContainerStyle = { width: '5em' };

export default function PropertyLengthMeasure(_ref, _ref2) {
  var value = _ref.value,
      onUpdate = _ref.onUpdate,
      configs = _ref.configs,
      sourceElement = _ref.sourceElement,
      internalState = _ref.internalState,
      state = _ref.state;
  var catalog = _ref2.catalog;


  var length = value.has('length') ? value.get('length') : 0;
  var _length = value.has('_length') ? value.get('_length') : length;
  var _unit = value.has('_unit') ? value.get('_unit') : UNIT_CENTIMETER;

  var update = function update(lengthInput, unitInput) {

    var newLength = toFixedFloat(lengthInput);
    var merged = value.merge({
      length: unitInput !== UNIT_CENTIMETER ? convert(newLength).from(unitInput).to(UNIT_CENTIMETER) : newLength,
      _length: lengthInput,
      _unit: unitInput
    });

    if (configs.hook) {
      return configs.hook(merged, sourceElement, internalState, state).then(function (val) {
        return onUpdate(val);
      });
    }

    return onUpdate(merged);
  };

  return React.createElement(
    'table',
    { className: 'PropertyLengthMeasure', style: propertyContainerStyle },
    React.createElement(
      'tbody',
      null,
      React.createElement(
        'tr',
        null,
        React.createElement(
          'td',
          { style: firstTdStyle },
          React.createElement(
            FormLabel,
            null,
            configs.label
          )
        ),
        React.createElement(
          'td',
          { style: secondTdStyle },
          React.createElement(
            'table',
            { style: tableStyle },
            React.createElement(
              'tbody',
              null,
              React.createElement(
                'tr',
                null,
                React.createElement(
                  'td',
                  null,
                  React.createElement(FormNumberInput, {
                    value: _length,
                    onChange: function onChange(event) {
                      return update(event.target.value, _unit);
                    },
                    min: configs.min, max: configs.max
                  })
                ),
                React.createElement(
                  'td',
                  { style: unitContainerStyle },
                  React.createElement(
                    FormSelect,
                    { value: _unit, onChange: function onChange(event) {
                        return update(_length, event.target.value);
                      } },
                    UNITS_LENGTH.map(function (el) {
                      return React.createElement(
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
  value: PropTypes.instanceOf(Map).isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired,
  sourceElement: PropTypes.object,
  internalState: PropTypes.object,
  state: PropTypes.object.isRequired
};

PropertyLengthMeasure.contextTypes = {
  catalog: PropTypes.object.isRequired
};