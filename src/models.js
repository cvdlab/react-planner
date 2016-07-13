import {Record, List, Map} from 'immutable';
import {MODE_IDLE} from './constants';

export const ElementsSet = Record({
  vertices: new List(),
  lines: new List(),
  holes: new List(),
  areas: new List()
});

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
  areas: new Map(),
  selected: new ElementsSet()
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
  prototype: "lines",
  vertices: new List(),
  holes: new List(),
  height: 1,
  thickness: 1,
  selected: false,
  properties: new Map()
});

export const Hole = Record({
  id: "",
  type: "",
  prototype: "holes",
  offset: -1,
  line: "",
  width: -1,
  height: -1,
  altitude: 0,
  selected: false,
  properties: new Map(),
});

export const Area = Record({
  id: "",
  type: "",
  prototype: "areas",
  vertices: new List(),
  patternColor: "#000000",
  patternDirection: 0,
  selected: false,
  properties: new Map()
});

export const State = Record({
  mode: MODE_IDLE,
  scene: new Scene(),
  viewer2D: new Map()
});

export const ElementVolume = Record({
  id: "",
  elementID: "",
  layerID: "",
  type: "",
  prototype: "",
  volume: "",
  composition: ""
});
