import { Layer } from '../class/export';
import { history } from '../utils/export';
import { ADD_LAYER, SELECT_LAYER, SET_LAYER_PROPERTIES, REMOVE_LAYER } from '../constants';

export default function (state, action) {

  state = state.merge({ sceneHistory: history.historyPush(state.sceneHistory, state.scene) });

  switch (action.type) {
    case ADD_LAYER:
      return Layer.create(state, action.name, action.altitude).updatedState;

    case SELECT_LAYER:
      return Layer.select(state, action.layerID).updatedState;

    case SET_LAYER_PROPERTIES:
      return Layer.setProperties(state, action.layerID, action.properties).updatedState;

    case REMOVE_LAYER:
      return Layer.remove(state, action.layerID).updatedState;

    default:
      return state;
  }
}