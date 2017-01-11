import React, {PropTypes} from 'react';
import FormLabel from '../../components/style/form-label'
import Button from '../../components/style/button';

export default function PropertyToggle({value, onUpdate, configs}) {
  value = value === true;

  return (
    <div style={{marginBottom: "3px"}}>
      <div style={{display: "inline-block", width: "30%"}}>
        <FormLabel>{configs.label}</FormLabel>
      </div>

      <div style={{display: "inline-block", width: "70%"}}>
        <Button onClick={e => onUpdate(!value)} size="small">{configs.actionName}</Button>
      </div>
    </div>
  );
}

PropertyToggle.propTypes = {
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired
};
