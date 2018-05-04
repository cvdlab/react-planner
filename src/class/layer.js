import { List } from 'immutable';
import { Area } from './export';
import {
  GraphInnerCycles,
  GeometryUtils,
  history
} from '../utils/export';

const sameSet = (set1, set2) => set1.size === set2.size && set1.isSuperset(set2) && set1.isSubset(set2);

class Layer{

  static select( state, layerID, elementPrototype, elementID ){
    state = state.setIn(['scene', 'layers', layerID, elementPrototype, elementID, 'selected'], true);
    state = state.updateIn(['scene', 'layers', layerID, 'selected', elementPrototype], elems => elems.push(elementID));

    return {updatedState: state};
  }

  static unselect( state, layerID, elementPrototype, elementID ){
    state = state.setIn(['scene', 'layers', layerID, elementPrototype, elementID, 'selected'], false);
    state = state.updateIn(['scene', 'layers', layerID, 'selected', elementPrototype], elems => elems.filter( el => el.id === elementID ));
    return {updatedState: state};
  }

  static removeElement( state, layerID, elementPrototype, elementID ) {
    state = state.deleteIn(['scene', 'layers', layerID, elementPrototype, elementID]);

    state = state.merge({
      sceneHistory: history.historyPush( state.sceneHistory, state.scene )
    });

    return { updatedState: state };
  }

  static detectAndUpdateAreas( state, layerID ) {

    let verticesArray = [];           //array with vertices coords
    let linesArray;                   //array with edges

    let vertexID_to_verticesArrayIndex = {};
    let verticesArrayIndex_to_vertexID = {};

    state.getIn(['scene', 'layers', layerID, 'vertices']).forEach(vertex => {
      let verticesCount = verticesArray.push([vertex.x, vertex.y]);
      let latestVertexIndex = verticesCount - 1;
      vertexID_to_verticesArrayIndex[vertex.id] = latestVertexIndex;
      verticesArrayIndex_to_vertexID[latestVertexIndex] = vertex.id;
    });

    linesArray = state.getIn(['scene', 'layers', layerID, 'lines'])
      .map(line => line.vertices.map(vertexID => vertexID_to_verticesArrayIndex[vertexID]).toArray());

    let innerCyclesByVerticesArrayIndex = GraphInnerCycles.calculateInnerCycles(verticesArray, linesArray);

    let innerCyclesByVerticesID = new List(innerCyclesByVerticesArrayIndex)
      .map(cycle => new List(cycle.map(vertexIndex => verticesArrayIndex_to_vertexID[vertexIndex])));

    // All area vertices should be ordered in counterclockwise order
    innerCyclesByVerticesID = innerCyclesByVerticesID.map( ( area ) =>
      GraphInnerCycles.isClockWiseOrder( area.map(vertexID => state.getIn(['scene', 'layers', layerID, 'vertices', vertexID]) ) ) ? area.reverse() : area
    );

    let areaIDs = [];

    //remove areas
    state.getIn(['scene', 'layers', layerID, 'areas']).forEach(area => {
      let areaInUse = innerCyclesByVerticesID.some(vertices => sameSet(vertices, area.vertices));
      if (!areaInUse) {
        state = Area.remove( state, layerID, area.id ).updatedState;
      }
    });

    //add new areas
    innerCyclesByVerticesID.forEach((cycle, ind) => {
      let areaInUse = state.getIn(['scene', 'layers', layerID, 'areas']).find(area => sameSet(area.vertices, cycle));

      if (areaInUse) {
        areaIDs[ind] = areaInUse.id;
        state = state.setIn(['scene', 'layers', layerID, 'areas', areaIDs[ind], 'holes'], new List());
      } else {
        let areaVerticesCoords = cycle.map(vertexID => state.getIn(['scene', 'layers', layerID, 'vertices', vertexID]));
        let resultAdd = Area.add(state, layerID, 'area', areaVerticesCoords, state.catalog);

        areaIDs[ind] = resultAdd.area.id;
        state = resultAdd.updatedState;
      }
    });

    // Build a relationship between areas and their coordinates
    let verticesCoordsForArea = areaIDs.map(id => {
      let vertices = state.getIn(['scene', 'layers', layerID, 'areas', id]).vertices.map(vertexID => {
        let { x, y } = state.getIn(['scene', 'layers', layerID, 'vertices', vertexID]);
        return new List([x,y]);
      });
      return { id, vertices };
    });

    // Find all holes for an area
    let i, j;
    for (i = 0; i < verticesCoordsForArea.length; i++) {
      let holesList = new List(); // The holes for this area
      let areaVerticesList = verticesCoordsForArea[i].vertices.flatten().toArray();
      for (j = 0; j < verticesCoordsForArea.length; j++) {
        if (i !== j) {
          let isHole = GeometryUtils.ContainsPoint(areaVerticesList,
            verticesCoordsForArea[j].vertices.get(0).get(0),
            verticesCoordsForArea[j].vertices.get(0).get(1));
          if (isHole) {
            holesList = holesList.push(verticesCoordsForArea[j].id);
          }
        }
      }
      state = state.setIn(['scene', 'layers', layerID, 'areas', verticesCoordsForArea[i].id, 'holes'], holesList);
    }

    // Remove holes which are already holes for other areas
    areaIDs.forEach(areaID => {
      let doubleHoles = new Set();
      let areaHoles = state.getIn(['scene', 'layers', layerID, 'areas', areaID, 'holes']);
      areaHoles.forEach((areaHoleID) => {
        let holesOfholes = state.getIn(['scene', 'layers', layerID, 'areas', areaHoleID, 'holes']);
        holesOfholes.forEach((holeID) => {
          if (areaHoles.indexOf(holeID) !== -1) doubleHoles.add(holeID);
        });
      });
      doubleHoles.forEach(doubleHoleID => {
        areaHoles = areaHoles.remove( areaHoles.indexOf(doubleHoleID) );
      });
      state = state.setIn(['scene', 'layers', layerID, 'areas', areaID, 'holes'], areaHoles);
    });

    return { updatedState: state };
  }
}

export { Layer as default };
