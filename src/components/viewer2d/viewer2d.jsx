"use strict";

import React, {PropTypes} from 'react';

import {Viewer, TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT} from 'react-svg-pan-zoom';
import * as constants from '../../constants';
import Scene from './scene';
import Snap from './snap';

function mode2Tool(mode) {
  switch (mode) {
    case constants.MODE_2D_PAN:
      return TOOL_PAN;
    case constants.MODE_2D_ZOOM_IN:
      return TOOL_ZOOM_IN;
    case constants.MODE_2D_ZOOM_OUT:
      return TOOL_ZOOM_OUT;
    default:
      return TOOL_NONE;
  }
}

function mode2PointerEvents(mode) {
  switch (mode) {
    case constants.MODE_WAITING_DRAWING_LINE:
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

    default:
      return {cursor: 'crosshair'};
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
  {editingActions, viewer2DActions, linesActions, holesActions, verticesActions, itemsActions}) {


  let {viewer2D, mode, activeSnapElement, snapElements, scene} = state;

  let layerID = scene.selectedLayer;

  let mapCursorPosition = ({x, y}) => {
    return {x, y: -y + scene.height}
  };

  let onClick = event => {
    event.originalEvent.preventDefault();

    let {x, y} = mapCursorPosition(event);

    switch (mode) {
      case constants.MODE_IDLE:
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

      case constants.MODE_WAITING_DRAWING_LINE:
        linesActions.beginDrawingLine(layerID, x, y);
        break;

      case constants.MODE_DRAWING_LINE:
        linesActions.endDrawingLine(x, y);
        break;

      case constants.MODE_DRAWING_HOLE:
        holesActions.endDrawingHole(layerID, x, y);
        break;

      case constants.MODE_DRAWING_ITEM:
        itemsActions.endDrawingItem(layerID, x, y);
        break;
    }
  };

  let onMouseMove = event => {
    event.originalEvent.preventDefault();
    let {x, y} = mapCursorPosition(event);

    switch (mode) {
      case constants.MODE_DRAWING_LINE:
        linesActions.updateDrawingLine(x, y);
        break;

      case constants.MODE_DRAWING_HOLE:
        holesActions.updateDrawingHole(layerID, x, y);
        break;

      case constants.MODE_DRAWING_ITEM:
        itemsActions.updateDrawingItem(layerID, x, y);
        break;

      case constants.MODE_DRAGGING_HOLE:
        holesActions.updateDraggingHole(x, y);
        break;

      case constants.MODE_DRAGGING_LINE:
        linesActions.updateDraggingLine(x, y);
        break;

      case constants.MODE_DRAGGING_VERTEX:
        verticesActions.updateDraggingVertex(x, y);
        break;

      case constants.MODE_DRAGGING_ITEM:
        itemsActions.updateDraggingItem(x, y);
        break;

      case constants.MODE_ROTATING_ITEM:
        itemsActions.updateRotatingItem(x, y);
    }
  };

  let onMouseDown = event => {
    event.originalEvent.preventDefault();
    let {x, y} = mapCursorPosition(event);

    switch (mode) {
      case constants.MODE_IDLE:

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
            if (elementData.part === 'rotation-anchor')
              itemsActions.beginRotatingItem(elementData.layer, elementData.id, x, y);
            else
              itemsActions.beginDraggingItem(elementData.layer, elementData.id, x, y);
            break;

          case 'holes':
            holesActions.beginDraggingHole(elementData.layer, elementData.id, x, y);
            break;
        }
    }
  };

  let onMouseUp = event => {
    event.originalEvent.preventDefault();
    let {x, y} = mapCursorPosition(event);

    switch (mode) {
      case constants.MODE_DRAGGING_LINE:
        linesActions.endDraggingLine(x, y);
        break;

      case constants.MODE_DRAGGING_VERTEX:
        verticesActions.endDraggingVertex(x, y);
        break;

      case constants.MODE_DRAGGING_ITEM:
        itemsActions.endDraggingItem(x, y);
        break;

      case constants.MODE_DRAGGING_HOLE:
        holesActions.endDraggingHole(x, y);
        break;

      case constants.MODE_ROTATING_ITEM:
        itemsActions.endRotatingItem(x, y);
        break;
    }
  };

  let onChange = event => viewer2DActions.updateCameraView(event.value);

  activeSnapElement = activeSnapElement ?
    <Snap snap={activeSnapElement} width={scene.width} height={scene.height}/> : null;
  // snapElements = snapElements.map((snap,id) => <Snap key={id} snap={snap} width={scene.width} height={scene.height}/>);
  snapElements = null; //only for debug purpose

  return (
    <Viewer value={viewer2D.isEmpty() ? null : viewer2D.toJS()} tool={mode2Tool(mode)} width={width} height={height}
            detectAutoPan={mode2DetectAutopan(mode)}
            onMouseMove={onMouseMove} onChange={onChange} onClick={onClick} onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}>

      <svg width={scene.width} height={scene.height}>
        <g style={mode2Cursor(mode)}>
          <rect x="0" y="0" width={width} height={height} fill="#fff"/>
          <g transform={`translate(0, ${scene.height}) scale(1, -1)`} style={mode2PointerEvents(mode)}>
            <Scene scene={scene} mode={mode}/>
            {activeSnapElement}
            {snapElements}
          </g>
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
