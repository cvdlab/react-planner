import * as Three from 'three';
import {HELVETIKER} from '../libs/helvetiker_regular.typeface.js';
import {List} from 'immutable';

export default function (width, height, guide) {
  let step = guide.properties.get('step');
  let colors;

  if (guide.properties.has('color')) {
    colors = new List([guide.properties.get('color')]);
  } else {
    colors = guide.properties.get('colors');
  }

  let fontLoader = new Three.FontLoader();
  let font = fontLoader.parse(HELVETIKER); // For measures
  let streak = new Three.Object3D();
  let counter = 0;

  for (let i = 0; i <= height; i += step) {

    let geometry = new Three.Geometry();
    geometry.vertices.push(new Three.Vector3(0, 0, -i));
    geometry.vertices.push(new Three.Vector3(width, 0, -i));
    let color = colors.get(counter % colors.size);
    let material = new Three.LineBasicMaterial({color});

    if (counter % 5 == 0) {
      let shape = new Three.TextGeometry(counter * step, {
        size: 16,
        height: 1,
        font: font
      });

      let wrapper = new Three.MeshBasicMaterial({color: 0x000000});
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
