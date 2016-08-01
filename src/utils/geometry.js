export function distanceFromTwoPoints(x0, y0, x1, y1) {
  return Math.sqrt(Math.pow((x1 - x0), 2) + Math.pow((y1 - y0), 2));
}

export function horizontalLine(y) {
  return {a: 0, b: 1, c: -y}
}

export function verticalLine(x) {
  return {a: 1, b: 0, c: -x}
}

export function linePassingThroughTwoPoints(x1, y1, x2, y2) {
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

export function distancePointFromLine(a, b, c, x, y) {
  //https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line
  return Math.abs(a * x + b * y + c) / Math.sqrt(a * a + b * b);
}

export function closestPointFromLine(a, b, c, x, y) {
  //https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line
  let denom = a * a + b * b;
  return {
    x: (b * (b * x - a * y) - a * c) / denom,
    y: ((a * -b * x + a * y ) - b * c) / denom,
  }
}

export function intersectionFromTwoLines(a, b, c, j, k, l) {
  let det = (b * j - a * k);

  if (det === 0) return undefined; //no intersection

  let y = (a * l - c * j) / det;
  let x = (c * k - b * l) / det;
  return {x, y};
}

export function intersectionFromTwoLineSegment({x: x1, y: y1}, {x: x2, y: y2}, {x: x3, y: y3}, {x: x4, y:y4}) {
  //https://github.com/psalaets/line-intersect/blob/master/lib/check-intersection.js

  let denom = ((y4 - y3) * (x2 - x1)) - ((x4 - x3) * (y2 - y1));
  let numA = ((x4 - x3) * (y1 - y3)) - ((y4 - y3) * (x1 - x3));
  let numB = ((x2 - x1) * (y1 - y3)) - ((y2 - y1) * (x1 - x3));

  if (denom == 0) {
    if (numA == 0 && numB == 0) {
      return {type: "colinear"};
    }
    return {type: "parallel"};
  }

  var uA = numA / denom;
  var uB = numB / denom;

  if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
    let point = {
      x: x1 + (uA * (x2 - x1)),
      y: y1 + (uA * (y2 - y1))
    };
    return {type: "intersecting", point};
  }

  return {type: "none"};
}
