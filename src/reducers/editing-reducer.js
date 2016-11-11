import {
  SELECT_TOOL_EDIT,
  MODE_IDLE,
  SELECT_AREA,
  SELECT_HOLE,
  SELECT_LINE,
  SELECT_ITEM,
  UNSELECT_ALL,
  SET_PROPERTIES,
  REMOVE,
  UNDO,
  ROLLBACK
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

  switch (action.type) {
    case SELECT_TOOL_EDIT:
      return state.set('mode', MODE_IDLE);

    case SELECT_AREA:
      return selectArea(state, action.layerID, action.areaID);

    case SELECT_HOLE:
      return selectHole(state, action.layerID, action.holeID);

    case SELECT_LINE:
      return selectLine(state, action.layerID, action.lineID);

    case SELECT_ITEM:
      return selectItem(state, action.layerID, action.itemID);

    case UNSELECT_ALL:
      return unselectAll(state);

    case SET_PROPERTIES:
      return setProperties(state, action.properties);

    case REMOVE:
      return remove(state, action.catalog);

    case UNDO:
      return undo(state);

    case ROLLBACK:
      return rollback(state);

    default:
      return state;
  }
}


function setProperties(state, properties) {
  let scene = state.scene;

  scene = scene.updateIn(['layers', scene.selectedLayer], layer => layer.withMutations(layer => {
    layer.selected.lines.forEach(lineID => setPropertiesOp(layer, 'lines', lineID, properties));
    layer.selected.holes.forEach(holeID => setPropertiesOp(layer, 'holes', holeID, properties));
    layer.selected.areas.forEach(areaID => setPropertiesOp(layer, 'areas', areaID, properties));
    layer.selected.items.forEach(itemID => setPropertiesOp(layer, 'items', itemID, properties));
    // unselectAllOp(layer);
  }));

  return state.merge({
    scene,
    sceneHistory: state.sceneHistory.push(scene)
  })
}

function selectLine(state, layerID, lineID) {
  let scene = state.scene;

  scene = scene.updateIn(['layers', layerID], layer => layer.withMutations(layer => {
      let line = layer.getIn(['lines', lineID]);
      unselectAllOp(layer);
      select(layer, 'lines', lineID);
      select(layer, 'vertices', line.vertices.get(0));
      select(layer, 'vertices', line.vertices.get(1));
    })
  );

  return state.merge({
    scene,
    sceneHistory: state.sceneHistory.push(scene)
  })
}

function selectArea(state, layerID, areaID) {
  let scene = state.scene;

  scene = scene.updateIn(['layers', layerID], layer => layer.withMutations(layer => {
      let area = layer.getIn(['areas', areaID]);
      unselectAllOp(layer);
      select(layer, 'areas', areaID);
      area.vertices.forEach(vertexID => select(layer, 'vertices', vertexID));
    })
  );

  return state.merge({
    scene,
    sceneHistory: state.sceneHistory.push(scene)
  })
}

function selectItem(state, layerID, itemID) {
  let scene = state.scene;

  scene =  scene.updateIn(['layers', layerID], layer => layer.withMutations(layer => {
      let item = layer.getIn(['items', itemID]);
      unselectAllOp(layer);
      select(layer, 'items', itemID);
    })
  );

  return state.merge({
    scene,
    sceneHistory: state.sceneHistory.push(scene)
  })
}

function selectHole(state, layerID, holeID) {
  let scene = state.scene;

  scene =  scene.updateIn(['layers', layerID], layer => layer.withMutations(layer => {
    unselectAllOp(layer);
    select(layer, 'holes', holeID);
  }));

  return state.merge({
    scene,
    sceneHistory: state.sceneHistory.push(scene)
  })
}

function unselectAll(state) {
  let scene = state.scene;

  scene =  scene.update('layers', layer => layer.map(unselectAllOp));

  return state.merge({
    scene,
    sceneHistory: state.sceneHistory.push(scene)
  })
}

function remove(state, catalog) {
  let scene = state.scene;

  scene =  scene.updateIn(['layers', scene.selectedLayer], layer => layer.withMutations(layer => {
    let {lines: selectedLines, holes: selectedHoles, items: selectedItems} = layer.selected;
    unselectAllOp(layer);
    selectedLines.forEach(lineID => removeLine(layer, lineID));
    selectedHoles.forEach(holeID => removeHole(layer, holeID));
    selectedItems.forEach(itemID => removeItem(layer, itemID));
    detectAndUpdateAreas(layer, catalog);
  }));

  return state.merge({
    scene,
    sceneHistory: state.sceneHistory.push(scene)
  })
}

function undo(state) {
  let sceneHistory = state.sceneHistory;

  if (state.scene === sceneHistory.last() && !sceneHistory.size > 1)
    sceneHistory = sceneHistory.pop();

  switch (sceneHistory.size) {
    case 0:
      return state;

    case 1:
      return state.merge({
        mode: MODE_IDLE,
        scene: sceneHistory.last(),
      });

    default:
      return state.merge({
        mode: MODE_IDLE,
        scene: sceneHistory.last(),
        sceneHistory: sceneHistory.pop()
      });
  }
}

function rollback(state) {
  let sceneHistory = state.sceneHistory;

  if (sceneHistory.isEmpty()) return state;

  return state.merge({
    mode: MODE_IDLE,
    scene: sceneHistory.last(),
  });
}
