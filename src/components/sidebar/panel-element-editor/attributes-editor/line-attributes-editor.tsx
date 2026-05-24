import React, { useContext } from "react";
import { FormNumberInput, FormTextInput } from "../../../style/export";
import { PropertyLengthMeasure } from "../../../../catalog/properties/export";
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

export default function LineAttributesEditor({
  element,
  onUpdate,
  attributeFormData,
  state,
  ...rest
}: Props) {
  let name = attributeFormData.has("name")
    ? attributeFormData.get("name")
    : element.name;
  let vertexOne = attributeFormData.has("vertexOne")
    ? attributeFormData.get("vertexOne")
    : null;
  let vertexTwo = attributeFormData.has("vertexTwo")
    ? attributeFormData.get("vertexTwo")
    : null;
  let lineLength = attributeFormData.has("lineLength")
    ? attributeFormData.get("lineLength")
    : null;

  const { translator } = useContext(PlannerContext);

  return (
    <div>
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
            <td style={firstTdStyle}>X1</td>
            <td>
              <FormNumberInput
                value={vertexOne.get("x")}
                onChange={(event: any) =>
                  onUpdate("vertexOne", { x: event.target.value })
                }
                style={inputStyle}
                state={state}
                precision={2}
                {...rest}
              />
            </td>
          </tr>
          <tr>
            <td style={firstTdStyle}>Y1</td>
            <td>
              <FormNumberInput
                value={vertexOne.get("y")}
                onChange={(event: any) =>
                  onUpdate("vertexOne", { y: event.target.value })
                }
                style={inputStyle}
                state={state}
                precision={2}
                {...rest}
              />
            </td>
          </tr>
          <tr>
            <td style={firstTdStyle}>X2</td>
            <td>
              <FormNumberInput
                value={vertexTwo.get("x")}
                onChange={(event: any) =>
                  onUpdate("vertexTwo", { x: event.target.value })
                }
                style={inputStyle}
                state={state}
                precision={2}
                {...rest}
              />
            </td>
          </tr>
          <tr>
            <td style={firstTdStyle}>Y2</td>
            <td>
              <FormNumberInput
                value={vertexTwo.get("y")}
                onChange={(event: any) =>
                  onUpdate("vertexTwo", { y: event.target.value })
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
      <PropertyLengthMeasure
        value={lineLength}
        onUpdate={(mapped: any) => onUpdate("lineLength", mapped)}
        configs={{
          label: translator.t("Length"),
          min: 0,
          max: Infinity,
          precision: 2,
        }}
        state={state}
      />
    </div>
  );
}


(LineAttributesEditor as any).contextType = PlannerContext;
