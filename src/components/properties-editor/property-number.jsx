import React, {PropTypes} from 'react';

export default function PropertyString({propertyName, value, onChange, configs}) {
  return <div style={{marginBottom: "3px"}}>

    <label style={{width: "30%", display: "inline-block"}}>{propertyName}</label>

    <div style={{display: "inline-block", width: "70%"}}>
      <input type="number" style={{width: "100%"}} value={value} onChange={onChange} min={configs.min} max={configs.max}/>
    </div>

  </div>
}

PropertyString.propTypes = {
  propertyName: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  configs: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};
