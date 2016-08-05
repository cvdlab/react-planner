import {List} from 'immutable';

import {
  SELECT_TOOL_DRAWING_LINE,
  BEGIN_DRAWING_LINE,
  UPDATE_DRAWING_LINE,
  END_DRAWING_LINE,
  SELECT_TOOL_DRAWING_HOLE,
  UPDATE_DRAWING_HOLE,
  END_DRAWING_HOLE,
  MODE_WAITING_DRAWING_LINE,
  MODE_DRAWING_HOLE,
  MODE_DRAWING_LINE
} from '../constants';

import * as Geometry from '../utils/geometry';
import {
  addLine,
  replaceLineVertex,
  removeLine,
  select,
  unselect,
  addLineAvoidingIntersections,
  unselectAll,
  detectAndUpdateAreas,
  addHole,
  removeHole
} from '../utils/layer-operations';
import {nearestDrawingHelper, addPointHelper, addLineHelper, addLineSegmentHelper} from '../utils/drawing-helpers';

export default function (state, action) {
  switch (action.type) {
    case SELECT_TOOL_DRAWING_LINE:
      return state.set('mode', MODE_WAITING_DRAWING_LINE);

    case BEGIN_DRAWING_LINE:
      return beginDrawingLine(state, action.layerID, action.x, action.y);

    case UPDATE_DRAWING_LINE:
      return updateDrawingLine(state, action.layerID, action.x, action.y);

    case END_DRAWING_LINE:
      return endDrawingLine(state, action.layerID, action.x, action.y);

    case SELECT_TOOL_DRAWING_HOLE:
      return selectToolDrawingHole(state);

    case UPDATE_DRAWING_HOLE:
      return updateDrawingHole(state, action.layerID, action.x, action.y);

    case END_DRAWING_HOLE:
      return endDrawingHole(state, action.layerID, action.x, action.y);

    default:
      return state;
  }
}


/** lines operations **/
function beginDrawingLine(state, layerID, x, y) {
  let a, b, c;

  let drawingHelpers = (new List()).withMutations(drawingHelpers => {
    state.getIn(['scene', 'layers', layerID, 'vertices'])
      .forEach(({id: vertexID, x, y}) => {
        addPointHelper(drawingHelpers, x, y, 10, 10, vertexID);

        ({a, b, c} = Geometry.horizontalLine(y));
        addLineHelper(drawingHelpers, a, b, c, 10, 1, vertexID);
        ({a, b, c} = Geometry.verticalLine(x));
        addLineHelper(drawingHelpers, a, b, c, 10, 1, vertexID);
      });
  });

  let nearestHelper = nearestDrawingHelper(drawingHelpers, x, y);
  let helper = null;
  if (nearestHelper) {
    ({x, y} = nearestHelper.point);
    helper = nearestHelper.helper;
  }

  drawingHelpers = drawingHelpers.withMutations(drawingHelpers => {
    ({a, b, c} = Geometry.horizontalLine(y));
    addLineHelper(drawingHelpers, a, b, c, 10, 3, null);
    ({a, b, c} = Geometry.verticalLine(x));
    addLineHelper(drawingHelpers, a, b, c, 10, 3, null);
  });

  let scene = state.scene.updateIn(['layers', layerID], layer => layer.withMutations(layer => {
    unselectAll(layer);
    let {line} = addLine(layer, 'wallGeneric', x, y, x, y);
    select(layer, 'lines', line.id);
  }));

  return state.merge({
    mode: MODE_DRAWING_LINE,
    scene, drawingHelpers,
    activeDrawingHelper: helper
  });
}

function updateDrawingLine(state, layerID, x, y) {

  let nearestHelper = nearestDrawingHelper(state.drawingHelpers, x, y);
  let helper = null;
  if (nearestHelper) {
    ({x, y} = nearestHelper.point);
    helper = nearestHelper.helper;
  }

  let scene = state.scene.updateIn(['layers', layerID], layer => {
    let lineID = layer.getIn(['selected', 'lines']).first();
    ({layer} = replaceLineVertex(layer, lineID, 1, x, y));
    return layer;
  });

  return state.merge({
    scene,
    activeDrawingHelper: helper
  });
}

function endDrawingLine(state, layerID, x, y) {
  let nearestHelper = nearestDrawingHelper(state.drawingHelpers, x, y);
  if (nearestHelper) {
    ({x, y} = nearestHelper.point);
  }

  let scene = state.scene.updateIn(['layers', layerID], layer => layer.withMutations(layer => {
    let lineID = layer.getIn(['selected', 'lines']).first();
    let line = layer.getIn(['lines', lineID]);
    let v0 = layer.vertices.get(line.vertices.get(0));

    unselect(layer, 'lines', lineID);
    removeLine(layer, lineID);
    addLineAvoidingIntersections(layer, line.type, v0.x, v0.y, x, y);
    detectAndUpdateAreas(layer);
  }));

  return state.merge({
    mode: MODE_WAITING_DRAWING_LINE,
    scene,
    drawingHelpers: new List(),
    activeDrawingHelper: null
  });
}

function selectToolDrawingHole(state) {
  //TODO check current layer

  let drawingHelpers = (new List()).withMutations(drawingHelpers => {
    state.getIn(['scene', 'layers'])
      .forEach(({lines, vertices}) => {
        lines.forEach(line => {
          let {x: x1, y: y1} = vertices.get(line.vertices.get(0));
          let {x: x2, y:y2} = vertices.get(line.vertices.get(1));

          addLineSegmentHelper(drawingHelpers, x1, y1, x2, y2, 20, 1, line.id);
        })
      });
  });

  return state.merge({
    mode: MODE_DRAWING_HOLE,
    drawingHelpers
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
      let {hole} = addHole(layer, 'windowGeneric', lineID, offset);
      select(layer, 'holes', hole.id);
    }
  }));

  return state.set('scene', scene);
}

function endDrawingHole(state, layerID, x, y) {
  state =  updateDrawingHole(state, layerID, x, y);
  return state.updateIn(['scene', 'layers', layerID], layer => unselectAll(layer));

}
