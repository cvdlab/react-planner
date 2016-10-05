import {Record, List, Map} from 'immutable';
import {MODE_IDLE} from './constants';

export const ElementsSet = Record({
  vertices: new List(),
  lines: new List(),
  holes: new List(),
  areas: new List(),
  items: new List(),
}, 'ElementsSet');

export const Layer = Record({
  id: "",
  altitude: 0,
  name: "",
  vertices: new Map(),
  lines: new Map(),
  holes: new Map(),
  areas: new Map(),
  items: new Map(),
  selected: new ElementsSet(),
  visible: true
}, 'Layer');


export const Scene = Record({
  pixelPerUnit: 100,
  unit: "m",
  layers: new Map({
    'layer-1': new Layer({id: 'layer-1'})
  }),
  selectedLayer: 'layer-1',
  width: 3000,
  height: 2000
}, 'Scene');


export const Vertex = Record({
  id: "",
  x: -1,
  y: -1,
  prototype: "vertices",
  selected: false,
  lines: new List(),
  areas: new List(),
}, 'Vertex');

export const Line = Record({
  id: "",
  type: "",
  prototype: "lines",
  vertices: new List(),
  holes: new List(),
  selected: false,
  properties: new Map()
}, 'Line');

export const Hole = Record({
  id: "",
  type: "",
  prototype: "holes",
  offset: -1,
  line: "",
  selected: false,
  properties: new Map(),
}, 'Hole');

export const Area = Record({
  id: "",
  type: "",
  prototype: "areas",
  vertices: new List(),
  selected: false,
  properties: new Map()
}, 'Area');

export const Image = Record({
  id: "",
  uri: "",
  vertices: new List()
}, 'Image');

export const Item = Record({
  id: "",
  prototype: 'items',
  type: "",
  properties: new Map(),
  selected: false,
  height: 100,
  width: 100,
  x: 0,
  y: 0,
  rotation: 0
}, 'Item');

export const State = Record({
  mode: MODE_IDLE,
  scene: new Scene(),
  viewer2D: new Map(),

  snapElements: new List(),
  activeSnapElement: null,

  drawingSupport: Map(),
  draggingSupport: Map()
}, 'State');

export const ElementVolume = Record({
  id: "",
  elementID: "",
  layerID: "",
  type: "",
  prototype: "",
  volume: "",
  composition: ""
}, 'ElementVolume');
