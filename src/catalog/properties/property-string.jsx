import React, {PropTypes} from 'react';
import FormLabel from '../../components/style/form-label'
import FormTextInput from '../../components/style/form-text-input';

export default function PropertyString({propertyName, value, onUpdate, configs}) {
  return (
    <div style={{marginBottom: "3px"}}>
      <div style={{display: "inline-block", width: "30%"}}>
        <FormLabel>{propertyName}</FormLabel>
      </div>

      <div style={{display: "inline-block", width: "70%"}}>
        <FormTextInput value={value} onChange={event => onUpdate(event.target.value)}/>
      </div>
    </div>
  );
}

PropertyString.propTypes = {
  propertyName: PropTypes.string.isRequired,
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired
};
