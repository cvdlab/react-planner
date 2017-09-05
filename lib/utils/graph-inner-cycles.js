'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calculateInnerCycles;
exports.isClockWiseOrder = isClockWiseOrder;

var _graph = require('./graph');

var _graph2 = _interopRequireDefault(_graph);

var _getEdgesOfSubgraphs = require('./get-edges-of-subgraphs');

var _getEdgesOfSubgraphs2 = _interopRequireDefault(_getEdgesOfSubgraphs);

var _graphCycles = require('./graph-cycles');

var _graphCycles2 = _interopRequireDefault(_graphCycles);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function calculateInnerCycles(verticesArray, edgesArray) {
  var innerCycles = [];

  var graph = new _graph2.default(verticesArray.length);
  edgesArray.forEach(function (line) {
    graph.addEdge(line[0], line[1]);
    graph.addEdge(line[1], line[0]);
  });

  graph.BCC();

  var subgraphs = graph.subgraphs.filter(function (subgraph) {
    return subgraph.length >= 3;
  });
  var edgesOfSubgraphsArray = (0, _getEdgesOfSubgraphs2.default)(subgraphs, graph);

  var edges = [];
  edgesOfSubgraphsArray.forEach(function (es) {
    es.forEach(function (edge) {
      return edges.push(edge);
    });
  });

  var cycles = (0, _graphCycles2.default)(verticesArray, edges);
  cycles.v_cycles.forEach(function (cycle) {
    cycle.shift();
    innerCycles.push(cycle);
  });

  return innerCycles;
}

function isClockWiseOrder(innerCycleWithCoords) {
  // See: https://stackoverflow.com/a/1165943 and http://blog.element84.com/polygon-winding.html

  var i = 0;
  var twiceEnclosedArea = 0;

  for (i = 0; i < innerCycleWithCoords.size; i++) {

    var x1 = innerCycleWithCoords.get(i).get('x');
    var y1 = innerCycleWithCoords.get(i).get('y');

    var x2 = innerCycleWithCoords.get((i + 1) % innerCycleWithCoords.size).get('x');
    var y2 = innerCycleWithCoords.get((i + 1) % innerCycleWithCoords.size).get('y');

    twiceEnclosedArea += (x2 - x1) * (y2 + y1);
  }

  return twiceEnclosedArea > 0;
}