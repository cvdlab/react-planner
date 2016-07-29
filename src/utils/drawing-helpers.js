import {List, Record} from 'immutable';
import * as Geometry from './geometry';

class PointHelper extends Record({x: -1, y: -1, radius: 1, priority: 1, related: new List()}) {
  nearestSnapPoint(x, y) {
    return {
      x: this.x,
      y: this.y,
      distance: Geometry.distanceFromTwoPoints(this.x, this.y, x, y)
    };
  }
}

class LineHelper extends Record({a: -1, b: -1, c: -1, radius: 1, priority: 1, related: new List()}) {
  nearestSnapPoint(x, y) {
    return {
      ...Geometry.closestPointFromLine(this.a, this.b, this.c, x, y),
      distance: Geometry.distancePointFromLine(this.a, this.b, this.c, x, y)
    };
  }
}

export function nearestSnapPoint(drawingHelpers, x, y) {

  let nearestSnapPoint = drawingHelpers
    .valueSeq()
    .map(helper => {
      return {helper, snapPoint: helper.nearestSnapPoint(x, y)}
    })
    .filter(({helper: {radius}, snapPoint: {distance}}) => distance < radius)
    .min(({helper: helper1, snapPoint: snapPoint1}, {helper: helper2, snapPoint: snapPoint2}) => {

      if(snapPoint1.priority === snapPoint2.priority) {
        if (snapPoint1.distance < snapPoint2.distance) return -1; else return 1;
      }else{
        if (snapPoint1.priority < snapPoint2.priority) return -1; else return 1;
      }
    });

  if (nearestSnapPoint) return nearestSnapPoint.snapPoint; else return undefined;
}

export function addPointHelper(drawingHelpers, x, y, radius, priority, related) {
  related = new List([related]);
  return drawingHelpers.push(new PointHelper({x, y, radius, priority, related}));
}

export function addLineHelper(drawingHelpers, a, b, c, radius, priority, related) {
  related = new List([related]);
  return drawingHelpers.push(new LineHelper({a, b, c, radius, priority, related}));
}

export function addLineSegmentHelper(drawingHelpers, x1, y1, x2, y2, radius, priority) {

  return [drawingHelpers, {}];
}
