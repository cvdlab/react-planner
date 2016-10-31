'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.parseData = parseData;
exports.updateScene = updateScene;

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

var _gridCreator = require('./grid-creator');

var _gridCreator2 = _interopRequireDefault(_gridCreator);

var _convertUnits = require('convert-units');

var _convertUnits2 = _interopRequireDefault(_convertUnits);

var _threeMemoryCleaner = require('./three-memory-cleaner');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function parseData(sceneData, editingActions, catalog) {

  var sceneGraph = {
    pixelPerUnit: sceneData.pixelPerUnit,
    unit: sceneData.unit,
    layers: {},
    width: sceneData.width,
    height: sceneData.height
  };

  var plan = new _three2.default.Object3D();

  sceneData.layers.forEach(function (layer) {

    sceneGraph.layers[layer.id] = {
      lines: {},
      holes: {},
      areas: {},
      items: {},
      visible: layer.visible,
      altitude: layer.altitude
    };

    // Import lines
    layer.lines.forEach(function (line) {

      var wall = createLine(layer, line, editingActions, catalog, sceneData);
      plan.add(wall);
      sceneGraph.layers[layer.id].lines[line.id] = wall;
    });

    // Import areas
    layer.areas.forEach(function (area) {

      area.interactFunction = function () {
        editingActions.selectArea(layer.id, area.id);
      };

      var area3D = catalog.getElement(area.type).render3D(area, layer);
      area3D.position.y += layer.altitude;
      plan.add(area3D);
      sceneGraph.layers[layer.id].areas[area.id] = area3D;
      area3D.visible = layer.visible;
    });

    // Import items
    layer.items.forEach(function (item) {
      createItem(layer, item, editingActions, sceneGraph, catalog, plan, sceneData);
    });
  });

  // Compute bounding box for the plan
  var boundingBox = new _three2.default.Box3().setFromObject(plan);

  // Add a grid to the plan
  var grid = (0, _gridCreator2.default)(sceneData);

  // Set center of plan in the origin

  if (!isFinite(boundingBox.max.x) || !isFinite(boundingBox.min.x) || !isFinite(boundingBox.max.y) || !isFinite(boundingBox.min.y) || !isFinite(boundingBox.max.z) || !isFinite(boundingBox.min.z)) {
    // The plan is Empty
    boundingBox = new _three2.default.Box3().setFromObject(grid);
  }

  var center = [(boundingBox.max.x - boundingBox.min.x) / 2 + boundingBox.min.x, (boundingBox.max.y - boundingBox.min.y) / 2 + boundingBox.min.y, (boundingBox.max.z - boundingBox.min.z) / 2 + boundingBox.min.z];

  plan.position.x -= center[0];
  plan.position.y -= center[1];
  plan.position.z -= center[2];

  grid.position.x -= center[0];
  grid.position.y -= center[1];
  grid.position.z -= center[2];

  return { boundingBox: boundingBox, plan: plan, grid: grid, sceneGraph: sceneGraph };
}

function updateScene(planData, sceneData, diffArray, editingActions, catalog) {

  diffArray.forEach(function (diff) {
    /* First of all I need to find the object I need to update */
    var modifiedPath = diff.path.split("/");

    if (modifiedPath[1] === "layers") {

      var layer = sceneData[modifiedPath[1]].get(modifiedPath[2]);

      if (modifiedPath.length > 2) {

        var oldLineObject = void 0;
        var newLineData = void 0;
        var newLineObject = void 0;

        var oldAreaObject = void 0;
        var newAreaData = void 0;
        var newAreaObject = void 0;

        var oldItemObject = void 0;
        var newItemData = void 0;

        switch (modifiedPath[3]) {
          case "layer":
            break;
          case "vertices":
            break;
          case "holes":
            if (diff.op !== "remove") {
              var newHoleData = layer.holes.get(modifiedPath[4]);
              var lineID = newHoleData.line;

              oldLineObject = planData.sceneGraph.layers[layer.id].lines[lineID];
              newLineData = layer.lines.get(lineID);
              newLineObject = replaceLine(layer, oldLineObject, newLineData, editingActions, planData, layer.visible, catalog, sceneData);
              planData.sceneGraph.layers[layer.id].lines[lineID] = newLineObject;
            }

            break;
          case "lines":
            // Now I can replace the wall
            oldLineObject = planData.sceneGraph.layers[layer.id].lines[modifiedPath[4]];
            newLineData = layer.lines.get(modifiedPath[4]);
            newLineObject = replaceLine(layer, oldLineObject, newLineData, editingActions, planData, layer.visible, catalog, sceneData);
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
            replaceItem(layer, oldItemObject, newItemData, editingActions, planData, catalog, sceneData);
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
    }
  });
  return planData;
}

function createLine(layer, line, editingActions, catalog, scene) {

  if (line != undefined) {
    var _ret = function () {
      // line could be undefined if I removed it

      line.editingActions = editingActions;

      var vertex0 = layer.vertices.get(line.vertices.get(0));
      var vertex1 = layer.vertices.get(line.vertices.get(1));

      if (vertex0.x > vertex1.x) {
        var app = vertex0;
        vertex0 = vertex1;
        vertex1 = app;
      }

      var wall = catalog.getElement(line.type).render3D(line, layer, scene);

      var distance = Math.sqrt(Math.pow(vertex0.x - vertex1.x, 2) + Math.pow(vertex0.y - vertex1.y, 2));

      var thickness = (0, _convertUnits2.default)(line.properties.get('thickness').get('length')).from(line.properties.get('thickness').get('unit')).to(scene.unit) * scene.pixelPerUnit;

      var bevelRadius = thickness;

      line.holes.forEach(function (holeID) {

        var holeData = layer.holes.get(holeID);

        // Create the hole object:
        var holePromise = catalog.getElement(holeData.type).render3D(holeData, undefined, scene);

        holePromise.then(function (object) {
          var boundingBox = new _three2.default.Box3().setFromObject(object);
          var center = [(boundingBox.max.x - boundingBox.min.x) / 2 + boundingBox.min.x, (boundingBox.max.y - boundingBox.min.y) / 2 + boundingBox.min.y, (boundingBox.max.z - boundingBox.min.z) / 2 + boundingBox.min.z];

          var holeAltitude = (0, _convertUnits2.default)(holeData.properties.get('altitude').get('length')).from(holeData.properties.get('altitude').get('unit')).to(scene.unit) * scene.pixelPerUnit;

          var holeHeight = (0, _convertUnits2.default)(holeData.properties.get('height').get('length')).from(holeData.properties.get('height').get('unit')).to(scene.unit) * scene.pixelPerUnit;

          var coordinates = [distance * holeData.offset, holeAltitude + holeHeight / 2, 0];

          object.position.x = coordinates[0] - center[0];
          //coordinates[1] - center[1] put the center of the door at the beginning of the hole
          object.position.y = coordinates[1] - center[1];
          object.position.z = coordinates[2] - center[2];
          wall.add(object);

          applyInteract(object, function () {
            return line.editingActions.selectHole(layer.id, holeData.id);
          });
        });
      });

      wall.position.x += vertex0.x;
      wall.position.y += layer.altitude;
      wall.position.z -= vertex0.y;

      wall.visible = layer.visible;

      return {
        v: wall
      };
    }();

    if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
  }
  return new _three2.default.Object3D();
}

function replaceLine(layer, oldLineObject, newLineData, editingActions, planData, isVisible, catalog, scene) {

  var newLineObject = createLine(layer, newLineData, editingActions, catalog, scene);

  // Now I need to translate object to the original coordinates
  var oldBoundingBox = planData.boundingBox;

  var oldCenter = [(oldBoundingBox.max.x - oldBoundingBox.min.x) / 2 + oldBoundingBox.min.x, (oldBoundingBox.max.y - oldBoundingBox.min.y) / 2 + oldBoundingBox.min.y, (oldBoundingBox.max.z - oldBoundingBox.min.z) / 2 + oldBoundingBox.min.z];

  planData.plan.position.x += oldCenter[0];
  planData.plan.position.y += oldCenter[1];
  planData.plan.position.z += oldCenter[2];

  planData.grid.position.x += oldCenter[0];
  planData.grid.position.y += oldCenter[1];
  planData.grid.position.z += oldCenter[2];

  // I need to remove the old object

  planData.plan.remove(oldLineObject);

  (0, _threeMemoryCleaner.disposeObject)(oldLineObject);
  oldLineObject = null;

  planData.plan.add(newLineObject);

  var newBoundingBox = new _three2.default.Box3().setFromObject(planData.plan);
  var newCenter = [(newBoundingBox.max.x - newBoundingBox.min.x) / 2 + newBoundingBox.min.x, (newBoundingBox.max.y - newBoundingBox.min.y) / 2 + newBoundingBox.min.y, (newBoundingBox.max.z - newBoundingBox.min.z) / 2 + newBoundingBox.min.z];

  planData.plan.position.x -= newCenter[0];
  planData.plan.position.y -= newCenter[1];
  planData.plan.position.z -= newCenter[2];

  planData.grid.position.x -= newCenter[0];
  planData.grid.position.y -= newCenter[1];
  planData.grid.position.z -= newCenter[2];

  planData.boundingBox = newBoundingBox;

  return newLineObject;
}

function replaceArea(layer, oldAreaObject, newAreaData, editingActions, planData, isVisible, catalog) {

  if (newAreaData != undefined) {

    // newAreaData could be undefined if I removed the area

    newAreaData.interactFunction = function () {
      editingActions.selectArea(layer.id, newAreaData.id);
    };

    var newAreaObject = catalog.getElement(newAreaData.type).render3D(newAreaData, layer);

    newAreaObject.position.y += layer.altitude;

    // Now I need to translate object to the original coordinates
    var oldBoundingBox = planData.boundingBox;

    var oldCenter = [(oldBoundingBox.max.x - oldBoundingBox.min.x) / 2 + oldBoundingBox.min.x, (oldBoundingBox.max.y - oldBoundingBox.min.y) / 2 + oldBoundingBox.min.y, (oldBoundingBox.max.z - oldBoundingBox.min.z) / 2 + oldBoundingBox.min.z];

    planData.plan.position.x += oldCenter[0];
    planData.plan.position.y += oldCenter[1];
    planData.plan.position.z += oldCenter[2];

    planData.grid.position.x += oldCenter[0];
    planData.grid.position.y += oldCenter[1];
    planData.grid.position.z += oldCenter[2];

    planData.plan.remove(oldAreaObject);
    (0, _threeMemoryCleaner.disposeObject)(oldAreaObject);

    planData.plan.add(newAreaObject);

    var newBoundingBox = new _three2.default.Box3().setFromObject(planData.plan);
    var newCenter = [(newBoundingBox.max.x - newBoundingBox.min.x) / 2 + newBoundingBox.min.x, (newBoundingBox.max.y - newBoundingBox.min.y) / 2 + newBoundingBox.min.y, (newBoundingBox.max.z - newBoundingBox.min.z) / 2 + newBoundingBox.min.z];

    planData.plan.position.x -= newCenter[0];
    planData.plan.position.y -= newCenter[1];
    planData.plan.position.z -= newCenter[2];

    planData.grid.position.x -= newCenter[0];
    planData.grid.position.y -= newCenter[1];
    planData.grid.position.z -= newCenter[2];

    newAreaObject.visible = isVisible;

    return newAreaObject;
  }

  return new _three2.default.Object3D();
}

function createItem(layer, item, editingActions, sceneGraph, catalog, plan, scene) {
  var item3DPromise = catalog.getElement(item.type).render3D(item, layer, scene);

  item3DPromise.then(function (item3D) {

    var pivot = new _three2.default.Object3D();
    pivot.add(item3D);

    pivot.rotation.y = item.rotation * Math.PI / 180;
    pivot.position.x = item.x;
    pivot.position.z -= item.y;

    applyInteract(item3D, function () {
      editingActions.selectItem(layer.id, item.id);
    });

    plan.add(pivot);
    sceneGraph.layers[layer.id].items[item.id] = pivot;
  });
}

function replaceItem(layer, oldItemObject, newItemData, editingActions, planData, catalog, scene) {

  planData.plan.remove(oldItemObject);
  (0, _threeMemoryCleaner.disposeObject)(oldItemObject);

  var item3DPromise = catalog.getElement(newItemData.type).render3D(newItemData, layer, scene);

  item3DPromise.then(function (item3D) {

    var pivot = new _three2.default.Object3D();
    pivot.add(item3D);

    pivot.rotation.y = newItemData.rotation * Math.PI / 180;
    pivot.position.x = newItemData.x;
    pivot.position.z -= newItemData.y;

    applyInteract(item3D, function () {
      editingActions.selectItem(layer.id, newItemData.id);
    });

    planData.plan.add(pivot);
    planData.sceneGraph.layers[layer.id].items[newItemData.id] = pivot;

    // Now I need to translate object to the original coordinates
    var oldBoundingBox = planData.boundingBox;

    var oldCenter = [(oldBoundingBox.max.x - oldBoundingBox.min.x) / 2 + oldBoundingBox.min.x, (oldBoundingBox.max.y - oldBoundingBox.min.y) / 2 + oldBoundingBox.min.y, (oldBoundingBox.max.z - oldBoundingBox.min.z) / 2 + oldBoundingBox.min.z];

    planData.plan.position.x += oldCenter[0];
    planData.plan.position.y += oldCenter[1];
    planData.plan.position.z += oldCenter[2];

    planData.grid.position.x += oldCenter[0];
    planData.grid.position.y += oldCenter[1];
    planData.grid.position.z += oldCenter[2];

    var newBoundingBox = new _three2.default.Box3().setFromObject(planData.plan);
    var newCenter = [(newBoundingBox.max.x - newBoundingBox.min.x) / 2 + newBoundingBox.min.x, (newBoundingBox.max.y - newBoundingBox.min.y) / 2 + newBoundingBox.min.y, (newBoundingBox.max.z - newBoundingBox.min.z) / 2 + newBoundingBox.min.z];

    planData.plan.position.x -= newCenter[0];
    planData.plan.position.y -= newCenter[1];
    planData.plan.position.z -= newCenter[2];

    planData.grid.position.x -= newCenter[0];
    planData.grid.position.y -= newCenter[1];
    planData.grid.position.z -= newCenter[2];
  });
}

// Apply interact function to children of an Object3D
function applyInteract(object, interactFunction) {
  object.traverse(function (child) {
    if (child instanceof _three2.default.Mesh) {
      child.interact = interactFunction;
    }
  });
}