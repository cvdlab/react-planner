'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SNAP_MASK = exports.SNAP_GUIDE = exports.SNAP_GRID = exports.SNAP_SEGMENT = exports.SNAP_LINE = exports.SNAP_POINT = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.nearestSnap = nearestSnap;
exports.addPointSnap = addPointSnap;
exports.addLineSnap = addLineSnap;
exports.addLineSegmentSnap = addLineSegmentSnap;
exports.addGridSnap = addGridSnap;

var _immutable = require('immutable');

var _geometry = require('./geometry');

var Geometry = _interopRequireWildcard(_geometry);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var SNAP_POINT = exports.SNAP_POINT = 'SNAP_POINT';
var SNAP_LINE = exports.SNAP_LINE = 'SNAP_LINE';
var SNAP_SEGMENT = exports.SNAP_SEGMENT = 'SNAP_SEGMENT';
var SNAP_GRID = exports.SNAP_GRID = 'SNAP_GRID';
var SNAP_GUIDE = exports.SNAP_GUIDE = 'SNAP_GUIDE';

var SNAP_MASK = exports.SNAP_MASK = new _immutable.Map({
  SNAP_POINT: true,
  SNAP_LINE: true,
  SNAP_SEGMENT: true,
  SNAP_GRID: false,
  SNAP_GUIDE: true
});

var PointSnap = function (_Record) {
  _inherits(PointSnap, _Record);

  function PointSnap() {
    _classCallCheck(this, PointSnap);

    return _possibleConstructorReturn(this, (PointSnap.__proto__ || Object.getPrototypeOf(PointSnap)).apply(this, arguments));
  }

  _createClass(PointSnap, [{
    key: 'nearestPoint',
    value: function nearestPoint(x, y) {
      return {
        x: this.x,
        y: this.y,
        distance: Geometry.pointsDistance(this.x, this.y, x, y)
      };
    }
  }, {
    key: 'isNear',
    value: function isNear(x, y, distance) {
      return ~(this.x - x) + 1 < distance && ~(this.y - y) + 1 < distance;
    }
  }]);

  return PointSnap;
}((0, _immutable.Record)({
  type: 'point',
  x: -1, y: -1,
  radius: 1, priority: 1,
  related: new _immutable.List()
}));

var LineSnap = function (_Record2) {
  _inherits(LineSnap, _Record2);

  function LineSnap() {
    _classCallCheck(this, LineSnap);

    return _possibleConstructorReturn(this, (LineSnap.__proto__ || Object.getPrototypeOf(LineSnap)).apply(this, arguments));
  }

  _createClass(LineSnap, [{
    key: 'nearestPoint',
    value: function nearestPoint(x, y) {
      return _extends({}, Geometry.closestPointFromLine(this.a, this.b, this.c, x, y), {
        distance: Geometry.distancePointFromLine(this.a, this.b, this.c, x, y)
      });
    }
  }, {
    key: 'isNear',
    value: function isNear(x, y, distance) {
      return true;
    }
  }]);

  return LineSnap;
}((0, _immutable.Record)({
  type: 'line',
  a: -1, b: -1, c: -1,
  radius: 1, priority: 1,
  related: new _immutable.List()
}));

var LineSegmentSnap = function (_Record3) {
  _inherits(LineSegmentSnap, _Record3);

  function LineSegmentSnap() {
    _classCallCheck(this, LineSegmentSnap);

    return _possibleConstructorReturn(this, (LineSegmentSnap.__proto__ || Object.getPrototypeOf(LineSegmentSnap)).apply(this, arguments));
  }

  _createClass(LineSegmentSnap, [{
    key: 'nearestPoint',
    value: function nearestPoint(x, y) {
      return _extends({}, Geometry.closestPointFromLineSegment(this.x1, this.y1, this.x2, this.y2, x, y), {
        distance: Geometry.distancePointFromLineSegment(this.x1, this.y1, this.x2, this.y2, x, y)
      });
    }
  }, {
    key: 'isNear',
    value: function isNear(x, y, distance) {
      return true;
    }
  }]);

  return LineSegmentSnap;
}((0, _immutable.Record)({
  type: 'line-segment',
  x1: -1, y1: -1, x2: -1, y2: -1,
  radius: 1, priority: 1,
  related: new _immutable.List()
}));

var GridSnap = function (_Record4) {
  _inherits(GridSnap, _Record4);

  function GridSnap() {
    _classCallCheck(this, GridSnap);

    return _possibleConstructorReturn(this, (GridSnap.__proto__ || Object.getPrototypeOf(GridSnap)).apply(this, arguments));
  }

  _createClass(GridSnap, [{
    key: 'nearestPoint',
    value: function nearestPoint(x, y) {
      return {
        x: this.x,
        y: this.y,
        distance: Geometry.pointsDistance(this.x, this.y, x, y)
      };
    }
  }, {
    key: 'isNear',
    value: function isNear(x, y, distance) {
      return ~(this.x - x) + 1 < distance && ~(this.y - y) + 1 < distance;
    }
  }]);

  return GridSnap;
}((0, _immutable.Record)({
  type: 'grid',
  x: -1, y: -1,
  radius: 1, priority: 1,
  related: new _immutable.List()
}));

function nearestSnap(snapElements, x, y, snapMask) {

  var filter = {
    'point': snapMask.get(SNAP_POINT),
    'line': snapMask.get(SNAP_LINE),
    'line-segment': snapMask.get(SNAP_SEGMENT),
    'grid': snapMask.get(SNAP_GRID)
  };

  return snapElements.valueSeq().filter(function (el) {
    return filter[el.type] && el.isNear(x, y, el.radius);
  }).map(function (snap) {
    return { snap: snap, point: snap.nearestPoint(x, y) };
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

function addPointSnap(snapElements, x, y, radius, priority, related) {
  related = new _immutable.List([related]);
  return snapElements.push(new PointSnap({ x: x, y: y, radius: radius, priority: priority, related: related }));
}

function addLineSnap(snapElements, a, b, c, radius, priority, related) {
  related = new _immutable.List([related]);

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

    snapElements.push(new LineSnap({ a: a, b: b, c: c, radius: radius, priority: priority, related: related }));
  });
}

function addLineSegmentSnap(snapElements, x1, y1, x2, y2, radius, priority, related) {
  related = new _immutable.List([related]);
  return snapElements.push(new LineSegmentSnap({ x1: x1, y1: y1, x2: x2, y2: y2, radius: radius, priority: priority, related: related }));
}

function addGridSnap(snapElements, x, y, radius, priority, related) {
  related = new _immutable.List([related]);
  return snapElements.push(new GridSnap({ x: x, y: y, radius: radius, priority: priority, related: related }));
}