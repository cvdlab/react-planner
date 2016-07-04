import {
  SELECT_TOOL_EDIT,
  MODE_IDLE,
  SELECT_AREA,
  SELECT_HOLE,
  SELECT_LINE,
  UNSELECT_ALL
} from '../constants';

export default function (state, action) {
  let {scene} = state;

  switch (action.type) {
    case SELECT_TOOL_EDIT:
      return state.set('mode', MODE_IDLE);

    case SELECT_AREA:
      return state.set('scene', selectArea(scene, action.layerID, action.areaID));

    case SELECT_HOLE:
      return state.set('scene', selectHole(scene, action.layerID, action.holeID));

    case SELECT_LINE:
      return state.set('scene', selectLine(scene, action.layerID, action.lineID));

    case UNSELECT_ALL:
      return state.set('scene', unselectAll(scene));


    default:
      return state;
  }
}

function unselectAllFromLayer(layer) {
  return layer.withMutations(layer => {
    layer.update('lines', lines => {
      return lines.map(line => line.set('selected', false));
    });

    layer.update('areas', areas => {
      return areas.map(area => area.set('selected', false));
    });

    layer.update('holes', holes => {
      return holes.map(hole => hole.set('selected', false));
    });
  });
}

function selectLine(scene, layerID, lineID) {
  return scene.withMutations(scene => {
    scene.updateIn(['layers', layerID], layer => unselectAllFromLayer(layer));
    scene.setIn(['layers', layerID, 'lines', lineID, 'selected'], true);
  });
}

function selectArea(scene, layerID, areaID) {
  return scene.withMutations(scene => {
    scene.updateIn(['layers', layerID], layer => unselectAllFromLayer(layer));
    scene.setIn(['layers', layerID, 'areas', areaID, 'selected'], true);
  });
}

function selectHole(scene, layerID, holeID) {
  return scene.withMutations(scene => {
    scene.updateIn(['layers', layerID], layer => unselectAllFromLayer(layer));
    scene.setIn(['layers', layerID, 'holes', holeID, 'selected'], true);
  });
}

function unselectAll(scene) {
  return scene.updateIn(['layers', 'layer-floor-1'], layer => unselectAllFromLayer(layer));
}
