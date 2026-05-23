function getEdgesOfSubgraphs(subgraphs: any[], graph: any) {

    let edges: any[][] = [];

    subgraphs.forEach((component: any) => {
        edges.push([]);
        let vertices = getVerticesFromBiconnectedComponent(component);
        let inserted: any[] = [];
        vertices.forEach((vertex: any) => {
            let adjacents = graph.adj[vertex];
            adjacents.forEach((adj: any) => {
                if (vertex <= adj && vertices.has(adj)) {
                    edges[edges.length - 1].push([vertex, adj]);
                }
            });
        });
    });
    return edges;

}

function getVerticesFromBiconnectedComponent(component: any) {
    let vertices = new Set();
    component.forEach((edge: any) => {
        vertices.add(edge.u);
        vertices.add(edge.v);
    });
    return vertices;
}

export default getEdgesOfSubgraphs;
