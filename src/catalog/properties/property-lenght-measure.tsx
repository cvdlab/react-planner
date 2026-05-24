import React from "react";
import { UNITS_LENGTH, UNIT_CENTIMETER } from "./../../constants";
import convert from "convert-units";
import {
  FormLabel,
  FormNumberInput,
  FormSelect,
} from "../../components/style/export";
import { Map } from "immutable";
import { toFixedFloat } from "../../utils/math";
import PropertyStyle from "./shared-property-style";
import { PlannerContext } from "../../context";

const internalTableStyle = { borderCollapse: "collapse" as const };
const secondTdStyle = { padding: 0 };
const unitContainerStyle = { width: "5em" };

type Props = {
  value: any;
  onUpdate: (val: any) => any;
  onValid?: (val: any) => any;
  configs: any;
  sourceElement?: any;
  internalState?: any;
  state: any;
};

export default function PropertyLengthMeasure({
  value,
  onUpdate,
  onValid,
  configs,
  sourceElement,
  internalState,
  state,
}: Props) {
  let length = value.get("length") || 0;
  let _length = value.get("_length") || length;
  let _unit = value.get("_unit") || UNIT_CENTIMETER;
  let { hook, label, ...configRest } = configs;

  let update = (lengthInput: any, unitInput: any) => {
    let newLength = toFixedFloat(lengthInput);
    let merged = value.merge({
      length:
        unitInput !== UNIT_CENTIMETER
          ? convert(newLength).from(unitInput).to(UNIT_CENTIMETER)
          : newLength,
      _length: lengthInput,
      _unit: unitInput,
    });

    if (hook) {
      return hook(merged, sourceElement, internalState, state).then(
        (val: any) => {
          return onUpdate(val);
        },
      );
    }

    return onUpdate(merged);
  };

  return (
    <table className="PropertyLengthMeasure" style={PropertyStyle.tableStyle}>
      <tbody>
        <tr>
          <td style={PropertyStyle.firstTdStyle}>
            <FormLabel>{label}</FormLabel>
          </td>
          <td style={secondTdStyle}>
            <table style={internalTableStyle}>
              <tbody>
                <tr>
                  <td>
                    <FormNumberInput
                      value={_length}
                      onChange={(event: any) =>
                        update(event.target.value, _unit)
                      }
                      onValid={onValid}
                      {...configRest}
                    />
                  </td>
                  <td style={unitContainerStyle}>
                    <FormSelect
                      value={_unit}
                      onChange={(event: any) =>
                        update(_length, event.target.value)
                      }
                    >
                      {UNITS_LENGTH.map((el: any) => (
                        <option key={el} value={el}>
                          {el}
                        </option>
                      ))}
                    </FormSelect>
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  );
}

