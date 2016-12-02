import React, {PropTypes} from 'react';
import FormLabel from '../../components/style/form-label'
import FormColorInput from '../../components/style/form-color-input';

export default function PropertyColor({value, onUpdate, configs}) {
  return (
    <div style={{marginBottom: "3px"}}>
      <div style={{display: "inline-block", width: "30%"}}>
        <FormLabel>{configs.label}</FormLabel>
      </div>
      <div style={{display: "inline-block", width: "70%"}}>
        <FormColorInput value={value} onChange={event => onUpdate(event.target.value)}/>
      </div>
    </div>
  );
}

PropertyColor.propTypes = {
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired,
};
