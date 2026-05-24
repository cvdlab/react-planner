import React from 'react';
import { FormLabel, FormNumberInput } from '../../components/style/export';
import PropertyStyle from './shared-property-style';

type Props = {
  value: any;
  onUpdate: (val: any) => any;
  onValid?: (val: any) => any;
  configs: any;
  sourceElement?: any;
  internalState?: any;
  state: any;
};

export default function PropertyNumber({ value, onUpdate, onValid, configs, sourceElement, internalState, state }: Props) {

  let update = (val: any) => {
    let number = parseFloat(val);

    if (isNaN(number)) {
      number = 0;
    }

    if (configs.hook) {
      return configs.hook(number, sourceElement, internalState, state).then((_val: any) => {
        return onUpdate(_val);
      });
    }

    return onUpdate(number);
  };

  return (
    <table className="PropertyNumber" style={PropertyStyle.tableStyle}>
      <tbody>
      <tr>
        <td style={PropertyStyle.firstTdStyle}><FormLabel>{configs.label}</FormLabel></td>
        <td>
          <FormNumberInput
            value={value}
            onChange={(event: any) => update(event.target.value)}
            onValid={onValid}
            min={configs.min}
            max={configs.max}/>
        </td>
      </tr>
      </tbody>
    </table>
  );

}

