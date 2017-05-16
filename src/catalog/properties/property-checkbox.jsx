import React, {PropTypes} from 'react';
import FormLabel from '../../components/style/form-label'

const tableStyle = { width: "100%", borderSpacing: "2px 0", marginBottom: "2px" };
const firstTdStyle = { width: '6em' };

export default function PropertyCheckbox({value, onUpdate, configs, sourceElement, internalState}) {

  let update = (val) => {

    if( configs.hook )
    {
      return configs.hook( val ).then( _val => { return onUpdate(_val); } );
    }

    return onUpdate( val );
  };

  return (
    <table className="PropertyCheckbox" style={tableStyle}>
      <tbody>
        <tr>
          <td style={firstTdStyle}><FormLabel>{configs.label}</FormLabel></td>
          <td>
            <input type="checkbox" checked={value} onChange={e => update(!value)}/>
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
  internalState: PropTypes.object
};
