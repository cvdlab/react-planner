import React, {PropTypes} from 'react';
import FormLabel from '../../components/style/form-label'

export default function PropertyReadOnly({value, onUpdate, configs}) {
  return (
    <div className="PropertyReadOnly" style={{marginBottom: "3px"}}>
      <div style={{display: "inline-block", width: "30%"}}>
        <FormLabel>{configs.label}</FormLabel>
      </div>

      <div style={{display: "inline-block", width: "70%"}}>
        {value}
      </div>
    </div>
  );
}

PropertyReadOnly.propTypes = {
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired
};
