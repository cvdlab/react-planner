import {List, Map} from 'immutable';

import {
  SELECT_TOOL_DRAWING_HOLE,
  UPDATE_DRAWING_HOLE,
  END_DRAWING_HOLE,
  BEGIN_DRAGGING_HOLE,
  UPDATE_DRAGGING_HOLE,
  END_DRAGGING_HOLE,

  MODE_IDLE,
  MODE_DRAWING_HOLE,
  MODE_DRAGGING_HOLE,
} from '../constants';

import * as Geometry from '../utils/geometry';
import {
  select,
  unselect,
  unselectAll,
  addHole,
  removeHole
} from '../utils/layer-operations';
import {nearestSnap, addPointSnap, addLineSnap, addLineSegmentSnap} from '../utils/snap';

export default function (state, action) {
  switch (action.type) {
    case SELECT_TOOL_DRAWING_HOLE:
      return selectToolDrawingHole(state, action.sceneComponentType);

    case UPDATE_DRAWING_HOLE:
      return updateDrawingHole(state, action.layerID, action.x, action.y, action.catalog);

    case END_DRAWING_HOLE:
      return endDrawingHole(state, action.layerID, action.x, action.y, action.catalog);

    case BEGIN_DRAGGING_HOLE:
      return beginDraggingHole(state, action.layerID, action.holeID, action.x, action.y);

    case UPDATE_DRAGGING_HOLE:
      return updateDraggingHole(state, action.x, action.y);

    case END_DRAGGING_HOLE:
      return endDraggingHole(state, action.x, action.y);

    default:
      return state;
  }
}

function selectToolDrawingHole(state, sceneComponentType) {

  let snapElements = (new List()).withMutations(snapElements => {
    let {lines, vertices} = state.getIn(['scene', 'layers', state.scene.selectedLayer]);

    lines.forEach(line => {
      let {x: x1, y: y1} = vertices.get(line.vertices.get(0));
      let {x: x2, y:y2} = vertices.get(line.vertices.get(1));

      addLineSegmentSnap(snapElements, x1, y1, x2, y2, 20, 1, line.id);
    })
  });

  return state.merge({
    mode: MODE_DRAWING_HOLE,
    snapElements,
    drawingSupport: Map({
      type: sceneComponentType
    })
  });
}

/** holes operations **/
function updateDrawingHole(state, layerID, x, y, catalog) {

  //calculate snap and overwrite coords if needed
  let snap = nearestSnap(state.snapElements, x, y);
  if (snap) ({x, y} = snap.point);

  let scene = state.scene.updateIn(['layers', layerID], layer => layer.withMutations(layer => {
    let selectedHole = layer.getIn(['selected', 'holes']).first();
    if (selectedHole) {
      unselect(layer, 'holes', selectedHole);
      removeHole(layer, selectedHole);
    }

    if (snap) {
      let lineID = snap.snap.related.get(0);
      let line = layer.getIn(['lines', lineID]);
      let {x: x1, y: y1} = layer.vertices.get(line.vertices.get(0));
      let {x: x2, y:y2} = layer.vertices.get(line.vertices.get(1));

      let offset = Geometry.pointPositionOnLineSegment(x1, y1, x2, y2, x, y);
      let {hole} = addHole(layer, state.drawingSupport.get('type'), lineID, offset, catalog);
      select(layer, 'holes', hole.id);
    }
  }));

  return state.set('scene', scene);
}

function endDrawingHole(state, layerID, x, y, catalog) {
  state = updateDrawingHole(state, layerID, x, y, catalog);
  let scene = state.scene.updateIn(['layers', layerID], layer => unselectAll(layer));
  return state.merge({
    scene,
    sceneHistory: state.sceneHistory.push(scene)
  });
}

function beginDraggingHole(state, layerID, holeID, x, y) {
  let layer = state.getIn(['scene', 'layers', layerID]);
  let hole = layer.getIn(['holes', holeID]);
  let line = layer.getIn(['lines', hole.line]);
  let v0 = layer.getIn(['vertices', line.vertices.get(0)]);
  let v1 = layer.getIn(['vertices', line.vertices.get(1)]);

  let snapElements = addLineSegmentSnap(List(), v0.x, v0.y, v1.x, v1.y, 9999999, 1, null);

  return state.merge({
    mode: MODE_DRAGGING_HOLE,
    snapElements,
    draggingSupport: Map({
      layerID,
      holeID,
      startPointX: x,
      startPointY: y,
    })
  });
}

function updateDraggingHole(state, x, y) {

  //calculate snap and overwrite coords if needed
  let snap = nearestSnap(state.snapElements, x, y);
  if (!snap) return state;

  let {draggingSupport, scene} = state;

  let layerID = draggingSupport.get('layerID');
  let holeID = draggingSupport.get('holeID');
  let startPointX = draggingSupport.get('startPointX');
  let startPointY = draggingSupport.get('startPointY');

  let layer = state.getIn(['scene', 'layers', layerID]);
  let hole = layer.getIn(['holes', holeID]);
  let line = layer.getIn(['lines', hole.line]);
  let v0 = layer.getIn(['vertices', line.vertices.get(0)]);
  let v1 = layer.getIn(['vertices', line.vertices.get(1)]);

  ({x, y} = snap.point);

  let offset = Geometry.pointPositionOnLineSegment(v0.x, v0.y, v1.x, v1.y, x, y);
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
