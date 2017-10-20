function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

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
      onValid = _ref.onValid,
      configs = _ref.configs,
      sourceElement = _ref.sourceElement,
      internalState = _ref.internalState,
      state = _ref.state;
  var catalog = _ref2.catalog;


  var length = value.get('length') || 0;
  var _length = value.get('_length') || length;
  var _unit = value.get('_unit') || UNIT_CENTIMETER;

  var hook = configs.hook,
      label = configs.label,
      configRest = _objectWithoutProperties(configs, ['hook', 'label']);

  var update = function update(lengthInput, unitInput) {

    var newLength = toFixedFloat(lengthInput);
    var merged = value.merge({
      length: unitInput !== UNIT_CENTIMETER ? convert(newLength).from(unitInput).to(UNIT_CENTIMETER) : newLength,
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
            label
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
                    onValid: onValid,
                    configs: configs
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
  onValid: PropTypes.func,
  configs: PropTypes.object.isRequired,
  sourceElement: PropTypes.object,
  internalState: PropTypes.object,
  state: PropTypes.object.isRequired
};

PropertyLengthMeasure.contextTypes = {
  catalog: PropTypes.object.isRequired
};