import Three from 'three';

import {HELVETIKER} from './libs/helvetiker_regular.typeface.js';

export default function createGrid(sizeX, sizeY, step) {

  let grid = new Three.Object3D();
  let fontLoader = new Three.FontLoader();
  let font = fontLoader.parse(HELVETIKER); // For measures
  let material;
  let counter = 0;

  /* Draw horizontal lines */
  for (let i = 0; i <= sizeY; i += 1) {

    if (counter % step == 0 || counter % (step / 5) == 0) {

      let geometry = new Three.Geometry();
      geometry.vertices.push(new Three.Vector3(0, 0, -i));
      geometry.vertices.push(new Three.Vector3(sizeX, 0, -i));


      if (counter % step == 0) {

        material = new Three.LineBasicMaterial({color: 0x000000});

        let shape = new Three.TextGeometry(counter, {
          size: 16,
          height: 1,
          font: font
        });

        let wrapper = new Three.MeshBasicMaterial({color: 0x000000});
        let words = new Three.Mesh(shape, wrapper);

        words.rotation.x -= Math.PI / 2;
        words.position.set(-90, 0, -i);
        grid.add(words);

      } else if (counter % (step / 5) == 0) {
        material = new Three.LineBasicMaterial({color: 0xaaaaaa});
      }

      grid.add(new Three.LineSegments(geometry, material));
    }

    counter++;
  }

  counter = 0;

  /* Draw vertical lines */
  for (let i = 0; i <= sizeX; i += 1) {

    if (counter % step == 0 || counter % (step / 5) == 0) {

      let geometry = new Three.Geometry();
      geometry.vertices.push(new Three.Vector3(i, 0, 0));
      geometry.vertices.push(new Three.Vector3(i, 0, -sizeY));

      if (counter % step == 0) {

        material = new Three.LineBasicMaterial({color: 0x000000});

        let shape = new Three.TextGeometry(counter, {
          size: 16,
          height: 1,
          font: font
        });

        let wrapper = new Three.MeshBasicMaterial({color: 0x000000});
        let words = new Three.Mesh(shape, wrapper);

        words.rotation.x -= Math.PI / 2;
        words.position.set(i - 20, 0, 50);
        grid.add(words);


      } else if (counter % (step / 5) == 0) {
        material = new Three.LineBasicMaterial({color: 0xaaaaaa});
      }

      grid.add(new Three.LineSegments(geometry, material));
    }

    counter++;

  }
  grid.position.y = -1;
  return grid;
}
