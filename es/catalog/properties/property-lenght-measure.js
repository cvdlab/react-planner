import React, { PropTypes } from 'react';
import { UNIT_CENTIMETER, UNIT_FOOT, UNIT_INCH, UNIT_METER, UNIT_MILE, UNIT_MILLIMETER } from './../../constants';
import convert from 'convert-units';
import FormLabel from '../../components/style/form-label';
import FormNumberInput from '../../components/style/form-number-input';
import FormSelect from '../../components/style/form-select';

export default function PropertyLengthMeasure(_ref, _ref2) {
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
    var _length = parseFloat(lengthInput);

    if (isNaN(_length)) {
      _length = 0;
    }

    var length = convert(_length).from(unitInput).to(catalog.unit);
    onUpdate(value.merge({ length: length, _length: _length, _unit: unitInput }));
  };

  return React.createElement(
    'div',
    { style: { marginBottom: "3px" } },
    React.createElement(
      'div',
      { style: { display: "inline-block", width: "30%" } },
      React.createElement(
        FormLabel,
        null,
        configs.label
      )
    ),
    React.createElement(
      'div',
      { style: { display: "inline-block", width: "45%", marginRight: "5%" } },
      React.createElement(FormNumberInput, { value: _length, onChange: function onChange(event) {
          return update(event.target.value, _unit);
        },
        min: configs.min, max: configs.max })
    ),
    React.createElement(
      'div',
      { style: { display: "inline-block", width: "20%" } },
      React.createElement(
        FormSelect,
        { value: _unit, onChange: function onChange(event) {
            return update(_length, event.target.value);
          } },
        React.createElement(
          'option',
          { key: UNIT_METER, value: UNIT_METER },
          UNIT_METER
        ),
        React.createElement(
          'option',
          { key: UNIT_CENTIMETER, value: UNIT_CENTIMETER },
          UNIT_CENTIMETER
        ),
        React.createElement(
          'option',
          { key: UNIT_MILLIMETER, value: UNIT_MILLIMETER },
          UNIT_MILLIMETER
        ),
        React.createElement(
          'option',
          { key: UNIT_INCH, value: UNIT_INCH },
          UNIT_INCH
        ),
        React.createElement(
          'option',
          { key: UNIT_FOOT, value: UNIT_FOOT },
          UNIT_FOOT
        ),
        React.createElement(
          'option',
          { key: UNIT_MILE, value: UNIT_MILE },
          UNIT_MILE
        )
      )
    )
  );
}

PropertyLengthMeasure.propTypes = {
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired
};

PropertyLengthMeasure.contextTypes = {
  catalog: PropTypes.object.isRequired
};