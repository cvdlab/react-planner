import { List, Map } from 'immutable';

import { SELECT_TOOL_DRAWING_LINE, BEGIN_DRAWING_LINE, UPDATE_DRAWING_LINE, END_DRAWING_LINE, BEGIN_DRAGGING_LINE, UPDATE_DRAGGING_LINE, END_DRAGGING_LINE, SELECT_LINE, MODE_IDLE, MODE_WAITING_DRAWING_LINE, MODE_DRAWING_LINE, MODE_DRAGGING_LINE } from '../constants';

import * as Geometry from '../utils/geometry';
import { addLine, replaceLineVertex, removeLine, select, unselect, addLineAvoidingIntersections, unselectAll, detectAndUpdateAreas, mergeEqualsVertices } from '../utils/layer-operations';
import { nearestSnap, addPointSnap, addLineSnap, addLineSegmentSnap } from '../utils/snap';
import { sceneSnapElements } from '../utils/snap-scene';
import { samePoints } from "../utils/geometry";

export default function (state, action) {
  switch (action.type) {
    case SELECT_TOOL_DRAWING_LINE:
      return selectToolDrawingLine(state, action.sceneComponentType);

    case BEGIN_DRAWING_LINE:
      return beginDrawingLine(state, action.layerID, action.x, action.y);

    case UPDATE_DRAWING_LINE:
      return updateDrawingLine(state, action.x, action.y);

    case END_DRAWING_LINE:
      return endDrawingLine(state, action.x, action.y);

    case BEGIN_DRAGGING_LINE:
      return beginDraggingLine(state, action.layerID, action.lineID, action.x, action.y);

    case UPDATE_DRAGGING_LINE:
      return updateDraggingLine(state, action.x, action.y);

    case END_DRAGGING_LINE:
      return endDraggingLine(state, action.x, action.y);

    case SELECT_LINE:
      return selectLine(state, action.layerID, action.lineID);

    default:
      return state;
  }
}

function selectToolDrawingLine(state, sceneComponentType) {
  return state.merge({
    mode: MODE_WAITING_DRAWING_LINE,
    drawingSupport: Map({
      type: sceneComponentType
    })
  });
}

/** lines operations **/
function beginDrawingLine(state, layerID, x, y) {
  var catalog = state.catalog;

  var snapElements = sceneSnapElements(state.scene, new List(), state.snapMask);
  var snap = null;

  if (state.snapMask && !state.snapMask.isEmpty()) {
    snap = nearestSnap(snapElements, x, y, state.snapMask);
    if (snap) {
      ;

      var _snap$point = snap.point;
      x = _snap$point.x;
      y = _snap$point.y;
    }snapElements = snapElements.withMutations(function (snapElements) {
      var a = void 0,
          b = void 0,
          c = void 0;

      var _Geometry$horizontalL = Geometry.horizontalLine(y);

      a = _Geometry$horizontalL.a;
      b = _Geometry$horizontalL.b;
      c = _Geometry$horizontalL.c;

      addLineSnap(snapElements, a, b, c, 10, 3, null);

      var _Geometry$verticalLin = Geometry.verticalLine(x);

      a = _Geometry$verticalLin.a;
      b = _Geometry$verticalLin.b;
      c = _Geometry$verticalLin.c;

      addLineSnap(snapElements, a, b, c, 10, 3, null);
    });
  }

  var drawingSupport = state.get('drawingSupport').set('layerID', layerID);
  var scene = state.scene.updateIn(['layers', layerID], function (layer) {
    return layer.withMutations(function (layer) {
      unselectAll(layer);

      var _addLine = addLine(layer, drawingSupport.get('type'), x, y, x, y, catalog),
          line = _addLine.line;

      select(layer, 'lines', line.id);
      select(layer, 'vertices', line.vertices.get(0));
      select(layer, 'vertices', line.vertices.get(1));
    });
  });

  return state.merge({
    mode: MODE_DRAWING_LINE,
    scene: scene,
    snapElements: snapElements,
    activeSnapElement: snap ? snap.snap : null,
    drawingSupport: drawingSupport
  });
}

function updateDrawingLine(state, x, y) {

  var snap = null;
  if (state.snapMask && !state.snapMask.isEmpty()) {
    snap = nearestSnap(state.snapElements, x, y, state.snapMask);
    if (snap) {
      ;
      var _snap$point2 = snap.point;
      x = _snap$point2.x;
      y = _snap$point2.y;
    }
  }

  var layerID = state.getIn(['drawingSupport', 'layerID']);
  var scene = state.scene.updateIn(['layers', layerID], function (layer) {
    return layer.withMutations(function (layer) {
      var lineID = layer.getIn(['selected', 'lines']).first();
      var vertex = void 0;

      var _replaceLineVertex = replaceLineVertex(layer, lineID, 1, x, y);

      layer = _replaceLineVertex.layer;
      vertex = _replaceLineVertex.vertex;

      select(layer, 'vertices', vertex.id);
      return layer;
    });
  });

  return state.merge({
    scene: scene,
    activeSnapElement: snap ? snap.snap : null
  });
}

function endDrawingLine(state, x, y) {

  var catalog = state.catalog;

  if (state.snapMask && !state.snapMask.isEmpty()) {
    var snap = nearestSnap(state.snapElements, x, y, state.snapMask);
    if (snap) {
      ;
      var _snap$point3 = snap.point;
      x = _snap$point3.x;
      y = _snap$point3.y;
    }
  }

  var layerID = state.getIn(['drawingSupport', 'layerID']);
  var scene = state.scene.updateIn(['layers', layerID], function (layer) {
    return layer.withMutations(function (layer) {
      var lineID = layer.getIn(['selected', 'lines']).first();
      var line = layer.getIn(['lines', lineID]);
      var v0 = layer.vertices.get(line.vertices.get(0));

      unselect(layer, 'lines', lineID);
      unselect(layer, 'vertices', line.vertices.get(0));
      unselect(layer, 'vertices', line.vertices.get(1));
      removeLine(layer, lineID);
      addLineAvoidingIntersections(layer, line.type, v0.x, v0.y, x, y, catalog);
      detectAndUpdateAreas(layer, catalog);
    });
  });

  return state.merge({
    mode: MODE_WAITING_DRAWING_LINE,
    scene: scene,
    snapElements: new List(),
    activeSnapElement: null,
    sceneHistory: state.sceneHistory.push(scene)
  });
}

function beginDraggingLine(state, layerID, lineID, x, y) {

  var snapElements = sceneSnapElements(state.scene, new List(), state.snapMask);

  var layer = state.scene.layers.get(layerID);
  var line = layer.lines.get(lineID);

  var vertex0 = layer.vertices.get(line.vertices.get(0));
  var vertex1 = layer.vertices.get(line.vertices.get(1));

  return state.merge({
    mode: MODE_DRAGGING_LINE,
    snapElements: snapElements,
    draggingSupport: Map({
      layerID: layerID, lineID: lineID,
      startPointX: x,
      startPointY: y,
      startVertex0X: vertex0.x,
      startVertex0Y: vertex0.y,
      startVertex1X: vertex1.x,
      startVertex1Y: vertex1.y
    })
  });
}

function updateDraggingLine(state, x, y) {

  var draggingSupport = state.draggingSupport;
  var snapElements = state.snapElements;

  var layerID = draggingSupport.get('layerID');
  var lineID = draggingSupport.get('lineID');
  var diffX = x - draggingSupport.get('startPointX');
  var diffY = y - draggingSupport.get('startPointY');
  var newVertex0X = draggingSupport.get('startVertex0X') + diffX;
  var newVertex0Y = draggingSupport.get('startVertex0Y') + diffY;
  var newVertex1X = draggingSupport.get('startVertex1X') + diffX;
  var newVertex1Y = draggingSupport.get('startVertex1Y') + diffY;

  var activeSnapElement = null;
  var curSnap0 = null,
      curSnap1 = null;
  if (state.snapMask && !state.snapMask.isEmpty()) {
    curSnap0 = nearestSnap(snapElements, newVertex0X, newVertex0Y, state.snapMask);
    curSnap1 = nearestSnap(snapElements, newVertex1X, newVertex1Y, state.snapMask);
  }

  var deltaX = 0,
      deltaY = 0;
  if (curSnap0 && curSnap1) {
    if (curSnap0.point.distance < curSnap1.point.distance) {
      deltaX = curSnap0.point.x - newVertex0X;
      deltaY = curSnap0.point.y - newVertex0Y;
      activeSnapElement = curSnap0.snap;
    } else {
      deltaX = curSnap1.point.x - newVertex1X;
      deltaY = curSnap1.point.y - newVertex1Y;
      activeSnapElement = curSnap1.snap;
    }
  } else {
    if (curSnap0) {
      deltaX = curSnap0.point.x - newVertex0X;
      deltaY = curSnap0.point.y - newVertex0Y;
      activeSnapElement = curSnap0.snap;
    }
    if (curSnap1) {
      deltaX = curSnap1.point.x - newVertex1X;
      deltaY = curSnap1.point.y - newVertex1Y;
      activeSnapElement = curSnap1.snap;
    }
  }

  newVertex0X += deltaX;
  newVertex0Y += deltaY;
  newVertex1X += deltaX;
  newVertex1Y += deltaY;

  return state.merge({
    activeSnapElement: activeSnapElement,
    scene: state.scene.updateIn(['layers', layerID], function (layer) {
      return layer.withMutations(function (layer) {
        var lineVertices = layer.getIn(['lines', lineID, 'vertices']);
        layer.updateIn(['vertices', lineVertices.get(0)], function (vertex) {
          return vertex.merge({ x: newVertex0X, y: newVertex0Y });
        });
        layer.updateIn(['vertices', lineVertices.get(1)], function (vertex) {
          return vertex.merge({ x: newVertex1X, y: newVertex1Y });
        });
        return layer;
      });
    })
  });
}

function endDraggingLine(state, x, y) {
  var catalog = state.catalog;
  var draggingSupport = state.draggingSupport;

  var layerID = draggingSupport.get('layerID');
  var layer = state.scene.layers.get(layerID);
  var lineID = draggingSupport.get('lineID');
  var line = layer.lines.get(lineID);

  var vertex0 = layer.vertices.get(line.vertices.get(0));
  var vertex1 = layer.vertices.get(line.vertices.get(1));

  var maxV = Geometry.maxVertex(vertex0, vertex1);
  var minV = Geometry.minVertex(vertex0, vertex1);

  var lineLength = Geometry.verticesDistance(minV, maxV);
  var alpha = Math.atan2(maxV.y - minV.y, maxV.x - minV.x);

  var holesWithOffsetPosition = [];
  layer.lines.get(lineID).holes.forEach(function (holeID) {
    var hole = layer.holes.get(holeID);
    var pointOnLine = lineLength * hole.offset;

    var offsetPosition = {
      x: pointOnLine * Math.cos(alpha) + minV.x,
      y: pointOnLine * Math.sin(alpha) + minV.y
    };

    holesWithOffsetPosition.push({ hole: hole, offsetPosition: offsetPosition });
  });

  return state.withMutations(function (state) {
    var scene = state.scene.updateIn(['layers', layerID], function (layer) {
      return layer.withMutations(function (layer) {

        var diffX = x - draggingSupport.get('startPointX');
        var diffY = y - draggingSupport.get('startPointY');
        var newVertex0X = draggingSupport.get('startVertex0X') + diffX;
        var newVertex0Y = draggingSupport.get('startVertex0Y') + diffY;
        var newVertex1X = draggingSupport.get('startVertex1X') + diffX;
        var newVertex1Y = draggingSupport.get('startVertex1Y') + diffY;

        if (state.snapMask && !state.snapMask.isEmpty()) {

          var curSnap0 = nearestSnap(state.snapElements, newVertex0X, newVertex0Y, state.snapMask);
          var curSnap1 = nearestSnap(state.snapElements, newVertex1X, newVertex1Y, state.snapMask);

          var deltaX = 0,
              deltaY = 0;
          if (curSnap0 && curSnap1) {
            if (curSnap0.point.distance < curSnap1.point.distance) {
              deltaX = curSnap0.point.x - newVertex0X;
              deltaY = curSnap0.point.y - newVertex0Y;
            } else {
              deltaX = curSnap1.point.x - newVertex1X;
              deltaY = curSnap1.point.y - newVertex1Y;
            }
          } else {
            if (curSnap0) {
              deltaX = curSnap0.point.x - newVertex0X;
              deltaY = curSnap0.point.y - newVertex0Y;
            }
            if (curSnap1) {
              deltaX = curSnap1.point.x - newVertex1X;
              deltaY = curSnap1.point.y - newVertex1Y;
            }
          }

          newVertex0X += deltaX;
          newVertex0Y += deltaY;
          newVertex1X += deltaX;
          newVertex1Y += deltaY;
        }

        mergeEqualsVertices(layer, line.vertices.get(0));
        mergeEqualsVertices(layer, line.vertices.get(1));

        removeLine(layer, lineID);

        if (!samePoints({ newVertex0X: newVertex0X, newVertex0Y: newVertex0Y }, { newVertex1X: newVertex1X, newVertex1Y: newVertex1Y })) {
          addLineAvoidingIntersections(layer, line.type, newVertex0X, newVertex0Y, newVertex1X, newVertex1Y, catalog, line.properties, holesWithOffsetPosition);
        }

        detectAndUpdateAreas(layer, catalog);
      });
    });

    state.merge({
      mode: MODE_IDLE,
      scene: scene,
      draggingSupport: null,
      activeSnapElement: null,
      snapElements: new List(),
      sceneHistory: state.sceneHistory.push(scene)
    });
  });
}

function selectLine(state, layerID, lineID) {
  var scene = state.scene;

  scene = scene.merge({
    layers: scene.layers.map(unselectAll),
    selectedLayer: layerID
  });

  scene = scene.updateIn(['layers', layerID], function (layer) {
    return layer.withMutations(function (layer) {
      var line = layer.getIn(['lines', lineID]);
      select(layer, 'lines', lineID);
      select(layer, 'vertices', line.vertices.get(0));
      select(layer, 'vertices', line.vertices.get(1));
    });
  });

  return state.merge({
    scene: scene,
    sceneHistory: state.sceneHistory.push(scene)
  });
}