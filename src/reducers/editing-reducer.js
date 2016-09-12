import {
  SELECT_TOOL_EDIT,
  MODE_IDLE,
  SELECT_AREA,
  SELECT_HOLE,
  SELECT_LINE,
  UNSELECT_ALL,
  SET_PROPERTIES,
  REMOVE
} from '../constants';

import {ElementsSet} from '../models';
import {Map} from 'immutable';
import {removeLine, removeHole, detectAndUpdateAreas, setProperties as setPropertiesOp} from '../utils/layer-operations';

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

    case SET_PROPERTIES:
      return state.set('scene', setProperties(scene, action.properties));

    case REMOVE:
      return state.set('scene', remove(scene));

    default:
      return state;
  }
}

function unselectAllFromLayer(layer) {
  let selected = layer.get('selected');

  return layer.withMutations(layer => {
    selected.get('lines').forEach(lineID => layer.setIn(['lines', lineID, 'selected'], false));
    selected.get('areas').forEach(areaID => layer.setIn(['areas', areaID, 'selected'], false));
    selected.get('holes').forEach(holeID => layer.setIn(['holes', holeID, 'selected'], false));
    layer.set('selected', new ElementsSet());
  });
}

function setProperties(scene, properties) {
  return scene.updateIn(['layers', scene.selectedLayer], layer => layer.withMutations(layer => {
    layer.selected.lines.forEach(lineID => setPropertiesOp(layer, 'lines', lineID, properties));
    layer.selected.holes.forEach(holeID => setPropertiesOp(layer, 'holes', holeID, properties));
    layer.selected.areas.forEach(areaID => setPropertiesOp(layer, 'areas', areaID, properties));
    unselectAllFromLayer(layer);
  }));
}

function selectLine(scene, layerID, lineID) {
  return scene.updateIn(['layers', layerID], layer => {
      layer = unselectAllFromLayer(layer);
      layer = layer.setIn(['lines', lineID, 'selected'], true);
      return layer.updateIn(['selected', 'lines'], lines => lines.push(lineID));
    }
  );
}

function selectArea(scene, layerID, areaID) {
  return scene.updateIn(['layers', layerID], layer => {
      layer = unselectAllFromLayer(layer);
      layer = layer.setIn(['areas', areaID, 'selected'], true);
      return layer.updateIn(['selected', 'areas'], areas => areas.push(areaID));
    }
  );
}

function selectHole(scene, layerID, holeID) {
  return scene.updateIn(['layers', layerID], layer => {
    layer = unselectAllFromLayer(layer);
    layer = layer.setIn(['holes', holeID, 'selected'], true);
    return layer.updateIn(['selected', 'holes'], holes => holes.push(holeID));
  });
}

function unselectAll(scene) {
  return scene.update('layers', layer => layer.map(unselectAllFromLayer));
}

function remove(scene){
  return scene.updateIn(['layers', scene.selectedLayer], layer => layer.withMutations(layer => {
    layer.selected.lines.forEach(lineID => removeLine(layer, lineID));
    layer.selected.holes.forEach(holeID => removeHole(layer, holeID));
    detectAndUpdateAreas(layer);
  }));
}
