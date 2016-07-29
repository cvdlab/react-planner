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

import {addLine, replaceLineVertex, removeLine, splitLine, select, unselect} from '../utils/layer-operations';

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
  let scene = state.scene.updateIn(['layers', layerID], layer => layer.withMutations(layer => {
    let {line} = addLine(layer, 'wall-generic', x, y, x, y);
    select(layer, 'lines', line.id);
  }));

  return state.merge({mode: MODE_DRAWING_LINE, scene});
}

function updateDrawingLine(state, layerID, x, y) {
  let scene = state.scene.updateIn(['layers', layerID], layer => {
    let lineID = layer.getIn(['selected', 'lines']).first();
    ({layer} = replaceLineVertex(layer, lineID, 1, x, y));
    return layer;
  });

  return state.merge({scene});
}

function endDrawingLine(state, layerID, x, y) {
  let scene = state.scene.updateIn(['layers', layerID], layer => {
    let lineID = layer.getIn(['selected', 'lines']).first();
    let line = layer.getIn(['lines', lineID]);
    ({layer} = replaceLineVertex(layer, lineID, 1, x, y));
    layer = unselect(layer, 'lines', lineID);
    return layer;
  });

  return state.merge({mode: MODE_WAITING_DRAWING_LINE, scene});
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
