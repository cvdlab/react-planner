import React, {PropTypes} from 'react';
import {Seq} from 'immutable';
import FormSelect from '../../components/style/form-select';
import FormLabel from '../../components/style/form-label'

export default function PropertyEnum({value, onUpdate, configs}) {

  return (
    <div style={{marginBottom: "3px"}}>
      <div style={{display: "inline-block", width: "30%"}}>
        <FormLabel>{configs.label}</FormLabel>
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
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired,
};
