var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import { Map, List, Record } from 'immutable';
import * as Geometry from './geometry';

export var SNAP_POINT = 'SNAP_POINT';
export var SNAP_LINE = 'SNAP_LINE';
export var SNAP_SEGMENT = 'SNAP_SEGMENT';

export var SNAP_MASK = new Map({ SNAP_POINT: true, SNAP_LINE: true, SNAP_SEGMENT: true });

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
  }]);

  return PointSnap;
}(Record({
  type: "point",
  x: -1, y: -1,
  radius: 1, priority: 1,
  related: new List()
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
  }]);

  return LineSnap;
}(Record({
  type: "line",
  a: -1, b: -1, c: -1,
  radius: 1, priority: 1,
  related: new List()
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
  }]);

  return LineSegmentSnap;
}(Record({
  type: "line-segment",
  x1: -1, y1: -1, x2: -1, y2: -1,
  radius: 1, priority: 1,
  related: new List()
}));

export function nearestSnap(snapElements, x, y, snapMask) {

  return snapElements.valueSeq().filter(function (snap) {
    switch (snap.type) {
      case 'point':
        return snapMask.get(SNAP_POINT);
      case 'line':
        return snapMask.get(SNAP_LINE);
      case 'line-segment':
        return snapMask.get(SNAP_SEGMENT);
      default:
        return false;
    }
  }).map(function (snap) {
    return { snap: snap, point: snap.nearestPoint(x, y) };
  }).filter(function (_ref) {
    var radius = _ref.snap.radius,
        distance = _ref.point.distance;
    return distance < radius;
  }).min(function (_ref2, _ref3) {
    var snap1 = _ref2.snap,
        point1 = _ref2.point;
    var snap2 = _ref3.snap,
        point2 = _ref3.point;

    if (snap1.priority === snap2.priority) {
      if (point1.distance < point2.distance) return -1;else return 1;
    } else {
      if (snap1.priority > snap2.priority) return -1;else return 1;
    }
  });
}

export function addPointSnap(snapElements, x, y, radius, priority, related) {
  related = new List([related]);
  return snapElements.push(new PointSnap({ x: x, y: y, radius: radius, priority: priority, related: related }));
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
      return Geometry.intersectionFromTwoLines(snap.a, snap.b, snap.c, a, b, c);
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

export function addLineSegmentSnap(snapElements, x1, y1, x2, y2, radius, priority, related) {
  related = new List([related]);

  return snapElements.push(new LineSegmentSnap({ x1: x1, y1: y1, x2: x2, y2: y2, radius: radius, priority: priority, related: related }));
}