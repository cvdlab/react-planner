import { Layer, Group } from './export';
import { LayerOperations, history } from '../utils/export';

class Item{

  static select( state, layerID, itemID ){
    state = state.mergeIn(['scene'], {
      layers: state.alterate ? state.scene.layers : state.scene.layers.map(LayerOperations.unselectAll),
      selectedLayer: layerID
    });

    state = Layer.select( state, layerID, 'items', itemID ).updatedState;

    state = state.merge({
      sceneHistory: history.historyPush( state.sceneHistory, state.scene )
    });

    return {updatedState: state};
  }

  static remove( state, layerID, itemID ) {
    state = this.unselect( state, layerID, itemID ).updatedState;
    state = Layer.removeElement( state, layerID, 'items', itemID ).updatedState;

    state.getIn(['scene', 'groups']).forEach( group => state = Group.removeElement(state, group.id, layerID, 'items', itemID).updatedState );

    state = state.merge({
      sceneHistory: history.historyPush( state.sceneHistory, state.scene )
    });

    return {updatedState: state};
  }

  static unselect( state, layerID, itemID ) {
    state = Layer.unselect( state, layerID, 'items', itemID ).updatedState;

    state = state.merge({
      sceneHistory: history.historyPush( state.sceneHistory, state.scene )
    });

    return {updatedState: state};
  }

}

export { Item as default };
