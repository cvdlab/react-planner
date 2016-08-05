import {List, Seq} from 'immutable';
import {Layer, Vertex, Line, Hole, Area, ElementsSet} from '../models';
import IDBroker from './id-broker';
import * as Geometry from './geometry';
import graphCycles from './graph-cycles';
import sceneComponents from '../scene-components/scene-components';

/** factory **/
export function sceneComponentsFactory(type, options) {
  let component = sceneComponents[type];
  if (!component) throw new Error('scene component not found');

  let properties = new Seq(component.properties)
    .map(value => value.defaultValue)
    .toMap();

  options = {...options, properties};

  switch (component.prototype) {
    case 'lines':
      return new Line(options);

    case 'holes':
      return new Hole(options);

    case 'areas':
      return new Area(options);

    default:
      throw new Error('prototype not valid');
  }
}

/** lines features **/
export function addLine(layer, type, x0, y0, x1, y1) {
  let line;

  layer = layer.withMutations(layer => {
    let lineID = IDBroker.acquireID();

    let v0, v1;
    ({layer, vertex: v0} = addVertex(layer, x0, y0, 'lines', lineID));
    ({layer, vertex: v1} = addVertex(layer, x1, y1, 'lines', lineID));

    line = sceneComponentsFactory(type, {
      id: lineID,
      vertices: new List([v0.id, v1.id]),
      type
    });

    layer.setIn(['lines', lineID], line);
  });

  return {layer, line};
}

export function replaceLineVertex(layer, lineID, vertexIndex, x, y) {
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

export function removeLine(layer, lineID) {
  let line = layer.getIn(['lines', lineID]);

  layer = layer.withMutations(layer => {
    layer.deleteIn(['lines', line.id]);
    line.vertices.forEach(vertexID => removeVertex(layer, vertexID, 'lines', line.id));
  });

  return {layer, line};
}

export function splitLine(layer, lineID, x, y) {
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

export function addLinesFromPoints(layer, type, points) {
  points = new List(points)
    .sort(({x:x1, y:y1}, {x:x2, y:y2}) => {
      return x1 === x2 ? y1 - y2 : x1 - x2;
    });

  let pointsPair = points.zip(points.skip(1))
    .filterNot(([{x:x1, y:y1}, {x:x2, y:y2}]) => {
      return x1 === x2 && y1 === y2;
    });

  let lines = (new List()).withMutations(lines => {
    layer = layer.withMutations(layer => {
      pointsPair.forEach(([{x:x1, y:y1}, {x:x2, y:y2}]) => {
        let {line} = addLine(layer, type, x1, y1, x2, y2);
        lines.push(line);
      });
    });
  });

  return {layer, lines};
}

export function addLineAvoidingIntersections(layer, type, x0, y0, x1, y1) {

  let points = [{x: x0, y: y0}, {x: x1, y: y1}];

  layer = layer.withMutations(layer => {
    let {lines, vertices} = layer;
    lines.forEach(line => {
      let [v0, v1] = line.vertices.map(vertexID => vertices.get(vertexID)).toArray();

      let intersection = Geometry.intersectionFromTwoLineSegment(
        {x: x0, y: y0}, {x: x1, y: y1},
        v0, v1
      );

      if (intersection.type === "colinear") {
        removeLine(layer, line.id);
        points.push(v0, v1);
      }

      if (intersection.type === "intersecting"
        && !(x0 === intersection.point.x && y0 === intersection.point.y)
        && !(x1 === intersection.point.x && y1 === intersection.point.y)) {
        splitLine(layer, line.id, intersection.point.x, intersection.point.y);
        points.push(intersection.point);
      }
    });
    addLinesFromPoints(layer, type, points);
  });

  return {layer};
}

/** vertices features **/
export function addVertex(layer, x, y, relatedPrototype, relatedID) {
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

export function removeVertex(layer, vertexID, relatedPrototype, relatedID) {
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

export function select(layer, prototype, ID) {
  return layer.withMutations(layer => {
      layer.setIn([prototype, ID, 'selected'], true);
      layer.updateIn(['selected', prototype], elements => elements.push(ID));
    }
  );
}

export function unselect(layer, prototype, ID) {
  return layer.withMutations(layer => {
      layer.setIn([prototype, ID, 'selected'], false);
      layer.updateIn(['selected', prototype], ids => ids.filter(curID => ID !== curID));
    }
  );
}

export function unselectAll(layer) {
  let selected = layer.get('selected');

  return layer.withMutations(layer => {
    selected.get('lines').forEach(lineID => layer.setIn(['lines', lineID, 'selected'], false));
    selected.get('areas').forEach(areaID => layer.setIn(['areas', areaID, 'selected'], false));
    selected.get('holes').forEach(holeID => layer.setIn(['holes', holeID, 'selected'], false));
    layer.set('selected', new ElementsSet());
  });
}

/** areas features **/
export function addArea(layer, type, verticesCoords) {
  let area;

  layer = layer.withMutations(layer => {
    let areaID = IDBroker.acquireID();

    let vertices = [];
    verticesCoords.forEach(({x, y}) => {
      let {vertex} = addVertex(layer, x, y, 'areas', areaID);
      vertices.push(vertex.id);
    });

    area = sceneComponentsFactory(type, {
      id: areaID,
      type,
      prototype: "areas",
      vertices: new List(vertices)
    });

    layer.setIn(['areas', areaID], area);
  });

  return {layer, area};
}

export function removeArea(layer, areaID) {
  let area = layer.getIn(['areas', areaID]);

  layer = layer.withMutations(layer => {
    layer.deleteIn(['areas', area.id]);
    area.vertices.forEach(vertexID => removeVertex(layer, vertexID, 'areas', area.id));
  });

  return {layer, area};
}

export function detectAndUpdateAreas(layer) {

  //generate LAR rappresentation
  let verticesArray = [];
  let id2index = {}, index2coord = {};
  layer.vertices.forEach(vertex => {
    let count = verticesArray.push([vertex.x, vertex.y]);
    let index = count - 1;
    id2index[vertex.id] = index;
    index2coord[index] = {x: vertex.x, y: vertex.y};
  });

  let linesArray = [];
  layer.lines.forEach(line => {
    let vertices = line.vertices.map(vertexID => id2index[vertexID]).toArray();
    linesArray.push(vertices);
  });


  layer = layer.withMutations(layer => {

    //remove old areas
    layer.areas.forEach(area => {
      removeArea(layer, area.id);
    });

    //add new areas
    let cycles = graphCycles(verticesArray, linesArray);
    cycles.v_cycles.forEach(cycle => {
      cycle.shift();
      let verticesCoords = cycle.map(index => index2coord[index]);
      addArea(layer, 'areaGeneric', verticesCoords);
    });
  });

  return {layer};
}

/** holes features **/
export function addHole(layer, type, lineID, offset) {
  let hole;

  layer = layer.withMutations(layer => {
    let holeID = IDBroker.acquireID();

    hole = sceneComponentsFactory(type, {
      id: holeID,
      type,
      offset,
      line: lineID
    });

    layer.setIn(['holes', holeID], hole);
    layer.updateIn(['lines', lineID, 'holes'], holes => holes.push(holeID));
  });

  return {layer, hole};
}

export function removeHole(layer, holeID) {
  let hole = layer.getIn(['holes', holeID]);
  layer = layer.withMutations(layer => {
    layer.deleteIn(['holes', hole.id]);
    layer.updateIn(['lines', hole.line, 'holes'], holes => {
      let index = holes.findIndex(ID => holeID === ID);
      return holes.remove(index);
    });
  });

  return {layer, hole};
}
