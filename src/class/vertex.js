import { List } from 'immutable';
import { Vertex as VertexModel } from '../models';
import { IDBroker, GeometryUtils } from '../utils/export';

class Vertex{

  static add( state, layerID, x, y, relatedPrototype, relatedID ) {

    let vertex = state.getIn(['scene', 'layers', layerID, 'vertices']).find(vertex => GeometryUtils.samePoints(vertex, {x, y}));

    if (vertex) {
      vertex = vertex.update(relatedPrototype, related => related.push(relatedID));
    }
    else {
      vertex = new VertexModel({
        id: IDBroker.acquireID(),
        name: 'Vertex',
        x, y,
        [relatedPrototype]: new List([relatedID])
      });
    }

    state = state.setIn(['scene', 'layers', layerID, 'vertices', vertex.id], vertex);

    return { updatedState: state, vertex };
  }

  static addElement( state, layerID, vertexID, elementPrototype, elementID ) {
    state = state.updateIn(['scene', 'layers', layerID, 'vertices', vertexID, elementPrototype], list => list.push( elementID ) );
    return { updatedState: state };
  }

  static removeElement( state, layerID, vertexID, elementPrototype, elementID ) {
    let elementIndex = state.getIn(['scene', 'layers', layerID, 'vertices', vertexID, elementPrototype]).findIndex( el => el === elementID );
    if( elementIndex !== -1 ) {
      state = state.updateIn(['scene', 'layers', layerID, 'vertices', vertexID, elementPrototype], list => list.remove( elementIndex ) );
    }
    return { updatedState: state };
  }

  static select( state, layerID, vertexID ){
    state = state.setIn(['scene', 'layers', layerID, 'vertices', vertexID, 'selected'], true);
    state = state.updateIn(['scene', 'layers', layerID, 'selected', 'vertices'], elems => elems.push(vertexID));

    return {updatedState: state};
  }

  static unselect( state, layerID, vertexID ){
    state = state.setIn(['scene', 'layers', layerID, 'vertices', vertexID, 'selected'], false);
    state = state.updateIn(['scene', 'layers', layerID, 'selected', 'vertices'], elems => elems.filter( el => el.id !== vertexID ));

    return {updatedState: state};
  }

  static remove( state, layerID, vertexID, relatedPrototype, relatedID ) {
    let vertex = state.getIn(['scene', 'layers', layerID, 'vertices', vertexID]);

    if( relatedPrototype && relatedID ) vertex = vertex.update(relatedPrototype, related => {
      let index = related.findIndex(ID => relatedID === ID);
      return related.delete(index);
    });

    let inUse = vertex.areas.size || vertex.lines.size;

    if( inUse ) {
      state = state.setIn(['scene', 'layers', layerID, 'vertices', vertexID], vertex);
    }
    else {
      state = state.deleteIn(['scene', 'layers', layerID, 'vertices', vertexID]);
    }

    return {updatedState: state};
  }

}

export { Vertex as default };
