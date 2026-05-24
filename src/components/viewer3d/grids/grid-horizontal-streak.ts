import * as Three from 'three';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { List } from 'immutable';
import { COLORS } from '../../../shared-style';

export default function (width: number, height: number, grid: any, font: any) {
  let step = grid.properties.get('step');
  let colors = grid.properties.has('color') ? new List([grid.properties.get('color')]) : grid.properties.get('colors');

  let streak = new Three.Object3D();
  streak.name = 'streak';
  let counter = 0;

  for (let i = 0; i <= height; i += step) {

    let geometry = new Three.BufferGeometry().setFromPoints([
      new Three.Vector3(0, 0, -i),
      new Three.Vector3(width, 0, -i),
    ]);
    let color = colors.get(counter % colors.size);
    let material = new Three.LineBasicMaterial({ color });

    if (counter % 5 == 0) {
      let shape = new TextGeometry(('' + (counter * step)), {
        size: 16,
        depth: 1, // r163 renamed `height` → `depth`; default is 50, hence the thick numbers.
        font
      });

      let wrapper = new Three.MeshBasicMaterial({ color: COLORS.black });
      let words = new Three.Mesh(shape, wrapper);

      words.rotation.x -= Math.PI / 2;
      words.position.set(-90, 0, -i);
      streak.add(words);
    }

    streak.add(new Three.LineSegments(geometry, material));
    counter++;
  }
  return streak;
}
