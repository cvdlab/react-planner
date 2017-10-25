import React from 'react';
import PropTypes from 'prop-types';
import { FormLabel } from '../../components/style/export';
import PropertyStyle from './shared-property-style';

export default function PropertyReadOnly({value, onUpdate, configs, sourceElement, internalState, state}) {
  return (
    <table className="PropertyReadOnly" style={PropertyStyle.tableStyle}>
      <tbody>
      <tr>
        <td style={PropertyStyle.firstTdStyle}><FormLabel>{configs.label}</FormLabel></td>
        <td>
          <div>{value}</div>
        </td>
      </tr>
      </tbody>
    </table>
  );
}

PropertyReadOnly.propTypes = {
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired,
  sourceElement: PropTypes.object,
  internalState: PropTypes.object,
  state: PropTypes.object.isRequired
};
