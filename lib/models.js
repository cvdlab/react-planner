'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ElementVolume = exports.State = exports.Item = exports.Image = exports.Area = exports.Hole = exports.Line = exports.Vertex = exports.Scene = exports.Layer = exports.ElementsSet = undefined;

var _immutable = require('immutable');

var _constants = require('./constants');

var ElementsSet = exports.ElementsSet = (0, _immutable.Record)({
  vertices: new _immutable.List(),
  lines: new _immutable.List(),
  holes: new _immutable.List(),
  areas: new _immutable.List(),
  items: new _immutable.List()
}, 'ElementsSet');

var Layer = exports.Layer = (0, _immutable.Record)({
  id: "",
  altitude: 0,
  name: "",
  vertices: new _immutable.Map(),
  lines: new _immutable.Map(),
  holes: new _immutable.Map(),
  areas: new _immutable.Map(),
  images: new _immutable.Map(),
  items: new _immutable.Map(),
  selected: new ElementsSet(),
  visible: true
}, 'Layer');

var Scene = exports.Scene = (0, _immutable.Record)({
  pixelPerUnit: 100,
  unit: "m",
  layers: new _immutable.Map({
    'layer-1': new Layer({ id: 'layer-1' })
  }),
  selectedLayer: 'layer-1',
  width: 3000,
  height: 2000
}, 'Scene');

var Vertex = exports.Vertex = (0, _immutable.Record)({
  id: "",
  x: -1,
  y: -1,
  prototype: "vertices",
  selected: false,
  lines: new _immutable.List(),
  areas: new _immutable.List(),
  images: new _immutable.List()
}, 'Vertex');

var Line = exports.Line = (0, _immutable.Record)({
  id: "",
  type: "",
  prototype: "lines",
  vertices: new _immutable.List(),
  holes: new _immutable.List(),
  selected: false,
  properties: new _immutable.Map()
}, 'Line');

var Hole = exports.Hole = (0, _immutable.Record)({
  id: "",
  type: "",
  prototype: "holes",
  offset: -1,
  line: "",
  selected: false,
  properties: new _immutable.Map()
}, 'Hole');

var Area = exports.Area = (0, _immutable.Record)({
  id: "",
  type: "",
  prototype: "areas",
  vertices: new _immutable.List(),
  selected: false,
  properties: new _immutable.Map()
}, 'Area');

var Image = exports.Image = (0, _immutable.Record)({
  id: "",
  uri: "",
  vertices: new _immutable.List()
}, 'Image');

var Item = exports.Item = (0, _immutable.Record)({
  id: "",
  prototype: 'items',
  type: "",
  properties: new _immutable.Map(),
  selected: false,
  height: 100,
  width: 100,
  x: 0,
  y: 0,
  rotation: 0
}, 'Item');

var State = exports.State = (0, _immutable.Record)({
  mode: _constants.MODE_IDLE,
  scene: new Scene(),
  viewer2D: new _immutable.Map(),

  snapElements: new _immutable.List(),
  activeSnapElement: null,

  drawingSupport: (0, _immutable.Map)(),
  draggingSupport: (0, _immutable.Map)()
}, 'State');

var ElementVolume = exports.ElementVolume = (0, _immutable.Record)({
  id: "",
  elementID: "",
  layerID: "",
  type: "",
  prototype: "",
  volume: "",
  composition: ""
}, 'ElementVolume');