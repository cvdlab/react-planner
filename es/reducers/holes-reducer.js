import { List, Map } from 'immutable';

import { SELECT_TOOL_DRAWING_HOLE, UPDATE_DRAWING_HOLE, END_DRAWING_HOLE, BEGIN_DRAGGING_HOLE, UPDATE_DRAGGING_HOLE, END_DRAGGING_HOLE, SELECT_HOLE, MODE_IDLE, MODE_DRAWING_HOLE, MODE_DRAGGING_HOLE } from '../constants';

import * as Geometry from '../utils/geometry';
import { select, unselect, unselectAll, addHole, removeHole } from '../utils/layer-operations';
import { nearestSnap, addPointSnap, addLineSnap, addLineSegmentSnap } from '../utils/snap';

export default function (state, action) {
  switch (action.type) {
    case SELECT_TOOL_DRAWING_HOLE:
      return selectToolDrawingHole(state, action.sceneComponentType);

    case UPDATE_DRAWING_HOLE:
      return updateDrawingHole(state, action.layerID, action.x, action.y);

    case END_DRAWING_HOLE:
      return endDrawingHole(state, action.layerID, action.x, action.y);

    case BEGIN_DRAGGING_HOLE:
      return beginDraggingHole(state, action.layerID, action.holeID, action.x, action.y);

    case UPDATE_DRAGGING_HOLE:
      return updateDraggingHole(state, action.x, action.y);

    case END_DRAGGING_HOLE:
      return endDraggingHole(state, action.x, action.y);

    case SELECT_HOLE:
      return selectHole(state, action.layerID, action.holeID);

    default:
      return state;
  }
}

function selectToolDrawingHole(state, sceneComponentType) {

  var snapElements = new List().withMutations(function (snapElements) {
    var _state$getIn = state.getIn(['scene', 'layers', state.scene.selectedLayer]),
        lines = _state$getIn.lines,
        vertices = _state$getIn.vertices;

    lines.forEach(function (line) {
      var _vertices$get = vertices.get(line.vertices.get(0)),
          x1 = _vertices$get.x,
          y1 = _vertices$get.y;

      var _vertices$get2 = vertices.get(line.vertices.get(1)),
          x2 = _vertices$get2.x,
          y2 = _vertices$get2.y;

      addLineSegmentSnap(snapElements, x1, y1, x2, y2, 20, 1, line.id);
    });
  });

  return state.merge({
    mode: MODE_DRAWING_HOLE,
    snapElements: snapElements,
    drawingSupport: Map({
      type: sceneComponentType
    })
  });
}

/** holes operations **/
function updateDrawingHole(state, layerID, x, y) {
  var catalog = state.catalog;

  //calculate snap and overwrite coords if needed
  var snap = nearestSnap(state.snapElements, x, y);
  if (snap) {
    ;

    var _snap$point = snap.point;
    x = _snap$point.x;
    y = _snap$point.y;
  }var scene = state.scene.updateIn(['layers', layerID], function (layer) {
    return layer.withMutations(function (layer) {
      var selectedHole = layer.getIn(['selected', 'holes']).first();
      if (selectedHole) {
        unselect(layer, 'holes', selectedHole);
        removeHole(layer, selectedHole);
      }

      if (snap) {
        var lineID = snap.snap.related.get(0);
        var line = layer.getIn(['lines', lineID]);

        var _layer$vertices$get = layer.vertices.get(line.vertices.get(0)),
            x1 = _layer$vertices$get.x,
            y1 = _layer$vertices$get.y;

        var _layer$vertices$get2 = layer.vertices.get(line.vertices.get(1)),
            x2 = _layer$vertices$get2.x,
            y2 = _layer$vertices$get2.y;

        var offset = Geometry.pointPositionOnLineSegment(x1, y1, x2, y2, x, y);

        var _addHole = addHole(layer, state.drawingSupport.get('type'), lineID, offset, catalog),
            hole = _addHole.hole;

        select(layer, 'holes', hole.id);
      }
    });
  });

  return state.set('scene', scene);
}

function endDrawingHole(state, layerID, x, y) {
  var catalog = state.catalog;

  state = updateDrawingHole(state, layerID, x, y, catalog);
  var scene = state.scene.updateIn(['layers', layerID], function (layer) {
    return unselectAll(layer);
  });
  return state.merge({
    scene: scene,
    sceneHistory: state.sceneHistory.push(scene)
  });
}

function beginDraggingHole(state, layerID, holeID, x, y) {
  var layer = state.getIn(['scene', 'layers', layerID]);
  var hole = layer.getIn(['holes', holeID]);
  var line = layer.getIn(['lines', hole.line]);
  var v0 = layer.getIn(['vertices', line.vertices.get(0)]);
  var v1 = layer.getIn(['vertices', line.vertices.get(1)]);

  var snapElements = addLineSegmentSnap(List(), v0.x, v0.y, v1.x, v1.y, 9999999, 1, null);

  return state.merge({
    mode: MODE_DRAGGING_HOLE,
    snapElements: snapElements,
    draggingSupport: Map({
      layerID: layerID,
      holeID: holeID,
      startPointX: x,
      startPointY: y
    })
  });
}

function updateDraggingHole(state, x, y) {

  //calculate snap and overwrite coords if needed
  var snap = nearestSnap(state.snapElements, x, y);
  if (!snap) return state;

  var draggingSupport = state.draggingSupport,
      scene = state.scene;


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
    mode: MODE_IDLE,
    sceneHistory: state.sceneHistory.push(state.scene)
  });
}

function selectHole(state, layerID, holeID) {
  var scene = state.scene;

  scene = scene.merge({
    layers: scene.layers.map(unselectAll),
    selectedLayer: layerID
  });

  scene = scene.updateIn(['layers', layerID], function (layer) {
    return layer.withMutations(function (layer) {
      select(layer, 'holes', holeID);
    });
  });

  return state.merge({
    scene: scene,
    sceneHistory: state.sceneHistory.push(scene)
  });
}