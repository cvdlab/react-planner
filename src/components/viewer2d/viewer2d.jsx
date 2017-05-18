"use strict";

import React, {PropTypes} from 'react';

import {ReactSVGPanZoom, TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT, TOOL_AUTO} from 'react-svg-pan-zoom';
import * as constants from '../../constants';
import State from './state';

function mode2Tool(mode) {
  switch (mode) {
    case constants.MODE_2D_PAN:
      return TOOL_PAN;
    case constants.MODE_2D_ZOOM_IN:
      return TOOL_ZOOM_IN;
    case constants.MODE_2D_ZOOM_OUT:
      return TOOL_ZOOM_OUT;
    case constants.MODE_IDLE:
      return TOOL_AUTO;
    default:
      return TOOL_NONE;
  }
}

function mode2PointerEvents(mode) {
  switch (mode) {
    case constants.MODE_DRAWING_LINE:
    case constants.MODE_DRAWING_HOLE:
    case constants.MODE_DRAWING_ITEM:
    case constants.MODE_DRAGGING_HOLE:
    case constants.MODE_DRAGGING_ITEM:
    case constants.MODE_DRAGGING_LINE:
    case constants.MODE_DRAGGING_VERTEX:
      return {pointerEvents: 'none'};

    default:
      return {};
  }
}

function mode2Cursor(mode) {
  switch (mode) {
    case constants.MODE_DRAGGING_HOLE:
    case constants.MODE_DRAGGING_LINE:
    case constants.MODE_DRAGGING_VERTEX:
    case constants.MODE_DRAGGING_ITEM:
      return {cursor: 'move'};

    case constants.MODE_ROTATING_ITEM:
      return {cursor: 'ew-resize'};

    case constants.MODE_WAITING_DRAWING_LINE:
    case constants.MODE_DRAWING_LINE:
      return {cursor: 'crosshair'};
    default:
      return {cursor: 'default'};
  }
}

function mode2DetectAutopan(mode) {
  switch (mode) {
    case constants.MODE_DRAWING_LINE:
    case constants.MODE_DRAGGING_LINE:
    case constants.MODE_DRAGGING_VERTEX:
    case constants.MODE_DRAGGING_HOLE:
    case constants.MODE_DRAGGING_ITEM:
    case constants.MODE_DRAWING_HOLE:
    case constants.MODE_DRAWING_ITEM:
      return true;

    default:
      return false;
  }
}

function extractElementData(node) {
  while (!node.attributes.getNamedItem('data-element-root') && node.tagName !== 'svg') {
    node = node.parentNode;
  }
  if (node.tagName === 'svg') return null;

  return {
    part: node.attributes.getNamedItem('data-part') ? node.attributes.getNamedItem('data-part').value : undefined,
    layer: node.attributes.getNamedItem('data-layer').value,
    prototype: node.attributes.getNamedItem('data-prototype').value,
    selected: node.attributes.getNamedItem('data-selected').value === 'true',
    id: node.attributes.getNamedItem('data-id').value
  }
}

export default function Viewer2D({state, width, height},
  {editingActions, viewer2DActions, linesActions, holesActions, verticesActions, itemsActions, areaActions, projectActions, catalog}) {


  let {viewer2D, mode, scene} = state;

  let layerID = scene.selectedLayer;

  let mapCursorPosition = ({x, y}) => {
    return {x, y: -y + scene.height}
  };

  let onMouseMove = viewerEvent => {
    let event = viewerEvent.originalEvent;
    event.preventDefault();
    let {x, y} = mapCursorPosition(viewerEvent);

    switch (mode) {
      case constants.MODE_DRAWING_LINE:
        linesActions.updateDrawingLine(x, y, !event.getModifierState("Alt"));
        event.stopPropagation();
        break;

      case constants.MODE_DRAWING_HOLE:
        holesActions.updateDrawingHole(layerID, x, y);
        event.stopPropagation();
        break;

      case constants.MODE_DRAWING_ITEM:
        itemsActions.updateDrawingItem(layerID, x, y);
        event.stopPropagation();
        break;

      case constants.MODE_DRAGGING_HOLE:
        holesActions.updateDraggingHole(x, y);
        event.stopPropagation();
        break;

      case constants.MODE_DRAGGING_LINE:
        linesActions.updateDraggingLine(x, y, !event.getModifierState("Alt"));
        event.stopPropagation();
        break;

      case constants.MODE_DRAGGING_VERTEX:
        verticesActions.updateDraggingVertex(x, y, !event.getModifierState("Alt"));
        event.stopPropagation();
        break;

      case constants.MODE_DRAGGING_ITEM:
        itemsActions.updateDraggingItem(x, y);
        event.stopPropagation();
        break;

      case constants.MODE_ROTATING_ITEM:
        itemsActions.updateRotatingItem(x, y);
        event.stopPropagation();
    }
  };

  let onMouseDown = viewerEvent => {
    let event = viewerEvent.originalEvent;
    event.preventDefault();
    let {x, y} = mapCursorPosition(viewerEvent);

    switch (mode) {
      case constants.MODE_IDLE:

        let elementData = extractElementData(event.target);
        if (!(elementData && elementData.selected)) return;

        switch (elementData ? elementData.prototype : 'none') {
          case 'lines':
            linesActions.beginDraggingLine(elementData.layer, elementData.id, x, y, !event.getModifierState("Alt"));
            event.stopPropagation();
            break;

          case 'vertices':
            verticesActions.beginDraggingVertex(elementData.layer, elementData.id, x, y, !event.getModifierState("Alt"));
            event.stopPropagation();
            break;

          case 'items':
            if (elementData.part === 'rotation-anchor')
              itemsActions.beginRotatingItem(elementData.layer, elementData.id, x, y);
            else
              itemsActions.beginDraggingItem(elementData.layer, elementData.id, x, y);
            event.stopPropagation();
            break;

          case 'holes':
            holesActions.beginDraggingHole(elementData.layer, elementData.id, x, y);
            event.stopPropagation();
            break;
        }
    }
  };

  let onMouseUp = viewerEvent => {
    let event = viewerEvent.originalEvent;
    event.preventDefault();
    let {x, y} = mapCursorPosition(viewerEvent);

    switch (mode) {

      case constants.MODE_IDLE:
        let elementData = extractElementData(event.target);

        if (elementData && elementData.selected) return;

        switch (elementData ? elementData.prototype : 'none') {
          case 'areas':
            areaActions.selectArea(elementData.layer, elementData.id);
            event.stopPropagation();
            break;

          case 'lines':
            linesActions.selectLine(elementData.layer, elementData.id);
            event.stopPropagation();
            break;

          case 'holes':
            holesActions.selectHole(elementData.layer, elementData.id);
            event.stopPropagation();
            break;

          case 'items':
            itemsActions.selectItem(elementData.layer, elementData.id);
            event.stopPropagation();
            break;

          case 'none':
            projectActions.unselectAll();
            event.stopPropagation();
            break;
        }
        break;

      case constants.MODE_WAITING_DRAWING_LINE:
        linesActions.beginDrawingLine(layerID, x, y, !event.getModifierState("Alt"));
        event.stopPropagation();
        break;

      case constants.MODE_DRAWING_LINE:
        linesActions.endDrawingLine(x, y, !event.getModifierState("Alt"));
        event.stopPropagation();
        break;

      case constants.MODE_DRAWING_HOLE:
        holesActions.endDrawingHole(layerID, x, y);
        event.stopPropagation();
        break;

      case constants.MODE_DRAWING_ITEM:
        itemsActions.endDrawingItem(layerID, x, y);
        event.stopPropagation();
        break;

      case constants.MODE_DRAGGING_LINE:
        linesActions.endDraggingLine(x, y, !event.getModifierState("Alt"));
        event.stopPropagation();
        break;

      case constants.MODE_DRAGGING_VERTEX:
        verticesActions.endDraggingVertex(x, y, !event.getModifierState("Alt"));
        event.stopPropagation();
        break;

      case constants.MODE_DRAGGING_ITEM:
        itemsActions.endDraggingItem(x, y);
        event.stopPropagation();
        break;

      case constants.MODE_DRAGGING_HOLE:
        holesActions.endDraggingHole(x, y);
        event.stopPropagation();
        break;

      case constants.MODE_ROTATING_ITEM:
        itemsActions.endRotatingItem(x, y);
        event.stopPropagation();
        break;
    }
  };

  let onChangeValue = (value) => viewer2DActions.updateCameraView(value);
  let onChangeTool = (tool) => {
    switch (tool) {
      case TOOL_NONE:
        editingActions.selectToolEdit();
        break;

      case TOOL_PAN:
        viewer2DActions.selectToolPan();
        break;

      case TOOL_ZOOM_IN:
        viewer2DActions.selectToolZoomIn();
        break;

      case TOOL_ZOOM_OUT:
        viewer2DActions.selectToolZoomOut();
        break;
    }
  };

  return (
    <ReactSVGPanZoom
      width={width} height={height}

      value={viewer2D.isEmpty() ? null : viewer2D.toJS()}
      onChangeValue={onChangeValue}

      tool={mode2Tool(mode)}
      onChangeTool={onChangeTool}

      detectAutoPan={mode2DetectAutopan(mode)}

      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}

      miniaturePosition="none"
      toolbarPosition="right">

      <svg width={scene.width} height={scene.height}>
        <g style={Object.assign(mode2Cursor(mode), mode2PointerEvents(mode))}>
          <State state={state} catalog={catalog}/>
        </g>
      </svg>

    </ReactSVGPanZoom>
  );
}


Viewer2D.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

Viewer2D.contextTypes = {
  viewer2DActions: PropTypes.object.isRequired,
  editingActions: PropTypes.object.isRequired,
  linesActions: PropTypes.object.isRequired,
  holesActions: PropTypes.object.isRequired,
  verticesActions: PropTypes.object.isRequired,
  itemsActions: PropTypes.object.isRequired,
  areaActions: PropTypes.object.isRequired,
  projectActions: PropTypes.object.isRequired,
  catalog: PropTypes.object.isRequired,
};
