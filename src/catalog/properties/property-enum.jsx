import React, {PropTypes} from 'react';
import {Seq} from 'immutable';
import FormSelect from '../../components/style/form-select';
import FormLabel from '../../components/style/form-label';

const tableStyle = { width: "100%", borderSpacing: "2px 0", marginBottom: "2px" };
const firstTdStyle = { width: '6em' };

export default function PropertyEnum({value, onUpdate, configs, sourceElement, internalState}) {

  let update = (val) => {

    if( configs.hook )
    {
      return configs.hook( val ).then( _val => { return onUpdate(_val); } );
    }

    return onUpdate( val );
  };

  return (
    <table className="PropertyEnum" style={tableStyle}>
      <tbody>
        <tr>
          <td style={firstTdStyle}><FormLabel>{configs.label}</FormLabel></td>
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
  internalState: PropTypes.object
};
