var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

//JS porting of this code http://www.geeksforgeeks.org/biconnected-components/

function create_array(length) {
  var array = [];
  for (var i = 0; i < length; ++i) {
    array.push([]);
  }
  return array;
}

var Edge = function Edge(u, v) {
  _classCallCheck(this, Edge);

  this.u = u;
  this.v = v;
};

var Graph = function () {
  function Graph(v) {
    _classCallCheck(this, Graph);

    this.count = 0; // count is number of biconnected components
    this.subgraphs = []; //biconnected components
    this.time = 0; // time is used to find discovery times

    this.V = v; // No. of vertices
    this.E = 0; // No. of Edges
    this.adj = []; // Adjacency List

    this.adj = create_array(v);
  }

  //Function to add an edge into the graph


  _createClass(Graph, [{
    key: "addEdge",
    value: function addEdge(v, w) {
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

  }, {
    key: "_BCCUtil",
    value: function _BCCUtil(u, disc, low, st, parent) {
      var _this = this;

      // Initialize discovery time and low value
      disc[u] = low[u] = ++this.time;
      this.children = 0;

      // Go through all vertices adjacent to this
      // v is current adjacent of 'u'
      this.adj[u].forEach(function (v) {

        // If v is not visited yet, then recur for it
        if (disc[v] == -1) {
          _this.children++;
          parent[v] = u;

          // store the edge in stack
          st.push(new Edge(u, v));
          _this._BCCUtil(v, disc, low, st, parent);

          // Check if the subtree rooted with 'v' has a
          // connection to one of the ancestors of 'u'
          // Case 1 -- per Strongly Connected Components Article
          if (low[u] > low[v]) low[u] = low[v];

          // If u is an articulation point,
          // pop all edges from stack till u -- v
          if (disc[u] == 1 && _this.children > 1 || disc[u] > 1 && low[v] >= disc[u]) {
            var subgraph = [];
            while (st[st.length - 1].u != u || st[st.length - 1].v != v) {
              subgraph.push(st[st.length - 1]);
              //console.log(st[st.length - 1].u + "--" + st[st.length - 1].v + " ");
              st.splice(st.length - 1, 1);
            }

            subgraph.push(st[st.length - 1]);
            //console.log(st[st.length - 1].u + "--" + st[st.length - 1].v + " ");
            _this.subgraphs.push(subgraph);
            subgraph = [];
            //console.log()
            st.splice(st.length - 1, 1);

            _this.count++;
          }
        }

        // Update low value of 'u' only of 'v' is still in stack
        // (i.e. it's a back edge, not cross edge).
        // Case 2 -- per Strongly Connected Components Article
        else if (v != parent[u] && disc[v] < low[u]) {
            if (low[u] > disc[v]) low[u] = disc[v];
            st.push(new Edge(u, v));
          }
      });
    }
  }, {
    key: "BCC",
    value: function BCC() {
      var V = this.V;
      var disc = create_array(V);
      var low = create_array(V);
      var parent = create_array(V);
      var st = [];

      // Initialize disc and low, and parent arrays
      for (var i = 0; i < V; i++) {
        disc[i] = -1;
        low[i] = -1;
        parent[i] = -1;
      }

      for (var _i = 0; _i < V; _i++) {
        if (disc[_i] == -1) this._BCCUtil(_i, disc, low, st, parent);

        var j = 0;

        // If stack is not empty, pop all edges from stack
        var subgraph = [];
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
  }]);

  return Graph;
}();

module.exports = Graph;