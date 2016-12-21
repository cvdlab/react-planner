import { select, unselectAll } from '../utils/layer-operations';

import { SELECT_AREA } from '../constants';

export default function (state, action) {
  switch (action.type) {
    case SELECT_AREA:
      return selectArea(state, action.layerID, action.areaID);

    default:
      return state;
  }
}

function selectArea(state, layerID, areaID) {
  var scene = state.scene;

  scene = scene.updateIn(['layers', layerID], function (layer) {
    return layer.withMutations(function (layer) {
      var area = layer.getIn(['areas', areaID]);
      unselectAll(layer);
      select(layer, 'areas', areaID);
      area.vertices.forEach(function (vertexID) {
        return select(layer, 'vertices', vertexID);
      });
    });
  });

  return state.merge({
    scene: scene,
    sceneHistory: state.sceneHistory.push(scene)
  });
}