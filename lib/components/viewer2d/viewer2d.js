"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Viewer2D;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _reactSvgPanZoom = require("react-svg-pan-zoom");
var _reactPlannerContext = _interopRequireDefault(require("../../utils/react-planner-context"));
var constants = _interopRequireWildcard(require("../../utils/constants"));
var _state = _interopRequireDefault(require("./state"));
var SharedStyle = _interopRequireWildcard(require("../../styles/shared-style"));
var _export = require("./export");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function mode2Tool(mode) {
  switch (mode) {
    case constants.MODE_2D_PAN:
      return _reactSvgPanZoom.TOOL_PAN;
    case constants.MODE_2D_ZOOM_IN:
      return _reactSvgPanZoom.TOOL_ZOOM_IN;
    case constants.MODE_2D_ZOOM_OUT:
      return _reactSvgPanZoom.TOOL_ZOOM_OUT;
    case constants.MODE_IDLE:
      return _reactSvgPanZoom.TOOL_AUTO;
    default:
      return _reactSvgPanZoom.TOOL_NONE;
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
      return {
        pointerEvents: 'none'
      };
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
      return {
        cursor: 'move'
      };
    case constants.MODE_ROTATING_ITEM:
      return {
        cursor: 'ew-resize'
      };
    case constants.MODE_WAITING_DRAWING_LINE:
    case constants.MODE_DRAWING_LINE:
      return {
        cursor: 'crosshair'
      };
    default:
      return {
        cursor: 'default'
      };
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
function Viewer2D(_ref) {
  var state = _ref.state,
    width = _ref.width,
    height = _ref.height;
  var _useContext = (0, _react.useContext)(_reactPlannerContext["default"]),
    viewer2DActions = _useContext.viewer2DActions,
    linesActions = _useContext.linesActions,
    holesActions = _useContext.holesActions,
    verticesActions = _useContext.verticesActions,
    itemsActions = _useContext.itemsActions,
    areaActions = _useContext.areaActions,
    projectActions = _useContext.projectActions,
    catalog = _useContext.catalog;
  var viewer2D = state.viewer2D,
    mode = state.mode,
    scene = state.scene;
  var layerID = scene.selectedLayer;
  var mapCursorPosition = function mapCursorPosition(_ref2) {
    var x = _ref2.x,
      y = _ref2.y;
    return {
      x: x,
      y: -y + scene.height
    };
  };
  var onMouseMove = function onMouseMove(viewerEvent) {
    //workaround that allow imageful component to work
    var evt = new Event('mousemove-planner-event');
    evt.viewerEvent = viewerEvent;
    document.dispatchEvent(evt);
    var _mapCursorPosition = mapCursorPosition(viewerEvent),
      x = _mapCursorPosition.x,
      y = _mapCursorPosition.y;
    projectActions.updateMouseCoord({
      x: x,
      y: y
    });
    switch (mode) {
      case constants.MODE_DRAWING_LINE:
        linesActions.updateDrawingLine(x, y, state.snapMask);
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
        linesActions.updateDraggingLine(x, y, state.snapMask);
        break;
      case constants.MODE_DRAGGING_VERTEX:
        verticesActions.updateDraggingVertex(x, y, state.snapMask);
        break;
      case constants.MODE_DRAGGING_ITEM:
        itemsActions.updateDraggingItem(x, y);
        break;
      case constants.MODE_ROTATING_ITEM:
        itemsActions.updateRotatingItem(x, y);
        break;
    }
    viewerEvent.originalEvent.stopPropagation();
  };
  var onMouseDown = function onMouseDown(viewerEvent) {
    var event = viewerEvent.originalEvent;

    //workaround that allow imageful component to work
    var evt = new Event('mousedown-planner-event');
    evt.viewerEvent = viewerEvent;
    document.dispatchEvent(evt);
    var _mapCursorPosition2 = mapCursorPosition(viewerEvent),
      x = _mapCursorPosition2.x,
      y = _mapCursorPosition2.y;
    if (mode === constants.MODE_IDLE) {
      var elementData = extractElementData(event.target);
      if (!elementData || !elementData.selected) return;
      switch (elementData.prototype) {
        case 'lines':
          linesActions.beginDraggingLine(elementData.layer, elementData.id, x, y, state.snapMask);
          break;
        case 'vertices':
          verticesActions.beginDraggingVertex(elementData.layer, elementData.id, x, y, state.snapMask);
          break;
        case 'items':
          if (elementData.part === 'rotation-anchor') itemsActions.beginRotatingItem(elementData.layer, elementData.id, x, y);else itemsActions.beginDraggingItem(elementData.layer, elementData.id, x, y);
          break;
        case 'holes':
          holesActions.beginDraggingHole(elementData.layer, elementData.id, x, y);
          break;
        default:
          break;
      }
    }
    event.stopPropagation();
  };
  var onMouseUp = function onMouseUp(viewerEvent) {
    var event = viewerEvent.originalEvent;
    var evt = new Event('mouseup-planner-event');
    evt.viewerEvent = viewerEvent;
    document.dispatchEvent(evt);
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
            break;
          case 'lines':
            linesActions.selectLine(elementData.layer, elementData.id);
            break;
          case 'holes':
            holesActions.selectHole(elementData.layer, elementData.id);
            break;
          case 'items':
            itemsActions.selectItem(elementData.layer, elementData.id);
            break;
          case 'none':
            projectActions.unselectAll();
            break;
        }
        break;
      case constants.MODE_WAITING_DRAWING_LINE:
        linesActions.beginDrawingLine(layerID, x, y, state.snapMask);
        break;
      case constants.MODE_DRAWING_LINE:
        linesActions.endDrawingLine(x, y, state.snapMask);
        linesActions.beginDrawingLine(layerID, x, y, state.snapMask);
        break;
      case constants.MODE_DRAWING_HOLE:
        holesActions.endDrawingHole(layerID, x, y);
        break;
      case constants.MODE_DRAWING_ITEM:
        itemsActions.endDrawingItem(layerID, x, y);
        break;
      case constants.MODE_DRAGGING_LINE:
        linesActions.endDraggingLine(x, y, state.snapMask);
        break;
      case constants.MODE_DRAGGING_VERTEX:
        verticesActions.endDraggingVertex(x, y, state.snapMask);
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
    event.stopPropagation();
  };
  var onChangeValue = function onChangeValue(value) {
    projectActions.updateZoomScale(value.a);
    return viewer2DActions.updateCameraView(value);
  };
  var onChangeTool = function onChangeTool(tool) {
    switch (tool) {
      case _reactSvgPanZoom.TOOL_NONE:
        projectActions.selectToolEdit();
        break;
      case _reactSvgPanZoom.TOOL_PAN:
        viewer2DActions.selectToolPan();
        break;
      case _reactSvgPanZoom.TOOL_ZOOM_IN:
        viewer2DActions.selectToolZoomIn();
        break;
      case _reactSvgPanZoom.TOOL_ZOOM_OUT:
        viewer2DActions.selectToolZoomOut();
        break;
    }
  };
  var _state$get$toJS = state.get('viewer2D').toJS(),
    e = _state$get$toJS.e,
    f = _state$get$toJS.f,
    SVGWidth = _state$get$toJS.SVGWidth,
    SVGHeight = _state$get$toJS.SVGHeight;
  var rulerSize = 15; //px
  var rulerUnitPixelSize = 100;
  var rulerBgColor = SharedStyle.COLORS.grey;
  var rulerFnColor = SharedStyle.MATERIAL_COLORS['500'].indigo;
  var rulerMkColor = SharedStyle.MATERIAL_COLORS['500'].indigo;
  var sceneWidth = SVGWidth || state.getIn(['scene', 'width']);
  var sceneHeight = SVGHeight || state.getIn(['scene', 'height']);
  var sceneZoom = state.zoom || 1;
  var rulerXElements = Math.ceil(sceneWidth / rulerUnitPixelSize) + 1;
  var rulerYElements = Math.ceil(sceneHeight / rulerUnitPixelSize) + 1;
  return /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      margin: 0,
      padding: 0,
      display: 'grid',
      gridRowGap: '0',
      gridColumnGap: '0',
      gridTemplateColumns: "".concat(rulerSize, "px ").concat(width - rulerSize, "px"),
      gridTemplateRows: "".concat(rulerSize, "px ").concat(height - rulerSize, "px"),
      position: 'relative'
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      gridColumn: 1,
      gridRow: 1,
      backgroundColor: rulerBgColor
    }
  }), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      gridRow: 1,
      gridColumn: 2,
      position: 'relative',
      overflow: 'hidden'
    },
    id: "rulerX"
  }, sceneWidth ? /*#__PURE__*/_react["default"].createElement(_export.RulerX, {
    unitPixelSize: rulerUnitPixelSize,
    zoom: sceneZoom,
    mouseX: state.mouse.get('x') || 0,
    width: width - rulerSize,
    zeroLeftPosition: e || 0,
    backgroundColor: rulerBgColor,
    fontColor: rulerFnColor,
    markerColor: rulerMkColor,
    positiveUnitsNumber: rulerXElements,
    negativeUnitsNumber: 0
  }) : null), /*#__PURE__*/_react["default"].createElement("div", {
    style: {
      gridColumn: 1,
      gridRow: 2,
      position: 'relative',
      overflow: 'hidden'
    },
    id: "rulerY"
  }, sceneHeight ? /*#__PURE__*/_react["default"].createElement(_export.RulerY, {
    unitPixelSize: rulerUnitPixelSize,
    zoom: sceneZoom,
    mouseY: state.mouse.get('y') || 0,
    height: height - rulerSize,
    zeroTopPosition: sceneHeight * sceneZoom + f || 0,
    backgroundColor: rulerBgColor,
    fontColor: rulerFnColor,
    markerColor: rulerMkColor,
    positiveUnitsNumber: rulerYElements,
    negativeUnitsNumber: 0
  }) : null), /*#__PURE__*/_react["default"].createElement(_reactSvgPanZoom.ReactSVGPanZoom, {
    style: {
      gridColumn: 2,
      gridRow: 2
    },
    width: width - rulerSize,
    height: height - rulerSize,
    value: viewer2D.isEmpty() ? _reactSvgPanZoom.INITIAL_VALUE : viewer2D.toJS(),
    onChangeValue: onChangeValue,
    tool: mode2Tool(mode),
    onChangeTool: onChangeTool,
    detectAutoPan: mode2DetectAutopan(mode),
    onMouseDown: onMouseDown,
    onMouseMove: onMouseMove,
    onMouseUp: onMouseUp,
    toolbarProps: {
      position: "none"
    },
    miniatureProps: {
      position: "none"
    }
  }, /*#__PURE__*/_react["default"].createElement("svg", {
    width: scene.width,
    height: scene.height
  }, /*#__PURE__*/_react["default"].createElement("defs", null, /*#__PURE__*/_react["default"].createElement("pattern", {
    id: "diagonalFill",
    patternUnits: "userSpaceOnUse",
    width: "4",
    height: "4",
    fill: "#FFF"
  }, /*#__PURE__*/_react["default"].createElement("rect", {
    x: "0",
    y: "0",
    width: "4",
    height: "4",
    fill: "#FFF"
  }), /*#__PURE__*/_react["default"].createElement("path", {
    d: "M-1,1 l2,-2 M0,4 l4,-4 M3,5 l2,-2",
    style: {
      stroke: '#8E9BA2',
      strokeWidth: 1
    }
  }))), /*#__PURE__*/_react["default"].createElement("g", {
    style: Object.assign(mode2Cursor(mode), mode2PointerEvents(mode))
  }, /*#__PURE__*/_react["default"].createElement(_state["default"], {
    state: state,
    catalog: catalog
  })))));
}
Viewer2D.propTypes = {
  state: _propTypes["default"].object.isRequired,
  width: _propTypes["default"].number.isRequired,
  height: _propTypes["default"].number.isRequired
};