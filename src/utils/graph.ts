//JS porting of this code http://www.geeksforgeeks.org/biconnected-components/

function create_array(length: number): any[] {
  let array: any[] = [];
  for (let i = 0; i < length; ++i) {
    array.push([]);
  }
  return array;
}


class Edge {
  u: any;
  v: any;
  constructor(u: any, v: any) {
    this.u = u;
    this.v = v;
  }
}

class Graph {
  count: number;
  subgraphs: any[];
  time: number;
  V: number;
  E: number;
  adj: any[];
  children: number = 0;

  constructor(v: number) {
    this.count = 0; // count is number of biconnected components
    this.subgraphs = []; //biconnected components
    this.time = 0;  // time is used to find discovery times

    this.V = v;     // No. of vertices
    this.E = 0;     // No. of Edges
    this.adj = [];  // Adjacency List

    this.adj = create_array(v);
  }

  //Function to add an edge into the graph
  addEdge(v: number, w: number) {
    this.adj[v].push(w);
    this.E++;
  }

  // A recursive function that finds and prints strongly connected
  // components using DFS traversal
  // u --> The vertex to be visited next
  // disc[] --> Stores discovery times of visited vertices
  // low[] -- >> earliest visited vertex (the vertex with minimum
  //             discovery time) that can be reached from subtree
  //             rooted with current vertex
  // *st -- >> To store visited edges
  // // A recursive function that finds and prints strongly connected
  // components using DFS traversal
  // u --> The vertex to be visited next
  // disc[] --> Stores discovery times of visited vertices
  // low[] -- >> earliest visited vertex (the vertex with minimum
  //             discovery time) that can be reached from subtree
  //             rooted with current vertex
  // *st -- >> To store visited edges
  _BCCUtil(u: number, disc: any[], low: any[], st: any[], parent: any[]) {
    // Initialize discovery time and low value
    disc[u] = low[u] = ++this.time;
    this.children = 0;

    // Go through all vertices adjacent to this
    // v is current adjacent of 'u'
    this.adj[u].forEach((v: number) => {

      // If v is not visited yet, then recur for it
      if (disc[v] == -1) {
        this.children++;
        parent[v] = u;

        // store the edge in stack
        st.push(new Edge(u, v));
        this._BCCUtil(v, disc, low, st, parent);

        // Check if the subtree rooted with 'v' has a
        // connection to one of the ancestors of 'u'
        // Case 1 -- per Strongly Connected Components Article
        if (low[u] > low[v])
          low[u] = low[v];

        // If u is an articulation point,
        // pop all edges from stack till u -- v
        if ((disc[u] == 1 && this.children > 1) || (disc[u] > 1 && low[v] >= disc[u])) {
          let subgraph: any[] = [];
          while (st[st.length - 1].u != u || st[st.length - 1].v != v) {
            subgraph.push(st[st.length - 1]);
            //console.log(st[st.length - 1].u + "--" + st[st.length - 1].v + " ");
            st.splice(st.length - 1, 1);
          }

          subgraph.push(st[st.length - 1]);
          //console.log(st[st.length - 1].u + "--" + st[st.length - 1].v + " ");
          this.subgraphs.push(subgraph);
          subgraph = [];
          //console.log()
          st.splice(st.length - 1, 1);

          this.count++;
        }
      }

      // Update low value of 'u' only of 'v' is still in stack
      // (i.e. it's a back edge, not cross edge).
      // Case 2 -- per Strongly Connected Components Article
      else if (v != parent[u] && disc[v] < low[u]) {
        if (low[u] > disc[v])
          low[u] = disc[v];
        st.push(new Edge(u, v));
      }
    });
  }

  BCC() {
    let V = this.V;
    let disc = create_array(V);
    let low = create_array(V);
    let parent = create_array(V);
    let st: any[] = [];

    // Initialize disc and low, and parent arrays
    for (let i = 0; i < V; i++) {
      disc[i] = -1;
      low[i] = -1;
      parent[i] = -1;
    }

    for (let i = 0; i < V; i++) {
      if (disc[i] == -1)
        this._BCCUtil(i, disc, low, st, parent);

      let j = 0;

      // If stack is not empty, pop all edges from stack
      let subgraph: any[] = [];
      while (st.length > 0) {
        j = 1;
        subgraph.push(st[st.length - 1]);
        //console.log(st[st.length - 1].u + "--" + st[st.length - 1].v + " ");
        st.splice(st.length - 1, 1);
      }

      if (j == 1) {
        this.subgraphs.push(subgraph);
        subgraph = [];
        //console.log();
        this.count++;
      }
    }
  }
}

export default Graph;
