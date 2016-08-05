import React, {PropTypes} from 'react';

export default function PropertyColor({propertyName, value, onChange}) {
  return <div style={{marginBottom: "3px"}}>

    <label style={{width: "30%", display: "inline-block"}}>{propertyName}</label>

    <div style={{display: "inline-block", width: "70%"}}>
      <input type="color"value={value} onChange={onChange}/>
    </div>

  </div>
}

PropertyColor.propTypes = {
  propertyName: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired
};
