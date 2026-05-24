import React from 'react';
import { FormLabel, FormColorInput } from '../../components/style/export';
import PropertyStyle from './shared-property-style';

type Props = {
  value: any;
  onUpdate: (val: any) => any;
  configs: any;
  sourceElement?: any;
  internalState?: any;
  state: any;
};

export default function PropertyColor({ value, onUpdate, configs, sourceElement, internalState, state }: Props) {

  let update = (val: any) => {

    if (configs.hook) {
      return configs.hook(val, sourceElement, internalState, state).then((_val: any) => {
        return onUpdate(_val);
      });
    }

    return onUpdate(val);
  };

  return (
    <table className="PropertyColor" style={PropertyStyle.tableStyle}>
      <tbody>
      <tr>
        <td style={PropertyStyle.firstTdStyle}>
          <FormLabel>{configs.label}</FormLabel>
        </td>
        <td>
          <FormColorInput value={value} onChange={(event: any) => update(event.target.value)}/>
        </td>
      </tr>
      </tbody>
    </table>
  );
}

