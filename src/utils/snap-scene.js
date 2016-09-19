import {nearestSnap, addPointSnap, addLineSnap, addLineSegmentSnap} from './snap';
import * as Geometry from './geometry';
import {List} from 'immutable';

export function sceneSnapElements(scene, snapElements = new List()) {
  let a, b, c;
  return snapElements.withMutations(snapElements => {
    scene.layers.forEach(layer => {
      let {lines, vertices}  = layer;
      vertices.forEach(({id: vertexID, x, y}) => {
        addPointSnap(snapElements, x, y, 10, 10, vertexID);

        ({a, b, c} = Geometry.horizontalLine(y));
        addLineSnap(snapElements, a, b, c, 10, 1, vertexID);
        ({a, b, c} = Geometry.verticalLine(x));
        addLineSnap(snapElements, a, b, c, 10, 1, vertexID);
      });

      lines.forEach(({id: lineID, vertices: [v0, v1]}) => {
        let {x: x1, y: y1} = vertices.get(v0);
        let {x: x2, y:y2} = vertices.get(v1);

        addLineSegmentSnap(snapElements, x1, y1, x2, y2, 20, 1, lineID);
      })
    });
  })
}
