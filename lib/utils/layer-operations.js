'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.addLine = addLine;
exports.replaceLineVertex = replaceLineVertex;
exports.removeLine = removeLine;
exports.splitLine = splitLine;
exports.addLinesFromPoints = addLinesFromPoints;
exports.addLineAvoidingIntersections = addLineAvoidingIntersections;
exports.addVertex = addVertex;
exports.removeVertex = removeVertex;
exports.select = select;
exports.unselect = unselect;
exports.setProperties = setProperties;
exports.unselectAll = unselectAll;
exports.addArea = addArea;
exports.removeArea = removeArea;
exports.detectAndUpdateAreas = detectAndUpdateAreas;
exports.addHole = addHole;
exports.removeHole = removeHole;
exports.addItem = addItem;
exports.removeItem = removeItem;
exports.loadLayerFromJSON = loadLayerFromJSON;

var _immutable = require('immutable');

var _models = require('../models');

var _idBroker = require('./id-broker');

var _idBroker2 = _interopRequireDefault(_idBroker);

var _geometry = require('./geometry');

var Geometry = _interopRequireWildcard(_geometry);

var _graphCycles = require('./graph-cycles');

var _graphCycles2 = _interopRequireDefault(_graphCycles);

var _graph = require('./graph');

var _graph2 = _interopRequireDefault(_graph);

var _getEdgesOfSubgraphs = require('./get-edges-of-subgraphs');

var _getEdgesOfSubgraphs2 = _interopRequireDefault(_getEdgesOfSubgraphs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var AREA_ELEMENT_TYPE = 'area';

/** lines features **/
function addLine(layer, type, x0, y0, x1, y1, catalog) {
  var line = void 0;

  layer = layer.withMutations(function (layer) {
    var lineID = _idBroker2.default.acquireID();

    var v0 = void 0,
        v1 = void 0;

    var _addVertex = addVertex(layer, x0, y0, 'lines', lineID);

    layer = _addVertex.layer;
    v0 = _addVertex.vertex;

    var _addVertex2 = addVertex(layer, x1, y1, 'lines', lineID);

    layer = _addVertex2.layer;
    v1 = _addVertex2.vertex;


    line = catalog.createElement(type, {
      id: lineID,
      vertices: new _immutable.List([v0.id, v1.id]),
      type: type
    });

    layer.setIn(['lines', lineID], line);
  });

  return { layer: layer, line: line };
}

function replaceLineVertex(layer, lineID, vertexIndex, x, y) {
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

function removeLine(layer, lineID) {
  var line = layer.getIn(['lines', lineID]);

  layer = layer.withMutations(function (layer) {
    unselect(layer, 'lines', lineID);
    layer.deleteIn(['lines', line.id]);
    line.vertices.forEach(function (vertexID) {
      return removeVertex(layer, vertexID, 'lines', line.id);
    });
  });

  return { layer: layer, line: line };
}

function splitLine(layer, lineID, x, y, catalog) {
  var line0 = void 0,
      line1 = void 0;

  layer = layer.withMutations(function (layer) {
    var line = layer.getIn(['lines', lineID]);

    var _layer$vertices$get = layer.vertices.get(line.vertices.get(0));

    var x0 = _layer$vertices$get.x;
    var y0 = _layer$vertices$get.y;

    var _layer$vertices$get2 = layer.vertices.get(line.vertices.get(1));

    var x1 = _layer$vertices$get2.x;
    var y1 = _layer$vertices$get2.y;


    removeLine(layer, lineID);

    var _addLine = addLine(layer, line.type, x0, y0, x, y, catalog);

    line0 = _addLine.line;

    var _addLine2 = addLine(layer, line.type, x1, y1, x, y, catalog);

    line1 = _addLine2.line;
  });

  return { layer: layer, lines: new _immutable.List([line0, line1]) };
}

function addLinesFromPoints(layer, type, points, catalog) {
  points = new _immutable.List(points).sort(function (_ref, _ref2) {
    var x1 = _ref.x;
    var y1 = _ref.y;
    var x2 = _ref2.x;
    var y2 = _ref2.y;

    return x1 === x2 ? y1 - y2 : x1 - x2;
  });

  var pointsPair = points.zip(points.skip(1)).filterNot(function (_ref3) {
    var _ref4 = _slicedToArray(_ref3, 2);

    var _ref4$ = _ref4[0];
    var x1 = _ref4$.x;
    var y1 = _ref4$.y;
    var _ref4$2 = _ref4[1];
    var x2 = _ref4$2.x;
    var y2 = _ref4$2.y;

    return x1 === x2 && y1 === y2;
  });

  var lines = new _immutable.List().withMutations(function (lines) {
    layer = layer.withMutations(function (layer) {
      pointsPair.forEach(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 2);

        var _ref6$ = _ref6[0];
        var x1 = _ref6$.x;
        var y1 = _ref6$.y;
        var _ref6$2 = _ref6[1];
        var x2 = _ref6$2.x;
        var y2 = _ref6$2.y;

        var _addLine3 = addLine(layer, type, x1, y1, x2, y2, catalog);

        var line = _addLine3.line;

        lines.push(line);
      });
    });
  });

  return { layer: layer, lines: lines };
}

function addLineAvoidingIntersections(layer, type, x0, y0, x1, y1, catalog) {

  var points = [{ x: x0, y: y0 }, { x: x1, y: y1 }];

  layer = layer.withMutations(function (layer) {
    var lines = layer.lines;
    var vertices = layer.vertices;

    lines.forEach(function (line) {
      var _line$vertices$map$to = line.vertices.map(function (vertexID) {
        return vertices.get(vertexID);
      }).toArray();

      var _line$vertices$map$to2 = _slicedToArray(_line$vertices$map$to, 2);

      var v0 = _line$vertices$map$to2[0];
      var v1 = _line$vertices$map$to2[1];


      if (!(Geometry.samePoints(v0, { x: x0, y: y0 }) || Geometry.samePoints(v0, { x: x1, y: y1 }) || Geometry.samePoints(v1, { x: x0, y: y0 }) || Geometry.samePoints(v1, { x: x1, y: y1 }))) {

        var intersection = Geometry.intersectionFromTwoLineSegment({ x: x0, y: y0 }, { x: x1, y: y1 }, v0, v1);

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

  return { layer: layer };
}

/** vertices features **/
function addVertex(layer, x, y, relatedPrototype, relatedID) {
  var vertex = layer.vertices.find(function (vertex) {
    return Geometry.samePoints(vertex, { x: x, y: y });
  });
  if (vertex) {
    vertex = vertex.update(relatedPrototype, function (related) {
      return related.push(relatedID);
    });
  } else {
    vertex = new _models.Vertex(_defineProperty({
      id: _idBroker2.default.acquireID(),
      x: x, y: y
    }, relatedPrototype, new _immutable.List([relatedID])));
  }
  layer = layer.setIn(['vertices', vertex.id], vertex);
  return { layer: layer, vertex: vertex };
}

function removeVertex(layer, vertexID, relatedPrototype, relatedID) {
  var vertex = layer.vertices.get(vertexID);
  vertex = vertex.update(relatedPrototype, function (related) {
    var index = related.findIndex(function (ID) {
      return relatedID !== ID;
    });
    return related.delete(index);
  });

  if (vertex.areas.size + vertex.lines.size === 0) {
    layer = layer.deleteIn(['vertices', vertex.id]);
  } else {
    layer = layer.setIn(['vertices', vertex.id], vertex);
  }
  return { layer: layer, vertex: vertex };
}

function select(layer, prototype, ID) {
  return layer.withMutations(function (layer) {
    layer.setIn([prototype, ID, 'selected'], true);
    layer.updateIn(['selected', prototype], function (elements) {
      return elements.push(ID);
    });
  });
}

function unselect(layer, prototype, ID) {
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

function setProperties(layer, prototype, ID, properties) {
  properties = (0, _immutable.fromJS)(properties);
  return layer.setIn([prototype, ID, 'properties'], properties);
}

function unselectAll(layer) {
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
function addArea(layer, type, verticesCoords, catalog) {
  var area = void 0;

  layer = layer.withMutations(function (layer) {
    var areaID = _idBroker2.default.acquireID();

    var vertices = [];
    verticesCoords.forEach(function (_ref8) {
      var x = _ref8.x;
      var y = _ref8.y;

      var _addVertex4 = addVertex(layer, x, y, 'areas', areaID);

      var vertex = _addVertex4.vertex;

      vertices.push(vertex.id);
    });

    area = catalog.createElement(type, {
      id: areaID,
      type: type,
      prototype: "areas",
      vertices: new _immutable.List(vertices)
    });

    layer.setIn(['areas', areaID], area);
  });

  return { layer: layer, area: area };
}

function removeArea(layer, areaID) {
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

function detectAndUpdateAreas(layer, catalog) {
  // console.groupCollapsed("Area detection");
  // console.log("vertices", layer.vertices.toJS());
  // console.log("lines", layer.lines.toJS());

  //generate LAR rappresentation
  var verticesArray = [];
  var id2index = {},
      index2coord = {};
  layer.vertices.forEach(function (vertex) {
    var count = verticesArray.push([vertex.x, vertex.y]);
    var index = count - 1;
    id2index[vertex.id] = index;
    index2coord[index] = { x: vertex.x, y: vertex.y };
  });

  var linesArray = [];
  layer.lines.forEach(function (line) {
    var vertices = line.vertices.map(function (vertexID) {
      return id2index[vertexID];
    }).toArray();
    linesArray.push(vertices);
  });

  layer = layer.withMutations(function (layer) {

    //remove old areas
    layer.areas.forEach(function (area) {
      removeArea(layer, area.id);
    });

    //add new areas
    // console.log("graphCycles call", verticesArray, linesArray);

    var graph = new _graph2.default(verticesArray.length);
    linesArray.forEach(function (line) {
      graph.addEdge(line[0], line[1]);
      graph.addEdge(line[1], line[0]);
    });

    graph.BCC();

    var subgraphs = graph.subgraphs.filter(function (subgraph) {
      return subgraph.length >= 3;
    });
    var edgesArray = (0, _getEdgesOfSubgraphs2.default)(subgraphs, graph);

    var edges = [];
    edgesArray.forEach(function (es) {
      es.forEach(function (edge) {
        return edges.push(edge);
      });
    });

    var cycles = (0, _graphCycles2.default)(verticesArray, edges);
    cycles.v_cycles.forEach(function (cycle) {
      cycle.shift();
      var verticesCoords = cycle.map(function (index) {
        return index2coord[index];
      });
      addArea(layer, AREA_ELEMENT_TYPE, verticesCoords, catalog);
    });
  });

  // console.log("areas", layer.areas.toJS());
  // console.groupEnd();
  return { layer: layer };
}

/** holes features **/
function addHole(layer, type, lineID, offset, catalog) {
  var hole = void 0;

  layer = layer.withMutations(function (layer) {
    var holeID = _idBroker2.default.acquireID();

    hole = catalog.createElement(type, {
      id: holeID,
      type: type,
      offset: offset,
      line: lineID
    });

    layer.setIn(['holes', holeID], hole);
    layer.updateIn(['lines', lineID, 'holes'], function (holes) {
      return holes.push(holeID);
    });
  });

  return { layer: layer, hole: hole };
}

function removeHole(layer, holeID) {
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
function addItem(layer, type, x, y, width, height, rotation, catalog) {
  var item = void 0;

  layer = layer.withMutations(function (layer) {
    var itemID = _idBroker2.default.acquireID();

    item = catalog.createElement(type, {
      id: itemID,
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

function removeItem(layer, itemID) {
  var item = layer.getIn(['items', itemID]);
  layer = layer.withMutations(function (layer) {
    unselect(layer, 'items', itemID);
    layer.deleteIn(['items', item.id]);
  });

  return { layer: layer, item: item };
}

//JSON serializer
function loadLayerFromJSON(json, catalog) {
  var loadVertex = function loadVertex(vertex) {
    return new _models.Vertex(vertex).set('lines', new _immutable.List(vertex.lines)).set('areas', new _immutable.List(vertex.areas));
  };

  var loadLine = function loadLine(line) {
    return new _models.Line(line).set('type', catalog.getElement(line.type).name).set('vertices', new _immutable.List(line.vertices)).set('holes', new _immutable.List(line.holes)).set('properties', new _immutable.fromJS(line.properties || {}));
  };

  var loadHole = function loadHole(hole) {
    return new _models.Hole(hole).set('type', catalog.getElement(hole.type).name).set('properties', new _immutable.fromJS(hole.properties || {}));
  };

  var loadArea = function loadArea(area) {
    return new _models.Area(area).set('type', catalog.getElement(area.type).name).set('vertices', new _immutable.List(area.vertices)).set('properties', new _immutable.fromJS(area.properties || {}));
  };

  var loadItem = function loadItem(item) {
    return new _models.Item(item).set('properties', new _immutable.fromJS(item.properties || {}));
  };

  var loadElementsSet = function loadElementsSet(elementsSet) {
    return new _models.ElementsSet({
      lines: new _immutable.List(elementsSet.lines),
      areas: new _immutable.List(elementsSet.areas),
      holes: new _immutable.List(elementsSet.holes),
      items: new _immutable.List(elementsSet.items)
    });
  };

  var loadLayer = function loadLayer(layer) {
    return new _models.Layer(layer).set('vertices', new _immutable.Seq(layer.vertices).map(function (vertex) {
      return loadVertex(vertex);
    }).toMap()).set('lines', new _immutable.Seq(layer.lines).map(function (line) {
      return loadLine(line);
    }).toMap()).set('holes', new _immutable.Seq(layer.holes).map(function (hole) {
      return loadHole(hole);
    }).toMap()).set('areas', new _immutable.Seq(layer.areas).map(function (area) {
      return loadArea(area);
    }).toMap()).set('items', new _immutable.Seq(layer.items).map(function (item) {
      return loadItem(item);
    }).toMap()).set('selected', layer.selected ? loadElementsSet(layer.selected) : new _models.ElementsSet());
  };

  return loadLayer(json);
}