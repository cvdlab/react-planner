import {Map, List, fromJS} from 'immutable';
import {Vertex} from '../models';
import {
  IDBroker,
  NameGenerator,
  GeometryUtils,
  GraphInnerCycles
} from './export';

const flatten = list => list.reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);

export function addLine(layer, type, x0, y0, x1, y1, catalog, properties) {
  let line;

  layer = layer.withMutations(layer => {
    let lineID = IDBroker.acquireID();

    let v0, v1;
    ({layer, vertex: v0} = addVertex(layer, x0, y0, 'lines', lineID));
    ({layer, vertex: v1} = addVertex(layer, x1, y1, 'lines', lineID));

    line = catalog.factoryElement(type, {
      id: lineID,
      name: NameGenerator.generateName('lines', catalog.getIn(['elements', type, 'info', 'title'])),
      vertices: new List([v0.id, v1.id]),
      type
    }, properties);

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
    line.holes.forEach(holeID => removeHole(layer, holeID));
    layer.deleteIn(['lines', line.id]);
    line.vertices.forEach(vertexID => removeVertex(layer, vertexID, 'lines', line.id));
  });

  return {layer, line};
}

export function splitLine(layer, lineID, x, y, catalog) {
  let line0, line1;

  layer = layer.withMutations(layer => {
    let line = layer.getIn(['lines', lineID]);
    let v0 = layer.vertices.get(line.vertices.get(0));
    let v1 = layer.vertices.get(line.vertices.get(1));
    let {x: x0, y: y0} = v0;
    let {x: x1, y: y1} = v1;

    ({line: line0} = addLine(layer, line.type, x0, y0, x, y, catalog, line.get('properties')));
    ({line: line1} = addLine(layer, line.type, x1, y1, x, y, catalog, line.get('properties')));

    let splitPointOffset = GeometryUtils.pointPositionOnLineSegment(x0, y0, x1, y1, x, y);
    let minVertex = GeometryUtils.minVertex(v0, v1);

    line.holes.forEach(holeID => {
      let hole = layer.holes.get(holeID);

      let holeOffset = hole.offset;
      if (minVertex.x === x1 && minVertex.y === y1) {
        splitPointOffset = 1 - splitPointOffset;
        holeOffset = 1 - hole.offset;
      }

      if (holeOffset < splitPointOffset) {
        let offset = holeOffset / splitPointOffset;
        if (minVertex.x === x1 && minVertex.y === y1) {
          offset = 1 - offset;
        }
        addHole(layer, hole.type, line0.id, offset, catalog, hole.properties);
      } else {
        let offset = (holeOffset - splitPointOffset) / (1 - splitPointOffset);
        if (minVertex.x === x1 && minVertex.y === y1) {
          offset = 1 - offset;
        }
        addHole(layer, hole.type, line1.id, offset, catalog, hole.properties);
      }
    });

    removeLine(layer, lineID);
  });

  return {layer, lines: new List([line0, line1])};
}

export function addLinesFromPoints(layer, type, points, catalog, properties, holes) {
  points = new List(points)
    .sort(({x: x1, y: y1}, {x: x2, y: y2}) => {
      return x1 === x2 ? y1 - y2 : x1 - x2;
    });

  let pointsPair = points.zip(points.skip(1))
    .filterNot(([{x: x1, y: y1}, {x: x2, y: y2}]) => {
      return x1 === x2 && y1 === y2;
    });

  let lines = (new List()).withMutations(lines => {
    layer = layer.withMutations(layer => {
      pointsPair.forEach(([{x: x1, y: y1}, {x: x2, y: y2}]) => {
        let {line} = addLine(layer, type, x1, y1, x2, y2, catalog, properties);
        if (holes) {
          holes.forEach(holeWithOffsetPoint => {

            let {x: xp, y: yp} = holeWithOffsetPoint.offsetPosition;

            if (GeometryUtils.isPointOnLineSegment(x1, y1, x2, y2, xp, yp)) {

              let newOffset = GeometryUtils.pointPositionOnLineSegment(x1, y1, x2, y2, xp, yp);

              if (newOffset >= 0 && newOffset <= 1) {

                addHole(layer, holeWithOffsetPoint.hole.type, line.id, newOffset, catalog,
                  holeWithOffsetPoint.hole.properties);
              }
            }
          });
        }

        lines.push(line);
      });
    });
  });

  return {layer, lines};
}

export function addLineAvoidingIntersections(layer, type, x0, y0, x1, y1, catalog, oldProperties, oldHoles) {

  let points = [{x: x0, y: y0}, {x: x1, y: y1}];

  layer = layer.withMutations(layer => {
    let {lines, vertices} = layer;
    lines.forEach(line => {
      let [v0, v1] = line.vertices.map(vertexID => vertices.get(vertexID)).toArray();

      let hasCommonEndpoint =
        (GeometryUtils.samePoints(v0, points[0])
          || GeometryUtils.samePoints(v0, points[1])
          || GeometryUtils.samePoints(v1, points[0])
          || GeometryUtils.samePoints(v1, points[1]));


      let intersection = GeometryUtils.intersectionFromTwoLineSegment(
        points[0], points[1], v0, v1
      );

      if (intersection.type === 'colinear') {
        if (!oldHoles) {
          oldHoles = [];
        }

        let orderedVertices = GeometryUtils.orderVertices(points);

        layer.lines.get(line.id).holes.forEach(holeID => {
          let hole = layer.holes.get(holeID);
          let oldLineLength = GeometryUtils.pointsDistance(v0.x, v0.y, v1.x, v1.y);

          let alpha = Math.atan2(orderedVertices[1].y - orderedVertices[0].y,
            orderedVertices[1].x - orderedVertices[0].x);

          let offset = hole.offset;

          if (orderedVertices[1].x === line.vertices.get(1).x
            && orderedVertices[1].y === line.vertices(1).y) {
            offset = 1 - offset;
          }

          let xp = oldLineLength * offset * Math.cos(alpha) + v0.x;
          let yp = oldLineLength * offset * Math.sin(alpha) + v0.y;

          oldHoles.push({hole, offsetPosition: {x: xp, y: yp}});
        });

        removeLine(layer, line.id);
        points.push(v0, v1);
      }

      if (intersection.type === 'intersecting' && (!hasCommonEndpoint)) {
        splitLine(layer, line.id, intersection.point.x, intersection.point.y, catalog);
        points.push(intersection.point);
      }

    });
    addLinesFromPoints(layer, type, points, catalog, oldProperties, oldHoles);
  });

  return {layer};
}

/** vertices features **/
export function addVertex(layer, x, y, relatedPrototype, relatedID) {
  let vertex = layer.vertices.find(vertex => GeometryUtils.samePoints(vertex, {x, y}));

  if (vertex) {
    vertex = vertex.update(relatedPrototype, related => related.push(relatedID));
  }
  else {
    vertex = new Vertex({
      id: IDBroker.acquireID(),
      name: 'Vertex',
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
    let index = related.findIndex(ID => relatedID === ID);
    return related.delete(index);
  });

  layer =
    vertex.areas.size || vertex.lines.size ?
    layer.setIn(['vertices', vertex.id], vertex) :
    layer.deleteIn(['vertices', vertex.id]);

  return {layer, vertex};
}

export function mergeEqualsVertices(layer, vertexID) {

  //1. find vertices to remove
  let vertex = layer.getIn(['vertices', vertexID]);

  let doubleVertices = layer.vertices
    .filter(v => v.id !== vertexID && GeometryUtils.samePoints(vertex, v));

  if (doubleVertices.isEmpty()) return layer;

  //2. remove double vertices
  let vertices, lines, areas;
  vertices = layer.vertices.withMutations(vertices => {
    lines = layer.lines.withMutations(lines => {
      areas = layer.areas.withMutations(areas => {

        doubleVertices.forEach(doubleVertex => {

          doubleVertex.lines.forEach(lineID => {
            let line = lines.get(lineID);
            line = line.update('vertices', vertices => vertices.map(v => v === doubleVertex.id ? vertexID : v));
            lines.set(lineID, line);
            vertices.updateIn([vertexID, 'lines'], l => l.push(lineID));
          });

          doubleVertex.areas.forEach(areaID => {
            let area = areas.get(areaID);
            area = area.update('vertices', vertices => vertices.map(v => v === doubleVertex.id ? vertexID : v));
            areas.set(areaID, area);
            vertices.updateIn([vertexID, 'areas'], area => area.push(areaID));
          });

          vertices.remove(doubleVertex.id);

        });
      });
    });
  });

  //3. update layer
  return layer.merge({
    vertices, lines, areas
  });
}

export function select(layer, prototype, ID) {
  return layer.withMutations(layer => {
    layer.setIn([prototype, ID, 'selected'], true);
    layer.updateIn(['selected', prototype], elements => elements.push(ID));
  });
}

export function unselect(layer, prototype, ID) {
  return layer.withMutations(layer => {
    let ids = layer.getIn(['selected', prototype]);
    ids = ids.remove(ids.indexOf(ID));
    let selected = ids.some(key => key === ID);
    layer.setIn(['selected', prototype], ids);
    layer.setIn([prototype, ID, 'selected'], selected);
  });
}

function opSetProperties(layer, prototype, ID, properties) {
  properties = fromJS(properties);
  layer.mergeIn([prototype, ID, 'properties'], properties);
}

function opUpdateProperties(layer, prototype, ID, properties) {
  fromJS(properties).forEach( ( v, k ) => {
    if( layer.hasIn([prototype, ID, 'properties', k]) )
      layer.mergeIn([prototype, ID, 'properties', k], v);
  });
}

function opSetItemsAttributes(layer, prototype, ID, itemsAttributes) {
  itemsAttributes = fromJS(itemsAttributes);
  layer.mergeIn([prototype, ID], itemsAttributes);
}

function opSetLinesAttributes(layer, prototype, ID, linesAttributes, catalog) {

  let lAttr = linesAttributes.toJS();
  let {vertexOne, vertexTwo, lineLength} = lAttr;

  delete lAttr['vertexOne'];
  delete lAttr['vertexTwo'];
  delete lAttr['lineLength'];

  layer = layer
    .mergeIn([prototype, ID], fromJS(lAttr))  //all the others attributes
    .mergeIn(['vertices', vertexOne.id], {x: vertexOne.x, y: vertexOne.y})
    .mergeIn(['vertices', vertexTwo.id], {x: vertexTwo.x, y: vertexTwo.y})
    .mergeDeepIn([prototype, ID, 'misc'], new Map({'_unitLength': lineLength._unit}));

  layer = mergeEqualsVertices(layer, vertexOne.id);
  //check if second vertex has different coordinates than the first
  if (vertexOne.x != vertexTwo.x && vertexOne.y != vertexTwo.y) layer = mergeEqualsVertices(layer, vertexTwo.id);

  detectAndUpdateAreas(layer, catalog);
}

function opSetHolesAttributes(layer, prototype, ID, holesAttributes) {

  let hAttr = holesAttributes.toJS();
  let {offsetA, offsetB, offset} = hAttr;

  delete hAttr['offsetA'];
  delete hAttr['offsetB'];
  delete hAttr['offset'];

  let misc = new Map({_unitA: offsetA._unit, _unitB: offsetB._unit});

  layer
    .mergeIn([prototype, ID], fromJS(hAttr))  //all the others attributes
    .mergeDeepIn([prototype, ID], new Map({offset, misc}));
}


export function setPropertiesOnSelected(layer, properties) {
  return layer.withMutations(layer => {
    let selected = layer.selected;
    selected.lines.forEach(lineID => opSetProperties(layer, 'lines', lineID, properties));
    selected.holes.forEach(holeID => opSetProperties(layer, 'holes', holeID, properties));
    selected.areas.forEach(areaID => opSetProperties(layer, 'areas', areaID, properties));
    selected.items.forEach(itemID => opSetProperties(layer, 'items', itemID, properties));
  });
}

export function updatePropertiesOnSelected(layer, properties) {
  return layer.withMutations(layer => {
    let selected = layer.selected;
    selected.lines.forEach(lineID => opUpdateProperties(layer, 'lines', lineID, properties));
    selected.holes.forEach(holeID => opUpdateProperties(layer, 'holes', holeID, properties));
    selected.areas.forEach(areaID => opUpdateProperties(layer, 'areas', areaID, properties));
    selected.items.forEach(itemID => opUpdateProperties(layer, 'items', itemID, properties));
  });
}

export function setAttributesOnSelected(layer, attributes, catalog) {
  return layer.withMutations(layer => {
    let selected = layer.selected;
    selected.lines.forEach(lineID => opSetLinesAttributes(layer, 'lines', lineID, attributes, catalog));
    selected.holes.forEach(holeID => opSetHolesAttributes(layer, 'holes', holeID, attributes, catalog));
    selected.items.forEach(itemID => opSetItemsAttributes(layer, 'items', itemID, attributes, catalog));
    //selected.areas.forEach(areaID => opSetItemsAttributes(layer, 'areas', areaID, attributes, catalog));
  });
}

export function unselectAll(layer) {
  let selected = layer.get('selected');

  return layer.withMutations(layer => {
    layer.selected.forEach((ids, prototype) => {
      ids.forEach(id => unselect(layer, prototype, id));
    });
  });
}

/** areas features **/
export function addArea(layer, type, verticesCoords, catalog) {
  let area;

  layer = layer.withMutations(layer => {
    let areaID = IDBroker.acquireID();

    let vertices = verticesCoords.map( ( v ) => addVertex(layer, v.x, v.y, 'areas', areaID).vertex.id );

    area = catalog.factoryElement(type, {
      id: areaID,
      name: NameGenerator.generateName('areas', catalog.getIn(['elements', type, 'info', 'title'])),
      type,
      prototype: 'areas',
      vertices
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

const sameSet = (set1, set2) => set1.size === set2.size && set1.isSuperset(set2) && set1.isSubset(set2);

export function detectAndUpdateAreas(layer, catalog) {

  let verticesArray = [];           //array with vertices coords
  let linesArray;                   //array with edges

  let vertexID_to_verticesArrayIndex = {};
  let verticesArrayIndex_to_vertexID = {};

  layer.vertices.forEach(vertex => {
    let verticesCount = verticesArray.push([vertex.x, vertex.y]);
    let latestVertexIndex = verticesCount - 1;
    vertexID_to_verticesArrayIndex[vertex.id] = latestVertexIndex;
    verticesArrayIndex_to_vertexID[latestVertexIndex] = vertex.id;
  });

  linesArray = layer.lines.map(line => line.vertices.map(vertexID => vertexID_to_verticesArrayIndex[vertexID]).toArray());

  let innerCyclesByVerticesArrayIndex = GraphInnerCycles.calculateInnerCycles(verticesArray, linesArray);

  let innerCyclesByVerticesID = new List(innerCyclesByVerticesArrayIndex)
    .map(cycle => new List(cycle.map(vertexIndex => verticesArrayIndex_to_vertexID[vertexIndex])));

  // All area vertices should be ordered in counterclockwise order
  innerCyclesByVerticesID = innerCyclesByVerticesID.map( ( area ) =>
    GraphInnerCycles.isClockWiseOrder( area.map(vertexID => layer.vertices.get(vertexID) ) ) ? area.reverse() : area
  );

  let areaIDs = [];

  layer = layer.withMutations(layer => {
    //remove areas
    layer.areas.forEach(area => {
      let areaInUse = innerCyclesByVerticesID.some(vertices => sameSet(vertices, area.vertices));
      if (!areaInUse) removeArea(layer, area.id);
    });

    //add new areas
    innerCyclesByVerticesID.forEach((cycle, ind) => {
      let areaInUse = layer.areas.find(area => sameSet(area.vertices, cycle));

      if (areaInUse) {
        areaIDs[ind] = areaInUse.id;
        layer.setIn(['areas', areaIDs[ind], 'holes'], new List());
      } else {
        let areaVerticesCoords = cycle.map(vertexId => layer.vertices.get(vertexId));
        let {area} = addArea(layer, 'area', areaVerticesCoords, catalog);
        areaIDs[ind] = area.id;
      }
    });

    // Build a relationship between areas and their coordinates
    let verticesCoordsForArea = areaIDs.map(id => {
      let vertices = layer.areas.get(id).vertices.map(vertexID => {
        let { x, y } = layer.vertices.get(vertexID); return new List([x,y]);
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
      layer.setIn(['areas', verticesCoordsForArea[i].id, 'holes'], holesList);
    }

    // Remove holes which are already holes for other areas
    areaIDs.forEach(areaID => {
      let doubleHoles = new Set();
      let areaHoles = layer.getIn(['areas', areaID, 'holes']);
      areaHoles.forEach((areaHoleID) => {
        let holesOfholes = layer.getIn(['areas', areaHoleID, 'holes']);
        holesOfholes.forEach((holeID) => {
          let holeIndex = areaHoles.indexOf(holeID);
          if (holeIndex !== -1) {
            doubleHoles.add(holeID);
          }
        });
      });
      doubleHoles.forEach(doubleHoleID => {
        let holeIndex = areaHoles.indexOf(doubleHoleID);
        areaHoles = areaHoles.remove(holeIndex);
      });
      layer.setIn(['areas', areaID, 'holes'], areaHoles);
    });
  });

  return {layer};
}

/** holes features **/
export function addHole(layer, type, lineID, offset, catalog, properties) {
  let hole;

  layer = layer.withMutations(layer => {
    let holeID = IDBroker.acquireID();

    hole = catalog.factoryElement(type, {
      id: holeID,
      name: NameGenerator.generateName('holes', catalog.getIn(['elements', type, 'info', 'title'])),
      type,
      offset,
      line: lineID
    }, properties);

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

/** items features **/
export function addItem(layer, type, x, y, width, height, rotation, catalog) {
  let item;

  layer = layer.withMutations(layer => {
    let itemID = IDBroker.acquireID();

    item = catalog.factoryElement(type, {
      id: itemID,
      name: NameGenerator.generateName('items', catalog.getIn(['elements', type, 'info', 'title'])),
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

