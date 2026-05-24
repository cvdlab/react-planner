import React from 'react';
import { Seq } from 'immutable';
import { FormLabel, FormSelect } from '../../components/style/export';
import PropertyStyle from './shared-property-style';

type Props = {
  value: any;
  onUpdate: (val: any) => any;
  configs: any;
  sourceElement?: any;
  internalState?: any;
  state: any;
};

export default function PropertyEnum({ value, onUpdate, configs, sourceElement, internalState, state }: Props) {

  let update = (val: any) => {

    if (configs.hook) {
      return configs.hook(val, sourceElement, internalState, state).then((_val: any) => {
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
          <FormSelect value={value} onChange={(event: any) => update(event.target.value)}>
            {Seq(configs.values)
              .entrySeq()
              .map(([key, value]: any) => <option key={key} value={key}>{value}</option>)}
          </FormSelect>
        </td>
      </tr>
      </tbody>
    </table>
  );
}

