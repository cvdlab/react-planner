'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state, action) {
  switch (action.type) {
    case _constants.SELECT_TOOL_DRAWING_HOLE:
      return selectToolDrawingHole(state, action.sceneComponentType);

    case _constants.UPDATE_DRAWING_HOLE:
      return updateDrawingHole(state, action.layerID, action.x, action.y, action.catalog);

    case _constants.END_DRAWING_HOLE:
      return endDrawingHole(state, action.layerID, action.x, action.y, action.catalog);

    case _constants.BEGIN_DRAGGING_HOLE:
      return beginDraggingHole(state, action.layerID, action.holeID, action.x, action.y);

    case _constants.UPDATE_DRAGGING_HOLE:
      return updateDraggingHole(state, action.x, action.y);

    case _constants.END_DRAGGING_HOLE:
      return endDraggingHole(state, action.x, action.y);

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

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function selectToolDrawingHole(state, sceneComponentType) {

  var snapElements = new _immutable.List().withMutations(function (snapElements) {
    var _state$getIn = state.getIn(['scene', 'layers', state.scene.selectedLayer]);

    var lines = _state$getIn.lines;
    var vertices = _state$getIn.vertices;


    lines.forEach(function (line) {
      var _vertices$get = vertices.get(line.vertices.get(0));

      var x1 = _vertices$get.x;
      var y1 = _vertices$get.y;

      var _vertices$get2 = vertices.get(line.vertices.get(1));

      var x2 = _vertices$get2.x;
      var y2 = _vertices$get2.y;


      (0, _snap.addLineSegmentSnap)(snapElements, x1, y1, x2, y2, 20, 1, line.id);
    });
  });

  return state.merge({
    mode: _constants.MODE_DRAWING_HOLE,
    snapElements: snapElements,
    drawingSupport: (0, _immutable.Map)({
      type: sceneComponentType
    })
  });
}

/** holes operations **/
function updateDrawingHole(state, layerID, x, y, catalog) {

  //calculate snap and overwrite coords if needed
  var snap = (0, _snap.nearestSnap)(state.snapElements, x, y);
  if (snap) {
    ;

    var _snap$point = snap.point;
    x = _snap$point.x;
    y = _snap$point.y;
  }var scene = state.scene.updateIn(['layers', layerID], function (layer) {
    return layer.withMutations(function (layer) {
      var selectedHole = layer.getIn(['selected', 'holes']).first();
      if (selectedHole) {
        (0, _layerOperations.unselect)(layer, 'holes', selectedHole);
        (0, _layerOperations.removeHole)(layer, selectedHole);
      }

      if (snap) {
        var lineID = snap.snap.related.get(0);
        var line = layer.getIn(['lines', lineID]);

        var _layer$vertices$get = layer.vertices.get(line.vertices.get(0));

        var x1 = _layer$vertices$get.x;
        var y1 = _layer$vertices$get.y;

        var _layer$vertices$get2 = layer.vertices.get(line.vertices.get(1));

        var x2 = _layer$vertices$get2.x;
        var y2 = _layer$vertices$get2.y;


        var offset = Geometry.pointPositionOnLineSegment(x1, y1, x2, y2, x, y);

        var _addHole = (0, _layerOperations.addHole)(layer, state.drawingSupport.get('type'), lineID, offset, catalog);

        var hole = _addHole.hole;

        (0, _layerOperations.select)(layer, 'holes', hole.id);
      }
    });
  });

  return state.set('scene', scene);
}

function endDrawingHole(state, layerID, x, y, catalog) {
  state = updateDrawingHole(state, layerID, x, y, catalog);
  return state.updateIn(['scene', 'layers', layerID], function (layer) {
    return (0, _layerOperations.unselectAll)(layer);
  });
}

function beginDraggingHole(state, layerID, holeID, x, y) {
  var layer = state.getIn(['scene', 'layers', layerID]);
  var hole = layer.getIn(['holes', holeID]);
  var line = layer.getIn(['lines', hole.line]);
  var v0 = layer.getIn(['vertices', line.vertices.get(0)]);
  var v1 = layer.getIn(['vertices', line.vertices.get(1)]);

  var snapElements = (0, _snap.addLineSegmentSnap)((0, _immutable.List)(), v0.x, v0.y, v1.x, v1.y, 9999999, 1, null);

  return state.merge({
    mode: _constants.MODE_DRAGGING_HOLE,
    snapElements: snapElements,
    draggingSupport: (0, _immutable.Map)({
      layerID: layerID,
      holeID: holeID,
      startPointX: x,
      startPointY: y
    })
  });
}

function updateDraggingHole(state, x, y) {

  //calculate snap and overwrite coords if needed
  var snap = (0, _snap.nearestSnap)(state.snapElements, x, y);
  if (!snap) return state;

  var draggingSupport = state.draggingSupport;
  var scene = state.scene;


  var layerID = draggingSupport.get('layerID');
  var holeID = draggingSupport.get('holeID');
  var startPointX = draggingSupport.get('startPointX');
  var startPointY = draggingSupport.get('startPointY');

  var layer = state.getIn(['scene', 'layers', layerID]);
  var hole = layer.getIn(['holes', holeID]);
  var line = layer.getIn(['lines', hole.line]);
  var v0 = layer.getIn(['vertices', line.vertices.get(0)]);
  var v1 = layer.getIn(['vertices', line.vertices.get(1)]);

  var _snap$point2 = snap.point;
  x = _snap$point2.x;
  y = _snap$point2.y;


  var offset = Geometry.pointPositionOnLineSegment(v0.x, v0.y, v1.x, v1.y, x, y);
  hole = hole.set('offset', offset);

  return state.merge({
    scene: scene.mergeIn(['layers', layerID, 'holes', holeID], hole)
  });
}

function endDraggingHole(state, x, y) {
  state = updateDraggingHole(state, x, y);
  return state.merge({
    mode: _constants.MODE_IDLE
  });
}