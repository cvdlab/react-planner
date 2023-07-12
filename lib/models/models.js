"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Vertex = exports.State = exports.Scene = exports.Line = exports.Layer = exports.Item = exports.Hole = exports.HistoryStructure = exports.Group = exports.Grid = exports.ElementsSet = exports.DefaultLayers = exports.DefaultGrids = exports.CatalogElement = exports.Catalog = exports.Area = void 0;
var _immutable = require("immutable");
var _constants = require("../utils/constants");
var _snap = require("../utils/snap");
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
var safeLoadMapList = function safeLoadMapList(mapList, Model, defaultMap) {
  return mapList ? new _immutable.Map(mapList).map(function (m) {
    return new Model(m);
  }).toMap() : defaultMap || new _immutable.Map();
};
var Grid = /*#__PURE__*/function (_Record) {
  _inherits(Grid, _Record);
  var _super = _createSuper(Grid);
  function Grid() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Grid);
    return _super.call(this, _objectSpread(_objectSpread({}, json), {}, {
      properties: (0, _immutable.fromJS)(json.properties || {})
    }));
  }
  return _createClass(Grid);
}((0, _immutable.Record)({
  id: '',
  type: '',
  properties: (0, _immutable.Map)()
}, 'Grid'));
exports.Grid = Grid;
var DefaultGrids = new _immutable.Map({
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
exports.DefaultGrids = DefaultGrids;
var ElementsSet = /*#__PURE__*/function (_Record2) {
  _inherits(ElementsSet, _Record2);
  var _super2 = _createSuper(ElementsSet);
  function ElementsSet() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, ElementsSet);
    return _super2.call(this, {
      vertices: new _immutable.List(json.vertices || []),
      lines: new _immutable.List(json.lines || []),
      holes: new _immutable.List(json.holes || []),
      areas: new _immutable.List(json.areas || []),
      items: new _immutable.List(json.items || [])
    });
  }
  return _createClass(ElementsSet);
}((0, _immutable.Record)({
  vertices: new _immutable.List(),
  lines: new _immutable.List(),
  holes: new _immutable.List(),
  areas: new _immutable.List(),
  items: new _immutable.List()
}, 'ElementsSet'));
exports.ElementsSet = ElementsSet;
var sharedAttributes = {
  id: '',
  type: '',
  prototype: '',
  name: '',
  misc: new _immutable.Map(),
  selected: false,
  properties: new _immutable.Map(),
  visible: true
};
var Vertex = /*#__PURE__*/function (_Record3) {
  _inherits(Vertex, _Record3);
  var _super3 = _createSuper(Vertex);
  function Vertex() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Vertex);
    return _super3.call(this, _objectSpread(_objectSpread({}, json), {}, {
      lines: new _immutable.List(json.lines || []),
      areas: new _immutable.List(json.areas || [])
    }));
  }
  return _createClass(Vertex);
}((0, _immutable.Record)(_objectSpread(_objectSpread({}, sharedAttributes), {}, {
  x: -1,
  y: -1,
  prototype: 'vertices',
  lines: new _immutable.List(),
  areas: new _immutable.List()
}), 'Vertex'));
exports.Vertex = Vertex;
var Line = /*#__PURE__*/function (_Record4) {
  _inherits(Line, _Record4);
  var _super4 = _createSuper(Line);
  function Line() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Line);
    return _super4.call(this, _objectSpread(_objectSpread({}, json), {}, {
      properties: (0, _immutable.fromJS)(json.properties || {}),
      vertices: new _immutable.List(json.vertices || []),
      holes: new _immutable.List(json.holes || [])
    }));
  }
  return _createClass(Line);
}((0, _immutable.Record)(_objectSpread(_objectSpread({}, sharedAttributes), {}, {
  prototype: 'lines',
  vertices: new _immutable.List(),
  holes: new _immutable.List()
}), 'Line'));
exports.Line = Line;
var Hole = /*#__PURE__*/function (_Record5) {
  _inherits(Hole, _Record5);
  var _super5 = _createSuper(Hole);
  function Hole() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Hole);
    return _super5.call(this, _objectSpread(_objectSpread({}, json), {}, {
      properties: (0, _immutable.fromJS)(json.properties || {})
    }));
  }
  return _createClass(Hole);
}((0, _immutable.Record)(_objectSpread(_objectSpread({}, sharedAttributes), {}, {
  prototype: 'holes',
  offset: -1,
  line: ''
}), 'Hole'));
exports.Hole = Hole;
var Area = /*#__PURE__*/function (_Record6) {
  _inherits(Area, _Record6);
  var _super6 = _createSuper(Area);
  function Area() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Area);
    return _super6.call(this, _objectSpread(_objectSpread({}, json), {}, {
      properties: (0, _immutable.fromJS)(json.properties || {}),
      vertices: new _immutable.List(json.vertices || [])
    }));
  }
  return _createClass(Area);
}((0, _immutable.Record)(_objectSpread(_objectSpread({}, sharedAttributes), {}, {
  prototype: 'areas',
  vertices: new _immutable.List(),
  holes: new _immutable.List()
}), 'Area'));
exports.Area = Area;
var Item = /*#__PURE__*/function (_Record7) {
  _inherits(Item, _Record7);
  var _super7 = _createSuper(Item);
  function Item() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Item);
    return _super7.call(this, _objectSpread(_objectSpread({}, json), {}, {
      properties: (0, _immutable.fromJS)(json.properties || {})
    }));
  }
  return _createClass(Item);
}((0, _immutable.Record)(_objectSpread(_objectSpread({}, sharedAttributes), {}, {
  prototype: 'items',
  x: 0,
  y: 0,
  rotation: 0
}), 'Item'));
exports.Item = Item;
var Layer = /*#__PURE__*/function (_Record8) {
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
}((0, _immutable.Record)({
  id: '',
  altitude: 0,
  order: 0,
  opacity: 1,
  name: '',
  visible: true,
  vertices: new _immutable.Map(),
  lines: new _immutable.Map(),
  holes: new _immutable.Map(),
  areas: new _immutable.Map(),
  items: new _immutable.Map(),
  selected: new ElementsSet()
}, 'Layer'));
exports.Layer = Layer;
var Group = /*#__PURE__*/function (_Record9) {
  _inherits(Group, _Record9);
  var _super9 = _createSuper(Group);
  function Group() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, Group);
    return _super9.call(this, _objectSpread(_objectSpread({}, json), {}, {
      properties: (0, _immutable.fromJS)(json.properties || {}),
      elements: (0, _immutable.fromJS)(json.elements || {})
    }));
  }
  return _createClass(Group);
}((0, _immutable.Record)(_objectSpread(_objectSpread({}, sharedAttributes), {}, {
  prototype: 'groups',
  x: 0,
  y: 0,
  rotation: 0,
  elements: new _immutable.Map()
}), 'Group'));
exports.Group = Group;
var DefaultLayers = new _immutable.Map({
  'layer-1': new Layer({
    id: 'layer-1',
    name: 'default'
  })
});
exports.DefaultLayers = DefaultLayers;
var Scene = /*#__PURE__*/function (_Record10) {
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
      meta: json.meta ? (0, _immutable.fromJS)(json.meta) : new _immutable.Map(),
      guides: json.guides ? (0, _immutable.fromJS)(json.guides) : new _immutable.Map({
        horizontal: new _immutable.Map(),
        vertical: new _immutable.Map(),
        circular: new _immutable.Map()
      })
    }));
  }
  return _createClass(Scene);
}((0, _immutable.Record)({
  unit: 'cm',
  layers: new _immutable.Map(),
  grids: new _immutable.Map(),
  selectedLayer: null,
  groups: new _immutable.Map(),
  width: 3000,
  height: 2000,
  meta: new _immutable.Map(),
  //additional info
  guides: new _immutable.Map()
}, 'Scene'));
exports.Scene = Scene;
var CatalogElement = /*#__PURE__*/function (_Record11) {
  _inherits(CatalogElement, _Record11);
  var _super11 = _createSuper(CatalogElement);
  function CatalogElement() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, CatalogElement);
    return _super11.call(this, _objectSpread(_objectSpread({}, json), {}, {
      info: (0, _immutable.fromJS)(json.info),
      properties: (0, _immutable.fromJS)(json.properties)
    }));
  }
  return _createClass(CatalogElement);
}((0, _immutable.Record)({
  name: '',
  prototype: '',
  info: new _immutable.Map(),
  properties: new _immutable.Map()
}, 'CatalogElement'));
exports.CatalogElement = CatalogElement;
var Catalog = /*#__PURE__*/function (_Record12) {
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
}((0, _immutable.Record)({
  ready: false,
  page: 'root',
  path: new _immutable.List(),
  elements: new _immutable.Map()
}, 'Catalog'));
exports.Catalog = Catalog;
var HistoryStructure = /*#__PURE__*/function (_Record13) {
  _inherits(HistoryStructure, _Record13);
  var _super13 = _createSuper(HistoryStructure);
  function HistoryStructure() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, HistoryStructure);
    return _super13.call(this, {
      list: (0, _immutable.fromJS)(json.list || []),
      first: new Scene(json.scene),
      last: new Scene(json.last || json.scene)
    });
  }
  return _createClass(HistoryStructure);
}((0, _immutable.Record)({
  list: new _immutable.List(),
  first: null,
  last: null
}, 'HistoryStructure'));
exports.HistoryStructure = HistoryStructure;
var State = /*#__PURE__*/function (_Record14) {
  _inherits(State, _Record14);
  var _super14 = _createSuper(State);
  function State() {
    var json = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    _classCallCheck(this, State);
    return _super14.call(this, _objectSpread(_objectSpread({}, json), {}, {
      scene: new Scene(json.scene),
      sceneHistory: new HistoryStructure(json),
      catalog: new Catalog(json.catalog || {}),
      viewer2D: new _immutable.Map(json.viewer2D || {}),
      drawingSupport: new _immutable.Map(json.drawingSupport || {}),
      draggingSupport: new _immutable.Map(json.draggingSupport || {}),
      rotatingSupport: new _immutable.Map(json.rotatingSupport || {}),
      misc: json.misc ? (0, _immutable.fromJS)(json.misc) : new _immutable.Map()
    }));
  }
  return _createClass(State);
}((0, _immutable.Record)({
  mode: _constants.MODE_IDLE,
  scene: new Scene(),
  sceneHistory: new HistoryStructure(),
  catalog: new Catalog(),
  viewer2D: new _immutable.Map(),
  mouse: new _immutable.Map({
    x: 0,
    y: 0
  }),
  zoom: 0,
  snapMask: _snap.SNAP_MASK,
  snapElements: new _immutable.List(),
  activeSnapElement: null,
  drawingSupport: new _immutable.Map(),
  draggingSupport: new _immutable.Map(),
  rotatingSupport: new _immutable.Map(),
  errors: new _immutable.List(),
  warnings: new _immutable.List(),
  clipboardProperties: new _immutable.Map(),
  selectedElementsHistory: new _immutable.List(),
  misc: new _immutable.Map(),
  //additional info
  alterate: false
}, 'State'));
exports.State = State;