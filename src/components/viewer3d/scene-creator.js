import Three from 'three';
import createShapeWall from './line-creator';
import createArea from './area-creator';
import createGrid from './grid-creator';

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

  let grid = createGrid(sceneData.width, sceneData.height, sceneData.pixelPerUnit);
  grid.rotation.z += Math.PI;

  // Set center of plan in the origin

  let center = [
    (boundingBox.max.x - boundingBox.min.x) / 2 + boundingBox.min.x,
    (boundingBox.max.y - boundingBox.min.y) / 2 + boundingBox.min.y,
    (boundingBox.max.z - boundingBox.min.z) / 2 + boundingBox.min.z];

  plan.position.x -= center[0];
  plan.position.y -= center[1];
  plan.position.z -= center[2];

  grid.position.x -= center[0];
  grid.position.y -= center[1];
  grid.position.z -= center[2];


  return {boundingBox: boundingBox, plan: plan, grid: grid};
}
