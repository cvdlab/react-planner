import {
  SNAP_POINT,
  SNAP_LINE,
  SNAP_SEGMENT,
  SNAP_GRID,
  SNAP_GUIDE,
  addPointSnap,
  addLineSnap,
  addLineSegmentSnap,
  addGridSnap
} from './snap';
import { GeometryUtils } from './export';
import { Map, List } from 'immutable';

export function sceneSnapElements(scene: any, snapElements: any = new List(), snapMask: any = new Map()) {

  let { width, height } = scene;

  let a, b, c;
  return snapElements.withMutations((snapElements: any) => {
    scene.layers.forEach((layer: any) => {

      let { lines, vertices } = layer;

      vertices.forEach(({ id: vertexID, x, y }: any) => {

        if (snapMask.get(SNAP_POINT)) {
          addPointSnap(snapElements, x, y, 10, 10, vertexID);
        }

        if (snapMask.get(SNAP_LINE)) {
          ({ a, b, c } = GeometryUtils.horizontalLine(y));
          addLineSnap(snapElements, a, b, c, 10, 1, vertexID);
          ({ a, b, c } = GeometryUtils.verticalLine(x));
          addLineSnap(snapElements, a, b, c, 10, 1, vertexID);
        }

      });

      if (snapMask.get(SNAP_SEGMENT)) {
        lines.forEach(({ id: lineID, vertices: [v0, v1] }: any) => {
          let { x: x1, y: y1 } = vertices.get(v0);
          let { x: x2, y: y2 } = vertices.get(v1);

          addLineSegmentSnap(snapElements, x1, y1, x2, y2, 20, 1, lineID);
        });
      }

    });

    if (snapMask.get(SNAP_GRID)) {
      let divider = 5;
      let gridCellSize = 100 / divider;
      let xCycle = width / gridCellSize;
      let yCycle = height / gridCellSize;

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

    if (snapMask.get(SNAP_GUIDE)) {

      let horizontal = scene.getIn(['guides', 'horizontal']);
      let vertical = scene.getIn(['guides', 'vertical']);

      let hValues = horizontal.valueSeq();
      let vValues = vertical.valueSeq();

      hValues.forEach((hVal: any) => {
        vValues.forEach((vVal: any) => {
          addPointSnap(snapElements, vVal, hVal, 10, 10);
        });
      });

      hValues.forEach((hVal: any) => addLineSegmentSnap(snapElements, 0, hVal, width, hVal, 20, 1));
      vValues.forEach((vVal: any) => addLineSegmentSnap(snapElements, vVal, 0, vVal, height, 20, 1));

    }

  });
}
