"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state, action) {

  switch (action.type) {

    case _constants.NEW_PROJECT:
      return new _models.State();

    case _constants.LOAD_PROJECT:
      return loadProject(state, action.data, action.catalog);

    case _constants.OPEN_CATALOG:
      return openCatalog(state);

    case _constants.SELECT_TOOL_EDIT:
      return state.set('mode', _constants.MODE_IDLE);

    case _constants.UNSELECT_ALL:
      return unselectAll(state);

    case _constants.SET_PROPERTIES:
      return setProperties(state, action.properties);

    case _constants.REMOVE:
      return remove(state, action.catalog);

    case _constants.UNDO:
      return undo(state);

    case _constants.ROLLBACK:
      return rollback(state);

    default:
      return state;

  }
};

exports.rollback = rollback;

var _immutable = require("immutable");

var _constants = require("../constants");

var _models = require("../models");

var _layerOperations = require("../utils/layer-operations");

function openCatalog(state) {
  return rollback(state).set('mode', _constants.MODE_VIEWING_CATALOG);
}

function loadProject(state, data, catalog) {

  var readGuides = function readGuides(guides) {
    return new _immutable.Seq(guides).map(function (guide) {
      return new _models.Guide(guide).set('properties', new _immutable.Map(guide.properties));
    }).toMap();
  };

  var readScene = function readScene(scene) {
    return new _models.Scene(scene).set('layers', new _immutable.Seq(scene.layers).map(function (layer) {
      return (0, _layerOperations.loadLayerFromJSON)(layer, catalog);
    }).toMap()).set('guides', readGuides(scene.guides)).set('selectedLayer', Object.keys(scene.layers)[0]);
  };
  var scene = readScene(data);

  return new _models.State({
    scene: scene,
    sceneHistory: new _immutable.List([scene])
  });
}

function setProperties(state, properties) {
  var scene = state.scene;
  scene = scene.set('layers', scene.layers.map(function (layer) {
    return (0, _layerOperations.setPropertiesOnSelected)(layer, properties);
  }));
  return state.merge({
    scene: scene,
    sceneHistory: state.sceneHistory.push(scene)
  });
}

function unselectAll(state) {
  var scene = state.scene;

  scene = scene.update('layers', function (layer) {
    return layer.map(_layerOperations.unselectAll);
  });

  return state.merge({
    scene: scene,
    sceneHistory: state.sceneHistory.push(scene)
  });
}

function remove(state, catalog) {
  var scene = state.scene;

  scene = scene.updateIn(['layers', scene.selectedLayer], function (layer) {
    return layer.withMutations(function (layer) {
      var _layer$selected = layer.selected,
          selectedLines = _layer$selected.lines,
          selectedHoles = _layer$selected.holes,
          selectedItems = _layer$selected.items;

      (0, _layerOperations.unselectAll)(layer);
      selectedLines.forEach(function (lineID) {
        return (0, _layerOperations.removeLine)(layer, lineID);
      });
      selectedHoles.forEach(function (holeID) {
        return (0, _layerOperations.removeHole)(layer, holeID);
      });
      selectedItems.forEach(function (itemID) {
        return (0, _layerOperations.removeItem)(layer, itemID);
      });
      (0, _layerOperations.detectAndUpdateAreas)(layer, catalog);
    });
  });

  return state.merge({
    scene: scene,
    sceneHistory: state.sceneHistory.push(scene)
  });
}

function undo(state) {
  var sceneHistory = state.sceneHistory;

  if (state.scene === sceneHistory.last() && !sceneHistory.size > 1) sceneHistory = sceneHistory.pop();

  switch (sceneHistory.size) {
    case 0:
      return state;

    case 1:
      return state.merge({
        mode: _constants.MODE_IDLE,
        scene: sceneHistory.last()
      });

    default:
      return state.merge({
        mode: _constants.MODE_IDLE,
        scene: sceneHistory.last(),
        sceneHistory: sceneHistory.pop()
      });
  }
}

function rollback(state) {
  var sceneHistory = state.sceneHistory;

  if (sceneHistory.isEmpty()) return state;

  return state.merge({
    mode: _constants.MODE_IDLE,
    scene: sceneHistory.last()
  });
}