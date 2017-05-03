import React, {PropTypes} from 'react';
import FormLabel from '../../components/style/form-label'
import FormTextInput from '../../components/style/form-text-input';

const tableStyle = { width: "100%", borderSpacing: "2px 0", marginBottom: "2px" };
const firstTdStyle = { width: '6em' };

export default function PropertyString({value, onUpdate, configs}) {
  return (
    <table className="PropertyString" style={tableStyle}>
      <tbody>
        <tr>
          <td style={firstTdStyle}><FormLabel>{configs.label}</FormLabel></td>
          <td>
            <FormTextInput
              value={value}
              onChange={event => onUpdate(event.target.value)}/>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

PropertyString.propTypes = {
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired
};
