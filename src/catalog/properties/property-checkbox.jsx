import React, {PropTypes} from 'react';
import FormLabel from '../../components/style/form-label'

export default function PropertyCheckbox({value, onUpdate, configs}) {
  value = value === true;

  return (
    <div className="PropertyCheckbox" style={{marginBottom: "3px"}}>
      <div style={{display: "inline-block", width: "30%"}}>
        <FormLabel>{configs.label}</FormLabel>
      </div>

      <div style={{display: "inline-block", width: "70%"}}>
        <input type="checkbox" checked={value} onChange={e => onUpdate(!value)}/>
      </div>
    </div>
  );
}

PropertyCheckbox.propTypes = {
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired
};
