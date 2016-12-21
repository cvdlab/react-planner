import * as Three from 'three';
import { HELVETIKER } from '../libs/helvetiker_regular.typeface.js';
import { List } from 'immutable';

export default function (width, height, guide) {
  var step = guide.properties.get('step');
  var colors = void 0;

  if (guide.properties.has('color')) {
    colors = new List([guide.properties.get('color')]);
  } else {
    colors = guide.properties.get('colors');
  }

  var fontLoader = new Three.FontLoader();
  var font = fontLoader.parse(HELVETIKER); // For measures
  var streak = new Three.Object3D();

  var counter = 0;

  for (var i = 0; i <= width; i += step) {

    var geometry = new Three.Geometry();
    geometry.vertices.push(new Three.Vector3(i, 0, 0));
    geometry.vertices.push(new Three.Vector3(i, 0, -height));
    var color = colors.get(counter % colors.size);
    var material = new Three.LineBasicMaterial({ color: color });

    if (counter % 5 == 0) {
      var shape = new Three.TextGeometry(counter * step, {
        size: 16,
        height: 1,
        font: font
      });

      var wrapper = new Three.MeshBasicMaterial({ color: 0x000000 });
      var words = new Three.Mesh(shape, wrapper);

      words.rotation.x -= Math.PI / 2;
      words.position.set(i - 20, 0, 50);
      streak.add(words);
    }

    streak.add(new Three.LineSegments(geometry, material));
    counter++;
  }
  return streak;
}