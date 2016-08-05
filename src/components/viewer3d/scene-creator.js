import Three from 'three';
import createShapeWall from './line-creator';
import createArea from './area-creator';
import createGrid from './grid-creator';

export function parseData(sceneData, editingActions) {

  let sceneGraph = {
    pixelPerUnit: sceneData.pixelPerUnit,
    unit: sceneData.unit,
    layers: {},
    width: sceneData.width,
    height: sceneData.height
  };

  let plan = new Three.Object3D();

  sceneData.layers.forEach(layer => {

    sceneGraph.layers[layer.id] = {
      lines: {},
      holes: {},
      areas: {}
    };

    // Import lines
    layer.lines.forEach(line => {

      let interactFunction = () => {
        return editingActions.selectLine(layer.id, line.id)
      };

      let wall = createWall(layer, line, interactFunction);

      plan.add(wall);
      sceneGraph.layers[layer.id].lines[line.id] = wall;
    });

    // Import areas
    layer.areas.forEach(area => {
      let vertices = [];

      area.vertices.forEach(vertexID => {
        vertices.push(layer.vertices.get(vertexID));
      });

      let area3D = createArea(vertices, parseInt(area.properties.get('patternColor').substring(1), 16));
      plan.add(area3D);
      sceneGraph.layers[layer.id].areas[area.id] = area3D;


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

  return {boundingBox: boundingBox, plan: plan, grid: grid, sceneGraph: sceneGraph};
}

export function updateScene(sceneGraph, sceneData, scene, diffArray, editingActions) {

  diffArray.forEach(diff => {
    /* First of all I need to find the object I need to update */
    let modifiedPath = diff.path.split("/");

    console.log(modifiedPath);
    console.log("SceneData?", sceneData[modifiedPath[1]]);

    let layer = sceneData[modifiedPath[1]].get(modifiedPath[2]);

    let changedObjectType = modifiedPath[3];
    let changedObject = layer[modifiedPath[3]].get(modifiedPath[4]);

    console.log("layer ", layer);
    console.log("changedObjectType ", changedObjectType);
    console.log("changedObject ", changedObject);

    if (modifiedPath.length > 2) {

      switch (modifiedPath[3]) {
        case "layer":
          break;
        case "vertices":
          break;
        case "lines":
          console.log("Ok it's a line");

          let interactFunction = () => {
            return editingActions.selectLine(layer.id, changedObject.id)
          };
          console.log("ChangedObject: ", changedObject);
          console.log("lineID? ", changedObject.id);

          let wall = createWall(layer,
            changedObject, interactFunction());

          console.log("wall? ", wall);
          let graphLayer = sceneGraph[modifiedPath[1]].get([modifiedPath[2]]);
          let oldWall = graphLayer[modifiedPath[3]].get([modifiedPath[4]]);
          console.log(oldWall);
          scene.remove(oldWall);
          scene.add(wall);
          sceneGraph[modifiedPath[1]][modifiedPath[2]][modifiedPath[3]][modifiedPath[4]] = wall;
          break;
      }

    }
  });
  return sceneGraph;
}

function createWall(layer, line, interactFunction) {
  let holes = [];

  line.holes.forEach(holeID => {
    holes.push(layer.holes.get(holeID));
  });

  //createShapeWall(vertex0, vertex1, height, thickness, holes, bevelRadius, isSelected, wall1Texture, wall2Texture)

  let wall = createShapeWall(layer.vertices.get(line.vertices.get(0)),
    layer.vertices.get(line.vertices.get(1)),
    line.properties.get('height'),
    line.properties.get('thickness'),
    holes,
    line.properties.get('thickness'),
    // line.id,
    line.selected,
    'paintedWall',
    'bricks');

  wall.children.forEach(child => {
    child.interact = interactFunction;
  });

  return wall;
}
