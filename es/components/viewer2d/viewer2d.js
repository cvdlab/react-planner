"use strict";

import React, { PropTypes } from 'react';

import { ReactSVGPanZoom, TOOL_NONE, TOOL_PAN, TOOL_ZOOM_IN, TOOL_ZOOM_OUT } from 'react-svg-pan-zoom';
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
      return { pointerEvents: 'none' };

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
      return { cursor: 'move' };

    case constants.MODE_ROTATING_ITEM:
      return { cursor: 'ew-resize' };

    case constants.MODE_WAITING_DRAWING_LINE:
    case constants.MODE_DRAWING_LINE:
      return { cursor: 'crosshair' };
    default:
      return { cursor: 'default' };
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
  };
}

export default function Viewer2D(_ref, _ref2) {
  var state = _ref.state,
      width = _ref.width,
      height = _ref.height;
  var editingActions = _ref2.editingActions,
      viewer2DActions = _ref2.viewer2DActions,
      linesActions = _ref2.linesActions,
      holesActions = _ref2.holesActions,
      verticesActions = _ref2.verticesActions,
      itemsActions = _ref2.itemsActions,
      areaActions = _ref2.areaActions,
      projectActions = _ref2.projectActions,
      catalog = _ref2.catalog;
  var viewer2D = state.viewer2D,
      mode = state.mode,
      scene = state.scene;


  var layerID = scene.selectedLayer;

  var mapCursorPosition = function mapCursorPosition(_ref3) {
    var x = _ref3.x,
        y = _ref3.y;

    return { x: x, y: -y + scene.height };
  };

  var onMouseMove = function onMouseMove(viewerEvent) {
    var event = viewerEvent.originalEvent;
    event.preventDefault();

    var _mapCursorPosition = mapCursorPosition(viewerEvent),
        x = _mapCursorPosition.x,
        y = _mapCursorPosition.y;

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

  var onMouseDown = function onMouseDown(viewerEvent) {
    var event = viewerEvent.originalEvent;
    event.preventDefault();

    var _mapCursorPosition2 = mapCursorPosition(viewerEvent),
        x = _mapCursorPosition2.x,
        y = _mapCursorPosition2.y;

    switch (mode) {
      case constants.MODE_IDLE:

        var elementData = extractElementData(event.target);
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
            if (elementData.part === 'rotation-anchor') itemsActions.beginRotatingItem(elementData.layer, elementData.id, x, y);else itemsActions.beginDraggingItem(elementData.layer, elementData.id, x, y);
            event.stopPropagation();
            break;

          case 'holes':
            holesActions.beginDraggingHole(elementData.layer, elementData.id, x, y);
            event.stopPropagation();
            break;
        }
    }
  };

  var onMouseUp = function onMouseUp(viewerEvent) {
    var event = viewerEvent.originalEvent;
    event.preventDefault();

    var _mapCursorPosition3 = mapCursorPosition(viewerEvent),
        x = _mapCursorPosition3.x,
        y = _mapCursorPosition3.y;

    switch (mode) {

      case constants.MODE_IDLE:
        var elementData = extractElementData(event.target);

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

  var onChangeValue = function onChangeValue(value) {
    return viewer2DActions.updateCameraView(value);
  };
  var onChangeTool = function onChangeTool(tool) {
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

  return React.createElement(
    ReactSVGPanZoom,
    {
      width: width, height: height,

      value: viewer2D.isEmpty() ? null : viewer2D.toJS(),
      onChangeValue: onChangeValue,

      tool: mode2Tool(mode),
      onChangeTool: onChangeTool,

      detectAutoPan: mode2DetectAutopan(mode),

      onMouseDown: onMouseDown,
      onMouseMove: onMouseMove,
      onMouseUp: onMouseUp,
      toolbarPosition: 'right' },
    React.createElement(
      'svg',
      { width: scene.width, height: scene.height },
      React.createElement(
        'g',
        { style: Object.assign(mode2Cursor(mode), mode2PointerEvents(mode)) },
        React.createElement(State, { state: state, catalog: catalog })
      )
    )
  );
}

Viewer2D.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
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
  catalog: PropTypes.object.isRequired
};