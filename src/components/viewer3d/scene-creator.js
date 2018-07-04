import * as Three from 'three';
import createGrid from './grid-creator';
import { disposeObject } from './three-memory-cleaner';

export function parseData(sceneData, actions, catalog) {

  let planData = {};

  planData.sceneGraph = {
    unit: sceneData.unit,
    layers: {},
    busyResources: { layers: {} },
    width: sceneData.width,
    height: sceneData.height,
    LODs: {}
  };

  planData.plan = new Three.Object3D();
  planData.plan.name = 'plan';

  // Add a grid to the plan
  planData.grid = createGrid(sceneData);
  planData.grid.name = 'grid';

  planData.boundingBox = new Three.Box3().setFromObject(planData.grid);
  planData.boundingBox.name = 'boundingBox';

  let promises = [];

  sceneData.layers.forEach(layer => {

    if (layer.id === sceneData.selectedLayer || layer.visible) {
      promises = promises.concat(createLayerObjects(layer, planData, sceneData, actions, catalog));
    }
  });

  Promise.all(promises).then(value => updateBoundingBox(planData));

  return planData;
}

function createLayerObjects(layer, planData, sceneData, actions, catalog) {

  let promises = [];

  planData.sceneGraph.layers[layer.id] = {
    id: layer.id,
    lines: {},
    holes: {},
    areas: {},
    items: {},
    visible: layer.visible,
    altitude: layer.altitude
  };

  planData.sceneGraph.busyResources.layers[layer.id] = {
    id: layer.id,
    lines: {},
    holes: {},
    areas: {},
    items: {}
  };

  // Import lines
  layer.lines.forEach(line => {
    promises.push(addLine(sceneData, planData, layer, line.id, catalog, actions.linesActions));
    line.holes.forEach(holeID => {
      promises.push(addHole(sceneData, planData, layer, holeID, catalog, actions.holesActions));
    });
  });

  // Import areas
  layer.areas.forEach(area => {
    promises.push(addArea(sceneData, planData, layer, area.id, catalog, actions.areaActions));
  });

  // Import items
  layer.items.forEach(item => {
    promises.push(addItem(sceneData, planData, layer, item.id, catalog, actions.itemsActions));
  });

  return promises;
}

export function updateScene(planData, sceneData, oldSceneData, diffArray, actions, catalog) {

  let splitted = diffArray.map( el => { return { op: el.op, path: el.path.split('/'), value: el.value }; } );
  let filteredDiffs = filterDiffs(splitted, sceneData, oldSceneData);

  //***testing additional filter***
  filteredDiffs = filteredDiffs.filter( ({path}) => path[3] !== 'selected' );
  filteredDiffs = filteredDiffs.filter( ({path}) => path[1] !== 'groups' );
  //*******************************

  filteredDiffs.forEach(({op, path, value}) => {
    /* First of all I need to find the object I need to update */
    if (path[1] === 'layers') {

      let layer = sceneData.getIn(['layers', path[2]]);

      if (path.length === 3 && op === 'remove') {
        removeLayer(path[2], planData);
      } else if (path.length > 3) {
        switch (op) {
          case 'replace':
            replaceObject(path, layer, planData, actions, sceneData, oldSceneData, catalog);
            break;
          case 'add':
            addObject(path, layer, planData, actions, sceneData, oldSceneData, catalog);
            break;
          case 'remove':
            removeObject(path, layer, planData, actions, sceneData, oldSceneData, catalog);
            break;
        }
      }
    } else if (path[1] === 'selectedLayer') {
      let layerSelectedID = value;
      let layerSelected = sceneData.getIn(['layers', layerSelectedID]);
      // First of all I check if the new selected layer is not visible
      if (!layerSelected.visible) {
        // I need to create the objects for this layer
        let promises = createLayerObjects(layerSelected, planData, sceneData, actions, catalog);
        Promise.all(promises).then(() => updateBoundingBox(planData));
      }

      let layerGraph = planData.sceneGraph.layers[oldSceneData.selectedLayer];

      if (layerGraph) {
        if (!layerGraph.visible) {
          // I need to remove the objects for this layer
          for (let lineID in layerGraph.lines) removeLine(planData, layerGraph.id, lineID);
          for (let areaID in layerGraph.areas) removeArea(planData, layerGraph.id, areaID);
          for (let itemID in layerGraph.items) removeItem(planData, layerGraph.id, itemID);
          for (let holeID in layerGraph.holes) removeHole(planData, layerGraph.id, holeID);
        }
      }
    }
  });
  return planData;
}

function replaceObject(modifiedPath, layer, planData, actions, sceneData, oldSceneData, catalog) {

  let promises = [];

  switch (modifiedPath[3]) {
    case 'vertices':
      if (modifiedPath[5] !== 'selected') {
        let vertex = layer.getIn(['vertices', modifiedPath[4]]);

        if (modifiedPath[5] === 'x' || modifiedPath[5] === 'y') {
          vertex.lines.forEach(lineID => {
            let lineHoles = oldSceneData.getIn(['layers',layer.id, 'lines', lineID, 'holes' ]);
            if( lineHoles ) lineHoles.forEach(holeID => { replaceObject([0, 0, 0, 'holes', holeID, 'selected'], layer, planData, actions, sceneData, oldSceneData, catalog); });
            return replaceObject([0, 0, 0, 'lines', lineID], layer, planData, actions, sceneData, oldSceneData, catalog);
          });
          vertex.areas.forEach(areaID => replaceObject([0, 0, 0, 'areas', areaID], layer, planData, actions, sceneData, oldSceneData, catalog));
        }

        if (modifiedPath[5] === 'areas') {
          let areaID = vertex.getIn(['areas', ~~modifiedPath[6]]);
          replaceObject([0, 0, 0, 'areas', areaID], layer, planData, actions, sceneData, oldSceneData, catalog);
        }
      }
      break;
    case 'holes':
      let newHoleData = layer.getIn(['holes', modifiedPath[4]]);

      if (catalog.getElement(newHoleData.type).updateRender3D) {
        promises.push(
          updateHole(
            sceneData,
            oldSceneData,
            planData,
            layer,
            modifiedPath[4],
            modifiedPath.slice(5),
            catalog,
            actions.holesActions,
            () => removeHole(planData, layer.id, newHoleData.id),
            () => addHole(sceneData, planData, layer, newHoleData.id, catalog, actions.holesActions)
          )
        );
      }
      else {
        let lineID = newHoleData.line;
        if (modifiedPath[5] === 'selected') {
          // I remove only the hole without removing the wall
          removeHole(planData, layer.id, newHoleData.id);
          promises.push(addHole(sceneData, planData, layer, newHoleData.id, catalog, actions.holesActions));
        }
        else {
          layer.getIn(['lines', lineID, 'holes']).forEach(holeID => {
            removeHole(planData, layer.id, holeID);
          });
          removeLine(planData, layer.id, lineID);
          promises.push(addLine(sceneData, planData, layer, lineID, catalog, actions.linesActions));
          layer.getIn(['lines', lineID, 'holes']).forEach(holeID => {
            promises.push(addHole(sceneData, planData, layer, holeID, catalog, actions.holesActions));
          });
        }
      }
      break;
    case 'lines':
      let line = layer.getIn(['lines', modifiedPath[4]]);

      if (catalog.getElement(line.type).updateRender3D) {
        promises.push(
          updateLine(
            sceneData,
            oldSceneData,
            planData,
            layer,
            modifiedPath[4],
            modifiedPath.slice(5),
            catalog,
            actions.linesActions,
            () => removeLine(planData, layer.id, modifiedPath[4]),
            () => addLine(sceneData, planData, layer, modifiedPath[4], catalog, actions.linesActions)
          )
        );
      }
      else {
        removeLine(planData, layer.id, modifiedPath[4]);
        promises.push(addLine(sceneData, planData, layer, modifiedPath[4], catalog, actions.linesActions));
      }
      break;
    case 'areas':
      let area = layer.getIn(['areas', modifiedPath[4]]);

      if (catalog.getElement(area.type).updateRender3D) {
        promises.push(
          updateArea(
            sceneData,
            oldSceneData,
            planData,
            layer,
            modifiedPath[4],
            modifiedPath.slice(5),
            catalog,
            actions.areaActions,
            () => removeArea(planData, layer.id, modifiedPath[4]),
            () => addArea(sceneData, planData, layer, modifiedPath[4], catalog, actions.areaActions)
          )
        );
      }
      else {
        if (planData.sceneGraph.layers[layer.id].areas[modifiedPath[4]]) {
          removeArea(planData, layer.id, modifiedPath[4]);
        }
        promises.push(addArea(sceneData, planData, layer, modifiedPath[4], catalog, actions.areaActions));
      }
      break;
    case 'items':
      let item = layer.getIn(['items', modifiedPath[4]]);

      if (catalog.getElement(item.type).updateRender3D) {
        promises.push(
          updateItem(
            sceneData,
            oldSceneData,
            planData,
            layer,
            modifiedPath[4],
            modifiedPath.slice(5),
            catalog,
            actions.itemsActions,
            () => removeItem(planData, layer.id, modifiedPath[4]),
            () => addItem(sceneData, planData, layer, modifiedPath[4], catalog, actions.itemsActions)
          )
        );
      }
      else {
        removeItem(planData, layer.id, modifiedPath[4]);
        promises.push(addItem(sceneData, planData, layer, modifiedPath[4], catalog, actions.itemsActions));
      }
      break;

    case 'visible':
      if (!layer.visible) {
        let layerGraph = planData.sceneGraph.layers[layer.id];

        for (let lineID in layerGraph.lines) removeLine(planData, layer.id, lineID);
        for (let areaID in layerGraph.areas) removeArea(planData, layer.id, areaID);
        for (let itemID in layerGraph.items) removeItem(planData, layer.id, itemID);
        for (let holeID in layerGraph.holes) removeHole(planData, layer.id, holeID);

      } else {
        promises = promises.concat(createLayerObjects(layer, planData, sceneData, actions, catalog));
      }

      break;

    case 'opacity':
    case 'altitude':
      let layerGraph = planData.sceneGraph.layers[layer.id];
      for (let lineID in layerGraph.lines) removeLine(planData, layer.id, lineID);
      for (let areaID in layerGraph.areas) removeArea(planData, layer.id, areaID);
      for (let itemID in layerGraph.items) removeItem(planData, layer.id, itemID);
      for (let holeID in layerGraph.holes) removeHole(planData, layer.id, holeID);

      promises = promises.concat(createLayerObjects(layer, planData, sceneData, actions, catalog));

  }
  Promise.all(promises).then(values => updateBoundingBox(planData));
}

function removeObject(modifiedPath, layer, planData, actions, sceneData, oldSceneData, catalog) {

  let promises = [];
  switch (modifiedPath[3]) {
    case 'lines':
      // Here I remove the line with all its holes
      let lineID = modifiedPath[4];
      oldSceneData.getIn(['layers', layer.id, 'lines', lineID, 'holes']).forEach(holeID => {
        removeHole(planData, layer.id, holeID);
      });
      removeLine(planData, layer.id, lineID);
      if (modifiedPath.length > 5) {
        // I removed an hole, so I should add the new line
        promises.push(addLine(sceneData, planData, layer, lineID, catalog, actions.linesActions));
        layer.getIn(['lines', lineID, 'holes']).forEach(holeID => {
          promises.push(addHole(sceneData, planData, layer, holeID, catalog, actions.holesActions));
        });
      }
      break;
    case 'areas':
      if (modifiedPath.length === 5) {
        // I am removing an entire area
        removeArea(planData, layer.id, modifiedPath[4]);
      }
      break;
    case 'items':
      if (modifiedPath.length === 5) {
        // I am removing an item
        removeItem(planData, layer.id, modifiedPath[4]);
      }
      break;
  }

  Promise.all(promises).then(values => updateBoundingBox(planData));
}

function removeLayer(layerId, planData) {
  let layerGraph = planData.sceneGraph.layers[layerId];

  for (let lineID in layerGraph.lines) removeLine(planData, layerId, lineID);
  for (let areaID in layerGraph.areas) removeArea(planData, layerId, areaID);
  for (let itemID in layerGraph.items) removeItem(planData, layerId, itemID);
  for (let holeID in layerGraph.holes) removeHole(planData, layerId, holeID);

  delete planData.sceneGraph.layers[layerId];
}

function removeHole(planData, layerId, holeID) {

  if (planData.sceneGraph.busyResources.layers[layerId].holes[holeID]) {
    setTimeout(() => removeHole(planData, layerId, holeID), 100);
    return;
  }

  planData.sceneGraph.busyResources.layers[layerId].holes[holeID] = true;

  let hole3D = planData.sceneGraph.layers[layerId].holes[holeID];

  if (hole3D) {
    planData.plan.remove(hole3D);
    disposeObject(hole3D);
    delete planData.sceneGraph.layers[layerId].holes[holeID];
    delete planData.sceneGraph.LODs[holeID];
    hole3D = null;
    updateBoundingBox(planData);
  }

  planData.sceneGraph.busyResources.layers[layerId].holes[holeID] = false;
}

function removeLine(planData, layerId, lineID) {

  if (planData.sceneGraph.busyResources.layers[layerId].lines[lineID]) {
    setTimeout(() => removeLine(planData, layerId, lineID), 100);
    return;
  }

  planData.sceneGraph.busyResources.layers[layerId].lines[lineID] = true;

  let line3D = planData.sceneGraph.layers[layerId].lines[lineID];

  if (line3D) {
    planData.plan.remove(line3D);
    disposeObject(line3D);
    delete planData.sceneGraph.layers[layerId].lines[lineID];
    delete planData.sceneGraph.LODs[lineID];
    line3D = null;
    updateBoundingBox(planData);
  }

  planData.sceneGraph.busyResources.layers[layerId].lines[lineID] = false;
}

function removeArea(planData, layerId, areaID) {

  if (planData.sceneGraph.busyResources.layers[layerId].areas[areaID]) {
    setTimeout(() => removeArea(planData, layerId, areaID), 100);
    return;
  }

  planData.sceneGraph.busyResources.layers[layerId].areas[areaID] = true;

  let area3D = planData.sceneGraph.layers[layerId].areas[areaID];

  if (area3D) {
    planData.plan.remove(area3D);
    disposeObject(area3D);
    delete planData.sceneGraph.layers[layerId].areas[areaID];
    delete planData.sceneGraph.LODs[areaID];
    area3D = null;
    updateBoundingBox(planData);
  }

  planData.sceneGraph.busyResources.layers[layerId].areas[areaID] = false;
}

function removeItem(planData, layerId, itemID) {

  if (planData.sceneGraph.busyResources.layers[layerId].items[itemID]) {
    setTimeout(() => removeItem(planData, layerId, itemID), 100);
    return;
  }

  planData.sceneGraph.busyResources.layers[layerId].items[itemID] = true;

  let item3D = planData.sceneGraph.layers[layerId].items[itemID];

  if (item3D) {
    planData.plan.remove(item3D);
    disposeObject(item3D);
    delete planData.sceneGraph.layers[layerId].items[itemID];
    delete planData.sceneGraph.LODs[itemID];
    item3D = null;
    updateBoundingBox(planData);
  }

  planData.sceneGraph.busyResources.layers[layerId].items[itemID] = false;
}

//TODO generate an area's replace if vertex has been changed
function addObject(modifiedPath, layer, planData, actions, sceneData, oldSceneData, catalog) {
  if (modifiedPath.length === 5) {
    let addPromise = null, addAction = null;

    switch (modifiedPath[3]) {
      case 'lines': addPromise = addLine; addAction = actions.linesActions; break;
      case 'areas': addPromise = addArea; addAction = actions.areaActions;  break;
      case 'items': addPromise = addItem; addAction = actions.itemsActions; break;
      case 'holes': addPromise = addHole; addAction = actions.holesActions; break;
    }

    if( addPromise ) addPromise( sceneData, planData, layer, modifiedPath[4], catalog, addAction ).then(() => updateBoundingBox(planData));
  }
}

function addHole(sceneData, planData, layer, holeID, catalog, holesActions) {
  let holeData = layer.getIn(['holes', holeID]);

  // Create the hole object
  return catalog.getElement(holeData.type).render3D(holeData, layer, sceneData).then(object => {

    if (object instanceof Three.LOD) {
      planData.sceneGraph.LODs[holeID] = object;
    }

    let pivot = new Three.Object3D();
    pivot.name = 'pivot';
    pivot.add(object);

    let line = layer.getIn(['lines', holeData.line]);

    // First of all I need to find the vertices of this line
    let vertex0 = layer.vertices.get(line.vertices.get(0));
    let vertex1 = layer.vertices.get(line.vertices.get(1));
    let offset = holeData.offset;

    if (vertex0.x > vertex1.x) {
      let tmp = vertex0;
      vertex0 = vertex1;
      vertex1 = tmp;
      offset = 1 - offset;
    }

    let distance = Math.sqrt(Math.pow(vertex0.x - vertex1.x, 2) + Math.pow(vertex0.y - vertex1.y, 2));
    let alpha = Math.asin((vertex1.y - vertex0.y) / distance);

    let boundingBox = new Three.Box3().setFromObject(pivot);
    let center = [
      (boundingBox.max.x - boundingBox.min.x) / 2 + boundingBox.min.x,
      (boundingBox.max.y - boundingBox.min.y) / 2 + boundingBox.min.y,
      (boundingBox.max.z - boundingBox.min.z) / 2 + boundingBox.min.z];

    let holeAltitude = holeData.properties.getIn(['altitude', 'length']);
    let holeHeight = holeData.properties.getIn(['height', 'length']);

    pivot.rotation.y = alpha;
    pivot.position.x = vertex0.x + distance * offset * Math.cos(alpha) - center[2] * Math.sin(alpha);
    pivot.position.y = holeAltitude + holeHeight / 2 - center[1] + layer.altitude;
    pivot.position.z = -vertex0.y - distance * offset * Math.sin(alpha) - center[2] * Math.cos(alpha);

    planData.plan.add(pivot);
    planData.sceneGraph.layers[layer.id].holes[holeData.id] = pivot;

    applyInteract(pivot, () => {
      return holesActions.selectHole(layer.id, holeData.id);
    });

    let opacity = layer.opacity;
    if (holeData.selected) {
      opacity = 1;
    }
    applyOpacity(pivot, opacity);

  });
}

function updateHole(sceneData, oldSceneData, planData, layer, holeID, differences, catalog, holesActions, selfDestroy, selfBuild) {
  let hole = layer.getIn(['holes', holeID]);
  let oldHole = oldSceneData.getIn(['layers', layer.id, 'holes', holeID]);
  let mesh = planData.sceneGraph.layers[layer.id].holes[holeID];

  if (!mesh) return null;

  return catalog.getElement(hole.type).updateRender3D(hole, layer, sceneData, mesh, oldHole, differences, selfDestroy, selfBuild);
}

function addLine(sceneData, planData, layer, lineID, catalog, linesActions) {

  if (planData.sceneGraph.busyResources.layers[layer.id].lines[lineID]) {
    setTimeout(() => addLine(sceneData, planData, layer, lineID, catalog, linesActions), 100);
    return;
  }

  planData.sceneGraph.busyResources.layers[layer.id].lines[lineID] = true;

  let line = layer.getIn(['lines', lineID]);

  // First of all I need to find the vertices of this line
  let vertex0 = layer.vertices.get(line.vertices.get(0));
  let vertex1 = layer.vertices.get(line.vertices.get(1));

  if (vertex0.x > vertex1.x) {
    let tmp = vertex0;
    vertex0 = vertex1;
    vertex1 = tmp;
  }

  return catalog.getElement(line.type).render3D(line, layer, sceneData).then(line3D => {

    if (line3D instanceof Three.LOD) {
      planData.sceneGraph.LODs[line.id] = line3D;
    }

    let pivot = new Three.Object3D();
    pivot.name = 'pivot';
    pivot.add(line3D);

    pivot.position.x = vertex0.x;
    pivot.position.y = layer.altitude;
    pivot.position.z = -vertex0.y;

    planData.plan.add(pivot);
    planData.sceneGraph.layers[layer.id].lines[lineID] = pivot;

    applyInteract(pivot, () => {
      return linesActions.selectLine(layer.id, line.id);
    });

    let opacity = layer.opacity;
    if (line.selected) {
      opacity = 1;
    }
    applyOpacity(pivot, opacity);
    planData.sceneGraph.busyResources.layers[layer.id].lines[lineID] = false;
  });
}

function updateLine(sceneData, oldSceneData, planData, layer, lineID, differences, catalog, linesActions, selfDestroy, selfBuild) {
  let line = layer.getIn(['lines', lineID]);
  let oldLine = oldSceneData.getIn(['layers', layer.id, 'lines', lineID]);
  let mesh = planData.sceneGraph.layers[layer.id].lines[lineID];

  if (!mesh) return null;

  return catalog.getElement(line.type).updateRender3D(line, layer, sceneData, mesh, oldLine, differences, selfDestroy, selfBuild);
}

function addArea(sceneData, planData, layer, areaID, catalog, areaActions) {

  if (planData.sceneGraph.busyResources.layers[layer.id].areas[areaID]) {
    setTimeout(() => addArea(sceneData, planData, layer, areaID, catalog, areaActions), 100);
    return;
  }

  planData.sceneGraph.busyResources.layers[layer.id].areas[areaID] = true;

  let area = layer.getIn(['areas', areaID]);
  let interactFunction = () => areaActions.selectArea(layer.id, areaID);

  return catalog.getElement(area.type).render3D(area, layer, sceneData).then(area3D => {

    if (area3D instanceof Three.LOD) {
      planData.sceneGraph.LODs[areaID] = area3D;
    }

    let pivot = new Three.Object3D();
    pivot.name = 'pivot';
    pivot.add(area3D);
    pivot.position.y = layer.altitude;
    planData.plan.add(pivot);
    planData.sceneGraph.layers[layer.id].areas[areaID] = pivot;

    applyInteract(pivot, interactFunction);

    let opacity = layer.opacity;
    if (area.selected) {
      opacity = 1;
    }

    applyOpacity(pivot, opacity);
    planData.sceneGraph.busyResources.layers[layer.id].areas[areaID] = false;
  });
}

function updateArea(sceneData, oldSceneData, planData, layer, areaID, differences, catalog, areaActions, selfDestroy, selfBuild) {
  let area = layer.getIn(['areas', areaID]);
  let oldArea = oldSceneData.getIn(['layers', layer.id, 'areas', areaID]);
  let mesh = planData.sceneGraph.layers[layer.id].areas[areaID];

  if (!mesh) return null;

  return catalog.getElement(area.type).updateRender3D(area, layer, sceneData, mesh, oldArea, differences, selfDestroy, selfBuild);
}

function addItem(sceneData, planData, layer, itemID, catalog, itemsActions) {

  let item = layer.getIn(['items', itemID]);

  return catalog.getElement(item.type).render3D(item, layer, sceneData).then(item3D => {

    if (item3D instanceof Three.LOD) {
      planData.sceneGraph.LODs[itemID] = item3D;
    }

    let pivot = new Three.Object3D();
    pivot.name = 'pivot';
    pivot.add(item3D);

    pivot.rotation.y = item.rotation * Math.PI / 180;
    pivot.position.x = item.x;
    pivot.position.y = layer.altitude;
    pivot.position.z = -item.y;

    applyInteract(item3D, () => {
      itemsActions.selectItem(layer.id, item.id);
    }
    );

    let opacity = layer.opacity;
    if (item.selected) {
      opacity = 1;
    }

    applyOpacity(pivot, opacity);

    planData.plan.add(pivot);
    planData.sceneGraph.layers[layer.id].items[item.id] = pivot;
  });

}

function updateItem(sceneData, oldSceneData, planData, layer, itemID, differences, catalog, itemsActions, selfDestroy, selfBuild) {
  let item = layer.getIn(['items', itemID]);
  let oldItem = oldSceneData.getIn(['layers', layer.id, 'items', itemID]);
  let mesh = planData.sceneGraph.layers[layer.id].items[itemID];

  if (!mesh) return null;

  return catalog.getElement(item.type).updateRender3D(item, layer, sceneData, mesh, oldItem, differences, selfDestroy, selfBuild);
}

// Apply interact function to children of an Object3D
function applyInteract(object, interactFunction) {
  object.traverse((child) => {
    if (child instanceof Three.Mesh) {
      child.interact = interactFunction;
    }
  });
}

// Apply opacity to children of an Object3D
function applyOpacity(object, opacity) {
  object.traverse((child) => {

    if (child instanceof Three.Mesh) {
      if (child.material instanceof Three.MultiMaterial) {
        child.material.materials.forEach(materialChild => {
          materialChild.transparent = true;
          if (materialChild.maxOpacity) {
            materialChild.opacity = Math.min(materialChild.maxOpacity, opacity);
          } else if (materialChild.opacity && materialChild.opacity > opacity) {
            materialChild.maxOpacity = materialChild.opacity;
            materialChild.opacity = opacity;
          }
        });
      } else if (child.material instanceof Array) {
        child.material.forEach(material => {
          material.transparent = true;
          if (material.maxOpacity) {
            material.opacity = Math.min(material.maxOpacity, opacity);
          } else if (material.opacity && material.opacity > opacity) {
            material.maxOpacity = material.opacity;
            material.opacity = opacity;
          }
        });
      } else {
        child.material.transparent = true;
        if (child.material.maxOpacity) {
          child.material.opacity = Math.min(child.material.maxOpacity, opacity);
        } else if (child.material.opacity && child.material.opacity > opacity) {
          child.material.maxOpacity = child.material.opacity;
          child.material.opacity = opacity;
        }
      }
    }
  });
}


function updateBoundingBox(planData) {
  let newBoundingBox = new Three.Box3().setFromObject(planData.plan);
  if (isFinite(newBoundingBox.max.x)
    && isFinite(newBoundingBox.min.x)
    && isFinite(newBoundingBox.max.y)
    && isFinite(newBoundingBox.min.y)
    && isFinite(newBoundingBox.max.z)
    && isFinite(newBoundingBox.min.z)) {

    let newCenter = new Three.Vector3(
      (newBoundingBox.max.x - newBoundingBox.min.x) / 2 + newBoundingBox.min.x,
      (newBoundingBox.max.y - newBoundingBox.min.y) / 2 + newBoundingBox.min.y,
      (newBoundingBox.max.z - newBoundingBox.min.z) / 2 + newBoundingBox.min.z
    );

    planData.plan.position.sub(newCenter);
    planData.grid.position.sub(newCenter);

    newBoundingBox.min.sub(newCenter);
    newBoundingBox.max.sub(newCenter);

    planData.boundingBox = newBoundingBox;
  }
}

/**
 * Filter the array of diffs
 * @param diffArray
 * @param sceneData
 * @param oldSceneData
 * @returns {Array}
 */
function filterDiffs(diffArray, sceneData, oldSceneData) {
  return minimizeRemoveDiffsWhenSwitchingLayers(
    minimizeChangePropertiesAfterSelectionsDiffs(
      minimizeChangePropertiesDiffs(diffArray, sceneData, oldSceneData), sceneData, oldSceneData),
    sceneData, oldSceneData);
}

/**
 * Reduces the number of remove diffs when switching an hidden layer
 * @param diffArray the array of the diffs
 * @param sceneData
 * @param oldSceneData
 * @returns {Array}
 */
function minimizeRemoveDiffsWhenSwitchingLayers(diffArray, sceneData, oldSceneData) {

  let foundDiff;
  let i;
  for (i = 0; i < diffArray.length && !foundDiff; i++) {
    if (diffArray[i].path[1] === 'selectedLayer') {
      foundDiff = diffArray[i];
    }
  }

  if (foundDiff) {
    if (!sceneData.getIn(['layers', oldSceneData.selectedLayer, 'visible'])) {
      return diffArray.filter(({op, path}) => {

        return (
          !( path[ path.length - 1] === 'selected' && ( path[1] === 'layers' && path[2] === oldSceneData.selectedLayer )) &&
          !(op === 'remove' && path.indexOf(oldSceneData.selectedLayer) !== -1)
        );

      });
    }
  }

  return diffArray;
}

/**
 * Reduces the number of change properties diffs for selected elements
 * @param diffArray the array of the diffs
 * @param sceneData
 * @param oldSceneData
 * @returns {Array}
 */
function minimizeChangePropertiesAfterSelectionsDiffs(diffArray, sceneData, oldSceneData) {
  let idsFound = {};
  diffArray.forEach( ({path}) => {
    if (path[5] === 'selected') {
      idsFound[path[4]] = path[4];
    }
  });

  return diffArray.filter( ({path}) => {
    if (path[5] === 'properties') {
      return idsFound[path[4]] ? false : true;
    }
    return true;
  });
}

/**
 * Reduces the number of change properties diffs
 * @param diffArray the array of the diffs
 * @param sceneData
 * @param oldSceneData
 * @returns {Array}
 */
function minimizeChangePropertiesDiffs(diffArray, sceneData, oldSceneData) {
  let idsFound = {};
  return diffArray.filter( ({path}) => {
    if (path[5] === 'properties') {
      return idsFound[path[4]] ? false : (idsFound[path[4]] = true);
    } else if (path[5] === 'misc') {
      // Remove misc changes
      return false;
    }
    return true;
  });
}
