import React from "react";
import { useDispatch } from "react-redux";
import {
  ReactSVGPanZoom,
  TOOL_PAN,
  TOOL_ZOOM_IN,
  TOOL_ZOOM_OUT,
  TOOL_AUTO,
  TOOL_NONE
} from "react-svg-pan-zoom";

import { usePlannerSelector } from "../../hooks/use-planner-selector";

import { setViewer } from "../../actions/viewer-actions";

import { MODES } from "../../constants";

const mode2Tool = mode => {
  switch (mode) {
    case MODES.MODE_2D_PAN:
      return TOOL_PAN;
    case MODES.MODE_2D_ZOOM_IN:
      return TOOL_ZOOM_IN;
    case MODES.MODE_2D_ZOOM_OUT:
      return TOOL_ZOOM_OUT;
    case MODES.MODE_IDLE:
      return TOOL_AUTO;
    default:
      return TOOL_NONE;
  }
};

export const Viewer2D = () => {
  const mode = usePlannerSelector(state => state.mode);
  const viewerValue = usePlannerSelector(state => state.viewer2D);
  const dispatch = useDispatch();
  return (
    <ReactSVGPanZoom
      width={500}
      height={500}
      //ref={Viewer => (this.Viewer = Viewer)}
      tool={mode2Tool(mode)}
      onChangeTool={tool => console.log(tool)}
      value={viewerValue}
      onChangeValue={value => dispatch(setViewer(value))}
      onZoom={e => console.log("zoom")}
      onPan={e => console.log("pan")}
      onClick={event =>
        console.log("click", event.x, event.y, event.originalEvent)
      }
    >
      <svg width={617} height={316}>
        {/* or <svg viewBox="0 0 617 316" */}
        <g fillOpacity=".5" strokeWidth="4">
          <rect
            x="400"
            y="40"
            width="100"
            height="200"
            fill="#4286f4"
            stroke="#f4f142"
          />
          <circle cx="108" cy="108.5" r="100" fill="#0ff" stroke="#0ff" />
          <circle cx="180" cy="209.5" r="100" fill="#ff0" stroke="#ff0" />
          <circle cx="220" cy="109.5" r="100" fill="#f0f" stroke="#f0f" />
        </g>
      </svg>
    </ReactSVGPanZoom>
  );
};
