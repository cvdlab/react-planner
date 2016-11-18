import * as Three from 'three';
import createGrid from './grid-creator';
import {disposeObject} from './three-memory-cleaner';

export function parseData(sceneData, editingActions, catalog) {

  let planData = {};

  planData.sceneGraph = {
    unit: sceneData.unit,
    layers: {},
    width: sceneData.width,
    height: sceneData.height
  };

  planData.plan = new Three.Object3D();

  // Add a grid to the plan
  planData.grid = createGrid(sceneData);
  planData.boundingBox = new Three.Box3().setFromObject(planData.grid);
  let promises = [];

  sceneData.layers.forEach(layer => {

    if (layer.id === sceneData.selectedLayer || layer.visible) {
      promises = promises.concat(createLayerObjects(layer, planData, sceneData, editingActions, catalog));
    }
  });

  Promise.all(promises).then(value => {
    updateBoundingBox(planData);
  });

  return planData;
}

function createLayerObjects(layer, planData, sceneData, editingActions, catalog) {

  let promises = [];

  planData.sceneGraph.layers[layer.id] = {
    lines: {},
    holes: {},
    areas: {},
    items: {},
    visible: layer.visible,
    altitude: layer.altitude
  };

  // Import lines
  layer.lines.forEach(line => {
    promises.push(addLine(sceneData, planData, layer, line.id, catalog, editingActions));
    line.holes.forEach(holeID => {
      promises.push(addHole(sceneData, planData, layer, holeID, catalog, editingActions));
    })
  });

  // Import areas
  layer.areas.forEach(area => {
    promises.push(addArea(sceneData, planData, layer, area.id, catalog, editingActions));
  });

  // Import items
  layer.items.forEach(item => {
    promises.push(addItem(sceneData, planData, layer, item.id, catalog, editingActions));
  });

  return promises;
}

export function updateScene(planData, sceneData, oldSceneData, diffArray, editingActions, catalog) {

  minimizeChangePropertiesDiffs(diffArray).forEach(diff => {

    /* First of all I need to find the object I need to update */
    let modifiedPath = diff.path.split("/");

    if (modifiedPath[1] === "layers") {

      let layer = sceneData[modifiedPath[1]].get(modifiedPath[2]);

      if (modifiedPath.length > 2) {

        switch (diff.op) {
          case 'replace':
            replaceObject(modifiedPath, layer, planData, editingActions, sceneData, oldSceneData, catalog);
            break;
          case 'add':
            addObject(modifiedPath, layer, planData, editingActions, sceneData, oldSceneData, catalog);
            break;
          case 'remove':
            removeObject(modifiedPath, layer, planData, editingActions, sceneData, oldSceneData, catalog);
            break;
        }
      }
    } else if (modifiedPath[1] === 'selectedLayer') {
      let layerSelectedID = diff.value;
      // First of all I check if the new selected layer is not visible
      if (!sceneData.layers.get(layerSelectedID).visible) {
        // I need to create the objects for this layer
        let promises = createLayerObjects(sceneData.layers.get(layerSelectedID), planData, sceneData, editingActions, catalog)
        Promise.all(promises).then(values => {
          updateBoundingBox(planData);
        })
      }
      
      // Now I have to ckeck the old selectedLayer
      let oldLayerSelectedID = oldSceneData.selectedLayer;
      // First of all I check if the new selected layer is not visible
      if (!sceneData.layers.get(oldLayerSelectedID).visible) {
        // I need to remove the objects for this layer
        let layerGraph = planData.sceneGraph.layers[oldLayerSelectedID];

        for (let lineID in layerGraph.lines) {
          removeLine(planData, sceneData.layers.get(oldLayerSelectedID), lineID);
        }

        for (let areaID in layerGraph.areas) {
          removeArea(planData, sceneData.layers.get(oldLayerSelectedID), areaID);
        }

        for (let itemID in layerGraph.items) {
          removeItem(planData, sceneData.layers.get(oldLayerSelectedID), itemID);
        }

        for (let holeID in layerGraph.holes) {
          removeHole(planData, sceneData.layers.get(oldLayerSelectedID), holeID);
        }
      }
    }
  });
  return planData;
}

function replaceObject(modifiedPath, layer, planData, editingActions, sceneData, oldSceneData, catalog) {

  let promises = [];

  switch (modifiedPath[3]) {
    case "layer":
      break;
    case "vertices":
      break;
    case "holes":
      let newHoleData = layer.holes.get(modifiedPath[4]);
      let lineID = newHoleData.line;
      if (modifiedPath[5] === 'selected') {
        // I remove only the hole without removing the wall
        removeHole(planData, layer, newHoleData.id);
        promises.push(addHole(sceneData, planData, layer, newHoleData.id, catalog, editingActions));
      } else {
        layer.lines.get(lineID).holes.forEach(holeID => {
          removeHole(planData, layer, holeID);
        });
        removeLine(planData, layer, lineID);
        promises.push(addLine(sceneData, planData, layer, lineID, catalog, editingActions));
        layer.lines.get(lineID).holes.forEach(holeID => {
          promises.push(addHole(sceneData, planData, layer, holeID, catalog, editingActions));
        });
      }
      break;
    case "lines":
      removeLine(planData, layer, modifiedPath[4]);
      promises.push(addLine(sceneData, planData, layer, modifiedPath[4], catalog, editingActions));
      break;
    case "areas":
      removeArea(planData, layer, modifiedPath[4]);
      promises.push(addArea(sceneData, planData, layer, modifiedPath[4], catalog, editingActions));
      break;
    case "items":
      removeItem(planData, layer, modifiedPath[4]);
      promises.push(addItem(sceneData, planData, layer, modifiedPath[4], catalog, editingActions));
      break;

    case "visible":
      if (!layer.visible) {
        let layerGraph = planData.sceneGraph.layers[layer.id];

        for (let lineID in layerGraph.lines) {
          removeLine(planData, layer, lineID);
        }

        for (let areaID in layerGraph.areas) {
          removeArea(planData, layer, areaID);
        }

        for (let itemID in layerGraph.items) {
          removeItem(planData, layer, itemID);
        }

        for (let holeID in layerGraph.holes) {
          removeHole(planData, layer, holeID);
        }

      } else {
        promises = promises.concat(createLayerObjects(layer, planData, sceneData, editingActions, catalog))
      }

      break;
  }
  Promise.all(promises).then(values => {
    updateBoundingBox(planData);
  })
}

function removeObject(modifiedPath, layer, planData, editingActions, sceneData, oldSceneData, catalog) {

  let promises = [];
  switch (modifiedPath[3]) {
    case "lines":
      // Here I remove the line with all its holes
      let lineID = modifiedPath[4];
      let oldLayer = oldSceneData.layers.get(layer.id);
      oldLayer.lines.get(lineID).holes.forEach(holeID => {
        removeHole(planData, layer, holeID);
      });
      removeLine(planData, layer, lineID);
      if (modifiedPath.length > 5) {
        // I removed an hole, so I should add the new line
        promises.push(addLine(sceneData, planData, layer, lineID, catalog, editingActions));
        layer.lines.get(lineID).holes.forEach(holeID => {
          promises.push(addHole(sceneData, planData, layer, holeID, catalog, editingActions));
        });
      }
      break;
    case "areas":
      if (modifiedPath.length === 5) {
        // I am removing an entire area
        removeArea(planData, layer, modifiedPath[4]);
      }
      break;
    case "items":
      if (modifiedPath.length === 5) {
        // I am removing an item
        removeItem(planData, layer, modifiedPath[4]);
      }
      break;
  }

  Promise.all(promises).then(values => {
    updateBoundingBox(planData);
  })
}

function removeHole(planData, layer, holeToRemoveID) {
  let holeToRemove = planData.sceneGraph.layers[layer.id].holes[holeToRemoveID];
  planData.plan.remove(holeToRemove);
  disposeObject(holeToRemove);
  delete planData.sceneGraph.layers[layer.id].holes[holeToRemoveID];
  holeToRemove = null;
  updateBoundingBox(planData);
}

function removeLine(planData, layer, lineID) {
  let line3D = planData.sceneGraph.layers[layer.id].lines[lineID];
  planData.plan.remove(line3D);
  disposeObject(line3D);
  delete planData.sceneGraph.layers[layer.id].lines[lineID];
  line3D = null;
  updateBoundingBox(planData);
}

function removeArea(planData, layer, areaID) {
  let area3D = planData.sceneGraph.layers[layer.id].areas[areaID];
  planData.plan.remove(area3D);
  disposeObject(area3D);
  delete planData.sceneGraph.layers[layer.id].areas[areaID];
  area3D = null;
  updateBoundingBox(planData);
}

function removeItem(planData, layer, itemID) {
  let item3D = planData.sceneGraph.layers[layer.id].items[itemID];
  planData.plan.remove(item3D);
  disposeObject(item3D);
  delete planData.sceneGraph.layers[layer.id].items[itemID];
  item3D = null;
  updateBoundingBox(planData);
}

function addObject(modifiedPath, layer, planData, editingActions, sceneData, oldSceneData, catalog) {

  let promises = [];
  switch (modifiedPath[3]) {
    case "lines":
      if (modifiedPath.length === 5) {
        // I have to add a line
        promises.push(addLine(sceneData, planData, layer, modifiedPath[4], catalog, editingActions));
      }
      break;
    case "areas":
      if (modifiedPath.length === 5) {
        // I have to add an area
        promises.push(addArea(sceneData, planData, layer, modifiedPath[4], catalog, editingActions));
      }
      break;
    case "items":
      if (modifiedPath.length === 5) {
        // I have to add an area
        promises.push(addItem(sceneData, planData, layer, modifiedPath[4], catalog, editingActions));
      }
      break;
  }

  Promise.all(promises).then(values => {
    updateBoundingBox(planData);
  })
}

function addHole(sceneData, planData, layer, holeID, catalog, editingActions) {
  let holeData = layer.holes.get(holeID);

  // Create the hole object
  return catalog.getElement(holeData.type).render3D(holeData, layer, sceneData).then(object => {

    let pivot = new Three.Object3D();
    pivot.add(object);

    let line = layer.lines.get(holeData.line);

    // First of all I need to find the vertices of this line
    let vertex0 = layer.vertices.get(line.vertices.get(0));
    let vertex1 = layer.vertices.get(line.vertices.get(1));

    if (vertex0.x > vertex1.x) {
      let app = vertex0;
      vertex0 = vertex1;
      vertex1 = app;
    }

    let distance = Math.sqrt(Math.pow(vertex0.x - vertex1.x, 2) + Math.pow(vertex0.y - vertex1.y, 2));
    let alpha = Math.asin((vertex1.y - vertex0.y) / distance);

    let boundingBox = new Three.Box3().setFromObject(pivot);
    let center = [
      (boundingBox.max.x - boundingBox.min.x) / 2 + boundingBox.min.x,
      (boundingBox.max.y - boundingBox.min.y) / 2 + boundingBox.min.y,
      (boundingBox.max.z - boundingBox.min.z) / 2 + boundingBox.min.z];

    let holeAltitude = holeData.properties.get('altitude').get('length');

    let holeHeight = holeData.properties.get('height').get('length');

    pivot.rotation.y = alpha;
    pivot.position.x = vertex0.x + distance * holeData.offset * Math.cos(alpha) - center[2] * Math.sin(alpha);
    pivot.position.y = holeAltitude + holeHeight / 2 - center[1];
    pivot.position.z = -vertex0.y - distance * holeData.offset * Math.sin(alpha) - center[2] * Math.cos(alpha);

    planData.plan.add(pivot);
    planData.sceneGraph.layers[layer.id].holes[holeData.id] = pivot;

    applyInteract(pivot, () => {
      return editingActions.selectHole(layer.id, holeData.id)
    });

  });
}

function addLine(sceneData, planData, layer, lineID, catalog, editingActions) {
  let line = layer.lines.get(lineID);

  // First of all I need to find the vertices of this line
  let vertex0 = layer.vertices.get(line.vertices.get(0));
  let vertex1 = layer.vertices.get(line.vertices.get(1));

  if (vertex0.x > vertex1.x) {
    let app = vertex0;
    vertex0 = vertex1;
    vertex1 = app;
  }

  return catalog.getElement(line.type).render3D(line, layer, sceneData).then(line3D => {

    let pivot = new Three.Object3D();
    pivot.add(line3D);

    pivot.position.x = vertex0.x;
    pivot.position.y = layer.altitude;
    pivot.position.z = -vertex0.y;

    planData.plan.add(pivot);
    planData.sceneGraph.layers[layer.id].lines[lineID] = pivot;

    applyInteract(pivot, () => {
      return editingActions.selectLine(layer.id, line.id);
    });

  });
}

function addArea(sceneData, planData, layer, areaID, catalog, editingActions) {
  let area = layer.areas.get(areaID);
  let interactFunction = () => {
    editingActions.selectArea(layer.id, area.id);
  };

  return catalog.getElement(area.type).render3D(area, layer, sceneData).then(area3D => {
    let pivot = new Three.Object3D();
    pivot.add(area3D);
    pivot.position.y = layer.altitude;
    planData.plan.add(pivot);
    planData.sceneGraph.layers[layer.id].areas[area.id] = pivot;

    applyInteract(pivot, interactFunction);

  });
}

function addItem(sceneData, planData, layer, itemID, catalog, editingActions) {
  let item = layer.items.get(itemID);

  return catalog.getElement(item.type).render3D(item, layer, sceneData).then(item3D => {

    let pivot = new Three.Object3D();
    pivot.add(item3D);

    pivot.rotation.y = item.rotation * Math.PI / 180;
    pivot.position.x = item.x;
    pivot.position.z = -item.y;

    applyInteract(item3D, () => {
        editingActions.selectItem(layer.id, item.id);
      }
    );

    planData.plan.add(pivot);
    planData.sceneGraph.layers[layer.id].items[item.id] = pivot;
  });

}

// Apply interact function to children of an Object3D
function applyInteract(object, interactFunction) {
  object.traverse(function (child) {
    if (child instanceof Three.Mesh) {
      child.interact = interactFunction;
    }
  });
}

function updateBoundingBox(planData) {
  let newBoundingBox = new Three.Box3().setFromObject(planData.plan);

  if (isFinite(newBoundingBox.max.x)
    || isFinite(newBoundingBox.min.x)
    || isFinite(newBoundingBox.max.y)
    || isFinite(newBoundingBox.min.y)
    || isFinite(newBoundingBox.max.z)
    || isFinite(newBoundingBox.min.z)) {

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

    planData.boundingBox = newBoundingBox;
  }
}

/**
 * Reduces the number of change properties diffs
 * @param diffArray the array of the diffs
 * @returns {Array}
 */
function minimizeChangePropertiesDiffs(diffArray) {

  let minimizedDiffs = [];

  let propertiesDiffs = [];

  // Find all diffs for a changed property
  diffArray.forEach(currentDiff => {
    let splittedDiff = currentDiff.path.split("/");
    if (splittedDiff[5] === 'properties') {
      propertiesDiffs.push([currentDiff, splittedDiff[4]]);
    } else {
      minimizedDiffs.push(currentDiff);
    }

  });

  let sortedPropertiesDiffs = propertiesDiffs.sort((a, b) => {
    return a[1] < b[1];
  });

  for (let i = 0; i < sortedPropertiesDiffs.length; i++) {
    minimizedDiffs.push(sortedPropertiesDiffs[0][0]);
    let futureIndex = i + 1;
    while (futureIndex < sortedPropertiesDiffs.length && sortedPropertiesDiffs[i][1] === sortedPropertiesDiffs[futureIndex][1]) {
      futureIndex++;
    }
    i = futureIndex - 1;
  }

  return minimizedDiffs;
}
