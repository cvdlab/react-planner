function getEdgesOfSubgraphs(subgraphs, graph) {

    var edges = [];

    subgraphs.forEach(function (component) {
        edges.push([]);
        var vertices = getVerticesFromBiconnectedComponent(component);
        var inserted = [];
        vertices.forEach(function (vertex) {
            var adjacents = graph.adj[vertex];
            adjacents.forEach(function (adj) {
                if (vertex <= adj && vertices.has(adj)) {
                    edges[edges.length - 1].push([vertex, adj]);
                }
            });
        });
    });
    return edges;
}

function getVerticesFromBiconnectedComponent(component) {
    var vertices = new Set();
    component.forEach(function (edge) {
        vertices.add(edge.u);
        vertices.add(edge.v);
    });
    return vertices;
}

module.exports = getEdgesOfSubgraphs;