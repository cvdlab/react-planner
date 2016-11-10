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

var _convertUnits = require('convert-units');

var _convertUnits2 = _interopRequireDefault(_convertUnits);

var _threeMemoryCleaner = require('./three-memory-cleaner');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function parseData(sceneData, editingActions, catalog) {

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

  sceneData.layers.forEach(function (layer) {

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
      addLine(sceneData, planData, layer, line.id, catalog, editingActions);
      line.holes.forEach(function (holeID) {
        addHole(sceneData, planData, layer, holeID, catalog, editingActions);
      });
    });

    // Import areas
    layer.areas.forEach(function (area) {
      addArea(sceneData, planData, layer, area.id, catalog, editingActions);
    });

    // Import items
    layer.items.forEach(function (item) {
      addItem(sceneData, planData, layer, item.id, catalog, editingActions);
    });
  });

  return planData;
}

function updateScene(planData, sceneData, oldSceneData, diffArray, editingActions, catalog) {

  minimizeChangePropertiesDiffs(diffArray).forEach(function (diff) {

    /* First of all I need to find the object I need to update */
    var modifiedPath = diff.path.split("/");

    if (modifiedPath[1] === "layers") {

      var layer = sceneData[modifiedPath[1]].get(modifiedPath[2]);

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
    }
  });
  return planData;
}

function replaceObject(modifiedPath, layer, planData, editingActions, sceneData, oldSceneData, catalog) {

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
        addHole(sceneData, planData, layer, newHoleData.id, catalog, editingActions);
      } else {
        layer.lines.get(lineID).holes.forEach(function (holeID) {
          removeHole(planData, layer, holeID);
        });
        removeLine(planData, layer, lineID);
        addLine(sceneData, planData, layer, lineID, catalog, editingActions);
        layer.lines.get(lineID).holes.forEach(function (holeID) {
          addHole(sceneData, planData, layer, holeID, catalog, editingActions);
        });
      }
      break;
    case "lines":
      removeLine(planData, layer, modifiedPath[4]);
      addLine(sceneData, planData, layer, modifiedPath[4], catalog, editingActions);
      break;
    case "areas":
      removeArea(planData, layer, modifiedPath[4]);
      addArea(sceneData, planData, layer, modifiedPath[4], catalog, editingActions);
      break;
    case "items":
      removeItem(planData, layer, modifiedPath[4]);
      addItem(sceneData, planData, layer, modifiedPath[4], catalog, editingActions);
      break;

    case "visible":
      var layerGraph = planData.sceneGraph.layers[layer.id];
      layerGraph.visible = layer.visible;
      for (var _lineID in layerGraph.lines) {
        layerGraph.lines[_lineID].visible = layer.visible;
      }

      for (var areaID in layerGraph.areas) {
        layerGraph.areas[areaID].visible = layer.visible;
      }
      break;
  }
}

function removeObject(modifiedPath, layer, planData, editingActions, sceneData, oldSceneData, catalog) {

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
        addLine(sceneData, planData, layer, lineID, catalog, editingActions);
        layer.lines.get(lineID).holes.forEach(function (holeID) {
          addHole(sceneData, planData, layer, holeID, catalog, editingActions);
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

function addObject(modifiedPath, layer, planData, editingActions, sceneData, oldSceneData, catalog) {

  switch (modifiedPath[3]) {
    case "lines":
      if (modifiedPath.length === 5) {
        // I have to add a line
        addLine(sceneData, planData, layer, modifiedPath[4], catalog, editingActions);
      }
      break;
    case "areas":
      if (modifiedPath.length === 5) {
        // I have to add an area
        addArea(sceneData, planData, layer, modifiedPath[4], catalog, editingActions);
      }
      break;
    case "items":
      if (modifiedPath.length === 5) {
        // I have to add an area
        addItem(sceneData, planData, layer, modifiedPath[4], catalog, editingActions);
      }
      break;
  }
}

function addHole(sceneData, planData, layer, holeID, catalog, editingActions) {
  var holeData = layer.holes.get(holeID);

  // Create the hole object
  catalog.getElement(holeData.type).render3D(holeData, layer, sceneData).then(function (object) {

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

    var boundingBox = new Three.Box3().setFromObject(object);
    var center = [(boundingBox.max.x - boundingBox.min.x) / 2 + boundingBox.min.x, (boundingBox.max.y - boundingBox.min.y) / 2 + boundingBox.min.y, (boundingBox.max.z - boundingBox.min.z) / 2 + boundingBox.min.z];

    var holeAltitude = holeData.properties.get('altitude').get('length');

    var holeHeight = holeData.properties.get('height').get('length');

    object.rotation.y = alpha;
    object.position.x = vertex0.x + distance * holeData.offset * Math.cos(alpha) - center[2] * Math.sin(alpha);
    object.position.y = holeAltitude + holeHeight / 2 - center[1];
    object.position.z = -vertex0.y - distance * holeData.offset * Math.sin(alpha) - center[2] * Math.cos(alpha);

    planData.plan.add(object);
    planData.sceneGraph.layers[layer.id].holes[holeData.id] = object;

    applyInteract(object, function () {
      return editingActions.selectHole(layer.id, holeData.id);
    });

    updateBoundingBox(planData);
  });
}

function addLine(sceneData, planData, layer, lineID, catalog, editingActions) {
  var line = layer.lines.get(lineID);

  // First of all I need to find the vertices of this line
  var vertex0 = layer.vertices.get(line.vertices.get(0));
  var vertex1 = layer.vertices.get(line.vertices.get(1));

  if (vertex0.x > vertex1.x) {
    var app = vertex0;
    vertex0 = vertex1;
    vertex1 = app;
  }

  catalog.getElement(line.type).render3D(line, layer, sceneData).then(function (line3D) {

    line3D.position.x += vertex0.x;
    line3D.position.y += layer.altitude;
    line3D.position.z -= vertex0.y;

    line3D.visible = layer.visible;

    planData.plan.add(line3D);
    planData.sceneGraph.layers[layer.id].lines[lineID] = line3D;

    applyInteract(line3D, function () {
      return editingActions.selectLine(layer.id, line.id);
    });

    updateBoundingBox(planData);
  });
}

function addArea(sceneData, planData, layer, areaID, catalog, editingActions) {
  var area = layer.areas.get(areaID);
  var interactFunction = function interactFunction() {
    editingActions.selectArea(layer.id, area.id);
  };

  catalog.getElement(area.type).render3D(area, layer, sceneData).then(function (area3D) {
    area3D.position.y += layer.altitude;
    planData.plan.add(area3D);
    planData.sceneGraph.layers[layer.id].areas[area.id] = area3D;
    area3D.visible = layer.visible;

    applyInteract(area3D, interactFunction);

    updateBoundingBox(planData);
  });
}

function addItem(sceneData, planData, layer, itemID, catalog, editingActions) {
  var item = layer.items.get(itemID);

  catalog.getElement(item.type).render3D(item, layer, sceneData).then(function (item3D) {

    var pivot = new Three.Object3D();
    pivot.add(item3D);

    pivot.rotation.y = item.rotation * Math.PI / 180;
    pivot.position.x = item.x;
    pivot.position.z -= item.y;

    applyInteract(item3D, function () {
      editingActions.selectItem(layer.id, item.id);
    });

    planData.plan.add(pivot);
    planData.sceneGraph.layers[layer.id].items[item.id] = pivot;

    updateBoundingBox(planData);
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
  var newBoundingBox = new Three.Box3().setFromObject(planData.plan);

  if (isFinite(newBoundingBox.max.x) || isFinite(newBoundingBox.min.x) || isFinite(newBoundingBox.max.y) || isFinite(newBoundingBox.min.y) || isFinite(newBoundingBox.max.z) || isFinite(newBoundingBox.min.z)) {

    var newCenter = [(newBoundingBox.max.x - newBoundingBox.min.x) / 2 + newBoundingBox.min.x, (newBoundingBox.max.y - newBoundingBox.min.y) / 2 + newBoundingBox.min.y, (newBoundingBox.max.z - newBoundingBox.min.z) / 2 + newBoundingBox.min.z];

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