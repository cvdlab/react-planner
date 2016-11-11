import {Seq, Map, List} from "immutable";
import {
  LOAD_PROJECT,
  NEW_PROJECT,
  OPEN_CATALOG,
  MODE_VIEWING_CATALOG,
  SELECT_TOOL_EDIT,
  MODE_IDLE,
  UNSELECT_ALL,
  SET_PROPERTIES,
  REMOVE,
  UNDO,
  ROLLBACK
} from '../constants';

import {State, Scene, Guide} from "../models";

import {
  removeLine,
  removeHole,
  detectAndUpdateAreas,
  setProperties as setPropertiesOp,
  select,
  unselect,
  unselectAll as unselectAllOp,
  removeItem,
  loadLayerFromJSON,
  setPropertiesOnSelected
} from '../utils/layer-operations';

export default function (state, action) {

  switch (action.type) {

    case NEW_PROJECT:
      return new State();

    case LOAD_PROJECT:
      return loadProject(state, action.data, action.catalog);

    case OPEN_CATALOG:
      return openCatalog(state);

    case SELECT_TOOL_EDIT:
      return state.set('mode', MODE_IDLE);

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

function openCatalog(state){
  return rollback(state)
    .set('mode', MODE_VIEWING_CATALOG);
}

function loadProject(state, data, catalog) {

  let readGuides = guides => new Seq(guides)
    .map(guide => new Guide(guide)
      .set('properties', new Map(guide.properties))
    ).toMap();

  let readScene = scene => new Scene(scene)
    .set('layers', new Seq(scene.layers).map(layer => loadLayerFromJSON(layer, catalog)).toMap())
    .set('guides', readGuides(scene.guides))
    .set('selectedLayer', Object.keys(scene.layers)[0]);
  let scene = readScene(data);

  return new State({
    scene,
    sceneHistory: new List([scene])
  });
}


function setProperties(state, properties) {
  let scene = state.scene;
  scene = scene.set('layers', scene.layers.map(layer => setPropertiesOnSelected(layer, properties)));
  return state.merge({
    scene,
    sceneHistory: state.sceneHistory.push(scene)
  })
}

function unselectAll(state) {
  let scene = state.scene;

  scene = scene.update('layers', layer => layer.map(unselectAllOp));

  return state.merge({
    scene,
    sceneHistory: state.sceneHistory.push(scene)
  })
}

function remove(state, catalog) {
  let scene = state.scene;

  scene = scene.updateIn(['layers', scene.selectedLayer], layer => layer.withMutations(layer => {
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

export function rollback(state) {
  let sceneHistory = state.sceneHistory;

  if (sceneHistory.isEmpty()) return state;

  let scene = sceneHistory
    .last()
    .update('layers', layer => layer.map(unselectAllOp));

  return state.merge({
    mode: MODE_IDLE,
    scene,
    sceneHistory: state.sceneHistory.push(scene)
  });
}
