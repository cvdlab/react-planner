import React from 'react';
import PropTypes from 'prop-types';
import {Seq} from 'immutable';
import { FormLabel, FormSelect } from '../../components/style/export';
import PropertyStyle from './shared-property-style';

export default function PropertyEnum({value, onUpdate, configs, sourceElement, internalState, state}) {

  let update = (val) => {

    if (configs.hook) {
      return configs.hook(val, sourceElement, internalState, state).then(_val => {
        return onUpdate(_val);
      });
    }

    return onUpdate(val);
  };

  return (
    <table className="PropertyEnum" style={PropertyStyle.tableStyle}>
      <tbody>
      <tr>
        <td style={PropertyStyle.firstTdStyle}><FormLabel>{configs.label}</FormLabel></td>
        <td>
          <FormSelect value={value} onChange={event => update(event.target.value)}>
            {Seq(configs.values)
              .entrySeq()
              .map(([key, value]) => <option key={key} value={key}>{value}</option>)}
          </FormSelect>
        </td>
      </tr>
      </tbody>
    </table>
  );
}

PropertyEnum.propTypes = {
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired,
  sourceElement: PropTypes.object,
  internalState: PropTypes.object,
  state: PropTypes.object.isRequired
};
