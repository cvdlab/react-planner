import { addPointSnap, addLineSnap, addLineSegmentSnap, addGridSnap } from './snap';
import * as Geometry from './geometry';
import { Map, List } from 'immutable';
import { SNAP_POINT, SNAP_LINE, SNAP_SEGMENT, SNAP_GRID } from './snap';

export function sceneSnapElements(scene, snapElements = new List(), snapMask = new Map()) {

  let a, b, c;
  return snapElements.withMutations(snapElements => {
    scene.layers.forEach(layer => {

      let { lines, vertices } = layer;

      vertices.forEach(({ id: vertexID, x, y }) => {

        if (snapMask.get(SNAP_POINT)) {
          addPointSnap(snapElements, x, y, 10, 10, vertexID);
        }

        if (snapMask.get(SNAP_LINE)) {
          ({ a, b, c } = Geometry.horizontalLine(y));
          addLineSnap(snapElements, a, b, c, 10, 1, vertexID);
          ({ a, b, c } = Geometry.verticalLine(x));
          addLineSnap(snapElements, a, b, c, 10, 1, vertexID);
        }

      });

      if (snapMask.get(SNAP_SEGMENT)) {
        lines.forEach(({ id: lineID, vertices: [v0, v1] }) => {
          let { x: x1, y: y1 } = vertices.get(v0);
          let { x: x2, y: y2 } = vertices.get(v1);

          addLineSegmentSnap(snapElements, x1, y1, x2, y2, 20, 1, lineID);
        });
      }

    });

    if (snapMask.get(SNAP_GRID)) {
      let divider = 5;
      let gridCellSize = 100 / divider;
      let xCycle = scene.get('width') / gridCellSize;
      let yCycle = scene.get('height') / gridCellSize;

      for (let x = 0; x < xCycle; x++) {
        let xMul = x * gridCellSize;

        for (let y = 0; y < yCycle; y++) {
          let yMul = y * gridCellSize;

          let onXCross = !(x % divider) ? true : false;
          let onYCross = !(y % divider) ? true : false;

          addGridSnap(snapElements, xMul, yMul, 10, onXCross && onYCross ? 15 : 10, null);
        }
      }
    }

  })
}
