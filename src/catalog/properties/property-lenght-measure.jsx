import React, {PropTypes} from 'react';
import {UNIT_CENTIMETER, UNIT_FOOT, UNIT_INCH, UNIT_METER, UNIT_MILE, UNIT_MILLIMETER} from './../../constants';
import convert from 'convert-units';
import FormLabel from '../../components/style/form-label'
import FormNumberInput from '../../components/style/form-number-input'
import FormSelect from '../../components/style/form-select'


export default function PropertyLengthMeasure({propertyName, value, onUpdate, configs}) {
  let {_length, _unit, length} = value;

  _unit = _unit || UNIT_CENTIMETER;
  _length = _length || length || 0;

  let updateLength = (lengthInput) => {
    let _length = parseFloat(lengthInput);
    let length = convert(_length).from(_unit).to(UNIT_CENTIMETER); //TODO change UNIT_CENTIMETER with scene.unit
    onUpdate(Object.assign({}, value, {length, _length}));
  };

  let updateUnit = (unitInput) => {
    onUpdate(Object.assign({}, value, {_unit: unitInput}));
  };

  return (
    <div style={{marginBottom: "3px"}}>
      <div style={{display: "inline-block", width: "30%"}}>
        <FormLabel>{propertyName}</FormLabel>
      </div>
      <div style={{display: "inline-block", width: "45%", marginRight: "5%"}}>

        <FormNumberInput value={_length} onChange={event => updateLength(event.target.value)}
                         min={configs.min} max={configs.max}/>
      </div>


      <div style={{display: "inline-block", width: "20%"}}>
        <FormSelect value={_unit} onChange={event => updateUnit(event.target.value)}>
          <option key={UNIT_METER} value={UNIT_METER}>{UNIT_METER}</option>
          <option key={UNIT_CENTIMETER} value={UNIT_CENTIMETER}>{UNIT_CENTIMETER}</option>
          <option key={UNIT_MILLIMETER} value={UNIT_MILLIMETER}>{UNIT_MILLIMETER}</option>
          <option key={UNIT_INCH} value={UNIT_INCH}>{UNIT_INCH}</option>
          <option key={UNIT_FOOT} value={UNIT_FOOT}>{UNIT_FOOT}</option>
          <option key={UNIT_MILE} value={UNIT_MILE}>{UNIT_MILE}</option>
        </FormSelect>
      </div>

    </div>
  );

}

PropertyLengthMeasure.propTypes = {
  propertyName: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired
};
