import {List, Seq, Map} from 'immutable';
import {Layer, Vertex, Line, Hole, Area, ElementsSet, Image, Item} from '../models';
import IDBroker from './id-broker';
import * as Geometry from './geometry';
import graphCycles from './graph-cycles';
import Graph from './graph';
import getEdgesOfSubgraphs from './get-edges-of-subgraphs';

const AREA_ELEMENT_TYPE = 'area';

/** lines features **/
export function addLine(layer, type, x0, y0, x1, y1, catalog) {
  let line;

  layer = layer.withMutations(layer => {
    let lineID = IDBroker.acquireID();

    let v0, v1;
    ({layer, vertex: v0} = addVertex(layer, x0, y0, 'lines', lineID));
    ({layer, vertex: v1} = addVertex(layer, x1, y1, 'lines', lineID));

    line = catalog.createElement(type, {
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
  let vertex;

  layer = layer.withMutations(layer => layer.withMutations(layer => {
    let vertexID = line.vertices.get(vertexIndex);
    unselect(layer, 'vertices', vertexID);
    removeVertex(layer, vertexID, 'lines', line.id);
    ({layer, vertex} = addVertex(layer, x, y, 'lines', line.id));
    line = line.setIn(['vertices', vertexIndex], vertex.id);
    layer.setIn(['lines', lineID], line);
  }));
  return {layer, line, vertex};
}

export function removeLine(layer, lineID) {
  let line = layer.getIn(['lines', lineID]);

  layer = layer.withMutations(layer => {
    unselect(layer, 'lines', lineID);
    layer.deleteIn(['lines', line.id]);
    line.vertices.forEach(vertexID => removeVertex(layer, vertexID, 'lines', line.id));
  });

  return {layer, line};
}

export function splitLine(layer, lineID, x, y, catalog) {
  let line0, line1;

  layer = layer.withMutations(layer => {
    let line = layer.getIn(['lines', lineID]);
    let {x: x0, y: y0} = layer.vertices.get(line.vertices.get(0));
    let {x: x1, y: y1} = layer.vertices.get(line.vertices.get(1));

    removeLine(layer, lineID);
    ({line: line0} = addLine(layer, line.type, x0, y0, x, y, catalog));
    ({line: line1} = addLine(layer, line.type, x1, y1, x, y, catalog));
  });

  return {layer, lines: new List([line0, line1])};
}

export function addLinesFromPoints(layer, type, points, catalog) {
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
        let {line} = addLine(layer, type, x1, y1, x2, y2, catalog);
        lines.push(line);
      });
    });
  });

  return {layer, lines};
}

export function addLineAvoidingIntersections(layer, type, x0, y0, x1, y1, catalog) {

  let points = [{x: x0, y: y0}, {x: x1, y: y1}];

  layer = layer.withMutations(layer => {
    let {lines, vertices} = layer;
    lines.forEach(line => {
      let [v0, v1] = line.vertices.map(vertexID => vertices.get(vertexID)).toArray();

      if (!(
        (v0.x === x0 && v0.y === y0)
        || (v0.x === x1 && v0.y === y1)
        || (v1.x === x0 && v1.y === y0)
        || (v1.x === x1 && v1.y === y1))) {


        let intersection = Geometry.intersectionFromTwoLineSegment(
          {x: x0, y: y0}, {x: x1, y: y1},
          v0, v1
        );

        if (intersection.type === "colinear") {
          removeLine(layer, line.id);
          points.push(v0, v1);
        }

        if (intersection.type === "intersecting") {
          splitLine(layer, line.id, intersection.point.x, intersection.point.y, catalog);
          points.push(intersection.point);
        }
      }
    });
    addLinesFromPoints(layer, type, points, catalog);
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
      let ids = layer.getIn(['selected', prototype]);
      ids = ids.remove(ids.indexOf(ID));
      let selected = ids.some(key => key === ID);
      layer.setIn(['selected', prototype], ids);
      layer.setIn([prototype, ID, 'selected'], selected);
    }
  );
}

export function setProperties(layer, prototype, ID, properties) {
  properties = Map(properties);
  return layer.setIn([prototype, ID, 'properties'], properties);
}

export function unselectAll(layer) {
  let selected = layer.get('selected');

  return layer.withMutations(layer => {
    layer.selected.forEach((ids, prototype)=> {
      ids.forEach(id => unselect(layer, prototype, id));
    });
  });
}

/** areas features **/
export function addArea(layer, type, verticesCoords, catalog) {
  let area;

  layer = layer.withMutations(layer => {
    let areaID = IDBroker.acquireID();

    let vertices = [];
    verticesCoords.forEach(({x, y}) => {
      let {vertex} = addVertex(layer, x, y, 'areas', areaID);
      vertices.push(vertex.id);
    });

    area = catalog.createElement(type, {
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
    unselect(layer, 'areas', areaID);
    layer.deleteIn(['areas', area.id]);
    area.vertices.forEach(vertexID => removeVertex(layer, vertexID, 'areas', area.id));
  });

  return {layer, area};
}

export function detectAndUpdateAreas(layer, catalog) {
  // console.groupCollapsed("Area detection");
  // console.log("vertices", layer.vertices.toJS());
  // console.log("lines", layer.lines.toJS());

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
    // console.log("graphCycles call", verticesArray, linesArray);

    let graph = new Graph(verticesArray.length);
    linesArray.forEach(line => {
      graph.addEdge(line[0], line[1]);
      graph.addEdge(line[1], line[0]);
    });

    graph.BCC();

    let subgraphs = graph.subgraphs.filter(subgraph => subgraph.length >= 3);
    let edgesArray = getEdgesOfSubgraphs(subgraphs, graph);

    let edges = [];
    edgesArray.forEach(es => {
      es.forEach(edge => edges.push(edge))
    });

    let cycles = graphCycles(verticesArray, edges);
    cycles.v_cycles.forEach(cycle => {
      cycle.shift();
      let verticesCoords = cycle.map(index => index2coord[index]);
      addArea(layer, AREA_ELEMENT_TYPE, verticesCoords, catalog);
    });
  });

  // console.log("areas", layer.areas.toJS());
  // console.groupEnd();
  return {layer};
}

/** holes features **/
export function addHole(layer, type, lineID, offset, catalog) {
  let hole;

  layer = layer.withMutations(layer => {
    let holeID = IDBroker.acquireID();

    hole = catalog.createElement(type, {
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
    unselect(layer, 'holes', holeID);
    layer.deleteIn(['holes', hole.id]);
    layer.updateIn(['lines', hole.line, 'holes'], holes => {
      let index = holes.findIndex(ID => holeID === ID);
      return holes.remove(index);
    });
  });

  return {layer, hole};
}

/** images features **/
export function addImage(layer, uri, x0, y0, x1, y1) {
  let image;

  layer = layer.withMutations(layer => {
    let imageID = IDBroker.acquireID();

    let v0, v1;
    ({layer, vertex: v0} = addVertex(layer, x0, y0, 'images', imageID));
    ({layer, vertex: v1} = addVertex(layer, x1, y1, 'images', imageID));

    image = new Image({
      id: imageID,
      vertices: new List([v0.id, v1.id]),
      uri
    });

    layer.setIn(['images', imageID], image);
  });

  return {layer, image};
}

/** items features **/
export function addItem(layer, type, x, y, width, height, rotation, catalog) {
  let item;

  layer = layer.withMutations(layer => {
    let itemID = IDBroker.acquireID();

    item = catalog.createElement(type, {
      id: itemID,
      type,
      height,
      width,
      x,
      y,
      rotation
    });

    layer.setIn(['items', itemID], item);
  });

  return {layer, item};
}

export function removeItem(layer, itemID) {
  let item = layer.getIn(['items', itemID]);
  layer = layer.withMutations(layer => {
    unselect(layer, 'items', itemID);
    layer.deleteIn(['items', item.id]);
  });

  return {layer, item};
}

//JSON serializer
export function loadLayerFromJSON(json, catalog) {
  let loadVertex = vertex => new Vertex(vertex)
    .set('lines', new List(vertex.lines))
    .set('areas', new List(vertex.areas));

  let loadLine = line => new Line(line)
    .set('type', catalog.getElement(line.type).name)
    .set('vertices', new List(line.vertices))
    .set('holes', new List(line.holes))
    .set('properties', new Map(line.properties || {}));

  let loadHole = hole => new Hole(hole)
    .set('type', catalog.getElement(hole.type).name)
    .set('properties', new Map(hole.properties || {}));

  let loadArea = area => new Area(area)
    .set('type', catalog.getElement(area.type).name)
    .set('vertices', new List(area.vertices))
    .set('properties', new Map(area.properties || {}));

  let loadImage = image => new Image(image)
    .set('vertices', new List(image.vertices));

  let loadItem = item => new Item(item);

  let loadElementsSet = (elementsSet => {
    return new ElementsSet({
      lines: new List(elementsSet.lines),
      areas: new List(elementsSet.areas),
      holes: new List(elementsSet.holes),
      items: new List(elementsSet.items)
    });
  });


  let loadLayer = layer => new Layer(layer)
    .set('vertices', new Seq(layer.vertices).map(vertex => loadVertex(vertex)).toMap())
    .set('lines', new Seq(layer.lines).map(line => loadLine(line)).toMap())
    .set('holes', new Seq(layer.holes).map(hole => loadHole(hole)).toMap())
    .set('areas', new Seq(layer.areas).map(area => loadArea(area)).toMap())
    .set('images', new Seq(layer.images).map(image => loadImage(image)).toMap())
    .set('items', new Seq(layer.items).map(item => loadItem(item)).toMap())
    .set('selected', layer.selected ? loadElementsSet(layer.selected) : new ElementsSet());

  return loadLayer(json);
}
