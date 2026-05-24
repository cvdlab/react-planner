import { Seq } from "immutable";
import PropTypes from "prop-types";
import React, { useContext } from "react";
import Panel from "../panel";

import {
  MODE_2D_PAN,
  MODE_2D_ZOOM_IN,
  MODE_2D_ZOOM_OUT,
  MODE_3D_FIRST_PERSON,
  MODE_3D_VIEW,
  MODE_DRAGGING_HOLE,
  MODE_DRAGGING_ITEM,
  MODE_DRAGGING_LINE,
  MODE_DRAGGING_VERTEX,
  MODE_DRAWING_HOLE,
  MODE_DRAWING_ITEM,
  MODE_DRAWING_LINE,
  MODE_FITTING_IMAGE,
  MODE_IDLE,
  MODE_ROTATING_ITEM,
  MODE_UPLOADING_IMAGE,
  MODE_WAITING_DRAWING_LINE,
} from "../../../constants";
import { PlannerContext } from "../../../context";
import ElementEditor from "./element-editor";

type Props = { state: any };

export default function PanelElementEditor({ state }: Props) {
  const { translator } = useContext(PlannerContext);

  let { scene, mode } = state;

  if (
    ![
      MODE_IDLE,
      MODE_2D_ZOOM_IN,
      MODE_2D_ZOOM_OUT,
      MODE_2D_PAN,
      MODE_3D_VIEW,
      MODE_3D_FIRST_PERSON,
      MODE_WAITING_DRAWING_LINE,
      MODE_DRAWING_LINE,
      MODE_DRAWING_HOLE,
      MODE_DRAWING_ITEM,
      MODE_DRAGGING_LINE,
      MODE_DRAGGING_VERTEX,
      MODE_DRAGGING_ITEM,
      MODE_DRAGGING_HOLE,
      MODE_ROTATING_ITEM,
      MODE_UPLOADING_IMAGE,
      MODE_FITTING_IMAGE,
    ].includes(mode)
  )
    return null;

  let componentRenderer = (element: any, layer: any) => (
    <Panel
      key={element.id}
      name={translator.t("Properties: [{0}] {1}", element.type, element.id)}
      opened={true}
    >
      <div style={{ padding: "5px 15px" }}>
        <ElementEditor element={element} layer={layer} state={state} />
      </div>
    </Panel>
  );

  let layerRenderer = (layer: any) =>
    Seq()
      .concat(layer.lines, layer.holes, layer.areas, layer.items)
      .filter((element: any) => element.selected)
      .map((element: any) => componentRenderer(element, layer))
      .valueSeq();

  return <div>{scene.layers.valueSeq().map(layerRenderer)}</div>;
}

(PanelElementEditor as any).propTypes = {
  state: PropTypes.object.isRequired,
};
