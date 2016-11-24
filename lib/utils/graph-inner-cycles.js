'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = calculateInnerCycles;

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