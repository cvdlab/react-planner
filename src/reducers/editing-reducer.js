import {
  SELECT_TOOL_EDIT,
  MODE_IDLE,
  SELECT_AREA,
  SELECT_HOLE,
  SELECT_LINE,
  SELECT_ITEM,
  UNSELECT_ALL,
  SET_PROPERTIES,
  REMOVE
} from '../constants';

import {ElementsSet} from '../models';
import {Map} from 'immutable';
import {
  removeLine,
  removeHole,
  detectAndUpdateAreas,
  setProperties as setPropertiesOp,
  select,
  unselect,
  unselectAll as unselectAllOp,
  removeItem
} from '../utils/layer-operations';

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

    case SELECT_ITEM:
      return state.set('scene', selectItem(scene, action.layerID, action.itemID));

    case UNSELECT_ALL:
      return state.set('scene', unselectAll(scene));

    case SET_PROPERTIES:
      return state.set('scene', setProperties(scene, action.properties));

    case REMOVE:
      return state.set('scene', remove(scene, action.catalog));

    default:
      return state;
  }
}


function setProperties(scene, properties) {
  return scene.updateIn(['layers', scene.selectedLayer], layer => layer.withMutations(layer => {
    layer.selected.lines.forEach(lineID => setPropertiesOp(layer, 'lines', lineID, properties));
    layer.selected.holes.forEach(holeID => setPropertiesOp(layer, 'holes', holeID, properties));
    layer.selected.areas.forEach(areaID => setPropertiesOp(layer, 'areas', areaID, properties));
    unselectAllOp(layer);
  }));
}

function selectLine(scene, layerID, lineID) {
  return scene.updateIn(['layers', layerID], layer => layer.withMutations(layer => {
      let line = layer.getIn(['lines', lineID]);
      unselectAllOp(layer);
      select(layer, 'lines', lineID);
      select(layer, 'vertices', line.vertices.get(0));
      select(layer, 'vertices', line.vertices.get(1));
    })
  );
}

function selectArea(scene, layerID, areaID) {
  return scene.updateIn(['layers', layerID], layer => layer.withMutations(layer => {
      let area = layer.getIn(['areas', areaID]);
      unselectAllOp(layer);
      select(layer, 'areas', areaID);
      area.vertices.forEach(vertexID => select(layer, 'vertices', vertexID));
    })
  );
}

function selectItem(scene, layerID, itemID) {
  return scene.updateIn(['layers', layerID], layer => layer.withMutations(layer => {
      let item = layer.getIn(['items', itemID]);
      unselectAllOp(layer);
      select(layer, 'items', itemID);
    })
  );
}

function selectHole(scene, layerID, holeID) {
  return scene.updateIn(['layers', layerID], layer => layer.withMutations(layer => {
    unselectAllOp(layer);
    select(layer, 'holes', holeID);
  }));
}

function unselectAll(scene) {
  return scene.update('layers', layer => layer.map(unselectAllOp));
}

function remove(scene, catalog) {
  return scene.updateIn(['layers', scene.selectedLayer], layer => layer.withMutations(layer => {
    layer.selected.lines.forEach(lineID => removeLine(layer, lineID));
    layer.selected.holes.forEach(holeID => removeHole(layer, holeID));
    layer.selected.items.forEach(itemID => removeItem(layer, itemID));
    detectAndUpdateAreas(layer, catalog);
  }));
}
