import React from 'react';
import PropTypes from 'prop-types';
import { FormLabel } from '../../components/style/export';
import PropertyStyle from './shared-property-style';

const checkboxStyle = {margin: 0};

export default function PropertyCheckbox({value, onUpdate, configs, sourceElement, internalState, state}) {

  let update = (val) => {

    if (configs.hook) {
      return configs.hook(val, sourceElement, internalState, state).then(_val => {
        return onUpdate(_val);
      });
    }

    return onUpdate(val);
  };

  return (
    <table className="PropertyCheckbox" style={PropertyStyle.tableStyle}>
      <tbody>
      <tr>
        <td style={PropertyStyle.firstTdStyle}><FormLabel>{configs.label}</FormLabel></td>
        <td>
          <input style={checkboxStyle} type="checkbox" checked={value} onChange={e => update(!value)}/>
        </td>
      </tr>
      </tbody>
    </table>
  );
}

PropertyCheckbox.propTypes = {
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired,
  sourceElement: PropTypes.object,
  internalState: PropTypes.object,
  state: PropTypes.object.isRequired
};
