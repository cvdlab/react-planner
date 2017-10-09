var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Record, List, Map, fromJS } from 'immutable';
import { MODE_IDLE } from './constants';
import { SNAP_MASK } from './utils/snap';

var safeLoadMapList = function safeLoadMapList(mapList, Model, defaultMap) {
  return mapList ? new Map(mapList).map(function (m) {
    return new Model(m);
  }).toMap() : defaultMap || new Map();
};

export var Guide = function (_Record) {
  _inherits(Guide, _Record);

  function Guide() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Guide);

    return _possibleConstructorReturn(this, (Guide.__proto__ || Object.getPrototypeOf(Guide)).call(this, _extends({}, json, {
      properties: fromJS(json.properties || {})
    })));
  }

  return Guide;
}(Record({
  id: '',
  type: '',
  properties: Map()
}, 'Guide'));

export var DefaultGuides = new Map({
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

export var ElementsSet = function (_Record2) {
  _inherits(ElementsSet, _Record2);

  function ElementsSet() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, ElementsSet);

    return _possibleConstructorReturn(this, (ElementsSet.__proto__ || Object.getPrototypeOf(ElementsSet)).call(this, {
      vertices: new List(json.vertices || []),
      lines: new List(json.lines || []),
      holes: new List(json.holes || []),
      areas: new List(json.areas || []),
      items: new List(json.items || [])
    }));
  }

  return ElementsSet;
}(Record({
  vertices: new List(),
  lines: new List(),
  holes: new List(),
  areas: new List(),
  items: new List()
}, 'ElementsSet'));

var sharedAttributes = {
  id: '',
  type: '',
  prototype: '',
  name: '',
  misc: new Map(),
  selected: false,
  properties: new Map()
};

export var Vertex = function (_Record3) {
  _inherits(Vertex, _Record3);

  function Vertex() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Vertex);

    return _possibleConstructorReturn(this, (Vertex.__proto__ || Object.getPrototypeOf(Vertex)).call(this, _extends({}, json, {
      lines: new List(json.lines || []),
      areas: new List(json.areas || [])
    })));
  }

  return Vertex;
}(Record(_extends({}, sharedAttributes, {
  x: -1,
  y: -1,
  prototype: 'vertices',
  lines: new List(),
  areas: new List()
}), 'Vertex'));

export var Line = function (_Record4) {
  _inherits(Line, _Record4);

  function Line() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Line);

    return _possibleConstructorReturn(this, (Line.__proto__ || Object.getPrototypeOf(Line)).call(this, _extends({}, json, {
      properties: fromJS(json.properties || {}),
      vertices: new List(json.vertices || []),
      holes: new List(json.holes || [])
    })));
  }

  return Line;
}(Record(_extends({}, sharedAttributes, {
  prototype: 'lines',
  vertices: new List(),
  holes: new List()
}), 'Line'));

export var Hole = function (_Record5) {
  _inherits(Hole, _Record5);

  function Hole() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Hole);

    return _possibleConstructorReturn(this, (Hole.__proto__ || Object.getPrototypeOf(Hole)).call(this, _extends({}, json, {
      properties: fromJS(json.properties || {})
    })));
  }

  return Hole;
}(Record(_extends({}, sharedAttributes, {
  prototype: 'holes',
  offset: -1,
  line: ''
}), 'Hole'));

export var Area = function (_Record6) {
  _inherits(Area, _Record6);

  function Area() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Area);

    return _possibleConstructorReturn(this, (Area.__proto__ || Object.getPrototypeOf(Area)).call(this, _extends({}, json, {
      properties: fromJS(json.properties || {}),
      vertices: new List(json.vertices || [])
    })));
  }

  return Area;
}(Record(_extends({}, sharedAttributes, {
  prototype: 'areas',
  vertices: new List(),
  holes: new List()
}), 'Area'));

export var Item = function (_Record7) {
  _inherits(Item, _Record7);

  function Item() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Item);

    return _possibleConstructorReturn(this, (Item.__proto__ || Object.getPrototypeOf(Item)).call(this, _extends({}, json, {
      properties: fromJS(json.properties || {})
    })));
  }

  return Item;
}(Record(_extends({}, sharedAttributes, {
  prototype: 'items',
  x: 0,
  y: 0,
  rotation: 0
}), 'Item'));

export var Layer = function (_Record8) {
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
}(Record({
  id: '',
  altitude: 0,
  order: 0,
  opacity: 1,
  name: '',
  visible: true,
  vertices: new Map(),
  lines: new Map(),
  holes: new Map(),
  areas: new Map(),
  items: new Map(),
  selected: new ElementsSet()
}, 'Layer'));

export var DefaultLayers = new Map({
  'layer-1': new Layer({ id: 'layer-1', name: 'default' })
});

export var Scene = function (_Record9) {
  _inherits(Scene, _Record9);

  function Scene() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Scene);

    var layers = safeLoadMapList(json.layers, Layer, DefaultLayers);
    return _possibleConstructorReturn(this, (Scene.__proto__ || Object.getPrototypeOf(Scene)).call(this, _extends({}, json, {
      guides: safeLoadMapList(json.guides, Guide, DefaultGuides),
      layers: layers,
      selectedLayer: layers.first().id,
      meta: json.meta ? fromJS(json.meta) : new Map()
    })));
  }

  return Scene;
}(Record({
  unit: 'cm',
  layers: new Map(),
  guides: new Map(),
  selectedLayer: null,
  width: 3000,
  height: 2000,
  meta: new Map() //additional info
}, 'Scene'));

export var CatalogElement = function (_Record10) {
  _inherits(CatalogElement, _Record10);

  function CatalogElement() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, CatalogElement);

    return _possibleConstructorReturn(this, (CatalogElement.__proto__ || Object.getPrototypeOf(CatalogElement)).call(this, _extends({}, json, {
      info: fromJS(json.info),
      properties: fromJS(json.properties)
    })));
  }

  return CatalogElement;
}(Record({
  name: '',
  prototype: '',
  info: new Map(),
  properties: new Map()
}, 'CatalogElement'));

export var Catalog = function (_Record11) {
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
      var properties = element.properties.map(function (value, key) {
        return initialProperties[key] || value.get('defaultValue');
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
}(Record({
  ready: false,
  page: "root",
  path: new List(),
  elements: new Map()
}, 'Catalog'));

export var State = function (_Record12) {
  _inherits(State, _Record12);

  function State() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, State);

    var scene = new Scene(json.scene);
    return _possibleConstructorReturn(this, (State.__proto__ || Object.getPrototypeOf(State)).call(this, _extends({}, json, {
      scene: scene,
      sceneHistory: json.sceneHistory ? json.sceneHistory : new List([scene]),
      catalog: new Catalog(json.catalog || {}),
      viewer2D: new Map(json.viewer2D || {}),
      drawingSupport: new Map(json.drawingSupport || {}),
      draggingSupport: new Map(json.draggingSupport || {}),
      rotatingSupport: new Map(json.rotatingSupport || {}),
      misc: json.misc ? fromJS(json.misc) : new Map()
    })));
  }

  return State;
}(Record({
  mode: MODE_IDLE,
  scene: new Scene(),
  sceneHistory: new List([new Scene()]),
  catalog: new Catalog(),
  viewer2D: new Map(),
  mouse: new Map({ x: 0, y: 0 }),
  zoom: 0,
  snapMask: SNAP_MASK,
  snapElements: new List(),
  activeSnapElement: null,
  drawingSupport: new Map(),
  draggingSupport: new Map(),
  rotatingSupport: new Map(),
  errors: new List(),
  warnings: new List(),
  clipboardProperties: null,
  selectedElementsHistory: new List(),
  misc: new Map() //additional info
}, 'State'));