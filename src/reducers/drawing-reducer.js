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

  console.log()


  return scene;
}

function updateDrawingLine(scene, layerID, x, y) {
  return scene;
}

function endDrawingLine(scene, layerID, x, y) {
  return scene;
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
function addLine(layer, type, x1, y1, x2, y2) {
  let line;

  layer = layer.withMutations(layer => {
    let lineID = IDBroker.acquireID();

    let v1, v2;
    ({layer, vertex: v1} = addVertex(layer, x1, y1, 'lines', lineID));
    ({layer, vertex: v2} = addVertex(layer, x2, y2, 'lines', lineID));

    line = new Line({
      id: lineID,
      vertices: new List([v1.id, v2.id]),
      type
    });

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
    let {x: x1, y: y1} = layer.vertices.get(line.vertices.get(0));
    let {x: x2, y: y2} = layer.vertices.get(line.vertices.get(1));

    removeLine(layer, lineID);
    ({line: line0} = addLine(layer, line.type, x1, y1, x, y));
    ({line: line1} = addLine(layer, line.type, x2, y2, x, y));
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
  vertex = vertex.update(relatedPrototype, related => related.filter(ID => relatedID !== ID));

  if (vertex.areas.size + vertex.lines.size === 0) {
    layer = layer.deleteIn(['vertices', vertex.id]);
  } else {
    layer = layer.setIn(['vertices', vertex.id], vertex);
  }
  return {layer, vertex};
}


