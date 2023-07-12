function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
import { Record, List, Map, fromJS } from 'immutable';
import { MODE_IDLE } from '../utils/constants';
import { SNAP_MASK } from '../utils/snap';
var safeLoadMapList = function safeLoadMapList(mapList, Model, defaultMap) {
  return mapList ? new Map(mapList).map(function (m) {
    return new Model(m);
  }).toMap() : defaultMap || new Map();
};
export var Grid = /*#__PURE__*/function (_Record) {
  _inherits(Grid, _Record);
  var _super = _createSuper(Grid);
  function Grid() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Grid);
    return _super.call(this, _objectSpread(_objectSpread({}, json), {}, {
      properties: fromJS(json.properties || {})
    }));
  }
  return _createClass(Grid);
}(Record({
  id: '',
  type: '',
  properties: Map()
}, 'Grid'));
export var DefaultGrids = new Map({
  'h1': new Grid({
    id: 'h1',
    type: 'horizontal-streak',
    properties: {
      step: 20,
      colors: ['#808080', '#ddd', '#ddd', '#ddd', '#ddd']
    }
  }),
  'v1': new Grid({
    id: 'v1',
    type: 'vertical-streak',
    properties: {
      step: 20,
      colors: ['#808080', '#ddd', '#ddd', '#ddd', '#ddd']
    }
  })
});
export var ElementsSet = /*#__PURE__*/function (_Record2) {
  _inherits(ElementsSet, _Record2);
  var _super2 = _createSuper(ElementsSet);
  function ElementsSet() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, ElementsSet);
    return _super2.call(this, {
      vertices: new List(json.vertices || []),
      lines: new List(json.lines || []),
      holes: new List(json.holes || []),
      areas: new List(json.areas || []),
      items: new List(json.items || [])
    });
  }
  return _createClass(ElementsSet);
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
  properties: new Map(),
  visible: true
};
export var Vertex = /*#__PURE__*/function (_Record3) {
  _inherits(Vertex, _Record3);
  var _super3 = _createSuper(Vertex);
  function Vertex() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Vertex);
    return _super3.call(this, _objectSpread(_objectSpread({}, json), {}, {
      lines: new List(json.lines || []),
      areas: new List(json.areas || [])
    }));
  }
  return _createClass(Vertex);
}(Record(_objectSpread(_objectSpread({}, sharedAttributes), {}, {
  x: -1,
  y: -1,
  prototype: 'vertices',
  lines: new List(),
  areas: new List()
}), 'Vertex'));
export var Line = /*#__PURE__*/function (_Record4) {
  _inherits(Line, _Record4);
  var _super4 = _createSuper(Line);
  function Line() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Line);
    return _super4.call(this, _objectSpread(_objectSpread({}, json), {}, {
      properties: fromJS(json.properties || {}),
      vertices: new List(json.vertices || []),
      holes: new List(json.holes || [])
    }));
  }
  return _createClass(Line);
}(Record(_objectSpread(_objectSpread({}, sharedAttributes), {}, {
  prototype: 'lines',
  vertices: new List(),
  holes: new List()
}), 'Line'));
export var Hole = /*#__PURE__*/function (_Record5) {
  _inherits(Hole, _Record5);
  var _super5 = _createSuper(Hole);
  function Hole() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Hole);
    return _super5.call(this, _objectSpread(_objectSpread({}, json), {}, {
      properties: fromJS(json.properties || {})
    }));
  }
  return _createClass(Hole);
}(Record(_objectSpread(_objectSpread({}, sharedAttributes), {}, {
  prototype: 'holes',
  offset: -1,
  line: ''
}), 'Hole'));
export var Area = /*#__PURE__*/function (_Record6) {
  _inherits(Area, _Record6);
  var _super6 = _createSuper(Area);
  function Area() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Area);
    return _super6.call(this, _objectSpread(_objectSpread({}, json), {}, {
      properties: fromJS(json.properties || {}),
      vertices: new List(json.vertices || [])
    }));
  }
  return _createClass(Area);
}(Record(_objectSpread(_objectSpread({}, sharedAttributes), {}, {
  prototype: 'areas',
  vertices: new List(),
  holes: new List()
}), 'Area'));
export var Item = /*#__PURE__*/function (_Record7) {
  _inherits(Item, _Record7);
  var _super7 = _createSuper(Item);
  function Item() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Item);
    return _super7.call(this, _objectSpread(_objectSpread({}, json), {}, {
      properties: fromJS(json.properties || {})
    }));
  }
  return _createClass(Item);
}(Record(_objectSpread(_objectSpread({}, sharedAttributes), {}, {
  prototype: 'items',
  x: 0,
  y: 0,
  rotation: 0
}), 'Item'));
export var Layer = /*#__PURE__*/function (_Record8) {
  _inherits(Layer, _Record8);
  var _super8 = _createSuper(Layer);
  function Layer() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Layer);
    return _super8.call(this, _objectSpread(_objectSpread({}, json), {}, {
      vertices: safeLoadMapList(json.vertices, Vertex),
      lines: safeLoadMapList(json.lines, Line),
      holes: safeLoadMapList(json.holes, Hole),
      areas: safeLoadMapList(json.areas, Area),
      items: safeLoadMapList(json.items, Item),
      selected: new ElementsSet(json.selected)
    }));
  }
  return _createClass(Layer);
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
export var Group = /*#__PURE__*/function (_Record9) {
  _inherits(Group, _Record9);
  var _super9 = _createSuper(Group);
  function Group() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Group);
    return _super9.call(this, _objectSpread(_objectSpread({}, json), {}, {
      properties: fromJS(json.properties || {}),
      elements: fromJS(json.elements || {})
    }));
  }
  return _createClass(Group);
}(Record(_objectSpread(_objectSpread({}, sharedAttributes), {}, {
  prototype: 'groups',
  x: 0,
  y: 0,
  rotation: 0,
  elements: new Map()
}), 'Group'));
export var DefaultLayers = new Map({
  'layer-1': new Layer({
    id: 'layer-1',
    name: 'default'
  })
});
export var Scene = /*#__PURE__*/function (_Record10) {
  _inherits(Scene, _Record10);
  var _super10 = _createSuper(Scene);
  function Scene() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Scene);
    var layers = safeLoadMapList(json.layers, Layer, DefaultLayers);
    return _super10.call(this, _objectSpread(_objectSpread({}, json), {}, {
      grids: safeLoadMapList(json.grids, Grid, DefaultGrids),
      layers: layers,
      selectedLayer: layers.first().id,
      groups: safeLoadMapList(json.groups || {}, Group),
      meta: json.meta ? fromJS(json.meta) : new Map(),
      guides: json.guides ? fromJS(json.guides) : new Map({
        horizontal: new Map(),
        vertical: new Map(),
        circular: new Map()
      })
    }));
  }
  return _createClass(Scene);
}(Record({
  unit: 'cm',
  layers: new Map(),
  grids: new Map(),
  selectedLayer: null,
  groups: new Map(),
  width: 3000,
  height: 2000,
  meta: new Map(),
  //additional info
  guides: new Map()
}, 'Scene'));
export var CatalogElement = /*#__PURE__*/function (_Record11) {
  _inherits(CatalogElement, _Record11);
  var _super11 = _createSuper(CatalogElement);
  function CatalogElement() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, CatalogElement);
    return _super11.call(this, _objectSpread(_objectSpread({}, json), {}, {
      info: fromJS(json.info),
      properties: fromJS(json.properties)
    }));
  }
  return _createClass(CatalogElement);
}(Record({
  name: '',
  prototype: '',
  info: new Map(),
  properties: new Map()
}, 'CatalogElement'));
export var Catalog = /*#__PURE__*/function (_Record12) {
  _inherits(Catalog, _Record12);
  var _super12 = _createSuper(Catalog);
  function Catalog() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Catalog);
    var elements = safeLoadMapList(json.elements, CatalogElement);
    return _super12.call(this, {
      elements: elements,
      ready: !elements.isEmpty()
    });
  }
  _createClass(Catalog, [{
    key: "factoryElement",
    value: function factoryElement(type, options, initialProperties) {
      if (!this.elements.has(type)) {
        var catList = this.elements.map(function (element) {
          return element.name;
        }).toArray();
        throw new Error("Element ".concat(type, " does not exist in catalog ").concat(catList));
      }
      var element = this.elements.get(type);
      var properties = element.properties.map(function (value, key) {
        return initialProperties && initialProperties.has(key) ? initialProperties.get(key) : value.get('defaultValue');
      });
      switch (element.prototype) {
        case 'lines':
          return new Line(options).merge({
            properties: properties
          });
        case 'holes':
          return new Hole(options).merge({
            properties: properties
          });
        case 'areas':
          return new Area(options).merge({
            properties: properties
          });
        case 'items':
          return new Item(options).merge({
            properties: properties
          });
        default:
          throw new Error('prototype not valid');
      }
    }
  }]);
  return Catalog;
}(Record({
  ready: false,
  page: 'root',
  path: new List(),
  elements: new Map()
}, 'Catalog'));
export var HistoryStructure = /*#__PURE__*/function (_Record13) {
  _inherits(HistoryStructure, _Record13);
  var _super13 = _createSuper(HistoryStructure);
  function HistoryStructure() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, HistoryStructure);
    return _super13.call(this, {
      list: fromJS(json.list || []),
      first: new Scene(json.scene),
      last: new Scene(json.last || json.scene)
    });
  }
  return _createClass(HistoryStructure);
}(Record({
  list: new List(),
  first: null,
  last: null
}, 'HistoryStructure'));
export var State = /*#__PURE__*/function (_Record14) {
  _inherits(State, _Record14);
  var _super14 = _createSuper(State);
  function State() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, State);
    return _super14.call(this, _objectSpread(_objectSpread({}, json), {}, {
      scene: new Scene(json.scene),
      sceneHistory: new HistoryStructure(json),
      catalog: new Catalog(json.catalog || {}),
      viewer2D: new Map(json.viewer2D || {}),
      drawingSupport: new Map(json.drawingSupport || {}),
      draggingSupport: new Map(json.draggingSupport || {}),
      rotatingSupport: new Map(json.rotatingSupport || {}),
      misc: json.misc ? fromJS(json.misc) : new Map()
    }));
  }
  return _createClass(State);
}(Record({
  mode: MODE_IDLE,
  scene: new Scene(),
  sceneHistory: new HistoryStructure(),
  catalog: new Catalog(),
  viewer2D: new Map(),
  mouse: new Map({
    x: 0,
    y: 0
  }),
  zoom: 0,
  snapMask: SNAP_MASK,
  snapElements: new List(),
  activeSnapElement: null,
  drawingSupport: new Map(),
  draggingSupport: new Map(),
  rotatingSupport: new Map(),
  errors: new List(),
  warnings: new List(),
  clipboardProperties: new Map(),
  selectedElementsHistory: new List(),
  misc: new Map(),
  //additional info
  alterate: false
}, 'State'));