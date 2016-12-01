import React, {PropTypes} from 'react';
import {Seq} from 'immutable';
import FormSelect from '../../components/style/form-select';
import FormLabel from '../../components/style/form-label'

export default function PropertyEnum({propertyName, value, onUpdate, configs}) {

  return (
    <div style={{marginBottom: "3px"}}>
      <div style={{display: "inline-block", width: "30%"}}>
        <FormLabel>{propertyName}</FormLabel>
      </div>
      <div style={{display: "inline-block", width: "70%"}}>
        <FormSelect value={value} onChange={event => onUpdate(event.target.value)}>
          {Seq(configs.values)
            .entrySeq()
            .map(([key, value]) => <option key={key} value={key}>{value}</option>)}
        </FormSelect>
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
