'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.State = exports.Catalog = exports.CatalogElement = exports.Scene = exports.DefaultLayers = exports.Layer = exports.Item = exports.Area = exports.Hole = exports.Line = exports.Vertex = exports.ElementsSet = exports.DefaultGuides = exports.Guide = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _immutable = require('immutable');

var _constants = require('./constants');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var safeLoadMapList = function safeLoadMapList(mapList, Model, defaultMap) {
  return mapList ? new _immutable.Map(mapList).map(function (m) {
    return new Model(m);
  }).toMap() : defaultMap || new _immutable.Map();
};

var Guide = exports.Guide = function (_Record) {
  _inherits(Guide, _Record);

  function Guide() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Guide);

    return _possibleConstructorReturn(this, (Guide.__proto__ || Object.getPrototypeOf(Guide)).call(this, _extends({}, json, {
      properties: (0, _immutable.fromJS)(json.properties || {})
    })));
  }

  return Guide;
}((0, _immutable.Record)({
  id: "",
  type: "",
  properties: (0, _immutable.Map)()
}, 'Guide'));

var DefaultGuides = exports.DefaultGuides = new _immutable.Map({
  'h1': new Guide({
    id: 'h1',
    type: 'horizontal-streak',
    properties: {
      step: 20,
      colors: ['#808080', '#ddd', '#ddd', '#ddd', '#ddd']
    }
  }),
  'v1': new Guide({
    id: 'v1',
    type: 'vertical-streak',
    properties: {
      step: 20,
      colors: ['#808080', '#ddd', '#ddd', '#ddd', '#ddd']
    }
  })
});

var ElementsSet = exports.ElementsSet = function (_Record2) {
  _inherits(ElementsSet, _Record2);

  function ElementsSet() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ElementsSet);

    return _possibleConstructorReturn(this, (ElementsSet.__proto__ || Object.getPrototypeOf(ElementsSet)).call(this, {
      vertices: new _immutable.List(json.vertices || []),
      lines: new _immutable.List(json.lines || []),
      holes: new _immutable.List(json.holes || []),
      areas: new _immutable.List(json.areas || []),
      items: new _immutable.List(json.items || [])
    }));
  }

  return ElementsSet;
}((0, _immutable.Record)({
  vertices: new _immutable.List(),
  lines: new _immutable.List(),
  holes: new _immutable.List(),
  areas: new _immutable.List(),
  items: new _immutable.List()
}, 'ElementsSet'));

var Vertex = exports.Vertex = function (_Record3) {
  _inherits(Vertex, _Record3);

  function Vertex() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Vertex);

    return _possibleConstructorReturn(this, (Vertex.__proto__ || Object.getPrototypeOf(Vertex)).call(this, _extends({}, json, {
      lines: new _immutable.List(json.lines || []),
      areas: new _immutable.List(json.areas || [])
    })));
  }

  return Vertex;
}((0, _immutable.Record)({
  id: "",
  x: -1,
  y: -1,
  prototype: "vertices",
  selected: false,
  lines: new _immutable.List(),
  areas: new _immutable.List()
}, 'Vertex'));

var Line = exports.Line = function (_Record4) {
  _inherits(Line, _Record4);

  function Line() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Line);

    return _possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).call(this, _extends({}, json, {
      properties: (0, _immutable.fromJS)(json.properties || {}),
      vertices: new _immutable.List(json.vertices || []),
      holes: new _immutable.List(json.holes || [])
    })));
  }

  return Line;
}((0, _immutable.Record)({
  id: "",
  type: "",
  prototype: "lines",
  vertices: new _immutable.List(),
  holes: new _immutable.List(),
  selected: false,
  properties: new _immutable.Map()
}, 'Line'));

var Hole = exports.Hole = function (_Record5) {
  _inherits(Hole, _Record5);

  function Hole() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Hole);

    return _possibleConstructorReturn(this, (Hole.__proto__ || Object.getPrototypeOf(Hole)).call(this, _extends({}, json, {
      properties: (0, _immutable.fromJS)(json.properties || {})
    })));
  }

  return Hole;
}((0, _immutable.Record)({
  id: "",
  type: "",
  prototype: "holes",
  offset: -1,
  line: "",
  selected: false,
  properties: new _immutable.Map()
}, 'Hole'));

var Area = exports.Area = function (_Record6) {
  _inherits(Area, _Record6);

  function Area() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Area);

    return _possibleConstructorReturn(this, (Area.__proto__ || Object.getPrototypeOf(Area)).call(this, _extends({}, json, {
      properties: (0, _immutable.fromJS)(json.properties || {}),
      vertices: new _immutable.List(json.vertices || [])
    })));
  }

  return Area;
}((0, _immutable.Record)({
  id: "",
  type: "",
  prototype: "areas",
  vertices: new _immutable.List(),
  selected: false,
  properties: new _immutable.Map()
}, 'Area'));

var Item = exports.Item = function (_Record7) {
  _inherits(Item, _Record7);

  function Item() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Item);

    return _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, _extends({}, json, {
      properties: (0, _immutable.fromJS)(json.properties || {})
    })));
  }

  return Item;
}((0, _immutable.Record)({
  id: "",
  prototype: 'items',
  type: "",
  properties: new _immutable.Map(),
  selected: false,
  x: 0,
  y: 0,
  rotation: 0
}, 'Item'));

var Layer = exports.Layer = function (_Record8) {
  _inherits(Layer, _Record8);

  function Layer() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Layer);

    return _possibleConstructorReturn(this, (Layer.__proto__ || Object.getPrototypeOf(Layer)).call(this, _extends({}, json, {
      vertices: safeLoadMapList(json.vertices, Vertex),
      lines: safeLoadMapList(json.lines, Line),
      holes: safeLoadMapList(json.holes, Hole),
      areas: safeLoadMapList(json.areas, Area),
      items: safeLoadMapList(json.items, Item),
      selected: new ElementsSet(json.selected)
    })));
  }

  return Layer;
}((0, _immutable.Record)({
  id: "",
  altitude: 0,
  order: 0,
  opacity: 1,
  name: "",
  visible: true,
  vertices: new _immutable.Map(),
  lines: new _immutable.Map(),
  holes: new _immutable.Map(),
  areas: new _immutable.Map(),
  items: new _immutable.Map(),
  selected: new ElementsSet()
}, 'Layer'));

var DefaultLayers = exports.DefaultLayers = new _immutable.Map({
  'layer-1': new Layer({ id: 'layer-1', name: 'default' })
});

var Scene = exports.Scene = function (_Record9) {
  _inherits(Scene, _Record9);

  function Scene() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Scene);

    var layers = safeLoadMapList(json.layers, Layer, DefaultLayers);
    return _possibleConstructorReturn(this, (Scene.__proto__ || Object.getPrototypeOf(Scene)).call(this, _extends({}, json, {
      guides: safeLoadMapList(json.guides, Guide, DefaultGuides),
      layers: layers,
      selectedLayer: layers.first().id
    })));
  }

  return Scene;
}((0, _immutable.Record)({
  unit: "cm",
  layers: new _immutable.Map(),
  guides: new _immutable.Map(),
  selectedLayer: null,
  width: 3000,
  height: 2000,

  meta: new _immutable.Map() //additional info

}, 'Scene'));

var CatalogElement = exports.CatalogElement = function (_Record10) {
  _inherits(CatalogElement, _Record10);

  function CatalogElement() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, CatalogElement);

    return _possibleConstructorReturn(this, (CatalogElement.__proto__ || Object.getPrototypeOf(CatalogElement)).call(this, _extends({}, json, {
      info: (0, _immutable.fromJS)(json.info),
      properties: (0, _immutable.fromJS)(json.properties)
    })));
  }

  return CatalogElement;
}((0, _immutable.Record)({
  name: "",
  prototype: "",
  info: new _immutable.Map(),
  properties: new _immutable.Map()
}, 'CatalogElement'));

var Catalog = exports.Catalog = function (_Record11) {
  _inherits(Catalog, _Record11);

  function Catalog() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Catalog);

    var elements = safeLoadMapList(json.elements, CatalogElement);
    return _possibleConstructorReturn(this, (Catalog.__proto__ || Object.getPrototypeOf(Catalog)).call(this, {
      elements: elements,
      ready: !elements.isEmpty()
    }));
  }

  _createClass(Catalog, [{
    key: 'factoryElement',
    value: function factoryElement(type, options) {
      var initialProperties = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (!this.elements.has(type)) {
        var catList = this.elements.map(function (element) {
          return element.name;
        }).toArray();
        throw new Error('Element ' + type + ' does not exist in catalog ' + catList);
      }

      var element = this.elements.get(type);

      initialProperties = new _immutable.Map(initialProperties);

      var properties = element.properties.map(function (value, key) {
        return initialProperties.has(key) ? initialProperties.get(key) : value.get('defaultValue');
      });

      switch (element.prototype) {
        case 'lines':
          return new Line(options).merge({ properties: properties });

        case 'holes':
          return new Hole(options).merge({ properties: properties });

        case 'areas':
          return new Area(options).merge({ properties: properties });

        case 'items':
          return new Item(options).merge({ properties: properties });

        default:
          throw new Error('prototype not valid');
      }
    }
  }]);

  return Catalog;
}((0, _immutable.Record)({
  ready: false,
  elements: new _immutable.Map()
}, 'Catalog'));

var State = exports.State = function (_Record12) {
  _inherits(State, _Record12);

  function State() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, State);

    var scene = new Scene(json.scene);
    return _possibleConstructorReturn(this, (State.__proto__ || Object.getPrototypeOf(State)).call(this, _extends({}, json, {
      scene: scene,
      sceneHistory: json.sceneHistory ? json.sceneHistory : new _immutable.List([scene]),

      catalog: new Catalog(json.catalog || {}),

      viewer2D: new _immutable.Map(json.viewer2D || {}),

      drawingSupport: new _immutable.Map(json.drawingSupport || {}),
      draggingSupport: new _immutable.Map(json.draggingSupport || {}),
      rotatingSupport: new _immutable.Map(json.rotatingSupport || {}),

      misc: json.misc ? (0, _immutable.fromJS)(json.misc) : new _immutable.Map()
    })));
  }

  return State;
}((0, _immutable.Record)({
  mode: _constants.MODE_IDLE,

  scene: new Scene(),
  sceneHistory: new _immutable.List([new Scene()]),

  catalog: new Catalog(),

  viewer2D: new _immutable.Map(),

  snapElements: new _immutable.List(),
  activeSnapElement: null,

  drawingSupport: new _immutable.Map(),
  draggingSupport: new _immutable.Map(),
  rotatingSupport: new _immutable.Map(),

  misc: new _immutable.Map() //additional info
}, 'State'));