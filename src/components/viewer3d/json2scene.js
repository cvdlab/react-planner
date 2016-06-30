import Three from 'three';
import createShapeWall from './wall-creator';
import createArea from './area-creator';
import {HELVETIKER} from './helvetiker_regular.typeface.js';


export default function parseData(sceneData) {
  let plan = new Three.Object3D();

  sceneData.layers.forEach(layer => {

    // Import walls
    layer.lines.forEach(line => {

      let holes = [];

      line.holes.forEach(holeID => {
        holes.push(layer.holes.get(holeID));
      });

      let wall = createShapeWall(layer.vertices.get(line.vertices.get(0)),
        layer.vertices.get(line.vertices.get(1)),
        line.height,
        line.thickness, holes, line.id);

      plan.add(wall);
    });

    // Import areas
    layer.areas.forEach(area => {
      let vertices = [];

      area.vertices.forEach(vertexID => {
        vertices.push(layer.vertices.get(vertexID));
      });

      plan.add(createArea(vertices, parseInt(area.patternColor.substring(1), 16)));
    });
  });

  plan.scale.set(-1, 1, 1);

  // Compute bounding box for the plan
  let boundingBox = new Three.Box3().setFromObject(plan);

  // Add a grid to the plan

  let size = Math.sqrt(Math.pow(boundingBox.max.x - boundingBox.min.x, 2) - Math.pow(boundingBox.max.z - boundingBox.min.z, 2));
  let step = sceneData.pixelPerUnit;

  let grid = new Three.Object3D();
  let fontLoader = new Three.FontLoader();
  let font = fontLoader.parse(HELVETIKER); // For measures
  let material;
  let counter = 0;

  for (let i = 0; i <= size * 2; i += 1) {

    if (counter % step == 0 || counter % (step / 5) == 0) {

      let geometry = new Three.Geometry();
      geometry.vertices.push(new Three.Vector3(0, 0, -i));
      geometry.vertices.push(new Three.Vector3(size * 2, 0, -i));

      geometry.vertices.push(new Three.Vector3(i, 0, 0));
      geometry.vertices.push(new Three.Vector3(i, 0, -size * 2));


      if (counter % step == 0) {


        material = new Three.LineBasicMaterial({color: 0x000000});


        let shape = new Three.TextGeometry(counter, {
          size: 16,
          height: 1,
          font: font
        });

        let wrapper = new Three.MeshBasicMaterial({color: 0x000000});
        let words1 = new Three.Mesh(shape, wrapper);
        let words2 = new Three.Mesh(shape, wrapper);

        words1.rotation.x -= Math.PI / 2;
        words2.rotation.x -= Math.PI / 2;

        words1.position.set(-90, 0, -i);
        words2.position.set(i - 20, 0, 50);

        grid.add(words1);
        grid.add(words2);


      } else if (counter % (step / 5) == 0) {
        material = new Three.LineBasicMaterial({color: 0xaaaaaa});
      }
      grid.add(new Three.LineSegments(geometry, material));
    }

    counter++;

  }

  plan.add(grid);

  // Set center of plan in the origin

  let center = [
    (boundingBox.max.x - boundingBox.min.x) / 2 + boundingBox.min.x,
    (boundingBox.max.y - boundingBox.min.y) / 2 + boundingBox.min.y,
    (boundingBox.max.z - boundingBox.min.z) / 2 + boundingBox.min.z];

  plan.position.x -= center[0];
  plan.position.y -= center[1];
  plan.position.z -= center[2];

  return {boundingBox: boundingBox, plan: plan};
}
