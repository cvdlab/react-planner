import React, {PropTypes} from 'react';
import {UNIT_CENTIMETER, UNIT_FOOT, UNIT_INCH, UNIT_METER, UNIT_MILE, UNIT_MILLIMETER} from './../../constants';

export default function PropertyLengthMeasure({propertyName, value, onUpdate, configs}) {

  let {length, unit} = value;

  let updateLength = (length) => {
    onUpdate(Object.assign({}, {length: parseFloat(length)}));
  };

  let updateUnit = (unit) => {
    onUpdate(Object.assign({}, {unit}));
  };

  return (
    <div style={{marginBottom: "3px"}}>
      <label style={{width: "30%", display: "inline-block"}}>{propertyName}</label>
      <div style={{display: "inline-block", width: "70%"}}>

        <input type="number" style={{width: "65%"}} value={length}
               onChange={event => updateLength(event.target.value)}
               min={configs.min} max={configs.max}/>

        <select type="text" style={{width: "25%"}} value={value} onChange={event => updateUnit(event.target.value)}>
          <option key={UNIT_METER} value={UNIT_METER}>{UNIT_METER}</option>
          <option key={UNIT_CENTIMETER} value={UNIT_CENTIMETER}>{UNIT_CENTIMETER}</option>
          <option key={UNIT_MILLIMETER} value={UNIT_MILLIMETER}>{UNIT_MILLIMETER}</option>
          <option key={UNIT_INCH} value={UNIT_INCH}>{UNIT_INCH}</option>
          <option key={UNIT_FOOT} value={UNIT_FOOT}>{UNIT_FOOT}</option>
          <option key={UNIT_MILE} value={UNIT_MILE}>{UNIT_MILE}</option>
        </select>
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
