import {List} from 'immutable';

import {Layer, Vertex, Line, Hole, Area} from '../models';
import IDBroker from '../utils/id-broker';
import {
  SELECT_TOOL_DRAWING_LINE,
  BEGIN_DRAWING_LINE,
  UPDATE_DRAWING_LINE,
  END_DRAWING_LINE,
  SELECT_TOOL_DRAWING_HOLE,
  BEGIN_DRAWING_HOLE,
  UPDATE_DRAWING_HOLE,
  END_DRAWING_HOLE,
  MODE_WAITING_DRAWING_LINE,
  MODE_WAITING_DRAWING_HOLE,
  MODE_DRAWING_HOLE,
  MODE_DRAWING_LINE
} from '../constants';


export default function (state, action) {
  switch (action.type) {
    case SELECT_TOOL_DRAWING_LINE:
      return state.set('mode', MODE_WAITING_DRAWING_LINE);

    case BEGIN_DRAWING_LINE:
      return state.merge({
        mode: MODE_DRAWING_LINE,
        scene: beginDrawingLine(state.scene, action.layerID, action.x, action.y)
      });

    case UPDATE_DRAWING_LINE:
      return state.set('scene', updateDrawingLine(state.scene, action.layerID, action.x, action.y));

    case END_DRAWING_LINE:
      return state.merge({
        mode: MODE_WAITING_DRAWING_LINE,
        scene: endDrawingLine(state.scene, action.layerID, action.x, action.y)
      });

    case SELECT_TOOL_DRAWING_HOLE:
      return state.set('mode', MODE_WAITING_DRAWING_HOLE);

    case BEGIN_DRAWING_HOLE:
      return state.merge({
        mode: MODE_DRAWING_HOLE,
        scene: updateDrawingHole(state.scene, action.layerID, action.x, action.y)
      });

    case UPDATE_DRAWING_HOLE:
      return state.set('scene', updateDrawingHole(state.scene, action.layerID, action.x, action.y));

    case END_DRAWING_HOLE:
      return state.merge({
        mode: MODE_WAITING_DRAWING_HOLE,
        scene: endDrawingHole(state.scene, action.layerID, action.x, action.y)
      });

    default:
      return state;
  }
}


/** lines operations **/
function beginDrawingLine(scene, layerID, x, y) {
  return scene.updateIn(['layers', layerID], layer => layer.withMutations(layer => {
    let {line} = addLine(layer, 'wall-generic', x, y, x, y);
    select(layer, 'lines', line.id);
  }));
}

function updateDrawingLine(scene, layerID, x, y) {
  return scene.updateIn(['layers', layerID], layer => {
    let lineID = layer.getIn(['selected', 'lines']).first();
    ({layer} = replaceLineVertex(layer, lineID, 1, x, y));
    return layer;
  });
}

function endDrawingLine(scene, layerID, x, y) {
  return scene.updateIn(['layers', layerID], layer => {
    let lineID = layer.getIn(['selected', 'lines']).first();
    let line = layer.getIn(['lines', lineID]);
    ({layer} = replaceLineVertex(layer, lineID, 1, x, y));
    layer = unselect(layer, 'lines', lineID);
    return layer;
  });
}

/** holes operations **/
function beginDrawingHole(scene, layerID, x, y) {
  return scene;
}

function updateDrawingHole(scene, layerID, x, y) {
  return scene;
}

function endDrawingHole(scene, layerID, x, y) {
  return scene;
}

/** lines features **/
function addLine(layer, type, x0, y0, x1, y1) {
  let line;

  layer = layer.withMutations(layer => {
    let lineID = IDBroker.acquireID();

    let v0, v1;
    ({layer, vertex: v0} = addVertex(layer, x0, y0, 'lines', lineID));
    ({layer, vertex: v1} = addVertex(layer, x1, y1, 'lines', lineID));

    line = new Line({
      id: lineID,
      vertices: new List([v0.id, v1.id]),
      type
    });

    layer.setIn(['lines', lineID], line);
  });

  return {layer, line};
}

function replaceLineVertex(layer, lineID, vertexIndex, x, y) {
  let line = layer.getIn(['lines', lineID]);

  layer = layer.withMutations(layer => {
    let vertex;
    let vertexID = line.vertices.get(vertexIndex);

    removeVertex(layer, vertexID, 'lines', line.id);
    ({layer, vertex} = addVertex(layer, x, y, 'lines', line.id));
    line = line.setIn(['vertices', vertexIndex], vertex.id);
    layer.setIn(['lines', lineID], line);
  });
  return {layer, line};
}

function removeLine(layer, lineID) {
  let line = layer.getIn(['lines', lineID]);

  layer = layer.withMutations(layer => {
    layer.deleteIn(['lines', line.id]);
    line.vertices.forEach(vertexID => removeVertex(layer, vertexID, 'lines', line.id));
  });

  return {layer, line};
}

function splitLine(layer, lineID, x, y) {
  let line0, line1;

  layer = layer.withMutations(layer => {
    let line = layer.getIn(['lines', lineID]);
    let {x: x0, y: y0} = layer.vertices.get(line.vertices.get(0));
    let {x: x1, y: y1} = layer.vertices.get(line.vertices.get(1));

    removeLine(layer, lineID);
    ({line: line0} = addLine(layer, line.type, x0, y0, x, y));
    ({line: line1} = addLine(layer, line.type, x1, y1, x, y));
  });

  return {layer, lines: new List([line0, line1])};
}


/** vertices features **/
function addVertex(layer, x, y, relatedPrototype, relatedID) {
  let vertex = layer.vertices.find(vertex => vertex.x === x && vertex.y === y);
  if (vertex) {
    vertex = vertex.update(relatedPrototype, related => related.push(relatedID));
  } else {
    vertex = new Vertex({
      id: IDBroker.acquireID(),
      x, y,
      [relatedPrototype]: new List([relatedID])
    });
  }
  layer = layer.setIn(['vertices', vertex.id], vertex);
  return {layer, vertex};
}

function removeVertex(layer, vertexID, relatedPrototype, relatedID) {
  let vertex = layer.vertices.get(vertexID);
  vertex = vertex.update(relatedPrototype, related => {
    let index = related.findIndex(ID => relatedID !== ID);
    return related.delete(index);
  });

  if (vertex.areas.size + vertex.lines.size === 0) {
    layer = layer.deleteIn(['vertices', vertex.id]);
  } else {
    layer = layer.setIn(['vertices', vertex.id], vertex);
  }
  return {layer, vertex};
}

function select(layer, prototype, ID) {
  return layer.withMutations(layer => {
      layer.setIn([prototype, ID, 'selected'], true);
      layer.updateIn(['selected', 'lines'], lines => lines.push(ID));
    }
  );
}

function unselect(layer, prototype, ID) {
  return layer.withMutations(layer => {
      layer.setIn([prototype, ID, 'selected'], false);
      layer.updateIn(['selected', prototype], ids => ids.filter(curID => ID !== curID));
    }
  );
}
