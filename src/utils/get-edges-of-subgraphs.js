function getEdgesOfSubgraphs(subgraphs, graph) {

    let edges = [];

    subgraphs.forEach(component => {
        edges.push([]);
        let vertices = getVerticesFromBiconnectedComponent(component);
        let inserted = [];
        vertices.forEach(vertex => {
            let adjacents = graph.adj[vertex];
            adjacents.forEach(adj => {
                if (vertex <= adj && vertices.has(adj)) {
                    edges[edges.length - 1].push([vertex,adj]);
                }
            });
        });
    });
    return edges;

}

function getVerticesFromBiconnectedComponent(component) {
    let vertices = new Set();
    component.forEach(edge => {
        vertices.add(edge.u);
        vertices.add(edge.v);
    });
    return vertices;
}

module.exports = getEdgesOfSubgraphs;
