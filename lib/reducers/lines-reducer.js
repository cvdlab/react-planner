'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state, action) {
  switch (action.type) {
    case _constants.SELECT_TOOL_DRAWING_LINE:
      return selectToolDrawingLine(state, action.sceneComponentType);

    case _constants.BEGIN_DRAWING_LINE:
      return beginDrawingLine(state, action.layerID, action.x, action.y, action.detectSnap);

    case _constants.UPDATE_DRAWING_LINE:
      return updateDrawingLine(state, action.x, action.y, action.detectSnap);

    case _constants.END_DRAWING_LINE:
      return endDrawingLine(state, action.x, action.y, action.detectSnap);

    case _constants.BEGIN_DRAGGING_LINE:
      return beginDraggingLine(state, action.layerID, action.lineID, action.x, action.y, action.detectSnap);

    case _constants.UPDATE_DRAGGING_LINE:
      return updateDraggingLine(state, action.x, action.y, action.detectSnap);

    case _constants.END_DRAGGING_LINE:
      return endDraggingLine(state, action.x, action.y, action.detectSnap);

    case _constants.SELECT_LINE:
      return selectLine(state, action.layerID, action.lineID);

    default:
      return state;
  }
};

var _immutable = require('immutable');

var _constants = require('../constants');

var _geometry = require('../utils/geometry');

var Geometry = _interopRequireWildcard(_geometry);

var _layerOperations = require('../utils/layer-operations');

var _snap = require('../utils/snap');

var _snapScene = require('../utils/snap-scene');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function selectToolDrawingLine(state, sceneComponentType) {
  return state.merge({
    mode: _constants.MODE_WAITING_DRAWING_LINE,
    drawingSupport: (0, _immutable.Map)({
      type: sceneComponentType
    })
  });
}

/** lines operations **/
function beginDrawingLine(state, layerID, x, y, detectSnap) {
  var catalog = state.catalog;

  var snapElements = (0, _snapScene.sceneSnapElements)(state.scene);
  var snap = null;

  if (detectSnap) {
    snap = (0, _snap.nearestSnap)(snapElements, x, y);
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

      (0, _snap.addLineSnap)(snapElements, a, b, c, 10, 3, null);

      var _Geometry$verticalLin = Geometry.verticalLine(x);

      a = _Geometry$verticalLin.a;
      b = _Geometry$verticalLin.b;
      c = _Geometry$verticalLin.c;

      (0, _snap.addLineSnap)(snapElements, a, b, c, 10, 3, null);
    });
  }

  var drawingSupport = state.get('drawingSupport').set('layerID', layerID);
  var scene = state.scene.updateIn(['layers', layerID], function (layer) {
    return layer.withMutations(function (layer) {
      (0, _layerOperations.unselectAll)(layer);

      var _addLine = (0, _layerOperations.addLine)(layer, drawingSupport.get('type'), x, y, x, y, catalog),
          line = _addLine.line;

      (0, _layerOperations.select)(layer, 'lines', line.id);
      (0, _layerOperations.select)(layer, 'vertices', line.vertices.get(0));
      (0, _layerOperations.select)(layer, 'vertices', line.vertices.get(1));
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

function updateDrawingLine(state, x, y, detectSnap) {

  var catalog = state.catalog;

  var snap = null;
  if (detectSnap) {
    snap = (0, _snap.nearestSnap)(state.snapElements, x, y);
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

      var _replaceLineVertex = (0, _layerOperations.replaceLineVertex)(layer, lineID, 1, x, y);

      layer = _replaceLineVertex.layer;
      vertex = _replaceLineVertex.vertex;

      (0, _layerOperations.select)(layer, 'vertices', vertex.id);
      return layer;
    });
  });

  return state.merge({
    scene: scene,
    activeSnapElement: snap ? snap.snap : null
  });
}

function endDrawingLine(state, x, y, detectSnap) {
  var catalog = state.catalog;

  if (detectSnap) {
    var snap = (0, _snap.nearestSnap)(state.snapElements, x, y);
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

      (0, _layerOperations.unselect)(layer, 'lines', lineID);
      (0, _layerOperations.unselect)(layer, 'vertices', line.vertices.get(0));
      (0, _layerOperations.unselect)(layer, 'vertices', line.vertices.get(1));
      (0, _layerOperations.removeLine)(layer, lineID);
      (0, _layerOperations.addLineAvoidingIntersections)(layer, line.type, v0.x, v0.y, x, y, catalog);
      (0, _layerOperations.detectAndUpdateAreas)(layer, catalog);
    });
  });

  return state.merge({
    mode: _constants.MODE_WAITING_DRAWING_LINE,
    scene: scene,
    snapElements: new _immutable.List(),
    activeSnapElement: null,
    sceneHistory: state.sceneHistory.push(scene)
  });
}

function beginDraggingLine(state, layerID, lineID, x, y, detectSnap) {

  var catalog = state.catalog;

  var snapElements = (0, _snapScene.sceneSnapElements)(state.scene);

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

function updateDraggingLine(state, x, y, detectSnap) {
  var catalog = state.catalog;

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
  if (detectSnap) {
    curSnap0 = (0, _snap.nearestSnap)(snapElements, newVertex0X, newVertex0Y);
    curSnap1 = (0, _snap.nearestSnap)(snapElements, newVertex1X, newVertex1Y);
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

function endDraggingLine(state, x, y, detectSnap) {
  var catalog = state.catalog;
  var draggingSupport = state.draggingSupport;

  var layerID = draggingSupport.get('layerID');
  var layer = state.scene.layers.get(layerID);
  var lineID = draggingSupport.get('lineID');
  var line = layer.lines.get(lineID);

  var vertex0 = layer.vertices.get(line.vertices.get(0));
  var vertex1 = layer.vertices.get(line.vertices.get(1));

  var orderedVertices = Geometry.orderVertices([vertex0, vertex1]);
  var lineLength = Geometry.pointsDistance(orderedVertices[0].x, orderedVertices[0].y, orderedVertices[1].x, orderedVertices[1].y);

  var alpha = Math.atan2(orderedVertices[1].y - orderedVertices[0].y, orderedVertices[1].x - orderedVertices[0].x);

  var holesWithOffsetPosition = [];
  layer.lines.get(lineID).holes.forEach(function (holeID) {
    var hole = layer.holes.get(holeID);

    var offset = hole.offset;

    var xp = lineLength * offset * Math.cos(alpha) + orderedVertices[0].x;
    var yp = lineLength * offset * Math.sin(alpha) + orderedVertices[0].y;

    holesWithOffsetPosition.push({ hole: hole, offsetPosition: { x: xp, y: yp } });
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

        if (detectSnap) {

          var curSnap0 = (0, _snap.nearestSnap)(state.snapElements, newVertex0X, newVertex0Y);
          var curSnap1 = (0, _snap.nearestSnap)(state.snapElements, newVertex1X, newVertex1Y);

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
        (0, _layerOperations.removeLine)(layer, lineID);
        (0, _layerOperations.addLineAvoidingIntersections)(layer, line.type, newVertex0X, newVertex0Y, newVertex1X, newVertex1Y, catalog, line.properties, holesWithOffsetPosition);
        (0, _layerOperations.detectAndUpdateAreas)(layer, catalog);
      });
    });

    state.merge({
      mode: _constants.MODE_IDLE,
      scene: scene,
      draggingSupport: null,
      activeSnapElement: null,
      snapElements: new _immutable.List(),
      sceneHistory: state.sceneHistory.push(scene)
    });
  });
}

function selectLine(state, layerID, lineID) {
  var scene = state.scene;

  scene = scene.merge({
    layers: scene.layers.map(_layerOperations.unselectAll),
    selectedLayer: layerID
  });

  scene = scene.updateIn(['layers', layerID], function (layer) {
    return layer.withMutations(function (layer) {
      var line = layer.getIn(['lines', lineID]);
      (0, _layerOperations.select)(layer, 'lines', lineID);
      (0, _layerOperations.select)(layer, 'vertices', line.vertices.get(0));
      (0, _layerOperations.select)(layer, 'vertices', line.vertices.get(1));
    });
  });

  return state.merge({
    scene: scene,
    sceneHistory: state.sceneHistory.push(scene)
  });
}