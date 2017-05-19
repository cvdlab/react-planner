import React from 'react';
import PropTypes from 'prop-types';
import FormLabel from '../../components/style/form-label'

const tableStyle = {width: "100%", borderSpacing: "2px 0", marginBottom: "2px"};
const firstTdStyle = {width: '6em'};

export default function PropertyReadOnly({value, onUpdate, configs, sourceElement, internalState, state}) {
  return (
    <table className="PropertyReadOnly" style={tableStyle}>
      <tbody>
      <tr>
        <td style={firstTdStyle}><FormLabel>{configs.label}</FormLabel></td>
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
