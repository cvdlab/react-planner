import {List} from 'immutable';

import {
  SELECT_TOOL_DRAWING_LINE,
  BEGIN_DRAWING_LINE,
  UPDATE_DRAWING_LINE,
  END_DRAWING_LINE,
  SELECT_TOOL_DRAWING_HOLE,
  BEGIN_DRAWING_HOLE,
  UPDATE_DRAWING_HOLE,
  END_DRAWING_HOLE,
  MODE_WAITING_DRAWING_LINE,
  MODE_WAITING_DRAWING_HOLE,
  MODE_DRAWING_HOLE,
  MODE_DRAWING_LINE
} from '../constants';

import * as Geometry from '../utils/geometry';
import {addLine, replaceLineVertex, removeLine, splitLine, select, unselect} from '../utils/layer-operations';
import {nearestDrawingHelper, addPointHelper, addLineHelper} from '../utils/drawing-helpers';

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
      return state.set('mode', MODE_WAITING_DRAWING_HOLE);

    case BEGIN_DRAWING_HOLE:
      return updateDrawingHole(state, action.layerID, action.x, action.y);

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
        addPointHelper(drawingHelpers, x, y, 10, 5, vertexID);

        ({a, b, c} = Geometry.horizontalLine(y));
        addLineHelper(drawingHelpers, a, b, c, 10, 1, vertexID);
        ({a, b, c} = Geometry.verticalLine(x));
        addLineHelper(drawingHelpers, a, b, c, 10, 1, vertexID);
      });
  });

  let nearestHelper = nearestDrawingHelper(state.drawingHelpers, x, y);
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
    let {line} = addLine(layer, 'wall-generic', x, y, x, y);
    select(layer, 'lines', line.id);
  }));

  return state.merge({
    mode: MODE_DRAWING_LINE,
    scene, drawingHelpers,
    nearestDrawingHelper: helper
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
    nearestDrawingHelper: helper
  });
}

function endDrawingLine(state, layerID, x, y) {
  let nearestHelper = nearestDrawingHelper(state.drawingHelpers, x, y);
  if (nearestHelper) {
    ({x, y} = nearestHelper.point);
  }

  let scene = state.scene.updateIn(['layers', layerID], layer => {
    let lineID = layer.getIn(['selected', 'lines']).first();
    let line = layer.getIn(['lines', lineID]);
    ({layer} = replaceLineVertex(layer, lineID, 1, x, y));
    layer = unselect(layer, 'lines', lineID);
    return layer;
  });

  return state.merge({
    mode: MODE_WAITING_DRAWING_LINE,
    scene,
    drawingHelpers: new List(),
    nearestDrawingHelper: null
  });
}

/** holes operations **/
function beginDrawingHole(state, layerID, x, y) {
  return state.merge({mode: MODE_DRAWING_HOLE});
}

function updateDrawingHole(state, layerID, x, y) {
  return state;
}

function endDrawingHole(state, layerID, x, y) {
  return state.merge({mode: MODE_WAITING_DRAWING_HOLE});
}
