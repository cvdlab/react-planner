import Graph from './graph';
import getEdgesOfSubgraphs from './get-edges-of-subgraphs';
import graphCycles from './graph-cycles';

export default function calculateInnerCycles(verticesArray, edgesArray) {
  var innerCycles = [];

  var graph = new Graph(verticesArray.length);
  edgesArray.forEach(function (line) {
    graph.addEdge(line[0], line[1]);
    graph.addEdge(line[1], line[0]);
  });

  graph.BCC();

  var subgraphs = graph.subgraphs.filter(function (subgraph) {
    return subgraph.length >= 3;
  });
  var edgesOfSubgraphsArray = getEdgesOfSubgraphs(subgraphs, graph);

  var edges = [];
  edgesOfSubgraphsArray.forEach(function (es) {
    es.forEach(function (edge) {
      return edges.push(edge);
    });
  });

  var cycles = graphCycles(verticesArray, edges);
  cycles.v_cycles.forEach(function (cycle) {
    cycle.shift();
    innerCycles.push(cycle);
  });

  return innerCycles;
}