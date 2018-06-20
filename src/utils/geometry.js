/** @description Determines the distance between two points
 *  @param {number} x0 Vertex 0 x
 *  @param {number} y0 Vertex 0 y
 *  @param {number} x1 Vertex 1 x
 *  @param {number} y1 Vertex 1 y
 *  @return {number}
 */
import {toFixedFloat, fAbs} from './math.js';
import {EPSILON} from '../constants';

export function compareVertices(v0, v1) {
  return v0.x === v1.x ? v0.y - v1.y : v0.x - v1.x;
}

export function minVertex(v0, v1) {
  return compareVertices(v0, v1) > 0 ? v1 : v0;
}

export function maxVertex(v0, v1) {
  return compareVertices(v0, v1) > 0 ? v0 : v1;
}

export function orderVertices(vertices) {
  return vertices.sort(compareVertices);
}

export function pointsDistance(x0, y0, x1, y1) {
  let diff_x = x0 - x1;
  let diff_y = y0 - y1;

  return Math.sqrt((diff_x * diff_x) + (diff_y * diff_y));
}

export function verticesDistance(v1, v2) {

  let {x: x0, y: y0} = v1;
  let {x: x1, y: y1} = v2;

  return pointsDistance(x0, y0, x1, y1);
}

export function horizontalLine(y) {
  return {a: 0, b: 1, c: -y};
}

export function verticalLine(x) {
  return {a: 1, b: 0, c: -x};
}

export function linePassingThroughTwoPoints(x1, y1, x2, y2) {
  if (x1 === x2 && y1 == y2) throw new Error('Geometry error');
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
  return fAbs(a * x + b * y + c) / Math.sqrt(a * a + b * b);
}

export function closestPointFromLine(a, b, c, x, y) {
  //https://en.wikipedia.org/wiki/Distance_from_a_point_to_a_line
  let denom = a * a + b * b;
  return {
    x: (b * (b * x - a * y) - a * c) / denom,
    y: ((a * -b * x + a * y) - b * c) / denom,
  }
}

/** @description Get point of intersection between two lines using ax+by+c line's equation
 *  @param {number} a x coefficent of first line
 *  @param {number} b y coefficent of first line
 *  @param {number} c costant of first line
 *  @param {number} j x coefficent of second line
 *  @param {number} k y coefficent of second line
 *  @param {number} l costant of second line
 *  @return {object} {x,y} point's coordinates
 */
export function twoLinesIntersection(a, b, c, j, k, l) {
  let angularCoefficientsDiff = (b * j - a * k);

  if (angularCoefficientsDiff === 0) return undefined; //no intersection

  let y = (a * l - c * j) / angularCoefficientsDiff;
  let x = (c * k - b * l) / angularCoefficientsDiff;
  return {x, y};
}

export function twoLineSegmentsIntersection(p1, p2, p3, p4) {
  //https://github.com/psalaets/line-intersect/blob/master/lib/check-intersection.js

  let {x: x1, y: y1} = p1;
  let {x: x2, y: y2} = p2;
  let {x: x3, y: y3} = p3;
  let {x: x4, y: y4} = p4;

  let denom = ((y4 - y3) * (x2 - x1)) - ((x4 - x3) * (y2 - y1));
  let numA = ((x4 - x3) * (y1 - y3)) - ((y4 - y3) * (x1 - x3));
  let numB = ((x2 - x1) * (y1 - y3)) - ((y2 - y1) * (x1 - x3));

  if (fAbs(denom) <= EPSILON) {
    if (fAbs(numA) <= EPSILON && fAbs(numB) <= EPSILON) {

      let comparator = (pa, pb) => pa.x === pb.x ? pa.y - pb.y : pa.x - pb.x;
      let line0 = [p1, p2].sort(comparator);
      let line1 = [p3.toJS(), p4.toJS()].sort(comparator);

      let [lineSX, lineDX] = [line0, line1].sort((lineA, lineB) => comparator(lineA[0], lineB[0]));

      if (lineSX[1].x === lineDX[0].x) {
        return {type: (lineDX[0].y <= lineSX[1].y) ? 'colinear' : 'none'};
      } else {
        return {type: (lineDX[0].x <= lineSX[1].x) ? 'colinear' : 'none'};
      }
    }
    return {type: 'parallel'};
  }

  let uA = numA / denom;
  let uB = numB / denom;

  if (uA >= (0 - EPSILON) && uA <= (1 + EPSILON) && uB >= (0 - EPSILON) && uB <= (1 + EPSILON)) {
    let point = {
      x: x1 + (uA * (x2 - x1)),
      y: y1 + (uA * (y2 - y1))
    };
    return {type: 'intersecting', point};
  }

  return {type: 'none'};
}

export function distancePointFromLineSegment(x1, y1, x2, y2, xp, yp) {
  //http://stackoverflow.com/a/6853926/1398836

  let A = xp - x1;
  let B = yp - y1;
  let C = x2 - x1;
  let D = y2 - y1;

  let dot = A * C + B * D;
  let len_sq = C * C + D * D;
  let param = -1;
  if (len_sq != 0) //in case of 0 length line
    param = dot / len_sq;

  let xx, yy;

  if (param < 0) {
    xx = x1;
    yy = y1;
  }
  else if (param > 1) {
    xx = x2;
    yy = y2;
  }
  else {
    xx = x1 + param * C;
    yy = y1 + param * D;
  }

  let dx = xp - xx;
  let dy = yp - yy;
  return Math.sqrt(dx * dx + dy * dy);
}

/**
 *
 * @param x1 {number} x for first vertex of the segment
 * @param y1 {number} y for first vertex of the segment
 * @param x2 {number} x for second vertex of the segment
 * @param y2 {number} y for second vertex of the segment
 * @param xp {number} x for point we want to verify
 * @param yp {number} y for point we want to verify
 * @param maxDistance {number} the epsilon value used for comparisons
 * @returns {boolean} true if the point lies on the line segment false otherwise
 */
export function isPointOnLineSegment(x1, y1, x2, y2, xp, yp, maxDistance = EPSILON) {
  return distancePointFromLineSegment(x1, y1, x2, y2, xp, yp) <= maxDistance;
}

export function closestPointFromLineSegment(x1, y1, x2, y2, xp, yp) {
  if (x1 === x2) return {x: x1, y: yp};
  if (y1 === y2) return {x: xp, y: y1};

  let m = (y2 - y1) / (x2 - x1);
  let q = y1 - m * x1;

  let mi = -1 / m;
  let qi = yp - mi * xp;

  let x = (qi - q) / (m - mi);
  let y = (m * x + q);

  return {x, y};
}

export function pointPositionOnLineSegment(x1, y1, x2, y2, xp, yp) {
  let length = pointsDistance(x1, y1, x2, y2);
  let distance = pointsDistance(x1, y1, xp, yp);

  let offset = distance / length;
  if (x1 > x2) offset = mapRange(offset, 0, 1, 1, 0);

  return offset;
}

export function mapRange(value, low1, high1, low2, high2) {
  return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
}

export function angleBetweenTwoPointsAndOrigin(x1, y1, x2, y2) {
  return -(Math.atan2(y1 - y2, x2 - x1)) * 180 / Math.PI;
}

export function angleBetweenTwoPoints(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1);
}

export function absAngleBetweenTwoPoints(x1, y1, x2, y2) {
  return Math.atan2(Math.abs(y2 - y1), Math.abs(x2 - x1));
}

export function samePoints({x: x1, y: y1}, {x: x2, y: y2}) {
  return fAbs(x1 - x2) <= EPSILON && fAbs(y1 - y2) <= EPSILON;
}

/** @description Extend line based on coordinates and new line length
 *  @param {number} x1 Vertex 1 x
 *  @param {number} y1 Vertex 1 y
 *  @param {number} x2 Vertex 2 x
 *  @param {number} y2 Vertex 2 y
 *  @param {number} newDistance New line length
 *  @return {object}
 */
export function extendLine(x1, y1, x2, y2, newDistance, precision = 6) {
  let rad = angleBetweenTwoPoints( x1, y1, x2, y2 );

  return {
    x: toFixedFloat(x1 + (Math.cos(rad) * newDistance), precision),
    y: toFixedFloat(y1 + (Math.sin(rad) * newDistance), precision),
  };
}

export function roundVertex(vertex, precision = 6) {
  vertex.set('x', toFixedFloat(vertex.get('x'), precision));
  vertex.set('y', toFixedFloat(vertex.get('y'), precision));

  return vertex;
}

//https://github.com/MartyWallace/PolyK
export function ContainsPoint(polygon, pointX, pointY) {
  let n = polygon.length >> 1;

  let ax, lup;
  let ay = polygon[2 * n - 3] - pointY;
  let bx = polygon[2 * n - 2] - pointX;
  let by = polygon[2 * n - 1] - pointY;

  if (bx === 0 && by === 0) return false; // point on edge

  // let lup = by > ay;
  for (let ii = 0; ii < n; ii++) {
    ax = bx;
    ay = by;
    bx = polygon[2 * ii] - pointX;
    by = polygon[2 * ii + 1] - pointY;
    if (bx === 0 && by === 0) return false; // point on edge
    if (ay === by) continue;
    lup = by > ay;
  }

  let depth = 0;
  for (let i = 0; i < n; i++) {
    ax = bx;
    ay = by;
    bx = polygon[2 * i] - pointX;
    by = polygon[2 * i + 1] - pointY;
    if (ay < 0 && by < 0) continue;  // both 'up' or both 'down'
    if (ay > 0 && by > 0) continue;  // both 'up' or both 'down'
    if (ax < 0 && bx < 0) continue;   // both points on the left

    if (ay === by && Math.min(ax, bx) < 0) return true;
    if (ay === by) continue;

    let lx = ax + (bx - ax) * (-ay) / (by - ay);
    if (lx === 0) return false;      // point on edge
    if (lx > 0) depth++;
    if (ay === 0 && lup && by > ay) depth--;  // hit vertex, both up
    if (ay === 0 && !lup && by < ay) depth--; // hit vertex, both down
    lup = by > ay;
  }
  return (depth & 1) === 1;
}

export function cosWithThreshold(alpha, threshold) {
  let cos = Math.cos(alpha);
  return cos < threshold ? 0 : cos;
}

export function sinWithThreshold(alpha, threshold) {
  let sin = Math.sin(alpha);
  return sin < threshold ? 0 : sin;
}

export function midPoint( x1, y1, x2, y2 ) {
  return { x: (x1+x2)/2, y: (y1+y2)/2 };
}

export function verticesMidPoint( verticesArray ) {
  let res = verticesArray.reduce( ( incr, vertex ) => { return { x: incr.x + vertex.x, y: incr.y + vertex.y } }, { x: 0, y: 0 });
  return { x: res.x / verticesArray.length, y: res.y / verticesArray.length };
}

export function rotatePointAroundPoint( px, py, ox, oy, theta ) {

  let thetaRad = theta * Math.PI / 180;

  let cos = Math.cos( thetaRad );
  let sin = Math.sin( thetaRad );

  let deltaX = px - ox;
  let deltaY = py - oy;

  return {
    x: cos * deltaX - sin * deltaY + ox,
    y: sin * deltaX + cos * deltaY + oy
  };

}
