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

export function isClockWiseOrder(innerCycleWithCoords) {
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