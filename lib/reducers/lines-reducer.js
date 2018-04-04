'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state, action) {
  switch (action.type) {
    case _constants.SELECT_TOOL_DRAWING_LINE:
      return selectToolDrawingLine(state, action.sceneComponentType);

    case _constants.BEGIN_DRAWING_LINE:
      return beginDrawingLine(state, action.layerID, action.x, action.y);

    case _constants.UPDATE_DRAWING_LINE:
      return updateDrawingLine(state, action.x, action.y);

    case _constants.END_DRAWING_LINE:
      return endDrawingLine(state, action.x, action.y);

    case _constants.BEGIN_DRAGGING_LINE:
      return beginDraggingLine(state, action.layerID, action.lineID, action.x, action.y);

    case _constants.UPDATE_DRAGGING_LINE:
      return updateDraggingLine(state, action.x, action.y);

    case _constants.END_DRAGGING_LINE:
      return endDraggingLine(state, action.x, action.y);

    case _constants.SELECT_LINE:
      return selectLine(state, action.layerID, action.lineID);

    default:
      return state;
  }
};

var _immutable = require('immutable');

var _constants = require('../constants');

var _export = require('../utils/export');

function selectToolDrawingLine(state, sceneComponentType) {
  return state.merge({
    mode: _constants.MODE_WAITING_DRAWING_LINE,
    drawingSupport: (0, _immutable.Map)({
      type: sceneComponentType
    })
  });
}

/** lines operations **/
function beginDrawingLine(state, layerID, x, y) {
  var catalog = state.catalog;

  var snapElements = _export.SnapSceneUtils.sceneSnapElements(state.scene, new _immutable.List(), state.snapMask);
  var snap = null;

  if (state.snapMask && !state.snapMask.isEmpty()) {
    snap = _export.SnapUtils.nearestSnap(snapElements, x, y, state.snapMask);
    if (snap) {
      ;

      var _snap$point = snap.point;
      x = _snap$point.x;
      y = _snap$point.y;
    }snapElements = snapElements.withMutations(function (snapElements) {
      var a = void 0,
          b = void 0,
          c = void 0;

      var _GeometryUtils$horizo = _export.GeometryUtils.horizontalLine(y);

      a = _GeometryUtils$horizo.a;
      b = _GeometryUtils$horizo.b;
      c = _GeometryUtils$horizo.c;

      _export.SnapUtils.addLineSnap(snapElements, a, b, c, 10, 3, null);

      var _GeometryUtils$vertic = _export.GeometryUtils.verticalLine(x);

      a = _GeometryUtils$vertic.a;
      b = _GeometryUtils$vertic.b;
      c = _GeometryUtils$vertic.c;

      _export.SnapUtils.addLineSnap(snapElements, a, b, c, 10, 3, null);
    });
  }

  var drawingSupport = state.get('drawingSupport').set('layerID', layerID);
  var scene = state.scene.updateIn(['layers', layerID], function (layer) {
    return layer.withMutations(function (layer) {
      _export.LayerOperations.unselectAll(layer);

      var _LayerOperations$addL = _export.LayerOperations.addLine(layer, drawingSupport.get('type'), x, y, x, y, catalog),
          line = _LayerOperations$addL.line;

      _export.LayerOperations.select(layer, 'lines', line.id);
      _export.LayerOperations.select(layer, 'vertices', line.vertices.get(0));
      _export.LayerOperations.select(layer, 'vertices', line.vertices.get(1));
    });
  });

  return state.merge({
    mode: _constants.MODE_DRAWING_LINE,
    scene: scene,
    snapElements: snapElements,
    activeSnapElement: snap ? snap.snap : null,
    drawingSupport: drawingSupport
  });
}

function updateDrawingLine(state, x, y) {

  var snap = null;
  if (state.snapMask && !state.snapMask.isEmpty()) {
    snap = _export.SnapUtils.nearestSnap(state.snapElements, x, y, state.snapMask);
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

      var _LayerOperations$repl = _export.LayerOperations.replaceLineVertex(layer, lineID, 1, x, y);

      layer = _LayerOperations$repl.layer;
      vertex = _LayerOperations$repl.vertex;

      _export.LayerOperations.select(layer, 'vertices', vertex.id);
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
    var snap = _export.SnapUtils.nearestSnap(state.snapElements, x, y, state.snapMask);
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

      _export.LayerOperations.unselect(layer, 'lines', lineID);
      _export.LayerOperations.unselect(layer, 'vertices', line.vertices.get(0));
      _export.LayerOperations.unselect(layer, 'vertices', line.vertices.get(1));
      _export.LayerOperations.removeLine(layer, lineID);
      _export.LayerOperations.addLineAvoidingIntersections(layer, line.type, v0.x, v0.y, x, y, catalog);
      _export.LayerOperations.detectAndUpdateAreas(layer, catalog);
    });
  });

  return state.merge({
    mode: _constants.MODE_WAITING_DRAWING_LINE,
    scene: scene,
    snapElements: new _immutable.List(),
    activeSnapElement: null,
    sceneHistory: _export.history.historyPush(state.sceneHistory, scene)
  });
}

function beginDraggingLine(state, layerID, lineID, x, y) {

  var snapElements = _export.SnapSceneUtils.sceneSnapElements(state.scene, new _immutable.List(), state.snapMask);

  var layer = state.scene.layers.get(layerID);
  var line = layer.lines.get(lineID);

  var vertex0 = layer.vertices.get(line.vertices.get(0));
  var vertex1 = layer.vertices.get(line.vertices.get(1));

  return state.merge({
    mode: _constants.MODE_DRAGGING_LINE,
    snapElements: snapElements,
    draggingSupport: (0, _immutable.Map)({
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
    curSnap0 = _export.SnapUtils.nearestSnap(snapElements, newVertex0X, newVertex0Y, state.snapMask);
    curSnap1 = _export.SnapUtils.nearestSnap(snapElements, newVertex1X, newVertex1Y, state.snapMask);
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

  var maxV = _export.GeometryUtils.maxVertex(vertex0, vertex1);
  var minV = _export.GeometryUtils.minVertex(vertex0, vertex1);

  var lineLength = _export.GeometryUtils.verticesDistance(minV, maxV);
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

          var curSnap0 = _export.SnapUtils.nearestSnap(state.snapElements, newVertex0X, newVertex0Y, state.snapMask);
          var curSnap1 = _export.SnapUtils.nearestSnap(state.snapElements, newVertex1X, newVertex1Y, state.snapMask);

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

        _export.LayerOperations.mergeEqualsVertices(layer, line.vertices.get(0));
        _export.LayerOperations.mergeEqualsVertices(layer, line.vertices.get(1));

        _export.LayerOperations.removeLine(layer, lineID);

        if (!_export.GeometryUtils.samePoints({ newVertex0X: newVertex0X, newVertex0Y: newVertex0Y }, { newVertex1X: newVertex1X, newVertex1Y: newVertex1Y })) {
          _export.LayerOperations.addLineAvoidingIntersections(layer, line.type, newVertex0X, newVertex0Y, newVertex1X, newVertex1Y, catalog, line.properties, holesWithOffsetPosition);
        }

        _export.LayerOperations.detectAndUpdateAreas(layer, catalog);
      });
    });

    state.merge({
      mode: _constants.MODE_IDLE,
      scene: scene,
      draggingSupport: null,
      activeSnapElement: null,
      snapElements: new _immutable.List(),
      sceneHistory: _export.history.historyPush(state.sceneHistory, scene)
    });
  });
}

function selectLine(state, layerID, lineID) {
  var scene = state.scene;

  scene = scene.merge({
    layers: scene.layers.map(_export.LayerOperations.unselectAll),
    selectedLayer: layerID
  });

  scene = scene.updateIn(['layers', layerID], function (layer) {
    return layer.withMutations(function (layer) {
      var line = layer.getIn(['lines', lineID]);
      _export.LayerOperations.select(layer, 'lines', lineID);
      _export.LayerOperations.select(layer, 'vertices', line.vertices.get(0));
      _export.LayerOperations.select(layer, 'vertices', line.vertices.get(1));
    });
  });

  return state.merge({
    scene: scene,
    sceneHistory: _export.history.historyPush(state.sceneHistory, scene)
  });
}