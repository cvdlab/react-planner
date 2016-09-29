import React, {PropTypes} from 'react';
import {Seq} from 'immutable';

export default function PropertyEnum({propertyName, value, onUpdate, configs}) {

  return (
    <div style={{marginBottom: "3px"}}>
      <label style={{width: "30%", display: "inline-block"}}>{propertyName}</label>
      <div style={{display: "inline-block", width: "70%"}}>
        <select type="text" style={{width: "100%"}} value={value} onChange={event => onUpdate(event.target.value)}>
          {Seq(configs.values)
            .entrySeq()
            .map(([key, value]) => <option key={key} value={key}>{value}</option>)}
        </select>
      </div>
    </div>
  );

}

PropertyEnum.propTypes = {
  propertyName: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired,
};
