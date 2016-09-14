import {Record, List, Map} from 'immutable';
import {MODE_IDLE} from './constants';

export const ElementsSet = Record({
  vertices: new List(),
  lines: new List(),
  holes: new List(),
  areas: new List()
});

export const Layer = Record({
  id: "",
  altitude: 0,
  name: "",
  vertices: new Map(),
  lines: new Map(),
  holes: new Map(),
  areas: new Map(),
  images: new Map(),
  selected: new ElementsSet(),
  visible: true
});


export const Scene = Record({
  pixelPerUnit: 100,
  unit: "m",
  layers: new Map({
    'layer-1': new Layer({id:'layer-1'})
  }),
  selectedLayer: 'layer-1',
  width: 3000,
  height: 2000
});


export const Vertex = Record({
  id: "",
  x: -1,
  y: -1,
  lines: new List(),
  areas: new List(),
  images: new List()
});

export const Line = Record({
  id: "",
  type: "",
  prototype: "lines",
  vertices: new List(),
  holes: new List(),
  selected: false,
  properties: new Map()
});

export const Hole = Record({
  id: "",
  type: "",
  prototype: "holes",
  offset: -1,
  line: "",
  selected: false,
  properties: new Map(),
});

export const Area = Record({
  id: "",
  type: "",
  prototype: "areas",
  vertices: new List(),
  selected: false,
  properties: new Map()
});

export const Image = Record({
  id: "",
  uri: "",
  vertices: new List()
});

export const State = Record({
  mode: MODE_IDLE,
  scene: new Scene(),
  viewer2D: new Map(),
  drawingHelpers: new List(),
  activeDrawingHelper: null,
  drawingConfig: Map(),
  draggingSupport: Map()
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
