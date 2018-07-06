import * as Three from 'three';
import { List } from 'immutable';
import { COLORS } from '../../../shared-style';

export default function (width, height, grid, font) {
  var step = grid.properties.get('step');
  var colors = grid.properties.has('color') ? new List([grid.properties.get('color')]) : grid.properties.get('colors');

  var streak = new Three.Object3D();
  streak.name = 'streak';
  var counter = 0;

  for (var i = 0; i <= height; i += step) {

    var geometry = new Three.Geometry();
    geometry.vertices.push(new Three.Vector3(0, 0, -i));
    geometry.vertices.push(new Three.Vector3(width, 0, -i));
    var color = colors.get(counter % colors.size);
    var material = new Three.LineBasicMaterial({ color: color });

    if (counter % 5 == 0) {
      var shape = new Three.TextGeometry('' + counter * step, {
        size: 16,
        height: 1,
        font: font
      });

      var wrapper = new Three.MeshBasicMaterial({ color: COLORS.black });
      var words = new Three.Mesh(shape, wrapper);

      words.rotation.x -= Math.PI / 2;
      words.position.set(-90, 0, -i);
      streak.add(words);
    }

    streak.add(new Three.LineSegments(geometry, material));
    counter++;
  }
  return streak;
}