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

export function isClockWiseOrder(innerCycleWithCoords) {
  // See: https://stackoverflow.com/a/1165943 and http://blog.element84.com/polygon-winding.html

  let i = 0;
  let twiceEnclosedArea = 0;

  for (i = 0; i < innerCycleWithCoords.size; i++) {

    let x1 = innerCycleWithCoords.get(i).get('x');
    let y1 = innerCycleWithCoords.get(i).get('y');

    let x2 = innerCycleWithCoords.get((i + 1) % innerCycleWithCoords.size).get('x');
    let y2 = innerCycleWithCoords.get((i + 1) % innerCycleWithCoords.size).get('y');

    twiceEnclosedArea += (x2 - x1) * (y2 + y1);
  }

  return twiceEnclosedArea > 0;
}
