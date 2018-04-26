import { Layer } from './export';

class Line{

  static select( state, layerID, lineID ){
    console.log('select Line');
    let scene = state.scene;
    let line = scene.getIn([ 'layers', layerID, 'lines', lineID ]);

    scene = scene.merge({
      layers: state.alterate ? scene.layers : scene.layers.map(LayerOperations.unselectAll),
      selectedLayer: layerID
    });

    Layer.select( layerID, 'lines', lineID );
    Layer.select( layerID, 'vertices', line.vertices.get(0) );
    Layer.select( layerID, 'vertices', line.vertices.get(1) );

    return state.merge({
      scene,
      sceneHistory: history.historyPush( state.sceneHistory, scene )
    });
  }

}

export { Line as default };
