import {List, Record} from 'immutable';
import {distanceFromTwoPoints} from './geometry';

class PointHelper extends Record({x: -1, y: -1, radius: 1, priority: 1, related: new List()}) {
  nearestSnapPoint(x, y) {
    return {
      x: this.x,
      y: this.y,
      distance: distanceFromTwoPoints(this.x, this.y, x, y)
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
      if(snapPoint1.distance < snapPoint2.distance) return -1; else return 1;
    });

  if(nearestSnapPoint) return nearestSnapPoint.snapPoint; else return undefined;
}

export function addPointHelper(drawingHelpers, x, y, radius, priority, related) {
  related = new List([related]);
  return drawingHelpers.push(new PointHelper({x, y, radius, priority, related}));
}

export function addLineHelper(drawingHelpers, m, q, radius, priority) {

  return [drawingHelpers, {}];
}

export function addLineSegmentHelper(drawingHelpers, x1, y1, x2, y2, radius, priority) {

  return [drawingHelpers, {}];
}

export function addHorizontalLineHelper(drawingHelpers, y, radius, priority) {

  return [drawingHelpers, {}];
}

export function addVerticalLineHelper(drawingHelpers, x, radius, priority) {

  return [drawingHelpers, {}];
}
