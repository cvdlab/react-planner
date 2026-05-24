import React, { useContext } from "react";
import FormNumberInput from "../../../style/form-number-input";
import FormTextInput from "../../../style/form-text-input";
import { PlannerContext } from "../../../../context";

const tableStyle = { width: "100%" };
const firstTdStyle = { width: "6em" };
const inputStyle = { textAlign: "left" };

type Props = {
  element: any;
  onUpdate: (key: string, value: any) => any;
  attributeFormData: any;
  state: any;
  [key: string]: any;
};

export default function ItemAttributesEditor({
  element,
  onUpdate,
  attributeFormData,
  state,
  ...rest
}: Props) {
  const { translator } = useContext(PlannerContext);

  let name = attributeFormData.has("name")
    ? attributeFormData.get("name")
    : element.name;
  let renderedX = attributeFormData.has("x")
    ? attributeFormData.get("x")
    : element.x;
  let renderedY = attributeFormData.has("y")
    ? attributeFormData.get("y")
    : element.y;
  let renderedR = attributeFormData.has("rotation")
    ? attributeFormData.get("rotation")
    : element.rotation;

  return (
    <table style={tableStyle}>
      <tbody>
        <tr>
          <td style={firstTdStyle}>{translator.t("Name")}</td>
          <td>
            <FormTextInput
              value={name}
              onChange={(event: any) => onUpdate("name", event.target.value)}
              style={inputStyle}
            />
          </td>
        </tr>
        <tr>
          <td style={firstTdStyle}>X</td>
          <td>
            <FormNumberInput
              value={renderedX}
              onChange={(event: any) => onUpdate("x", event.target.value)}
              style={inputStyle}
              state={state}
              precision={2}
              {...rest}
            />
          </td>
        </tr>
        <tr>
          <td style={firstTdStyle}>Y</td>
          <td>
            <FormNumberInput
              value={renderedY}
              onChange={(event: any) => onUpdate("y", event.target.value)}
              style={inputStyle}
              state={state}
              precision={2}
              {...rest}
            />
          </td>
        </tr>
        <tr>
          <td style={firstTdStyle}>{translator.t("Rotation")}</td>
          <td>
            <FormNumberInput
              value={renderedR}
              onChange={(event: any) =>
                onUpdate("rotation", event.target.value)
              }
              style={inputStyle}
              state={state}
              precision={2}
              {...rest}
            />
          </td>
        </tr>
      </tbody>
    </table>
  );
}


(ItemAttributesEditor as any).contextType = PlannerContext;
