import {List, Map} from 'immutable';

import {
  SELECT_TOOL_DRAWING_HOLE,
  UPDATE_DRAWING_HOLE,
  END_DRAWING_HOLE,

  MODE_IDLE,
  MODE_DRAWING_HOLE,
} from '../constants';

import * as Geometry from '../utils/geometry';
import {
  select,
  unselect,
  unselectAll,
  addHole,
  removeHole
} from '../utils/layer-operations';
import {nearestDrawingHelper, addPointHelper, addLineHelper, addLineSegmentHelper} from '../utils/drawing-helpers';

export default function (state, action) {
  switch (action.type) {
    case SELECT_TOOL_DRAWING_HOLE:
      return selectToolDrawingHole(state, action.sceneComponentType);

    case UPDATE_DRAWING_HOLE:
      return updateDrawingHole(state, action.layerID, action.x, action.y);

    case END_DRAWING_HOLE:
      return endDrawingHole(state, action.layerID, action.x, action.y);

    default:
      return state;
  }
}

function selectToolDrawingHole(state, sceneComponentType) {

  let drawingHelpers = (new List()).withMutations(drawingHelpers => {
    let {lines, vertices} = state.getIn(['scene', 'layers', state.scene.selectedLayer]);

    lines.forEach(line => {
      let {x: x1, y: y1} = vertices.get(line.vertices.get(0));
      let {x: x2, y:y2} = vertices.get(line.vertices.get(1));

      addLineSegmentHelper(drawingHelpers, x1, y1, x2, y2, 20, 1, line.id);
    })
  });

  return state.merge({
    mode: MODE_DRAWING_HOLE,
    drawingHelpers,
    drawSupport: Map({
      type: sceneComponentType
    })
  });
}

/** holes operations **/
function updateDrawingHole(state, layerID, x, y) {

  let nearestHelper = nearestDrawingHelper(state.drawingHelpers, x, y);
  let helper = null;
  if (nearestHelper) {
    ({x, y} = nearestHelper.point);
    helper = nearestHelper.helper;
  }

  let scene = state.scene.updateIn(['layers', layerID], layer => layer.withMutations(layer => {
    let selectedHole = layer.getIn(['selected', 'holes']).first();
    if (selectedHole) {
      unselect(layer, 'holes', selectedHole);
      removeHole(layer, selectedHole);
    }

    if (helper) {
      let lineID = helper.related.get(0);
      let line = layer.getIn(['lines', lineID]);
      let {x: x1, y: y1} = layer.vertices.get(line.vertices.get(0));
      let {x: x2, y:y2} = layer.vertices.get(line.vertices.get(1));

      let offset = Geometry.pointPositionOnLineSegment(x1, y1, x2, y2, x, y);
      let {hole} = addHole(layer, state.drawSupport.get('type'), lineID, offset);
      select(layer, 'holes', hole.id);
    }
  }));

  return state.set('scene', scene);
}

function endDrawingHole(state, layerID, x, y) {
  state = updateDrawingHole(state, layerID, x, y);
  return state.updateIn(['scene', 'layers', layerID], layer => unselectAll(layer));

}
