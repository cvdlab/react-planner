import Graph from './graph';
import getEdgesOfSubgraphs from './get-edges-of-subgraphs';
import graphCycles from './graph-cycles';

export default function calculateInnerCycles(verticesArray, edgesArray) {
  let innerCycles = [];

  let graph = new Graph(verticesArray.length);
  edgesArray.forEach(line => {
    graph.addEdge(line[0], line[1]);
    graph.addEdge(line[1], line[0]);
  });

  graph.BCC();

  let subgraphs = graph.subgraphs.filter(subgraph => subgraph.length >= 3);
  let edgesOfSubgraphsArray = getEdgesOfSubgraphs(subgraphs, graph);

  let edges = [];
  edgesOfSubgraphsArray.forEach(es => {
    es.forEach(edge => edges.push(edge))
  });

  let cycles = graphCycles(verticesArray, edges);
  cycles.v_cycles.forEach(cycle => {
    cycle.shift();
    innerCycles.push(cycle);
  });

  return innerCycles;
}
