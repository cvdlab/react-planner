import React from 'react';
import PropTypes from 'prop-types';
import FormLabel from '../../components/style/form-label'
import Button from '../../components/style/button';

const tableStyle = { width: "100%", borderSpacing: "2px 0", marginBottom: "2px" };
const firstTdStyle = { width: '6em' };

export default function PropertyToggle({value, onUpdate, configs, sourceElement, internalState}) {

  let update = (val) => {

    if( configs.hook )
    {
      return configs.hook( val ).then( _val => { return onUpdate(_val); } );
    }

    return onUpdate( val );
  };

  return (
    <table className="PropertyToggle" style={tableStyle}>
      <tbody>
        <tr>
          <td style={firstTdStyle}><FormLabel>{configs.label}</FormLabel></td>
          <td>
            <Button onClick={e => update(!value)} size="small">{configs.actionName}</Button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

PropertyToggle.propTypes = {
  value: PropTypes.any.isRequired,
  onUpdate: PropTypes.func.isRequired,
  configs: PropTypes.object.isRequired,
  sourceElement: PropTypes.object,
  internalState: PropTypes.object
};
