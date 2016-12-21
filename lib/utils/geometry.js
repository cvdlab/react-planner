"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.distanceFromTwoPoints = distanceFromTwoPoints;
exports.horizontalLine = horizontalLine;
exports.verticalLine = verticalLine;
exports.linePassingThroughTwoPoints = linePassingThroughTwoPoints;
exports.distancePointFromLine = distancePointFromLine;
exports.closestPointFromLine = closestPointFromLine;
exports.intersectionFromTwoLines = intersectionFromTwoLines;
exports.intersectionFromTwoLineSegment = intersectionFromTwoLineSegment;
exports.distancePointFromLineSegment = distancePointFromLineSegment;
exports.closestPointFromLineSegment = closestPointFromLineSegment;
exports.pointPositionOnLineSegment = pointPositionOnLineSegment;
exports.mapRange = mapRange;
exports.angleBetweenTwoPointsAndOrigin = angleBetweenTwoPointsAndOrigin;
exports.samePoints = samePoints;
function distanceFromTwoPoints(x0, y0, x1, y1) {
  return Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
}

function horizontalLine(y) {
  return { a: 0, b: 1, c: -y };
}

function verticalLine(x) {
  return { a: 1, b: 0, c: -x };
}

function linePassingThroughTwoPoints(x1, y1, x2, y2) {
  // (x2 - x1)(y - y1) = (y2 - y1)(x - x1)
  // (y1 - y2)x + (x2 - x1)y + (y2x1 - x2y1) = 0

  if (x1 === x2 && y1 == y2) throw new Error("Geometry error");
  if (x1 === x2) return verticalLine(x);
  if (y1 === y2) return horizontalLine(y1);

  return {
    a: y1 - y2,
    b: x2 - x1,
    c: y2 * x1 - x2 * y1
  };
}

function distancePointFromLine(a, b, c, x, y) {
  //https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line
  return Math.abs(a * x + b * y + c) / Math.sqrt(a * a + b * b);
}

function closestPointFromLine(a, b, c, x, y) {
  //https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line
  var denom = a * a + b * b;
  return {
    x: (b * (b * x - a * y) - a * c) / denom,
    y: (a * -b * x + a * y - b * c) / denom
  };
}

function intersectionFromTwoLines(a, b, c, j, k, l) {
  var det = b * j - a * k;

  if (det === 0) return undefined; //no intersection

  var y = (a * l - c * j) / det;
  var x = (c * k - b * l) / det;
  return { x: x, y: y };
}

function intersectionFromTwoLineSegment(p1, p2, p3, p4) {
  //https://github.com/psalaets/line-intersect/blob/master/lib/check-intersection.js

  var x1 = p1.x,
      y1 = p1.y;
  var x2 = p2.x,
      y2 = p2.y;
  var x3 = p3.x,
      y3 = p3.y;
  var x4 = p4.x,
      y4 = p4.y;


  var EPSILON = 10e-6;

  var denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
  var numA = (x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3);
  var numB = (x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3);

  if (Math.abs(denom) <= EPSILON) {
    if (Math.abs(numA) <= EPSILON && Math.abs(numB) <= EPSILON) {
      var _ret = function () {

        var comparator = function comparator(pa, pb) {
          return pa.x === pb.x ? pa.y - pb.y : pa.x - pb.x;
        };
        var line0 = [p1, p2].sort(comparator);
        var line1 = [p3.toJS(), p4.toJS()].sort(comparator);

        var _sort = [line0, line1].sort(function (lineA, lineB) {
          return comparator(lineA[0], lineB[0]);
        }),
            _sort2 = _slicedToArray(_sort, 2),
            lineSX = _sort2[0],
            lineDX = _sort2[1];

        if (lineSX[1].x === lineDX[0].x) {
          return {
            v: { type: lineDX[0].y <= lineSX[1].y ? "colinear" : "none" }
          };
        } else {
          return {
            v: { type: lineDX[0].x <= lineSX[1].x ? "colinear" : "none" }
          };
        }
      }();

      if ((typeof _ret === "undefined" ? "undefined" : _typeof(_ret)) === "object") return _ret.v;
    }
    return { type: "parallel" };
  }

  var uA = numA / denom;
  var uB = numB / denom;

  if (uA >= 0 - EPSILON && uA <= 1 + EPSILON && uB >= 0 - EPSILON && uB <= 1 + EPSILON) {
    var point = {
      x: x1 + uA * (x2 - x1),
      y: y1 + uA * (y2 - y1)
    };
    return { type: "intersecting", point: point };
  }

  return { type: "none" };
}

function distancePointFromLineSegment(x1, y1, x2, y2, xp, yp) {
  //http://stackoverflow.com/a/6853926/1398836

  var A = xp - x1;
  var B = yp - y1;
  var C = x2 - x1;
  var D = y2 - y1;

  var dot = A * C + B * D;
  var len_sq = C * C + D * D;
  var param = -1;
  if (len_sq != 0) //in case of 0 length line
    param = dot / len_sq;

  var xx = void 0,
      yy = void 0;

  if (param < 0) {
    xx = x1;
    yy = y1;
  } else if (param > 1) {
    xx = x2;
    yy = y2;
  } else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  var dx = xp - xx;
  var dy = yp - yy;
  return Math.sqrt(dx * dx + dy * dy);
}

function closestPointFromLineSegment(x1, y1, x2, y2, xp, yp) {
  if (x1 === x2) return { x: x1, y: yp };
  if (y1 === y2) return { x: xp, y: y1 };

  var m = (y2 - y1) / (x2 - x1);
  var q = y1 - m * x1;

  var mi = -1 / m;
  var qi = yp - mi * xp;

  var x = (qi - q) / (m - mi);
  var y = m * x + q;

  return { x: x, y: y };
}

function pointPositionOnLineSegment(x1, y1, x2, y2, xp, yp) {
  var length = distanceFromTwoPoints(x1, y1, x2, y2);
  var distance = distanceFromTwoPoints(x1, y1, xp, yp);

  var offset = distance / length;
  if (x1 > x2) offset = mapRange(offset, 0, 1, 1, 0);

  return offset;
}

function mapRange(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

function angleBetweenTwoPointsAndOrigin(x1, y1, x2, y2) {
  var length = distanceFromTwoPoints(x1, y1, x2, y2);
  return -Math.asin((y1 - y2) / length) * 180 / Math.PI;
}

function samePoints(_ref, _ref2) {
  var x1 = _ref.x,
      y1 = _ref.y;
  var x2 = _ref2.x,
      y2 = _ref2.y;

  var EPSILON = 10e-6;
  return Math.abs(x1 - x2) <= EPSILON && Math.abs(y1 - y2) <= EPSILON;
}