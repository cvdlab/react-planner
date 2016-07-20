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

export function nearestSnapPoint(drawingHelpers, x, y, minDistance) {

  let mapper = pointElement => pointElement.nearestSnapPoint(x, y);
  let comparator = ({distance: distance1}, {distance: distance2}) => distance1 - distance2;

  if (drawingHelpers.isEmpty()) return undefined;

  let nearestSnapPoint = drawingHelpers.minBy(mapper, comparator);

  let result = nearestSnapPoint.nearestSnapPoint(x, y);
  if (result.distance > minDistance) return undefined;

  return result;
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


//DEBUG
let drawingHelpers = new List();
drawingHelpers = addPointHelper(drawingHelpers, 100, 100, 20, 1, 'abc');
drawingHelpers = addPointHelper(drawingHelpers, 200, 200, 20, 1, 'cde');
drawingHelpers = addPointHelper(drawingHelpers, 150, 150, 20, 1, 'fgh');

console.log(drawingHelpers.toJS());

console.log(1, nearestSnapPoint(drawingHelpers, 140, 150, 99999));
