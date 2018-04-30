import { Layer } from './export';
import { LayerOperations, history } from '../utils/export';

class Line{

  static select( state, layerID, lineID ){
    let line = state.getIn([ 'scene','layers', layerID, 'lines', lineID ]);

    state = state.mergeIn(['scene'], {
      layers: state.alterate ? state.scene.layers : state.scene.layers.map(LayerOperations.unselectAll),
      selectedLayer: layerID
    });

    state = Layer.select( state, layerID, 'lines', lineID );
    state = Layer.select( state, layerID, 'vertices', line.vertices.get(0) );
    state = Layer.select( state, layerID, 'vertices', line.vertices.get(1) );

    state = state.merge({
      sceneHistory: history.historyPush( state.sceneHistory, state.scene )
    });

    return state;
  }

}

export { Line as default };
