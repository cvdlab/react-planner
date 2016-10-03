"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
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
exports.angleBetweenTwoPointsAndOrigin = angleBetweenTwoPointsAndOrigin;
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

function intersectionFromTwoLineSegment(_ref, _ref2, _ref3, _ref4) {
  var x1 = _ref.x;
  var y1 = _ref.y;
  var x2 = _ref2.x;
  var y2 = _ref2.y;
  var x3 = _ref3.x;
  var y3 = _ref3.y;
  var x4 = _ref4.x;
  var y4 = _ref4.y;

  //https://github.com/psalaets/line-intersect/blob/master/lib/check-intersection.js

  var denom = (y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1);
  var numA = (x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3);
  var numB = (x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3);

  if (denom == 0) {
    if (numA == 0 && numB == 0) {
      return { type: "colinear" };
    }
    return { type: "parallel" };
  }

  var uA = numA / denom;
  var uB = numB / denom;

  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
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

  return distance / length;
}

function angleBetweenTwoPointsAndOrigin(x1, y1, x2, y2) {
  var length = distanceFromTwoPoints(x1, y1, x2, y2);
  return -Math.asin((y1 - y2) / length) * 180 / Math.PI;
}