var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/** lines features **/
import { Map, List, fromJS } from 'immutable';
import { Vertex } from '../models';
import IDBroker from './id-broker';
import NameGenerator from './name-generator';
import * as Geometry from './geometry';
import calculateInnerCyles, { isClockWiseOrder } from './graph-inner-cycles';

var flatten = function flatten(list) {
  return list.reduce(function (a, b) {
    return a.concat(Array.isArray(b) ? flatten(b) : b);
  }, []);
};

export function addLine(layer, type, x0, y0, x1, y1, catalog) {
  var properties = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : {};

  var line = void 0;

  layer = layer.withMutations(function (layer) {
    var lineID = IDBroker.acquireID();

    var v0 = void 0,
        v1 = void 0;

    var _addVertex = addVertex(layer, x0, y0, 'lines', lineID);

    layer = _addVertex.layer;
    v0 = _addVertex.vertex;

    var _addVertex2 = addVertex(layer, x1, y1, 'lines', lineID);

    layer = _addVertex2.layer;
    v1 = _addVertex2.vertex;


    line = catalog.factoryElement(type, {
      id: lineID,
      name: NameGenerator.generateName('lines', catalog.getIn(['elements', type, 'info', 'title'])),
      vertices: new List([v0.id, v1.id]),
      type: type
    }, properties);

    layer.setIn(['lines', lineID], line);
  });

  return { layer: layer, line: line };
}

export function replaceLineVertex(layer, lineID, vertexIndex, x, y) {
  var line = layer.getIn(['lines', lineID]);
  var vertex = void 0;

  layer = layer.withMutations(function (layer) {
    return layer.withMutations(function (layer) {
      var vertexID = line.vertices.get(vertexIndex);
      unselect(layer, 'vertices', vertexID);
      removeVertex(layer, vertexID, 'lines', line.id);

      var _addVertex3 = addVertex(layer, x, y, 'lines', line.id);

      layer = _addVertex3.layer;
      vertex = _addVertex3.vertex;

      line = line.setIn(['vertices', vertexIndex], vertex.id);
      layer.setIn(['lines', lineID], line);
    });
  });
  return { layer: layer, line: line, vertex: vertex };
}

export function removeLine(layer, lineID) {
  var line = layer.getIn(['lines', lineID]);

  layer = layer.withMutations(function (layer) {
    unselect(layer, 'lines', lineID);
    line.holes.forEach(function (holeID) {
      return removeHole(layer, holeID);
    });
    layer.deleteIn(['lines', line.id]);
    line.vertices.forEach(function (vertexID) {
      return removeVertex(layer, vertexID, 'lines', line.id);
    });
  });

  return { layer: layer, line: line };
}

export function splitLine(layer, lineID, x, y, catalog) {
  var line0 = void 0,
      line1 = void 0;

  layer = layer.withMutations(function (layer) {
    var line = layer.getIn(['lines', lineID]);
    var v0 = layer.vertices.get(line.vertices.get(0));
    var v1 = layer.vertices.get(line.vertices.get(1));
    var x0 = v0.x,
        y0 = v0.y;
    var x1 = v1.x,
        y1 = v1.y;

    var _addLine = addLine(layer, line.type, x0, y0, x, y, catalog, line.properties);

    line0 = _addLine.line;

    var _addLine2 = addLine(layer, line.type, x1, y1, x, y, catalog, line.properties);

    line1 = _addLine2.line;


    var splitPointOffset = Geometry.pointPositionOnLineSegment(x0, y0, x1, y1, x, y);
    var minVertex = Geometry.minVertex(v0, v1);

    line.holes.forEach(function (holeID) {
      var hole = layer.holes.get(holeID);

      var holeOffset = hole.offset;
      if (minVertex.x === x1 && minVertex.y === y1) {
        splitPointOffset = 1 - splitPointOffset;
        holeOffset = 1 - hole.offset;
      }

      if (holeOffset < splitPointOffset) {
        var offset = holeOffset / splitPointOffset;
        if (minVertex.x === x1 && minVertex.y === y1) {
          offset = 1 - offset;
        }
        addHole(layer, hole.type, line0.id, offset, catalog, hole.properties);
      } else {
        var _offset = (holeOffset - splitPointOffset) / (1 - splitPointOffset);
        if (minVertex.x === x1 && minVertex.y === y1) {
          _offset = 1 - _offset;
        }
        addHole(layer, hole.type, line1.id, _offset, catalog, hole.properties);
      }
    });

    removeLine(layer, lineID);
  });

  return { layer: layer, lines: new List([line0, line1]) };
}

export function addLinesFromPoints(layer, type, points, catalog, properties, holes) {
  points = new List(points).sort(function (_ref, _ref2) {
    var x1 = _ref.x,
        y1 = _ref.y;
    var x2 = _ref2.x,
        y2 = _ref2.y;

    return x1 === x2 ? y1 - y2 : x1 - x2;
  });

  var pointsPair = points.zip(points.skip(1)).filterNot(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2),
        _ref4$ = _ref4[0],
        x1 = _ref4$.x,
        y1 = _ref4$.y,
        _ref4$2 = _ref4[1],
        x2 = _ref4$2.x,
        y2 = _ref4$2.y;

    return x1 === x2 && y1 === y2;
  });

  var lines = new List().withMutations(function (lines) {
    layer = layer.withMutations(function (layer) {
      pointsPair.forEach(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2),
            _ref6$ = _ref6[0],
            x1 = _ref6$.x,
            y1 = _ref6$.y,
            _ref6$2 = _ref6[1],
            x2 = _ref6$2.x,
            y2 = _ref6$2.y;

        var _addLine3 = addLine(layer, type, x1, y1, x2, y2, catalog, properties),
            line = _addLine3.line;

        if (holes) {
          holes.forEach(function (holeWithOffsetPoint) {
            var _holeWithOffsetPoint$ = holeWithOffsetPoint.offsetPosition,
                xp = _holeWithOffsetPoint$.x,
                yp = _holeWithOffsetPoint$.y;


            if (Geometry.isPointOnLineSegment(x1, y1, x2, y2, xp, yp)) {

              var newOffset = Geometry.pointPositionOnLineSegment(x1, y1, x2, y2, xp, yp);

              if (newOffset >= 0 && newOffset <= 1) {

                addHole(layer, holeWithOffsetPoint.hole.type, line.id, newOffset, catalog, holeWithOffsetPoint.hole.properties);
              }
            }
          });
        }

        lines.push(line);
      });
    });
  });

  return { layer: layer, lines: lines };
}

export function addLineAvoidingIntersections(layer, type, x0, y0, x1, y1, catalog, oldProperties, oldHoles) {

  var points = [{ x: x0, y: y0 }, { x: x1, y: y1 }];

  layer = layer.withMutations(function (layer) {
    var lines = layer.lines,
        vertices = layer.vertices;

    lines.forEach(function (line) {
      var _line$vertices$map$to = line.vertices.map(function (vertexID) {
        return vertices.get(vertexID);
      }).toArray(),
          _line$vertices$map$to2 = _slicedToArray(_line$vertices$map$to, 2),
          v0 = _line$vertices$map$to2[0],
          v1 = _line$vertices$map$to2[1];

      var hasCommonEndpoint = Geometry.samePoints(v0, points[0]) || Geometry.samePoints(v0, points[1]) || Geometry.samePoints(v1, points[0]) || Geometry.samePoints(v1, points[1]);

      var intersection = Geometry.intersectionFromTwoLineSegment(points[0], points[1], v0, v1);

      if (intersection.type === 'colinear') {
        if (!oldHoles) {
          oldHoles = [];
        }

        var orderedVertices = Geometry.orderVertices(points);

        layer.lines.get(line.id).holes.forEach(function (holeID) {
          var hole = layer.holes.get(holeID);
          var oldLineLength = Geometry.pointsDistance(v0.x, v0.y, v1.x, v1.y);

          var alpha = Math.atan2(orderedVertices[1].y - orderedVertices[0].y, orderedVertices[1].x - orderedVertices[0].x);

          var offset = hole.offset;

          if (orderedVertices[1].x === line.vertices.get(1).x && orderedVertices[1].y === line.vertices(1).y) {
            offset = 1 - offset;
          }

          var xp = oldLineLength * offset * Math.cos(alpha) + v0.x;
          var yp = oldLineLength * offset * Math.sin(alpha) + v0.y;

          oldHoles.push({ hole: hole, offsetPosition: { x: xp, y: yp } });
        });

        removeLine(layer, line.id);
        points.push(v0, v1);
      }

      if (intersection.type === 'intersecting' && !hasCommonEndpoint) {
        splitLine(layer, line.id, intersection.point.x, intersection.point.y, catalog);
        points.push(intersection.point);
      }
    });
    addLinesFromPoints(layer, type, points, catalog, oldProperties, oldHoles);
  });

  return { layer: layer };
}

/** vertices features **/
export function addVertex(layer, x, y, relatedPrototype, relatedID) {
  var vertex = layer.vertices.find(function (vertex) {
    return Geometry.samePoints(vertex, { x: x, y: y });
  });

  if (vertex) {
    vertex = vertex.update(relatedPrototype, function (related) {
      return related.push(relatedID);
    });
  } else {
    vertex = new Vertex(_defineProperty({
      id: IDBroker.acquireID(),
      name: 'Vertex',
      x: x, y: y
    }, relatedPrototype, new List([relatedID])));
  }

  layer = layer.setIn(['vertices', vertex.id], vertex);
  return { layer: layer, vertex: vertex };
}

export function removeVertex(layer, vertexID, relatedPrototype, relatedID) {
  var vertex = layer.vertices.get(vertexID);
  vertex = vertex.update(relatedPrototype, function (related) {
    var index = related.findIndex(function (ID) {
      return relatedID === ID;
    });
    return related.delete(index);
  });

  layer = vertex.areas.size || vertex.lines.size ? layer.setIn(['vertices', vertex.id], vertex) : layer.deleteIn(['vertices', vertex.id]);

  return { layer: layer, vertex: vertex };
}

export function mergeEqualsVertices(layer, vertexID) {

  //1. find vertices to remove
  var vertex = layer.getIn(['vertices', vertexID]);

  var doubleVertices = layer.vertices.filter(function (v) {
    return v.id !== vertexID && Geometry.samePoints(vertex, v);
  });

  if (doubleVertices.isEmpty()) return layer;

  //2. remove double vertices
  var vertices = void 0,
      lines = void 0,
      areas = void 0;
  vertices = layer.vertices.withMutations(function (vertices) {
    lines = layer.lines.withMutations(function (lines) {
      areas = layer.areas.withMutations(function (areas) {

        doubleVertices.forEach(function (doubleVertex) {

          doubleVertex.lines.forEach(function (lineID) {
            var line = lines.get(lineID);
            line = line.update('vertices', function (vertices) {
              return vertices.map(function (v) {
                return v === doubleVertex.id ? vertexID : v;
              });
            });
            lines.set(lineID, line);
            vertices.updateIn([vertexID, 'lines'], function (l) {
              return l.push(lineID);
            });
          });

          doubleVertex.areas.forEach(function (areaID) {
            var area = areas.get(areaID);
            area = area.update('vertices', function (vertices) {
              return vertices.map(function (v) {
                return v === doubleVertex.id ? vertexID : v;
              });
            });
            areas.set(areaID, area);
            vertices.updateIn([vertexID, 'areas'], function (area) {
              return area.push(areaID);
            });
          });

          vertices.remove(doubleVertex.id);
        });
      });
    });
  });

  //3. update layer
  return layer.merge({
    vertices: vertices, lines: lines, areas: areas
  });
}

export function select(layer, prototype, ID) {
  return layer.withMutations(function (layer) {
    layer.setIn([prototype, ID, 'selected'], true);
    layer.updateIn(['selected', prototype], function (elements) {
      return elements.push(ID);
    });
  });
}

export function unselect(layer, prototype, ID) {
  return layer.withMutations(function (layer) {
    var ids = layer.getIn(['selected', prototype]);
    ids = ids.remove(ids.indexOf(ID));
    var selected = ids.some(function (key) {
      return key === ID;
    });
    layer.setIn(['selected', prototype], ids);
    layer.setIn([prototype, ID, 'selected'], selected);
  });
}

function opSetProperties(layer, prototype, ID, properties) {
  properties = fromJS(properties);
  layer.mergeIn([prototype, ID, 'properties'], properties);
}

function opUpdateProperties(layer, prototype, ID, properties) {
  fromJS(properties).forEach(function (v, k) {
    if (layer.hasIn([prototype, ID, 'properties', k])) layer.mergeIn([prototype, ID, 'properties', k], v);
  });
}

function opSetItemsAttributes(layer, prototype, ID, itemsAttributes) {
  itemsAttributes = fromJS(itemsAttributes);
  layer.mergeIn([prototype, ID], itemsAttributes);
}

function opSetLinesAttributes(layer, prototype, ID, linesAttributes, catalog) {

  var lAttr = linesAttributes.toJS();
  var vertexOne = lAttr.vertexOne,
      vertexTwo = lAttr.vertexTwo,
      lineLength = lAttr.lineLength;


  delete lAttr['vertexOne'];
  delete lAttr['vertexTwo'];
  delete lAttr['lineLength'];

  layer = layer.mergeIn([prototype, ID], fromJS(lAttr)) //all the others attributes
  .mergeIn(['vertices', vertexOne.id], { x: vertexOne.x, y: vertexOne.y }).mergeIn(['vertices', vertexTwo.id], { x: vertexTwo.x, y: vertexTwo.y }).mergeDeepIn([prototype, ID, 'misc'], new Map({ '_unitLength': lineLength._unit }));

  layer = mergeEqualsVertices(layer, vertexOne.id);
  //check if second vertex has different coordinates than the first
  if (vertexOne.x != vertexTwo.x && vertexOne.y != vertexTwo.y) layer = mergeEqualsVertices(layer, vertexTwo.id);

  detectAndUpdateAreas(layer, catalog);
}

function opSetHolesAttributes(layer, prototype, ID, holesAttributes) {

  var hAttr = holesAttributes.toJS();
  var offsetA = hAttr.offsetA,
      offsetB = hAttr.offsetB,
      offset = hAttr.offset;


  delete hAttr['offsetA'];
  delete hAttr['offsetB'];
  delete hAttr['offset'];

  var misc = new Map({ _unitA: offsetA._unit, _unitB: offsetB._unit });

  layer.mergeIn([prototype, ID], fromJS(hAttr)) //all the others attributes
  .mergeDeepIn([prototype, ID], new Map({ offset: offset, misc: misc }));
}

export function setPropertiesOnSelected(layer, properties) {
  return layer.withMutations(function (layer) {
    var selected = layer.selected;
    selected.lines.forEach(function (lineID) {
      return opSetProperties(layer, 'lines', lineID, properties);
    });
    selected.holes.forEach(function (holeID) {
      return opSetProperties(layer, 'holes', holeID, properties);
    });
    selected.areas.forEach(function (areaID) {
      return opSetProperties(layer, 'areas', areaID, properties);
    });
    selected.items.forEach(function (itemID) {
      return opSetProperties(layer, 'items', itemID, properties);
    });
  });
}

export function updatePropertiesOnSelected(layer, properties) {
  return layer.withMutations(function (layer) {
    var selected = layer.selected;
    selected.lines.forEach(function (lineID) {
      return opUpdateProperties(layer, 'lines', lineID, properties);
    });
    selected.holes.forEach(function (holeID) {
      return opUpdateProperties(layer, 'holes', holeID, properties);
    });
    selected.areas.forEach(function (areaID) {
      return opUpdateProperties(layer, 'areas', areaID, properties);
    });
    selected.items.forEach(function (itemID) {
      return opUpdateProperties(layer, 'items', itemID, properties);
    });
  });
}

export function setAttributesOnSelected(layer, attributes, catalog) {
  return layer.withMutations(function (layer) {
    var selected = layer.selected;
    selected.lines.forEach(function (lineID) {
      return opSetLinesAttributes(layer, 'lines', lineID, attributes, catalog);
    });
    selected.holes.forEach(function (holeID) {
      return opSetHolesAttributes(layer, 'holes', holeID, attributes, catalog);
    });
    selected.items.forEach(function (itemID) {
      return opSetItemsAttributes(layer, 'items', itemID, attributes, catalog);
    });
    //selected.areas.forEach(areaID => opSetItemsAttributes(layer, 'areas', areaID, attributes, catalog));
  });
}

export function unselectAll(layer) {
  var selected = layer.get('selected');

  return layer.withMutations(function (layer) {
    layer.selected.forEach(function (ids, prototype) {
      ids.forEach(function (id) {
        return unselect(layer, prototype, id);
      });
    });
  });
}

/** areas features **/
export function addArea(layer, type, verticesCoords, catalog) {
  var area = void 0;

  layer = layer.withMutations(function (layer) {
    var areaID = IDBroker.acquireID();

    var vertices = verticesCoords.map(function (v) {
      return addVertex(layer, v.x, v.y, 'areas', areaID).vertex.id;
    });

    area = catalog.factoryElement(type, {
      id: areaID,
      name: NameGenerator.generateName('areas', catalog.getIn(['elements', type, 'info', 'title'])),
      type: type,
      prototype: 'areas',
      vertices: vertices
    });

    layer.setIn(['areas', areaID], area);
  });

  return { layer: layer, area: area };
}

export function removeArea(layer, areaID) {
  var area = layer.getIn(['areas', areaID]);

  layer = layer.withMutations(function (layer) {
    unselect(layer, 'areas', areaID);
    layer.deleteIn(['areas', area.id]);
    area.vertices.forEach(function (vertexID) {
      return removeVertex(layer, vertexID, 'areas', area.id);
    });
  });

  return { layer: layer, area: area };
}

var sameSet = function sameSet(set1, set2) {
  return set1.size === set2.size && set1.isSuperset(set2) && set1.isSubset(set2);
};

//https://github.com/MartyWallace/PolyK
function ContainsPoint(polygon, pointX, pointY) {
  var n = polygon.length >> 1;

  var ax = void 0,
      lup = void 0;
  var ay = polygon[2 * n - 3] - pointY;
  var bx = polygon[2 * n - 2] - pointX;
  var by = polygon[2 * n - 1] - pointY;

  if (bx === 0 && by === 0) return false; // point on edge

  // let lup = by > ay;
  for (var ii = 0; ii < n; ii++) {
    ax = bx;
    ay = by;
    bx = polygon[2 * ii] - pointX;
    by = polygon[2 * ii + 1] - pointY;
    if (bx === 0 && by === 0) return false; // point on edge
    if (ay === by) continue;
    lup = by > ay;
  }

  var depth = 0;
  for (var i = 0; i < n; i++) {
    ax = bx;
    ay = by;
    bx = polygon[2 * i] - pointX;
    by = polygon[2 * i + 1] - pointY;
    if (ay < 0 && by < 0) continue; // both 'up' or both 'down'
    if (ay > 0 && by > 0) continue; // both 'up' or both 'down'
    if (ax < 0 && bx < 0) continue; // both points on the left

    if (ay === by && Math.min(ax, bx) < 0) return true;
    if (ay === by) continue;

    var lx = ax + (bx - ax) * -ay / (by - ay);
    if (lx === 0) return false; // point on edge
    if (lx > 0) depth++;
    if (ay === 0 && lup && by > ay) depth--; // hit vertex, both up
    if (ay === 0 && !lup && by < ay) depth--; // hit vertex, both down
    lup = by > ay;
  }
  return (depth & 1) === 1;
}

export function detectAndUpdateAreas(layer, catalog) {

  var verticesArray = []; //array with vertices coords
  var linesArray = void 0; //array with edges

  var vertexID_to_verticesArrayIndex = {};
  var verticesArrayIndex_to_vertexID = {};

  layer.vertices.forEach(function (vertex) {
    var verticesCount = verticesArray.push([vertex.x, vertex.y]);
    var latestVertexIndex = verticesCount - 1;
    vertexID_to_verticesArrayIndex[vertex.id] = latestVertexIndex;
    verticesArrayIndex_to_vertexID[latestVertexIndex] = vertex.id;
  });

  linesArray = layer.lines.map(function (line) {
    return line.vertices.map(function (vertexID) {
      return vertexID_to_verticesArrayIndex[vertexID];
    }).toArray();
  });

  var innerCyclesByVerticesArrayIndex = calculateInnerCyles(verticesArray, linesArray);

  var innerCyclesByVerticesID = innerCyclesByVerticesArrayIndex.map(function (cycle) {
    return cycle.map(function (vertexIndex) {
      return verticesArrayIndex_to_vertexID[vertexIndex];
    });
  });

  // All area vertices should be ordered in counterclockwise order
  innerCyclesByVerticesID = innerCyclesByVerticesID.map(function (area) {
    return isClockWiseOrder(area.map(function (vertexID) {
      return layer.vertices.get(vertexID);
    })) ? area.reverse() : area;
  });

  var areaIDs = [];

  layer = layer.withMutations(function (layer) {
    //remove areas
    layer.areas.forEach(function (area) {
      var areaInUse = innerCyclesByVerticesID.some(function (vertices) {
        return sameSet(vertices, area.vertices);
      });
      if (!areaInUse) removeArea(layer, area.id);
    });

    //add new areas
    innerCyclesByVerticesID.forEach(function (cycle, ind) {
      var areaInUse = layer.areas.find(function (area) {
        return sameSet(area.vertices, cycle);
      });

      if (areaInUse) {
        areaIDs[ind] = areaInUse.id;
        layer.setIn(['areas', areaIDs[ind], 'holes'], new List());
      } else {
        var areaVerticesCoords = cycle.map(function (vertexId) {
          return layer.vertices.get(vertexId);
        });

        var _addArea = addArea(layer, 'area', areaVerticesCoords, catalog),
            area = _addArea.area;

        areaIDs[ind] = area.id;
      }
    });

    // Build a relationship between areas and their coordinates
    var verticesCoordsForArea = areaIDs.map(function (id) {
      var vertices = layer.areas.get(id).vertices.map(function (vertexID) {
        return layer.vertices.get(vertexID);
      });
      return { id: id, vertices: vertices };
    });

    // Find all holes for an area
    var i = void 0,
        j = void 0;
    for (i = 0; i < verticesCoordsForArea.length; i++) {
      var holesList = new List(); // The holes for this area
      var areaVerticesList = verticesCoordsForArea[i].vertices.flatten().toArray();
      for (j = 0; j < verticesCoordsForArea.length; j++) {
        if (i !== j) {
          var isHole = ContainsPoint(areaVerticesList, verticesCoordsForArea[j].vertices.get(0).get(0), verticesCoordsForArea[j].vertices.get(0).get(1));
          if (isHole) {
            holesList = holesList.push(verticesCoordsForArea[j].id);
          }
        }
      }
      layer.setIn(['areas', verticesCoordsForArea[i].id, 'holes'], holesList);
    }

    // Remove holes which are already holes for other areas
    areaIDs.forEach(function (areaID) {
      var doubleHoles = new Set();
      var areaHoles = layer.getIn(['areas', areaID, 'holes']);
      areaHoles.forEach(function (areaHoleID) {
        var holesOfholes = layer.getIn(['areas', areaHoleID, 'holes']);
        holesOfholes.forEach(function (holeID) {
          var holeIndex = areaHoles.indexOf(holeID);
          if (holeIndex !== -1) {
            doubleHoles.add(holeID);
          }
        });
      });
      doubleHoles.forEach(function (doubleHoleID) {
        var holeIndex = areaHoles.indexOf(doubleHoleID);
        areaHoles = areaHoles.remove(holeIndex);
      });
      layer.setIn(['areas', areaID, 'holes'], areaHoles);
    });
  });

  return { layer: layer };
}

/** holes features **/
export function addHole(layer, type, lineID, offset, catalog) {
  var properties = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};

  var hole = void 0;

  layer = layer.withMutations(function (layer) {
    var holeID = IDBroker.acquireID();

    hole = catalog.factoryElement(type, {
      id: holeID,
      name: NameGenerator.generateName('holes', catalog.getIn(['elements', type, 'info', 'title'])),
      type: type,
      offset: offset,
      line: lineID
    }, properties);

    layer.setIn(['holes', holeID], hole);
    layer.updateIn(['lines', lineID, 'holes'], function (holes) {
      return holes.push(holeID);
    });
  });

  return { layer: layer, hole: hole };
}

export function removeHole(layer, holeID) {
  var hole = layer.getIn(['holes', holeID]);
  layer = layer.withMutations(function (layer) {
    unselect(layer, 'holes', holeID);
    layer.deleteIn(['holes', hole.id]);
    layer.updateIn(['lines', hole.line, 'holes'], function (holes) {
      var index = holes.findIndex(function (ID) {
        return holeID === ID;
      });
      return holes.remove(index);
    });
  });

  return { layer: layer, hole: hole };
}

/** items features **/
export function addItem(layer, type, x, y, width, height, rotation, catalog) {
  var item = void 0;

  layer = layer.withMutations(function (layer) {
    var itemID = IDBroker.acquireID();

    item = catalog.factoryElement(type, {
      id: itemID,
      name: NameGenerator.generateName('items', catalog.getIn(['elements', type, 'info', 'title'])),
      type: type,
      height: height,
      width: width,
      x: x,
      y: y,
      rotation: rotation
    });

    layer.setIn(['items', itemID], item);
  });

  return { layer: layer, item: item };
}

export function removeItem(layer, itemID) {
  var item = layer.getIn(['items', itemID]);
  layer = layer.withMutations(function (layer) {
    unselect(layer, 'items', itemID);
    layer.deleteIn(['items', item.id]);
  });

  return { layer: layer, item: item };
}