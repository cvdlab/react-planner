import { Group, Layer, Hole, Vertex } from './export';
import { LayerOperations, history } from '../utils/export';

class Line{

  static select( state, layerID, lineID ){
    let line = state.getIn([ 'scene','layers', layerID, 'lines', lineID ]);

    state = state.mergeIn(['scene'], {
      layers: state.alterate ? state.scene.layers : state.scene.layers.map(LayerOperations.unselectAll),
      selectedLayer: layerID
    });

    state = Layer.select( state, layerID, 'lines', lineID ).updatedState;
    state = Layer.select( state, layerID, 'vertices', line.vertices.get(0) ).updatedState;
    state = Layer.select( state, layerID, 'vertices', line.vertices.get(1) ).updatedState;

    state = state.merge({
      sceneHistory: history.historyPush( state.sceneHistory, state.scene )
    });

    return {updatedState: state};
  }

  static remove( state, layerID, lineID ) {
    let line = state.getIn(['scene', 'layers', layerID, 'lines', lineID]);

    state = this.unselect( state, layerID, lineID ).updatedState;
    line.holes.forEach(holeID => state = Hole.remove(state, layerID, holeID).updatedState);
    state = Layer.removeElement( state, layerID, 'lines', lineID ).updatedState;

    line.vertices.forEach(vertexID => state = Vertex.remove( state, layerID, vertexID, 'lines', lineID ).updatedState);

    state.getIn(['scene', 'groups']).forEach( group => state = Group.removeElement(state, group.id, layerID, 'lines', lineID).updatedState );

    state = state.merge({
      sceneHistory: history.historyPush( state.sceneHistory, state.scene )
    });

    return {updatedState: state};
  }

  static unselect( state, layerID, lineID ) {
    let line = state.getIn([ 'scene','layers', layerID, 'lines', lineID ]);

    state = Layer.unselect( state, layerID, 'vertices', line.vertices.get(0) ).updatedState;
    state = Layer.unselect( state, layerID, 'vertices', line.vertices.get(1) ).updatedState;
    state = Layer.unselect( state, layerID, 'lines', lineID ).updatedState;

    state = state.merge({
      sceneHistory: history.historyPush( state.sceneHistory, state.scene )
    });

    return {updatedState: state};
  }

}

export { Line as default };
