import {List, Record} from 'immutable';
import * as Geometry from './geometry';

class PointSnap extends Record({
  type: "point",
  x: -1, y: -1,
  radius: 1, priority: 1,
  related: new List()
}) {
  nearestPoint(x, y) {
    return {
      x: this.x,
      y: this.y,
      distance: Geometry.distanceFromTwoPoints(this.x, this.y, x, y)
    };
  }
}

class LineSnap extends Record({
  type: "line",
  a: -1, b: -1, c: -1,
  radius: 1, priority: 1,
  related: new List()
}) {
  nearestPoint(x, y) {
    return {
      ...Geometry.closestPointFromLine(this.a, this.b, this.c, x, y),
      distance: Geometry.distancePointFromLine(this.a, this.b, this.c, x, y)
    };
  }
}

class LineSegmentSnap extends Record({
  type: "line-segment",
  x1: -1, y1: -1, x2: -1, y2: -1,
  radius: 1, priority: 1,
  related: new List()
}) {
  nearestPoint(x, y) {
    return {
      ...Geometry.closestPointFromLineSegment(this.x1, this.y1, this.x2, this.y2, x, y),
      distance: Geometry.distancePointFromLineSegment(this.x1, this.y1, this.x2, this.y2, x, y)
    };
  }
}

export function nearestSnap(snapElements, x, y) {

  let nearestHelper = snapElements
    .valueSeq()
    .map(helper => {
      return {helper, point: helper.nearestPoint(x, y)}
    })
    .filter(({helper: {radius}, point: {distance}}) => distance < radius)
    .min(({helper: helper1, point: point1}, {helper: helper2, point: point2}) => {
      if (helper1.priority === helper2.priority) {
        if (point1.distance < point2.distance) return -1; else return 1;
      } else {
        if (helper1.priority > helper2.priority) return -1; else return 1;
      }
    });

  return nearestHelper;
}

export function addPointSnap(snapElements, x, y, radius, priority, related) {
  related = new List([related]);
  return snapElements.push(new PointSnap({x, y, radius, priority, related}));
}

export function addLineSnap(snapElements, a, b, c, radius, priority, related) {
  related = new List([related]);

  return snapElements.withMutations(snapElements => {

    let intersections = snapElements
      .valueSeq()
      .filter(helper => helper.type === 'line')
      .map(helper => Geometry.intersectionFromTwoLines(helper.a, helper.b, helper.c, a, b, c))
      .filter(intersection => intersection !== undefined)
      .forEach(({x, y}) => addPointSnap(snapElements, x, y, 20, 40));

    snapElements.push(new LineSnap({a, b, c, radius, priority, related}));
  })
}

export function addLineSegmentSnap(snapElements, x1, y1, x2, y2, radius, priority, related) {
  related = new List([related]);

  return snapElements.push(new LineSegmentSnap({x1, y1, x2, y2, radius, priority, related}));
}
