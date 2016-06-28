import {Record, List, Map} from 'immutable';

export const Scene = Record({
  pixelPerUnit: 100,
  unit: "m",
  layers: new Map(),
  width: 2000,
  height: 2000
});

export const Layer = Record({
  id: "",
  altitude: 0,
  vertices: new Map(),
  lines: new Map(),
  holes: new Map(),
  areas: new Map()
});

export const Vertex = Record({
  id: "",
  x: -1,
  y: -1,
  lines: new List(),
  areas: new List()
});

export const Line = Record({
  id: "",
  type: "",
  vertices: new List(),
  holes: new List(),
  height: 1,
  thickness: 1
});

export const Hole = Record({
  id: "",
  type: "",
  offset: -1,
  line: "",
  width: -1,
  height: -1,
  altitude: 0
});

export const Area = Record({
  id: "",
  type: "",
  vertices: new List(),
  patternColor: "#000000",
  patternDirection: 0
});


