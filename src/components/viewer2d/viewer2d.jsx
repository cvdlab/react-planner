"use strict";

import React, {PropTypes} from 'react';

import {Viewer, ViewerHelper, TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT} from 'react-svg-pan-zoom';
import {
  MODE_IDLE,
  MODE_2D_PAN,
  MODE_2D_ZOOM_IN,
  MODE_2D_ZOOM_OUT,
  MODE_WAITING_DRAWING_LINE,
  MODE_DRAWING_LINE,
  MODE_WAITING_DRAWING_HOLE,
  MODE_DRAWING_HOLE
} from '../../constants';
import Scene from './scene.jsx';
import ActiveDrawingHelper from './active-drawing-helper.jsx';

function mode2Tool(mode) {
  switch (mode) {
    case MODE_2D_PAN:
      return TOOL_PAN;
    case MODE_2D_ZOOM_IN:
      return TOOL_ZOOM_IN;
    case MODE_2D_ZOOM_OUT:
      return TOOL_ZOOM_OUT;
    default:
      return TOOL_NONE;
  }
}


export default function Viewer2D({scene, width, height, viewer2D, mode, activeDrawingHelper, drawingHelpers}, {editingActions, viewer2DActions, drawingActions}) {

  viewer2D = viewer2D.isEmpty() ? ViewerHelper.getDefaultValue() : viewer2D.toJS();
  let layerID = scene.selectedLayer;

  let mapCursorPosition = ({x, y}) => {
    return {x, y: -y + scene.height}
  };

  let onClick = event => {
    let {x, y} = mapCursorPosition(event);

    switch (mode) {
      case MODE_IDLE:
        editingActions.unselectAll();
        break;

      case MODE_WAITING_DRAWING_LINE:
        drawingActions.beginDrawingLine(layerID, x, y);
        break;

      case MODE_DRAWING_LINE:
        drawingActions.endDrawingLine(layerID, x, y);
        break;

      case MODE_WAITING_DRAWING_HOLE:
        drawingActions.beginDrawingHole(layerID, x, y);
        break;

      case MODE_DRAWING_HOLE:
        drawingActions.endDrawingHole(layerID, x, y);
        break;
    }
  };

  let onMouseMove = event => {
    let {x, y} = mapCursorPosition(event);

    switch (mode) {
      case MODE_DRAWING_LINE:
        drawingActions.updateDrawingLine(layerID, x, y);
        break;

      case MODE_DRAWING_HOLE:
        drawingActions.updateDrawingHole(layerID, x, y);
        break;
    }
  };

  let ignoreSceneEvents = [
    MODE_WAITING_DRAWING_LINE,
    MODE_DRAWING_LINE,
    MODE_WAITING_DRAWING_HOLE,
    MODE_DRAWING_HOLE
  ].includes(mode);

  let onChange = event => viewer2DActions.updateCameraView(event.value);

  activeDrawingHelper = activeDrawingHelper ?
    <ActiveDrawingHelper helper={activeDrawingHelper} width={scene.width} height={scene.height}/> : null;

  drawingHelpers = true ? drawingHelpers.map(
    helper => <ActiveDrawingHelper helper={helper} width={scene.width} height={scene.height} />
  ) : null;

  return (
    <Viewer value={viewer2D} tool={mode2Tool(mode)} width={width} height={height}
            onMouseMove={onMouseMove} onChange={onChange} onClick={onClick}>
      <svg width={scene.width} height={scene.height} style={{cursor: "crosshair"}}>
        <g transform={`translate(0, ${scene.height}) scale(1, -1)`}>
          <Scene scene={scene} ignoreEvents={ignoreSceneEvents}/>
          {activeDrawingHelper}
          {drawingHelpers}
        </g>
      </svg>
    </Viewer>
  );
}


Viewer2D.propTypes = {
  mode: PropTypes.string.isRequired,
  scene: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  viewer2D: PropTypes.object.isRequired,
  activeDrawingHelper: PropTypes.object
};

Viewer2D.contextTypes = {
  viewer2DActions: PropTypes.object.isRequired,
  editingActions: PropTypes.object.isRequired,
  drawingActions: PropTypes.object.isRequired
};
