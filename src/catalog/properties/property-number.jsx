import React from 'react';
import PropTypes from 'prop-types';
import FormLabel from '../../components/style/form-label'
import FormNumberInput from '../../components/style/form-number-input';

const tableStyle = {width: "100%", borderSpacing: "2px 0", marginBottom: "2px"};
const firstTdStyle = {width: '6em'};

export default function PropertyNumber({value, onUpdate, onValid, configs, sourceElement, internalState, state}) {

  let update = (val) => {
    let number = parseFloat(val);

    if (isNaN(number)) {
      number = 0;
    }

    if (configs.hook) {
      return configs.hook(number, sourceElement, internalState, state).then(_val => {
        return onUpdate(_val);
      });
    }

    return onUpdate(number);
  };

  return (
    <table className="PropertyNumber" style={tableStyle}>
      <tbody>
      <tr>
        <td style={firstTdStyle}><FormLabel>{configs.label}</FormLabel></td>
        <td>
          <FormNumberInput
            value={value}
            onChange={event => update(event.target.value)}
            onValid={onValid}
            min={configs.min}
            max={configs.max}/>
        </td>
      </tr>
      </tbody>
    </table>
  );

}

PropertyNumber.propTypes = {
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  onValid: PropTypes.func,
  configs: PropTypes.object.isRequired,
  sourceElement: PropTypes.object,
  internalState: PropTypes.object,
  state: PropTypes.object.isRequired
};
