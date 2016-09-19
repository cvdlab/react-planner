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
  MODE_DRAWING_HOLE,
  MODE_DRAGGING_LINE,
  MODE_DRAGGING_VERTEX
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

function extractElementData(node) {
  while (!node.attributes.getNamedItem('data-element-root') && node.tagName !== 'svg') {
    node = node.parentNode;
  }
  if (node.tagName === 'svg') return null;

  return {
    layer: node.attributes.getNamedItem('data-layer').value,
    prototype: node.attributes.getNamedItem('data-prototype').value,
    selected: node.attributes.getNamedItem('data-selected').value === 'true',
    id: node.attributes.getNamedItem('data-id').value
  }
}

export default function Viewer2D({scene, width, height, viewer2D, mode, activeDrawingHelper, drawingHelpers},
  {editingActions, viewer2DActions, linesActions, holesActions, verticesActions}) {

  viewer2D = viewer2D.isEmpty() ? ViewerHelper.getDefaultValue() : viewer2D.toJS();
  let layerID = scene.selectedLayer;

  let mapCursorPosition = ({x, y}) => {
    return {x, y: -y + scene.height}
  };

  let onClick = event => {
    let {x, y} = mapCursorPosition(event);

    switch (mode) {
      case MODE_IDLE:
        let elementData = extractElementData(event.originalEvent.target);

        if (elementData && elementData.selected) return;

        switch (elementData ? elementData.prototype : 'none') {
          case 'areas':
            editingActions.selectArea(elementData.layer, elementData.id);
            break;

          case 'lines':
            editingActions.selectLine(elementData.layer, elementData.id);
            break;

          case 'holes':
            editingActions.selectHole(elementData.layer, elementData.id);
            break;

          case 'none':
            editingActions.unselectAll();
            break;
        }
        break;

      case MODE_WAITING_DRAWING_LINE:
        linesActions.beginDrawingLine(layerID, x, y);
        break;

      case MODE_DRAWING_LINE:
        linesActions.endDrawingLine(layerID, x, y);
        break;

      case MODE_DRAWING_HOLE:
        holesActions.endDrawingHole(layerID, x, y);
        break;
    }
  };

  let onMouseMove = event => {
    let {x, y} = mapCursorPosition(event);

    switch (mode) {
      case MODE_DRAWING_LINE:
        linesActions.updateDrawingLine(layerID, x, y);
        break;

      case MODE_DRAWING_HOLE:
        holesActions.updateDrawingHole(layerID, x, y);
        break;

      case MODE_DRAGGING_LINE:
        linesActions.updateDraggingLine(x, y);
        break;

      case MODE_DRAGGING_VERTEX:
        verticesActions.updateDraggingVertex(x, y);
        break;
    }
  };

  let onMouseDown = event => {
    let {x, y} = mapCursorPosition(event);

    switch (mode) {
      case MODE_IDLE:

        let elementData = extractElementData(event.originalEvent.target);
        if (!(elementData && elementData.selected)) return;

        switch (elementData ? elementData.prototype : 'none') {
          case 'lines':
            linesActions.beginDraggingLine(x, y);
            break;

          case 'vertices':
            verticesActions.beginDraggingVertex(elementData.layer, elementData.id, x, y);
            break;
        }
    }
  };

  let onMouseUp = event => {
    let {x, y} = mapCursorPosition(event);

    switch (mode) {
      case MODE_DRAGGING_LINE:
        linesActions.endDraggingLine(x, y);
        break;

      case MODE_DRAGGING_VERTEX:
        verticesActions.endDraggingVertex(x, y);
        break;
    }
  };


  let detectAutoPan = [
    MODE_DRAWING_LINE
  ].includes(mode);

  let onChange = event => viewer2DActions.updateCameraView(event.value);

  activeDrawingHelper = activeDrawingHelper ?
    <ActiveDrawingHelper helper={activeDrawingHelper} width={scene.width} height={scene.height}/> : null;

  drawingHelpers = false ? drawingHelpers.map(
    helper => <ActiveDrawingHelper helper={helper} width={scene.width} height={scene.height}/>
  ) : null;

  return (
    <Viewer value={viewer2D} tool={mode2Tool(mode)} width={width} height={height} detectAutoPan={detectAutoPan}
            onMouseMove={onMouseMove} onChange={onChange} onClick={onClick} onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}>
      <svg width={scene.width} height={scene.height} style={{cursor: "crosshair"}}>
        <g transform={`translate(0, ${scene.height}) scale(1, -1)`}>
          <Scene scene={scene} mode={mode}/>
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
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  verticesActions: PropTypes.object.isRequired
};
