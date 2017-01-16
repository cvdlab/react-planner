import React, {PropTypes} from 'react';
import FormLabel from '../../components/style/form-label'
import FormNumberInput from '../../components/style/form-number-input';

export default function PropertyNumber({value, onUpdate, configs}) {

  let update = (value) => {
    let number = parseFloat(value);

    if (isNaN(number)) {
      number = 0;
    }
    return onUpdate(number);
  };

  return (
    <div style={{marginBottom: "3px"}}>
      <div style={{display: "inline-block", width: "30%"}}>
        <FormLabel>{configs.label}</FormLabel>
      </div>

      <div style={{display: "inline-block", width: "70%"}}>
        <FormNumberInput value={value} onChange={event => update(event.target.value)}
                         min={configs.min} max={configs.max}/>
      </div>

    </div>
  );

}

PropertyNumber.propTypes = {
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired
};
