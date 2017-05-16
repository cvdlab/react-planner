import React, {PropTypes} from 'react';
import FormLabel from '../../components/style/form-label'
import FormColorInput from '../../components/style/form-color-input';

const tableStyle = { width: "100%", borderSpacing: "2px 0", marginBottom: "2px" };
const firstTdStyle = { width: '6em' };

export default function PropertyColor({value, onUpdate, configs, sourceElement, internalState}) {

  let update = (val) => {

    if( configs.hook )
    {
      return configs.hook( val ).then( _val => { return onUpdate(_val); } );
    }

    return onUpdate( val );
  };

  return (
    <table className="PropertyColor" style={tableStyle}>
      <tbody>
        <tr>
          <td style={firstTdStyle}>
            <FormLabel>{configs.label}</FormLabel>
          </td>
          <td>
            <FormColorInput value={value} onChange={event => update(event.target.value)}/>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

PropertyColor.propTypes = {
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired,
  sourceElement: PropTypes.object,
  internalState: PropTypes.object
};
