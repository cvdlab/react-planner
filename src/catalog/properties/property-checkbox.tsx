import React from 'react';
import { FormLabel } from '../../components/style/export';
import PropertyStyle from './shared-property-style';

const checkboxStyle = { margin: 0 };

type Props = {
  value: any;
  onUpdate: (val: any) => any;
  configs: any;
  sourceElement?: any;
  internalState?: any;
  state: any;
};

export default function PropertyCheckbox({ value, onUpdate, configs, sourceElement, internalState, state }: Props) {

  let update = (val: any) => {

    if (configs.hook) {
      return configs.hook(val, sourceElement, internalState, state).then((_val: any) => {
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

