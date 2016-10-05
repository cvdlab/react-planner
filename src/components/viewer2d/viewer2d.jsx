"use strict";

import React, {PropTypes} from 'react';

import {Viewer, TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT} from 'react-svg-pan-zoom';
import {
  MODE_IDLE,
  MODE_2D_PAN,
  MODE_2D_ZOOM_IN,
  MODE_2D_ZOOM_OUT,
  MODE_WAITING_DRAWING_LINE,
  MODE_DRAWING_LINE,
  MODE_DRAWING_HOLE,
  MODE_DRAWING_ITEM,
  MODE_DRAGGING_LINE,
  MODE_DRAGGING_VERTEX,
  MODE_DRAGGING_ITEM
} from '../../constants';
import Scene from './scene.jsx';
import Snap from './snap.jsx';

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

export default function Viewer2D({state, width, height},
  {editingActions, viewer2DActions, linesActions, holesActions, verticesActions, itemsActions}) {


  let {viewer2D, mode, activeSnapElement, snapElements, scene} = state;

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

          case 'items':
            editingActions.selectItem(elementData.layer, elementData.id);
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
        linesActions.endDrawingLine(x, y);
        break;

      case MODE_DRAWING_HOLE:
        holesActions.endDrawingHole(layerID, x, y);
        break;

      case MODE_DRAWING_ITEM:
        itemsActions.endDrawingItem(layerID, x, y);
        break;
    }
  };

  let onMouseMove = event => {
    let {x, y} = mapCursorPosition(event);

    switch (mode) {
      case MODE_DRAWING_LINE:
        linesActions.updateDrawingLine(x, y);
        break;

      case MODE_DRAWING_HOLE:
        holesActions.updateDrawingHole(layerID, x, y);
        break;

      case MODE_DRAWING_ITEM:
        itemsActions.updateDrawingItem(layerID, x, y);
        break;

      case MODE_DRAGGING_LINE:
        linesActions.updateDraggingLine(x, y);
        break;

      case MODE_DRAGGING_VERTEX:
        verticesActions.updateDraggingVertex(x, y);
        break;

      case MODE_DRAGGING_ITEM:
        itemsActions.updateDraggingItem(x, y);
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
            linesActions.beginDraggingLine(elementData.layer, elementData.id, x, y);
            break;

          case 'vertices':
            verticesActions.beginDraggingVertex(elementData.layer, elementData.id, x, y);
            break;

          case 'items':
            itemsActions.beginDraggingItem(elementData.layer, elementData.id, x, y);
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

      case MODE_DRAGGING_ITEM:
        itemsActions.endDraggingItem(x, y);
        break;
    }
  };


  let detectAutoPan = [
    MODE_DRAWING_LINE,
    MODE_DRAGGING_LINE,
    MODE_DRAGGING_VERTEX,
    MODE_DRAWING_LINE,
    MODE_DRAWING_HOLE,
    MODE_DRAWING_ITEM,
  ].includes(mode);

  let onChange = event => viewer2DActions.updateCameraView(event.value);

  activeSnapElement = activeSnapElement ?
    <Snap snap={activeSnapElement} width={scene.width} height={scene.height}/> : null;
  // snapElements = snapElements.map((snap,id) => <Snap key={id} snap={snap} width={scene.width} height={scene.height}/>);
  snapElements = null; //only for debug purpose

  return (
    <Viewer value={viewer2D.isEmpty() ? null : viewer2D.toJS()} tool={mode2Tool(mode)} width={width} height={height}
            detectAutoPan={detectAutoPan}
            onMouseMove={onMouseMove} onChange={onChange} onClick={onClick} onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}>
      <svg width={scene.width} height={scene.height} style={{cursor: "crosshair"}}>
        <g transform={`translate(0, ${scene.height}) scale(1, -1)`}>
          <Scene scene={scene} mode={mode}/>
          {activeSnapElement}
          {snapElements}
        </g>
      </svg>
    </Viewer>
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
};
