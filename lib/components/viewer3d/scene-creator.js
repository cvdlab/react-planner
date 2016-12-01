'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseData = parseData;
exports.updateScene = updateScene;

var _three = require('three');

var Three = _interopRequireWildcard(_three);

var _gridCreator = require('./grid-creator');

var _gridCreator2 = _interopRequireDefault(_gridCreator);

var _threeMemoryCleaner = require('./three-memory-cleaner');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function parseData(sceneData, actions, catalog) {

  var planData = {};

  planData.sceneGraph = {
    unit: sceneData.unit,
    layers: {},
    width: sceneData.width,
    height: sceneData.height
  };

  planData.plan = new Three.Object3D();

  // Add a grid to the plan
  planData.grid = (0, _gridCreator2.default)(sceneData);
  planData.boundingBox = new Three.Box3().setFromObject(planData.grid);
  var promises = [];

  sceneData.layers.forEach(function (layer) {

    if (layer.id === sceneData.selectedLayer || layer.visible) {
      promises = promises.concat(createLayerObjects(layer, planData, sceneData, actions, catalog));
    }
  });

  Promise.all(promises).then(function (value) {
    updateBoundingBox(planData);
  });

  return planData;
}

function createLayerObjects(layer, planData, sceneData, actions, catalog) {

  var promises = [];

  planData.sceneGraph.layers[layer.id] = {
    lines: {},
    holes: {},
    areas: {},
    items: {},
    visible: layer.visible,
    altitude: layer.altitude
  };

  // Import lines
  layer.lines.forEach(function (line) {
    promises.push(addLine(sceneData, planData, layer, line.id, catalog, actions.linesActions));
    line.holes.forEach(function (holeID) {
      promises.push(addHole(sceneData, planData, layer, holeID, catalog, actions.holesActions));
    });
  });

  // Import areas
  layer.areas.forEach(function (area) {
    promises.push(addArea(sceneData, planData, layer, area.id, catalog, actions.areaActions));
  });

  // Import items
  layer.items.forEach(function (item) {
    promises.push(addItem(sceneData, planData, layer, item.id, catalog, actions.itemsActions));
  });

  return promises;
}

function updateScene(planData, sceneData, oldSceneData, diffArray, actions, catalog) {

  minimizeChangePropertiesDiffs(diffArray).forEach(function (diff) {

    /* First of all I need to find the object I need to update */
    var modifiedPath = diff.path.split("/");

    if (modifiedPath[1] === "layers") {

      var layer = sceneData[modifiedPath[1]].get(modifiedPath[2]);

      if (modifiedPath.length > 2) {

        switch (diff.op) {
          case 'replace':
            replaceObject(modifiedPath, layer, planData, actions, sceneData, oldSceneData, catalog);
            break;
          case 'add':
            addObject(modifiedPath, layer, planData, actions, sceneData, oldSceneData, catalog);
            break;
          case 'remove':
            removeObject(modifiedPath, layer, planData, actions, sceneData, oldSceneData, catalog);
            break;
        }
      }
    } else if (modifiedPath[1] === 'selectedLayer') {
      var layerSelectedID = diff.value;
      // First of all I check if the new selected layer is not visible
      if (!sceneData.layers.get(layerSelectedID).visible) {
        // I need to create the objects for this layer
        var promises = createLayerObjects(sceneData.layers.get(layerSelectedID), planData, sceneData, actions, catalog);
        Promise.all(promises).then(function (values) {
          updateBoundingBox(planData);
        });
      }

      // Now I have to ckeck the old selectedLayer
      var oldLayerSelectedID = oldSceneData.selectedLayer;
      // First of all I check if the new selected layer is not visible
      if (!sceneData.layers.get(oldLayerSelectedID).visible) {
        // I need to remove the objects for this layer
        var layerGraph = planData.sceneGraph.layers[oldLayerSelectedID];

        for (var lineID in layerGraph.lines) {
          removeLine(planData, sceneData.layers.get(oldLayerSelectedID), lineID);
        }

        for (var areaID in layerGraph.areas) {
          removeArea(planData, sceneData.layers.get(oldLayerSelectedID), areaID);
        }

        for (var itemID in layerGraph.items) {
          removeItem(planData, sceneData.layers.get(oldLayerSelectedID), itemID);
        }

        for (var holeID in layerGraph.holes) {
          removeHole(planData, sceneData.layers.get(oldLayerSelectedID), holeID);
        }
      }
    }
  });
  return planData;
}

function replaceObject(modifiedPath, layer, planData, actions, sceneData, oldSceneData, catalog) {

  var promises = [];

  switch (modifiedPath[3]) {
    case "layer":
      break;
    case "vertices":
      break;
    case "holes":
      var newHoleData = layer.holes.get(modifiedPath[4]);
      var lineID = newHoleData.line;
      if (modifiedPath[5] === 'selected') {
        // I remove only the hole without removing the wall
        removeHole(planData, layer, newHoleData.id);
        promises.push(addHole(sceneData, planData, layer, newHoleData.id, catalog, actions.holesActions));
      } else {
        layer.lines.get(lineID).holes.forEach(function (holeID) {
          removeHole(planData, layer, holeID);
        });
        removeLine(planData, layer, lineID);
        promises.push(addLine(sceneData, planData, layer, lineID, catalog, actions.linesActions));
        layer.lines.get(lineID).holes.forEach(function (holeID) {
          promises.push(addHole(sceneData, planData, layer, holeID, catalog, actions.holesActions));
        });
      }
      break;
    case "lines":
      removeLine(planData, layer, modifiedPath[4]);
      promises.push(addLine(sceneData, planData, layer, modifiedPath[4], catalog, actions.linesActions));
      break;
    case "areas":
      removeArea(planData, layer, modifiedPath[4]);
      promises.push(addArea(sceneData, planData, layer, modifiedPath[4], catalog, actions.areaActions));
      break;
    case "items":
      removeItem(planData, layer, modifiedPath[4]);
      promises.push(addItem(sceneData, planData, layer, modifiedPath[4], catalog, actions.itemsActions));
      break;

    case "visible":
      if (!layer.visible) {
        var layerGraph = planData.sceneGraph.layers[layer.id];

        for (var _lineID in layerGraph.lines) {
          removeLine(planData, layer, _lineID);
        }

        for (var areaID in layerGraph.areas) {
          removeArea(planData, layer, areaID);
        }

        for (var itemID in layerGraph.items) {
          removeItem(planData, layer, itemID);
        }

        for (var holeID in layerGraph.holes) {
          removeHole(planData, layer, holeID);
        }
      } else {
        promises = promises.concat(createLayerObjects(layer, planData, sceneData, actions, catalog));
      }

      break;
  }
  Promise.all(promises).then(function (values) {
    updateBoundingBox(planData);
  });
}

function removeObject(modifiedPath, layer, planData, actions, sceneData, oldSceneData, catalog) {

  var promises = [];
  switch (modifiedPath[3]) {
    case "lines":
      // Here I remove the line with all its holes
      var lineID = modifiedPath[4];
      var oldLayer = oldSceneData.layers.get(layer.id);
      oldLayer.lines.get(lineID).holes.forEach(function (holeID) {
        removeHole(planData, layer, holeID);
      });
      removeLine(planData, layer, lineID);
      if (modifiedPath.length > 5) {
        // I removed an hole, so I should add the new line
        promises.push(addLine(sceneData, planData, layer, lineID, catalog, actions.linesActions));
        layer.lines.get(lineID).holes.forEach(function (holeID) {
          promises.push(addHole(sceneData, planData, layer, holeID, catalog, actions.holesActions));
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

  Promise.all(promises).then(function (values) {
    updateBoundingBox(planData);
  });
}

function removeHole(planData, layer, holeToRemoveID) {
  var holeToRemove = planData.sceneGraph.layers[layer.id].holes[holeToRemoveID];
  planData.plan.remove(holeToRemove);
  (0, _threeMemoryCleaner.disposeObject)(holeToRemove);
  delete planData.sceneGraph.layers[layer.id].holes[holeToRemoveID];
  holeToRemove = null;
  updateBoundingBox(planData);
}

function removeLine(planData, layer, lineID) {
  var line3D = planData.sceneGraph.layers[layer.id].lines[lineID];
  planData.plan.remove(line3D);
  (0, _threeMemoryCleaner.disposeObject)(line3D);
  delete planData.sceneGraph.layers[layer.id].lines[lineID];
  line3D = null;
  updateBoundingBox(planData);
}

function removeArea(planData, layer, areaID) {
  var area3D = planData.sceneGraph.layers[layer.id].areas[areaID];
  planData.plan.remove(area3D);
  (0, _threeMemoryCleaner.disposeObject)(area3D);
  delete planData.sceneGraph.layers[layer.id].areas[areaID];
  area3D = null;
  updateBoundingBox(planData);
}

function removeItem(planData, layer, itemID) {
  var item3D = planData.sceneGraph.layers[layer.id].items[itemID];
  planData.plan.remove(item3D);
  (0, _threeMemoryCleaner.disposeObject)(item3D);
  delete planData.sceneGraph.layers[layer.id].items[itemID];
  item3D = null;
  updateBoundingBox(planData);
}

function addObject(modifiedPath, layer, planData, actions, sceneData, oldSceneData, catalog) {

  var promises = [];
  switch (modifiedPath[3]) {
    case "lines":
      if (modifiedPath.length === 5) {
        // I have to add a line
        promises.push(addLine(sceneData, planData, layer, modifiedPath[4], catalog, actions.linesActions));
      }
      break;
    case "areas":
      if (modifiedPath.length === 5) {
        // I have to add an area
        promises.push(addArea(sceneData, planData, layer, modifiedPath[4], catalog, actions.areaActions));
      }
      break;
    case "items":
      if (modifiedPath.length === 5) {
        // I have to add an area
        promises.push(addItem(sceneData, planData, layer, modifiedPath[4], catalog, actions.itemsActions));
      }
      break;
  }

  Promise.all(promises).then(function (values) {
    updateBoundingBox(planData);
  });
}

function addHole(sceneData, planData, layer, holeID, catalog, holesActions) {
  var holeData = layer.holes.get(holeID);

  // Create the hole object
  return catalog.getElement(holeData.type).render3D(holeData, layer, sceneData).then(function (object) {

    var pivot = new Three.Object3D();
    pivot.add(object);

    var line = layer.lines.get(holeData.line);

    // First of all I need to find the vertices of this line
    var vertex0 = layer.vertices.get(line.vertices.get(0));
    var vertex1 = layer.vertices.get(line.vertices.get(1));

    if (vertex0.x > vertex1.x) {
      var app = vertex0;
      vertex0 = vertex1;
      vertex1 = app;
    }

    var distance = Math.sqrt(Math.pow(vertex0.x - vertex1.x, 2) + Math.pow(vertex0.y - vertex1.y, 2));
    var alpha = Math.asin((vertex1.y - vertex0.y) / distance);

    var boundingBox = new Three.Box3().setFromObject(pivot);
    var center = [(boundingBox.max.x - boundingBox.min.x) / 2 + boundingBox.min.x, (boundingBox.max.y - boundingBox.min.y) / 2 + boundingBox.min.y, (boundingBox.max.z - boundingBox.min.z) / 2 + boundingBox.min.z];

    var holeAltitude = holeData.properties.get('altitude').get('length');

    var holeHeight = holeData.properties.get('height').get('length');

    pivot.rotation.y = alpha;
    pivot.position.x = layer.vertices.get(line.vertices.get(0)).x + distance * holeData.offset * Math.cos(alpha) - center[2] * Math.sin(alpha);
    pivot.position.y = holeAltitude + holeHeight / 2 - center[1] + layer.altitude;
    pivot.position.z = -layer.vertices.get(line.vertices.get(0)).y - distance * holeData.offset * Math.sin(alpha) - center[2] * Math.cos(alpha);

    planData.plan.add(pivot);
    planData.sceneGraph.layers[layer.id].holes[holeData.id] = pivot;

    applyInteract(pivot, function () {
      return holesActions.selectHole(layer.id, holeData.id);
    });

    if (!holeData.selected) {
      applyOpacity(pivot, layer.opacity);
    }
  });
}

function addLine(sceneData, planData, layer, lineID, catalog, linesActions) {
  var line = layer.lines.get(lineID);

  // First of all I need to find the vertices of this line
  var vertex0 = layer.vertices.get(line.vertices.get(0));
  var vertex1 = layer.vertices.get(line.vertices.get(1));

  if (vertex0.x > vertex1.x) {
    var app = vertex0;
    vertex0 = vertex1;
    vertex1 = app;
  }

  return catalog.getElement(line.type).render3D(line, layer, sceneData).then(function (line3D) {

    var pivot = new Three.Object3D();
    pivot.add(line3D);

    pivot.position.x = vertex0.x;
    pivot.position.y = layer.altitude;
    pivot.position.z = -vertex0.y;

    planData.plan.add(pivot);
    planData.sceneGraph.layers[layer.id].lines[lineID] = pivot;

    applyInteract(pivot, function () {
      return linesActions.selectLine(layer.id, line.id);
    });

    if (!line.selected) {
      applyOpacity(pivot, layer.opacity);
    }
  });
}

function addArea(sceneData, planData, layer, areaID, catalog, areaActions) {
  var area = layer.areas.get(areaID);
  var interactFunction = function interactFunction() {
    areaActions.selectArea(layer.id, area.id);
  };

  return catalog.getElement(area.type).render3D(area, layer, sceneData).then(function (area3D) {
    var pivot = new Three.Object3D();
    pivot.add(area3D);
    pivot.position.y = layer.altitude;
    planData.plan.add(pivot);
    planData.sceneGraph.layers[layer.id].areas[area.id] = pivot;

    applyInteract(pivot, interactFunction);

    if (!area.selected) {
      applyOpacity(pivot, layer.opacity);
    }
  });
}

function addItem(sceneData, planData, layer, itemID, catalog, itemsActions) {
  var item = layer.items.get(itemID);

  return catalog.getElement(item.type).render3D(item, layer, sceneData).then(function (item3D) {

    var pivot = new Three.Object3D();
    pivot.add(item3D);

    pivot.rotation.y = item.rotation * Math.PI / 180;
    pivot.position.x = item.x;
    pivot.position.y = layer.altitude;
    pivot.position.z = -item.y;

    applyInteract(item3D, function () {
      itemsActions.selectItem(layer.id, item.id);
    });

    if (!item.selected) {
      applyOpacity(pivot, layer.opacity);
    }

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

// Apply opacity to children of an Object3D
function applyOpacity(object, opacity) {
  object.traverse(function (child) {
    if (child instanceof Three.Mesh) {
      if (child.material instanceof Three.MultiMaterial) {
        child.material.materials.forEach(function (materialChild) {
          materialChild.transparent = true;
          if (materialChild.opacity && materialChild.opacity > opacity) {
            materialChild.opacity = opacity;
          }
        });
      } else {
        child.material.transparent = true;
        if (child.material.opacity && child.material.opacity > opacity) {
          child.material.opacity = opacity;
        }
      }
    }
  });
}

function updateBoundingBox(planData) {
  var newBoundingBox = new Three.Box3().setFromObject(planData.plan);
  if (isFinite(newBoundingBox.max.x) || isFinite(newBoundingBox.min.x) || isFinite(newBoundingBox.max.y) || isFinite(newBoundingBox.min.y) || isFinite(newBoundingBox.max.z) || isFinite(newBoundingBox.min.z)) {

    var newCenter = [(newBoundingBox.max.x - newBoundingBox.min.x) / 2 + newBoundingBox.min.x, (newBoundingBox.max.y - newBoundingBox.min.y) / 2 + newBoundingBox.min.y, (newBoundingBox.max.z - newBoundingBox.min.z) / 2 + newBoundingBox.min.z];

    planData.plan.position.x -= newCenter[0];
    planData.plan.position.y -= newCenter[1];
    planData.plan.position.z -= newCenter[2];

    planData.grid.position.x -= newCenter[0];
    planData.grid.position.y -= newCenter[1];
    planData.grid.position.z -= newCenter[2];

    // Update bounding box
    newBoundingBox.min.sub(new Three.Vector3().fromArray(newCenter));
    newBoundingBox.max.sub(new Three.Vector3().fromArray(newCenter));

    planData.boundingBox = newBoundingBox;
  }
}

/**
 * Reduces the number of change properties diffs
 * @param diffArray the array of the diffs
 * @returns {Array}
 */
function minimizeChangePropertiesDiffs(diffArray) {

  var minimizedDiffs = [];

  var propertiesDiffs = [];

  // Find all diffs for a changed property
  diffArray.forEach(function (currentDiff) {
    var splittedDiff = currentDiff.path.split("/");
    if (splittedDiff[5] === 'properties') {
      propertiesDiffs.push([currentDiff, splittedDiff[4]]);
    } else {
      minimizedDiffs.push(currentDiff);
    }
  });

  var sortedPropertiesDiffs = propertiesDiffs.sort(function (a, b) {
    return a[1] < b[1];
  });

  for (var i = 0; i < sortedPropertiesDiffs.length; i++) {
    minimizedDiffs.push(sortedPropertiesDiffs[0][0]);
    var futureIndex = i + 1;
    while (futureIndex < sortedPropertiesDiffs.length && sortedPropertiesDiffs[i][1] === sortedPropertiesDiffs[futureIndex][1]) {
      futureIndex++;
    }
    i = futureIndex - 1;
  }

  return minimizedDiffs;
}