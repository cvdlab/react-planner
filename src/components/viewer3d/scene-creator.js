import Three from 'three';
import createShapeWall from './line-creator';
import createArea from './area-creator';
import createGrid from './grid-creator';
import {createSingleWindow} from './window-creator';

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

      let area3D = createArea(vertices,
        parseInt(area.properties.get('patternColor').substring(1), 16),
        area.properties.get('texture'));
      plan.add(area3D);
      sceneGraph.layers[layer.id].areas[area.id] = area3D;


    });


  });

  // Compute bounding box for the plan
  let boundingBox = new Three.Box3().setFromObject(plan);

// Add a grid to the plan

  let grid = createGrid(sceneData.width, sceneData.height, sceneData.pixelPerUnit);

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

export function updateScene(sceneGraph, sceneData, scene, diffArray, editingActions, plan) {

  console.log("Entered in update Scene");

  diffArray.forEach(diff => {
    /* First of all I need to find the object I need to update */
    let modifiedPath = diff.path.split("/");

    console.log(modifiedPath);
    console.log("SceneData?", sceneData[modifiedPath[1]]);

    let layer = sceneData[modifiedPath[1]].get(modifiedPath[2]);

    console.log("layer?", layer.toJS());

    if (modifiedPath.length > 2) {

      switch (modifiedPath[3]) {
        case "layer":
          console.log("It is a layer");
          break;
        case "vertices":
          console.log("It is a vertex");
          break;
        case "lines":
          console.log("Ok it's a line");
          // Now I can replace the changed wall
          let oldLineObject = sceneGraph.layers[layer.id].lines[modifiedPath[4]];
          let newLine = layer.lines.get(modifiedPath[4]);

          let interactFunction = () => {
            return editingActions.selectLine(layer.id, newLine.id)
          };
          console.log("ChangedObject: ", oldLineObject);
          console.log("lineID? ", newLine.id);
          let newLineObject = createWall(layer, newLine, interactFunction);
          plan.remove(oldLineObject); // I HAVE TO REMOVE DOORS AND WINDOWS
          plan.add(newLineObject);
          oldLineObject = newLineObject;
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
    line.properties.get('textureA'),
    line.properties.get('textureB')
  );

  wall.children.forEach(child => {
    child.interact = interactFunction;
  });

  return wall;
}
