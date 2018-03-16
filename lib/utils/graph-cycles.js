"use strict";

/**
 * UTILS
 */

function sub(v1, v2) {
  return [v1[0] - v2[0], v1[1] - v2[1]];
}

function mod(n, m) {
  return (n % m + m) % m;
}

/**
 * CYCLES
 */

function compute_ev_mapping(EV) {
  var ev_mapping = EV.map(function (ev) {
    return {
      ev: ev,
      color: 0,
      direction: -1
    };
  });

  return ev_mapping;
}

function compute_angle(P, V) {
  var point = sub(V, P);
  var angle = Math.atan2(point[1], point[0]);
  return angle;
}

function compute_incidences(V, EV) {
  var incidences = V.map(function (vertex, i) {
    var incidence = [];
    EV.forEach(function (edge, j) {
      var endpoint = void 0;
      var position = void 0;

      if (edge[0] === i) {
        endpoint = edge[1];
        position = 1;
      }

      if (edge[1] === i) {
        endpoint = edge[0];
        position = 0;
      }

      endpoint !== undefined && incidence.push({
        index: j,
        endpoint: endpoint,
        angle: compute_angle(vertex, V[endpoint]),
        edge: edge,
        position: position
      });
    });

    incidence.sort(function (i1, i2) {
      return i2.angle - i1.angle;
    });

    return incidence;
  });

  return incidences;
}

function get_starting_edge(incidences, ev_mapping) {
  var e = void 0;
  var position = void 0;
  var direction = void 0;
  for (e = 0; e < ev_mapping.length; e += 1) {
    if (ev_mapping[e].color < 2) {
      direction = -1 * ev_mapping[e].direction;
      color(ev_mapping, e, direction);
      return {
        edge: e,
        direction: direction,
        position: direction === -1 ? 0 : 1
      };
    }
  }
}

function get_next_edge(incidences, edge, position, EV) {
  var items = incidences[EV[edge][position]];
  //console.log(items, incidences, EV, edge, position);
  var n_items = items.length;
  var item = void 0;
  var out = void 0;
  var j = void 0;
  for (j = 0; j < n_items; j += 1) {
    item = items[j];
    if (item.index === edge) {
      out = items[mod(j + 1, items.length)];
      return {
        edge: out.index,
        vertex: out.endpoint,
        position: out.position,
        direction: out.position ? 1 : -1
      };
    }
  }
}

function color(ev_mapping, index, direction) {
  ev_mapping[index].color += 1;
  ev_mapping[index].direction = direction;
}

function find_cycles(V, EV) {
  var ev_mapping = compute_ev_mapping(EV);
  var incidences = compute_incidences(V, EV);
  var V_cycles = [];
  var E_cycles = [];
  var dir_E_cycles = [];
  var V_cycle = void 0;
  var E_cycle = void 0;
  var dir_E_cycle = void 0;
  var next = void 0;
  var counter = 0;
  var start = get_starting_edge(incidences, ev_mapping);

  while (start !== undefined) {
    V_cycle = [EV[start.edge][mod(start.position + 1, 2)], EV[start.edge][start.position]];
    E_cycle = [start.edge];
    dir_E_cycle = [start.direction];
    next = get_next_edge(incidences, start.edge, start.position, EV);
    while (next.edge !== start.edge) {
      V_cycle.push(next.vertex);
      E_cycle.push(next.edge);
      dir_E_cycle.push(next.direction);
      color(ev_mapping, next.edge, next.direction);
      next = get_next_edge(incidences, next.edge, next.position, EV);
    }
    E_cycles.push(E_cycle);
    V_cycles.push(V_cycle);
    dir_E_cycles.push(dir_E_cycle);

    //console.log('############## CYCLE ', ++counter)
    //console.log('EDGES:', E_cycle)
    //console.log('VERTICES:', V_cycle)
    //console.log('START', 'edge:', start.edge, 'position:', start.position)
    //console.log('COUNTER:', ev_mapping.map(e => e.color), ev_mapping.map(e => e.color).reduce((a, b) => a + b));
    //console.log('\n')

    start = get_starting_edge(incidences, ev_mapping);
  }

  return {
    v_cycles: V_cycles,
    e_cycles: E_cycles,
    dir_e_cycles: dir_E_cycles,
    ev_mapping: ev_mapping
  };
}

function find_short_cycles_indexes(v_cycles, e_cycles) {
  var indexes = [];
  var e_cycle = void 0;
  var v_cycle = void 0;
  var i = void 0;

  for (i = 0; i < e_cycles.length; i += 1) {
    e_cycle = e_cycles[i];
    v_cycle = v_cycles[i];
    if (e_cycle.length < 3 || v_cycle[0] !== v_cycle[v_cycle.length - 1]) {
      indexes.push(i);
    }
  }

  return indexes;
}

function find_inner_cycles(V, EV) {
  var cycles = find_cycles(V, EV);
  var v_cycles = cycles.v_cycles;
  var e_cycles = cycles.e_cycles;
  var short_cycles_indexes = find_short_cycles_indexes(v_cycles, e_cycles);
  short_cycles_indexes.forEach(function (indx) {
    v_cycles.splice(indx, 1);
    e_cycles.splice(indx, 1);
  });
  var dir_e_cycles = cycles.dir_e_cycles;
  var rooms_values = cycles.e_cycles.map(function (cycle, i) {
    return cycle.map(function (edge, j) {
      var v1 = void 0;
      var v2 = void 0;

      var dir = dir_e_cycles[i][j] > 0;

      if (dir > 0) {
        v1 = EV[edge][0];
        v2 = EV[edge][1];
      } else {
        v1 = EV[edge][1];
        v2 = EV[edge][0];
      }

      return (V[v2][0] - V[v1][0]) * (V[v2][1] + V[v1][1]);
    });
  });

  var rooms_sums = rooms_values.map(function (room) {
    return room.reduce(function (a, b) {
      return a + b;
    });
  });

  var positive_count = rooms_sums.filter(function (sum) {
    return sum > 0;
  }).length;
  var negative_count = rooms_sums.length - positive_count;

  var rm_neg = positive_count >= negative_count ? 1 : -1;

  return {
    v_cycles: cycles.v_cycles.filter(function (v, i) {
      return rm_neg * rooms_sums[i] > 0;
    }),
    e_cycles: cycles.e_cycles.filter(function (v, i) {
      return rm_neg * rooms_sums[i] > 0;
    }),
    ev_mapping: cycles.ev_mapping
  };
}

// export default find_inner_cycles;
module.exports = find_inner_cycles;

/**
* DATA
*/

// let V = [[0.5774, 1.0], [1.0, 1.0], [1.1547, 0.0], [1.0, 0.0], [0.0, 0.0], [0.0, 0.732], [1.0, 0.1547], [0.732, 0.0], [1.0491, 0.183], [-0.317, 0.549], [1.0, 0.268], [0.183, -0.3169], [0.5491, 1.049], [0.4642, 1.0], [0.0, -0.4226], [0.0, 1.0]]
// let EV = [[0, 1], [2, 3], [5, 4], [7, 6], [2, 8], [3, 6], [4, 9], [0, 10], [9, 5], [8, 10], [7, 11], [12, 13], [6, 8], [6, 10], [4, 7], [4, 11], [4, 14], [5, 15], [11, 14], [0, 12], [13, 15], [0, 13], [1, 10], [3, 7], [5, 13]]

// let V = [[0,0],[10,0],[10,10],[0,10], [100,100],[110,100],[110,110],[100,110], [5,0], [5,10]]
// let V = [[0,0.5],[12,-0.7],[14,14],[-2,10], [103,106],[117,98],[96,112],[104,109], [5.5,0.8], [4.8,10.5]]
// let EV = [[3,9],[9,2],[2,1],[1,8],[8,0],[0,3],[8,9]] // IT WORKS
// let EV = [[3,9],[9,2],[2,1],[1,8],[8,0],[0,3],[8,9], [5,6], [6,7], [2,5]] // IT DOESN'T WORK
// let EV = [[3,2],[2,1],[1,0],[0,3]] // IT WORKS
// let EV = [[2,3],[1,2],[0,1],[3,0]] // IT WORKS
// let EV = [[2,3],[1,2],[0,1],[3,0],[6,7],[5,6],[4,5],[7,4]] // IT WORKS
// let EV = [[3,2],[2,1],[1,0],[0,3],[7,6],[6,5],[5,4],[4,7]] // IT WORKS

// let V = [[2,5],[5,6],[10,6.8],[23,8],[9.6,11.3],[20,15],[25,16],[29,18],[30,22],[4,11],[6,10],[24,25],[18,20],[27,7]]
// let EV = [[0,1],[10,0],[9,10],[9,1],[1,2],[4,2],[3,13],[2,3],[4,5],[5,6],[6,7],[12,5],[12,11],[11,6],[11,8],[7,8],[9,4]]

/**
* MAIN
*/

// let cycles_data = find_inner_cycles(V, EV)
// console.log('############## OUTPUT')
// console.log('EDGES:')
// console.log(cycles_data.e_cycles)
// console.log('\n')
// console.log('VERTICES:')
// console.log(cycles_data.v_cycles)
// console.log('\n')
// console.log(cycles_data.ev_mapping.every(m => m.color === 2))