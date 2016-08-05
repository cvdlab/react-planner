import React, {PropTypes} from 'react';

export default function PropertyString({propertyName, value, onChange}) {
  return <div style={{marginBottom: "3px"}}>

    <label style={{width: "30%", display: "inline-block"}}>{propertyName}</label>

    <div style={{display: "inline-block", width: "70%"}}>
      <input type="text" style={{width: "100%"}} value={value} onChange={onChange}/>
    </div>

  </div>
}

PropertyString.propTypes = {
  propertyName: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onChange: PropTypes.func.isRequired
};
