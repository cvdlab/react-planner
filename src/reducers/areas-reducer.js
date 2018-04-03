import {
  select,
  unselectAll,
} from '../utils/layer-operations';

import {history} from '../utils/export';

import {SELECT_AREA} from '../constants';

export default function (state, action) {
  switch (action.type) {
    case SELECT_AREA:
      return selectArea(state, action.layerID, action.areaID);

    default:
      return state;
  }
}


function selectArea(state, layerID, areaID) {
  let scene = state.scene;

  scene = scene.merge({
    layers: scene.layers.map(unselectAll),
    selectedLayer: layerID
  });

  scene = scene.updateIn(['layers', layerID], layer => layer.withMutations(layer => {
      let area = layer.getIn(['areas', areaID]);
      select(layer, 'areas', areaID);
      area.vertices.forEach(vertexID => select(layer, 'vertices', vertexID));
    })
  );

  return state.merge({
    scene,
    sceneHistory: history.historyPush( state.sceneHistory, scene )
  });
}
