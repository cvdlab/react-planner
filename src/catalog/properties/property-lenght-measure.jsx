import React from 'react';
import PropTypes from 'prop-types';
import {UNITS_LENGTH, UNIT_CENTIMETER} from './../../constants';
import convert from 'convert-units';
import FormLabel from '../../components/style/form-label'
import FormNumberInput from '../../components/style/form-number-input';
import FormSelect from '../../components/style/form-select';
import {Map} from 'immutable';
import {toFixedFloat} from '../../utils/math';

const propertyContainerStyle = {borderSpacing: "2px 0", marginBottom: 2};
const tableStyle = {borderCollapse: 'collapse'};
const firstTdStyle = {width: '6em'};
const secondTdStyle = {padding: 0};
const unitContainerStyle = {width: '5em'};

export default function PropertyLengthMeasure({value, onUpdate, configs, sourceElement, internalState, state}, {catalog}) {

  let length = value.has('length') ? value.get('length') : 0;
  let _length = value.has('_length') ? value.get('_length') : length;
  let _unit = value.has('_unit') ? value.get('_unit') : UNIT_CENTIMETER;

  let update = (lengthInput, unitInput) => {

    let newLength = toFixedFloat(lengthInput);
    let merged = value.merge({
      length: unitInput !== UNIT_CENTIMETER ? convert(newLength).from(unitInput).to(UNIT_CENTIMETER) : newLength,
      _length: lengthInput,
      _unit: unitInput
    });

    if (configs.hook) {
      return configs.hook(merged, sourceElement, internalState, state).then(val => {
        return onUpdate(val);
      });
    }

    return onUpdate(merged);
  };

  return (
    <table className="PropertyLengthMeasure" style={propertyContainerStyle}>
      <tbody>
      <tr>
        <td style={firstTdStyle}>{configs.label}:</td>
        <td style={secondTdStyle}>
          <table style={tableStyle}>
            <tbody>
            <tr>
              <td><FormNumberInput value={_length} onChange={event => update(event.target.value, _unit)}
                                   min={configs.min} max={configs.max}/></td>
              <td style={unitContainerStyle}>
                <FormSelect value={_unit} onChange={event => update(_length, event.target.value)}>
                  {
                    UNITS_LENGTH.map(el => <option key={el} value={el}>{el}</option>)
                  }
                </FormSelect>
              </td>
            </tr>
            </tbody>
          </table>
        </td>
      </tr>
      </tbody>
    </table>
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
