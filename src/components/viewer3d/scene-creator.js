import Three from 'three';
import createGrid from './grid-creator';

export function parseData(sceneData, editingActions, catalog) {

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
      areas: {},
      items: {},
      visible: layer.visible,
      altitude: layer.altitude
    };

    // Import lines
    layer.lines.forEach(line => {

      let wall = createWall(layer, line, editingActions, catalog);
      plan.add(wall);
      sceneGraph.layers[layer.id].lines[line.id] = wall;
    });

    // Import areas
    layer.areas.forEach(area => {

      area.interactFunction = () => {
        editingActions.selectArea(layer.id, area.id);
      };

      let area3D = catalog.getElement(area.type).render3D(area, layer);
      area3D.position.y += layer.altitude;
      plan.add(area3D);
      sceneGraph.layers[layer.id].areas[area.id] = area3D;
      area3D.visible = layer.visible;
    });

    // Import items
    layer.items.forEach(item => {
      createItem(layer, item, editingActions, sceneGraph, catalog, plan);
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

export function updateScene(planData, sceneData, diffArray, editingActions, catalog) {

  diffArray.forEach(diff => {
    /* First of all I need to find the object I need to update */
    let modifiedPath = diff.path.split("/");

    if (modifiedPath[1] === "layers") {

      let layer = sceneData[modifiedPath[1]].get(modifiedPath[2]);

      if (modifiedPath.length > 2) {

        let oldLineObject;
        let newLineData;
        let newLineObject;

        let oldAreaObject;
        let newAreaData;
        let newAreaObject;

        let oldItemObject;
        let newItemData;

        switch (modifiedPath[3]) {
          case "layer":
            break;
          case "vertices":
            break;
          case "holes":
            let newHoleData = layer.holes.get(modifiedPath[4]);
            let lineID = newHoleData.line;

            oldLineObject = planData.sceneGraph.layers[layer.id].lines[lineID];
            newLineData = layer.lines.get(lineID);
            newLineObject = replaceLine(layer, oldLineObject, newLineData, editingActions, planData, layer.visible, catalog);
            planData.sceneGraph.layers[layer.id].lines[lineID] = newLineObject;

            break;
          case "lines":
            // Now I can replace the wall
            oldLineObject = planData.sceneGraph.layers[layer.id].lines[modifiedPath[4]];
            newLineData = layer.lines.get(modifiedPath[4]);
            newLineObject = replaceLine(layer, oldLineObject, newLineData, editingActions, planData, layer.visible, catalog);
            planData.sceneGraph.layers[layer.id].lines[modifiedPath[4]] = newLineObject;
            break;
          case "areas":
            oldAreaObject = planData.sceneGraph.layers[layer.id].areas[modifiedPath[4]];
            newAreaData = layer.areas.get(modifiedPath[4]);
            newAreaObject = replaceArea(layer, oldAreaObject, newAreaData, editingActions, planData, layer.visible, catalog);
            newAreaObject.visible = layer.visible;
            planData.sceneGraph.layers[layer.id].areas[modifiedPath[4]] = newAreaObject;
            break;
          case "items":
            oldItemObject = planData.sceneGraph.layers[layer.id].items[modifiedPath[4]];
            newItemData = layer.items.get(modifiedPath[4]);
            replaceItem(layer, oldItemObject, newItemData, editingActions, planData, catalog);
            break;

          case "visible":
            let layerGraph = planData.sceneGraph.layers[layer.id];
            layerGraph.visible = layer.visible;
            for (let lineID in layerGraph.lines) {
              layerGraph.lines[lineID].visible = layer.visible;
            }

            for (let areaID in layerGraph.areas) {
              layerGraph.areas[areaID].visible = layer.visible;
            }
            break;
        }
      }
    }
  });
  return planData;
}

function createWall(layer, line, editingActions, catalog) {
  line.editingActions = editingActions;

  let vertex0 = layer.vertices.get(line.vertices.get(0));
  let vertex1 = layer.vertices.get(line.vertices.get(1));

  if (vertex0.x > vertex1.x) {
    let app = vertex0;
    vertex0 = vertex1;
    vertex1 = app;
  }

  let wall = catalog.getElement(line.type).render3D(line, layer);

  let distance = Math.sqrt(Math.pow(vertex0.x - vertex1.x, 2) + Math.pow(vertex0.y - vertex1.y, 2));

  wall.position.x += vertex0.x;
  wall.position.y += layer.altitude;
  wall.position.z -= vertex0.y;

  wall.visible = layer.visible;

  return wall;
}

function replaceLine(layer, oldLineObject, newLineData, editingActions, planData, isVisible, catalog) {

  let newLineObject = createWall(layer, newLineData, editingActions, catalog);

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

function replaceArea(layer, oldAreaObject, newAreaData, editingActions, planData, isVisible, catalog) {

  newAreaData.interactFunction = () => {
    editingActions.selectArea(layer.id, newAreaData.id);
  };

  let newAreaObject = catalog.getElement(newAreaData.type).render3D(newAreaData, layer);

  newAreaObject.position.y += layer.altitude;

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

  planData.plan.remove(oldAreaObject);
  planData.plan.add(newAreaObject);

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

  newAreaObject.visible = isVisible;

  return newAreaObject;

}

function createItem(layer, item, editingActions, sceneGraph, catalog, plan) {
  let item3DPromise = catalog.getElement(item.type).render3D(item, layer);

  item3DPromise.then(item3D => {

    let boundingBox = new Three.Box3().setFromObject(item3D);

    let initialWidth = boundingBox.max.x - boundingBox.min.x;
    let initialHeight = boundingBox.max.y - boundingBox.min.y;
    let initialThickness = boundingBox.max.z - boundingBox.min.z;

    item3D.scale.set(item.width / initialWidth, 1, item.height / initialThickness);

    let center = [
      (boundingBox.max.x - boundingBox.min.x) / 2 + boundingBox.min.x,
      (boundingBox.max.y - boundingBox.min.y) / 2 + boundingBox.min.y,
      (boundingBox.max.z - boundingBox.min.z) / 2 + boundingBox.min.z];

    item3D.position.x += center[0] + item.x;
    item3D.position.z -= center[2] + item.y;

    // Apply interact function to children of an Object3D
    let applyInteract = (object, interactFunction) => {
      object.traverse(function (child) {
        if (child instanceof Three.Mesh) {
          child.interact = interactFunction;
        }
      });
    };

    applyInteract(item3D, () => {
        editingActions.selectItem(layer.id, item.id);
      }
    );

    plan.add(item3D);
    sceneGraph.layers[layer.id].items[item.id] = item3D;

  });
}


function replaceItem(layer, oldItemObject, newItemData, editingActions, planData, catalog) {

  planData.plan.remove(oldItemObject);


  let item3DPromise = catalog.getElement(newItemData.type).render3D(newItemData, layer);

  item3DPromise.then(item3D => {

    let boundingBox = new Three.Box3().setFromObject(item3D);

    let initialWidth = boundingBox.max.x - boundingBox.min.x;
    let initialHeight = boundingBox.max.y - boundingBox.min.y;
    let initialThickness = boundingBox.max.z - boundingBox.min.z;

    item3D.scale.set(newItemData.width / initialWidth, 1, newItemData.height / initialThickness);

    let center = [
      (boundingBox.max.x - boundingBox.min.x) / 2 + boundingBox.min.x,
      (boundingBox.max.y - boundingBox.min.y) / 2 + boundingBox.min.y,
      (boundingBox.max.z - boundingBox.min.z) / 2 + boundingBox.min.z];

    item3D.position.x += center[0] + newItemData.x;
    item3D.position.z -= center[2] + newItemData.y;

    // Apply interact function to children of an Object3D
    let applyInteract = (object, interactFunction) => {
      object.traverse(function (child) {
        if (child instanceof Three.Mesh) {
          child.interact = interactFunction;
        }
      });
    };

    applyInteract(item3D, () => {
        editingActions.selectItem(layer.id, newItemData.id);
      }
    );

    planData.plan.add(item3D);
    planData.sceneGraph.layers[layer.id].items[newItemData.id] = item3D;

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

  });
}
