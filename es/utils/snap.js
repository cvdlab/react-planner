function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }
function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }
function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }
function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }
function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }
function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }
function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }
import { Map, List, Record } from 'immutable';
import * as Geometry from './geometry';
export var SNAP_POINT = 'SNAP_POINT';
export var SNAP_LINE = 'SNAP_LINE';
export var SNAP_SEGMENT = 'SNAP_SEGMENT';
export var SNAP_GRID = 'SNAP_GRID';
export var SNAP_GUIDE = 'SNAP_GUIDE';
export var SNAP_MASK = new Map({
  SNAP_POINT: true,
  SNAP_LINE: true,
  SNAP_SEGMENT: true,
  SNAP_GRID: false,
  SNAP_GUIDE: true
});
var PointSnap = /*#__PURE__*/function (_Record) {
  _inherits(PointSnap, _Record);
  var _super = _createSuper(PointSnap);
  function PointSnap() {
    _classCallCheck(this, PointSnap);
    return _super.apply(this, arguments);
  }
  _createClass(PointSnap, [{
    key: "nearestPoint",
    value: function nearestPoint(x, y) {
      return {
        x: this.x,
        y: this.y,
        distance: Geometry.pointsDistance(this.x, this.y, x, y)
      };
    }
  }, {
    key: "isNear",
    value: function isNear(x, y, distance) {
      return ~(this.x - x) + 1 < distance && ~(this.y - y) + 1 < distance;
    }
  }]);
  return PointSnap;
}(Record({
  type: 'point',
  x: -1,
  y: -1,
  radius: 1,
  priority: 1,
  related: new List()
}));
var LineSnap = /*#__PURE__*/function (_Record2) {
  _inherits(LineSnap, _Record2);
  var _super2 = _createSuper(LineSnap);
  function LineSnap() {
    _classCallCheck(this, LineSnap);
    return _super2.apply(this, arguments);
  }
  _createClass(LineSnap, [{
    key: "nearestPoint",
    value: function nearestPoint(x, y) {
      return _objectSpread(_objectSpread({}, Geometry.closestPointFromLine(this.a, this.b, this.c, x, y)), {}, {
        distance: Geometry.distancePointFromLine(this.a, this.b, this.c, x, y)
      });
    }
  }, {
    key: "isNear",
    value: function isNear(x, y, distance) {
      return true;
    }
  }]);
  return LineSnap;
}(Record({
  type: 'line',
  a: -1,
  b: -1,
  c: -1,
  radius: 1,
  priority: 1,
  related: new List()
}));
var LineSegmentSnap = /*#__PURE__*/function (_Record3) {
  _inherits(LineSegmentSnap, _Record3);
  var _super3 = _createSuper(LineSegmentSnap);
  function LineSegmentSnap() {
    _classCallCheck(this, LineSegmentSnap);
    return _super3.apply(this, arguments);
  }
  _createClass(LineSegmentSnap, [{
    key: "nearestPoint",
    value: function nearestPoint(x, y) {
      return _objectSpread(_objectSpread({}, Geometry.closestPointFromLineSegment(this.x1, this.y1, this.x2, this.y2, x, y)), {}, {
        distance: Geometry.distancePointFromLineSegment(this.x1, this.y1, this.x2, this.y2, x, y)
      });
    }
  }, {
    key: "isNear",
    value: function isNear(x, y, distance) {
      return true;
    }
  }]);
  return LineSegmentSnap;
}(Record({
  type: 'line-segment',
  x1: -1,
  y1: -1,
  x2: -1,
  y2: -1,
  radius: 1,
  priority: 1,
  related: new List()
}));
var GridSnap = /*#__PURE__*/function (_Record4) {
  _inherits(GridSnap, _Record4);
  var _super4 = _createSuper(GridSnap);
  function GridSnap() {
    _classCallCheck(this, GridSnap);
    return _super4.apply(this, arguments);
  }
  _createClass(GridSnap, [{
    key: "nearestPoint",
    value: function nearestPoint(x, y) {
      return {
        x: this.x,
        y: this.y,
        distance: Geometry.pointsDistance(this.x, this.y, x, y)
      };
    }
  }, {
    key: "isNear",
    value: function isNear(x, y, distance) {
      return ~(this.x - x) + 1 < distance && ~(this.y - y) + 1 < distance;
    }
  }]);
  return GridSnap;
}(Record({
  type: 'grid',
  x: -1,
  y: -1,
  radius: 1,
  priority: 1,
  related: new List()
}));
export function nearestSnap(snapElements, x, y, snapMask) {
  var filter = {
    'point': snapMask.get(SNAP_POINT),
    'line': snapMask.get(SNAP_LINE),
    'line-segment': snapMask.get(SNAP_SEGMENT),
    'grid': snapMask.get(SNAP_GRID)
  };
  return snapElements.valueSeq().filter(function (el) {
    return filter[el.type] && el.isNear(x, y, el.radius);
  }).map(function (snap) {
    return {
      snap: snap,
      point: snap.nearestPoint(x, y)
    };
  }).filter(function (_ref) {
    var radius = _ref.snap.radius,
      distance = _ref.point.distance;
    return distance < radius;
  }).min(function (_ref2, _ref3) {
    var p1 = _ref2.snap.priority,
      d1 = _ref2.point.distance;
    var p2 = _ref3.snap.priority,
      d2 = _ref3.point.distance;
    return p1 === p2 ? d1 < d2 ? -1 : 1 : p1 > p2 ? -1 : 1;
  });
}
export function addPointSnap(snapElements, x, y, radius, priority, related) {
  related = new List([related]);
  return snapElements.push(new PointSnap({
    x: x,
    y: y,
    radius: radius,
    priority: priority,
    related: related
  }));
}
export function addLineSnap(snapElements, a, b, c, radius, priority, related) {
  related = new List([related]);
  return snapElements.withMutations(function (snapElements) {
    var alreadyPresent = snapElements.some(function (lineSnap) {
      return lineSnap.type === 'line' && a === lineSnap.a && b === lineSnap.b && c === lineSnap.c;
    });
    if (alreadyPresent) return snapElements;
    var intersections = snapElements.valueSeq().filter(function (snap) {
      return snap.type === 'line';
    }).map(function (snap) {
      return Geometry.twoLinesIntersection(snap.a, snap.b, snap.c, a, b, c);
    }).filter(function (intersection) {
      return intersection !== undefined;
    }).forEach(function (_ref4) {
      var x = _ref4.x,
        y = _ref4.y;
      return addPointSnap(snapElements, x, y, 20, 40);
    });
    snapElements.push(new LineSnap({
      a: a,
      b: b,
      c: c,
      radius: radius,
      priority: priority,
      related: related
    }));
  });
}
export function addLineSegmentSnap(snapElements, x1, y1, x2, y2, radius, priority, related) {
  related = new List([related]);
  return snapElements.push(new LineSegmentSnap({
    x1: x1,
    y1: y1,
    x2: x2,
    y2: y2,
    radius: radius,
    priority: priority,
    related: related
  }));
}
export function addGridSnap(snapElements, x, y, radius, priority, related) {
  related = new List([related]);
  return snapElements.push(new GridSnap({
    x: x,
    y: y,
    radius: radius,
    priority: priority,
    related: related
  }));
}