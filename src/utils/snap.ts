import { Map, List, Record } from 'immutable';
import * as Geometry from './geometry';

export const SNAP_POINT = 'SNAP_POINT';
export const SNAP_LINE = 'SNAP_LINE';
export const SNAP_SEGMENT = 'SNAP_SEGMENT';
export const SNAP_GRID = 'SNAP_GRID';
export const SNAP_GUIDE = 'SNAP_GUIDE';

export const SNAP_MASK = new Map({
  SNAP_POINT: true,
  SNAP_LINE: true,
  SNAP_SEGMENT: true,
  SNAP_GRID: false,
  SNAP_GUIDE: true
});

class PointSnap extends Record({
  type: 'point',
  x: -1, y: -1,
  radius: 1, priority: 1,
  related: new List()
}) {
  nearestPoint(x: number, y: number) {
    return {
      x: (this as any).x,
      y: (this as any).y,
      distance: Geometry.pointsDistance((this as any).x, (this as any).y, x, y)
    };
  }
  isNear(x: number, y: number, distance: number) { return ~((this as any).x - x) + 1 < distance && ~((this as any).y - y) + 1 < distance; }
}

class LineSnap extends Record({
  type: 'line',
  a: -1, b: -1, c: -1,
  radius: 1, priority: 1,
  related: new List()
}) {
  nearestPoint(x: number, y: number) {
    return {
      ...Geometry.closestPointFromLine((this as any).a, (this as any).b, (this as any).c, x, y),
      distance: Geometry.distancePointFromLine((this as any).a, (this as any).b, (this as any).c, x, y)
    };
  }
  isNear(x: number, y: number, distance: number) { return true; }
}

class LineSegmentSnap extends Record({
  type: 'line-segment',
  x1: -1, y1: -1, x2: -1, y2: -1,
  radius: 1, priority: 1,
  related: new List()
}) {
  nearestPoint(x: number, y: number) {
    return {
      ...Geometry.closestPointFromLineSegment((this as any).x1, (this as any).y1, (this as any).x2, (this as any).y2, x, y),
      distance: Geometry.distancePointFromLineSegment((this as any).x1, (this as any).y1, (this as any).x2, (this as any).y2, x, y)
    };
  }
  isNear(x: number, y: number, distance: number) { return true; }
}

class GridSnap extends Record({
  type: 'grid',
  x: -1, y: -1,
  radius: 1, priority: 1,
  related: new List()
}) {
  nearestPoint(x: number, y: number) {
    return {
      x: (this as any).x,
      y: (this as any).y,
      distance: Geometry.pointsDistance((this as any).x, (this as any).y, x, y)
    };
  }
  isNear(x: number, y: number, distance: number) { return ~((this as any).x - x) + 1 < distance && ~((this as any).y - y) + 1 < distance; }
}

export function nearestSnap(snapElements: any, x: number, y: number, snapMask: any) {

  let filter: { [key: string]: any } = {
    'point': snapMask.get(SNAP_POINT),
    'line': snapMask.get(SNAP_LINE),
    'line-segment': snapMask.get(SNAP_SEGMENT),
    'grid': snapMask.get(SNAP_GRID)
  };

  return snapElements
    .valueSeq()
    .filter((el: any) => filter[el.type] && el.isNear(x, y, el.radius))
    .map((snap: any) => { return { snap, point: snap.nearestPoint(x, y) }; })
    .filter(({ snap: { radius }, point: { distance } }: any) => distance < radius)
    .min(
      (
        { snap: { priority: p1 }, point: { distance: d1 } }: any,
        { snap: { priority: p2 }, point: { distance: d2 } }: any
      ) => p1 === p2 ? (d1 < d2 ? -1 : 1) : (p1 > p2 ? -1 : 1)
    );
}

export function addPointSnap(snapElements: any, x: number, y: number, radius: number, priority: number, related?: any) {
  related = new List([related]);
  return snapElements.push(new PointSnap({ x, y, radius, priority, related }));
}

export function addLineSnap(snapElements: any, a: number, b: number, c: number, radius: number, priority: number, related?: any) {
  related = new List([related]);

  return snapElements.withMutations((snapElements: any) => {

    let alreadyPresent = snapElements.some((lineSnap: any) =>
      lineSnap.type === 'line' &&
      a === lineSnap.a &&
      b === lineSnap.b &&
      c === lineSnap.c);
    if (alreadyPresent) return snapElements;

    let intersections = snapElements
      .valueSeq()
      .filter((snap: any) => snap.type === 'line')
      .map((snap: any) => Geometry.twoLinesIntersection(snap.a, snap.b, snap.c, a, b, c))
      .filter((intersection: any) => intersection !== undefined)
      .forEach(({ x, y }: any) => addPointSnap(snapElements, x, y, 20, 40));

    snapElements.push(new LineSnap({ a, b, c, radius, priority, related }));
  });
}

export function addLineSegmentSnap(snapElements: any, x1: number, y1: number, x2: number, y2: number, radius: number, priority: number, related?: any) {
  related = new List([related]);
  return snapElements.push(new LineSegmentSnap({ x1, y1, x2, y2, radius, priority, related }));
}

export function addGridSnap(snapElements: any, x: number, y: number, radius: number, priority: number, related?: any) {
  related = new List([related]);
  return snapElements.push(new GridSnap({ x, y, radius, priority, related }));
}
