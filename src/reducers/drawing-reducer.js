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
      return state.merge({
        mode: MODE_DRAWING_LINE,
        scene: beginDrawingLine(state.scene, action.layerID, action.x, action.y)
      });

    case UPDATE_DRAWING_LINE:
      return state.set('scene', updateDrawingLine(state.scene, action.layerID, action.x, action.y));

    case END_DRAWING_LINE:
      return state.merge({
        mode: MODE_WAITING_DRAWING_LINE,
        scene: endDrawingLine(state.scene, action.layerID, action.x, action.y)
      });

    case SELECT_TOOL_DRAWING_HOLE:
      return state.set('mode', MODE_WAITING_DRAWING_HOLE);

    case BEGIN_DRAWING_HOLE:
      return state.merge({
        mode: MODE_DRAWING_HOLE,
        scene: updateDrawingHole(state.scene, action.layerID, action.x, action.y)
      });

    case UPDATE_DRAWING_HOLE:
      return state.set('scene', updateDrawingHole(state.scene, action.layerID, action.x, action.y));

    case END_DRAWING_HOLE:
      return state.merge({
        mode: MODE_WAITING_DRAWING_HOLE,
        scene: endDrawingHole(state.scene, action.layerID, action.x, action.y)
      });

    default:
      return state;
  }
}


/** lines operations **/
function beginDrawingLine(scene, layerID, x, y) {
  return scene.updateIn(['layers', layerID], layer => layer.withMutations(layer => {
    let {line} = addLine(layer, 'wall-generic', x, y, x, y);
    select(layer, 'lines', line.id);
  }));
}

function updateDrawingLine(scene, layerID, x, y) {
  return scene.updateIn(['layers', layerID], layer => {
    let lineID = layer.getIn(['selected', 'lines']).first();
    ({layer} = replaceLineVertex(layer, lineID, 1, x, y));
    return layer;
  });
}

function endDrawingLine(scene, layerID, x, y) {
  return scene.updateIn(['layers', layerID], layer => {
    let lineID = layer.getIn(['selected', 'lines']).first();
    let line = layer.getIn(['lines', lineID]);
    ({layer} = replaceLineVertex(layer, lineID, 1, x, y));
    layer = unselect(layer, 'lines', lineID);
    return layer;
  });
}

/** holes operations **/
function beginDrawingHole(scene, layerID, x, y) {
  return scene;
}

function updateDrawingHole(scene, layerID, x, y) {
  return scene;
}

function endDrawingHole(scene, layerID, x, y) {
  return scene;
}
