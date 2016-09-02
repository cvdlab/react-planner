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

      let wall = createWall(layer, line, editingActions);

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

export function updateScene(planData, sceneData, scene, diffArray, editingActions) {

  console.log("Entered in update Scene");

  diffArray.forEach(diff => {
    /* First of all I need to find the object I need to update */
    let modifiedPath = diff.path.split("/");

    let layer = sceneData[modifiedPath[1]].get(modifiedPath[2]);

    if (modifiedPath.length > 2) {

      let oldLineObject;
      let newLineData;
      let newLineObject;

      switch (modifiedPath[3]) {
        case "layer":
          console.log("It is a layer");
          break;
        case "vertices":
          console.log("It is a vertex");
          break;
        case "holes":
          let newHoleData = layer.holes.get(modifiedPath[4]);
          console.log(newHoleData.toJS());
          let lineID = newHoleData.line;

          oldLineObject = planData.sceneGraph.layers[layer.id].lines[lineID];
          newLineData = layer.lines.get(lineID);
          newLineObject = replaceLine(layer, oldLineObject, newLineData, editingActions, planData);
          planData.sceneGraph.layers[layer.id].lines[lineID] = newLineObject;

          break;
        case "lines":
          // Now I can replace the wall
          oldLineObject = planData.sceneGraph.layers[layer.id].lines[modifiedPath[4]];
          newLineData = layer.lines.get(modifiedPath[4]);
          newLineObject = replaceLine(layer, oldLineObject, newLineData, editingActions, planData);
          planData.sceneGraph.layers[layer.id].lines[modifiedPath[4]] = newLineObject;
      }
    }
  });
  return planData;
}

function createWall(layer, line, editingActions) {
  let holes = [];

  let lineInteractFunction = () => {
    return editingActions.selectLine(layer.id, line.id)
  };

  line.holes.forEach(holeID => {

    let hole = layer.holes.get(holeID);

    let holeInteractFunction = () => {
      console.log("Clicked!");
      return editingActions.selectHole(layer.id, hole.id)
    };

    if (hole.type === 'windowGeneric') {

    }

    holes.push({holeData: hole, holeInteractFunction});
  });

  let wall = createShapeWall(layer.vertices.get(line.vertices.get(0)),
    layer.vertices.get(line.vertices.get(1)),
    line.properties.get('height'),
    line.properties.get('thickness'),
    holes,
    line.properties.get('thickness'),
    // line.id,
    line.selected,
    line.properties.get('textureA'),
    line.properties.get('textureB'),
    lineInteractFunction
  );

  // wall.children.forEach(child => {
  //   child.interact =
  // });

  return wall;
}

function replaceLine(layer, oldLineObject, newLineData, editingActions, planData) {

  let newLineObject = createWall(layer, newLineData, editingActions);

  // Now I need to translate object to the original coordinates
  let oldBoundingBox = planData.boundingBox;

  let oldCenter = [
    (oldBoundingBox.max.x - oldBoundingBox.min.x) / 2 + oldBoundingBox.min.x,
    (oldBoundingBox.max.y - oldBoundingBox.min.y) / 2 + oldBoundingBox.min.y,
    (oldBoundingBox.max.z - oldBoundingBox.min.z) / 2 + oldBoundingBox.min.z];

  planData.plan.position.x += oldCenter[0];
  planData.plan.position.y += oldCenter[1];
  planData.plan.position.z += oldCenter[2];

  planData.grid.position.x += oldCenter[0];
  planData.grid.position.y += oldCenter[1];
  planData.grid.position.z += oldCenter[2];

  planData.plan.remove(oldLineObject);
  planData.plan.add(newLineObject);

  let newBoundingBox = new Three.Box3().setFromObject(planData.plan);
  let newCenter = [
    (newBoundingBox.max.x - newBoundingBox.min.x) / 2 + newBoundingBox.min.x,
    (newBoundingBox.max.y - newBoundingBox.min.y) / 2 + newBoundingBox.min.y,
    (newBoundingBox.max.z - newBoundingBox.min.z) / 2 + newBoundingBox.min.z];

  planData.plan.position.x -= newCenter[0];
  planData.plan.position.y -= newCenter[1];
  planData.plan.position.z -= newCenter[2];

  planData.grid.position.x -= newCenter[0];
  planData.grid.position.y -= newCenter[1];
  planData.grid.position.z -= newCenter[2];

  return newLineObject;

}
