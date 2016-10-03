'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state, action) {
  var scene = state.scene;


  switch (action.type) {
    case _constants.SELECT_TOOL_EDIT:
      return state.set('mode', _constants.MODE_IDLE);

    case _constants.SELECT_AREA:
      return state.set('scene', selectArea(scene, action.layerID, action.areaID));

    case _constants.SELECT_HOLE:
      return state.set('scene', selectHole(scene, action.layerID, action.holeID));

    case _constants.SELECT_LINE:
      return state.set('scene', selectLine(scene, action.layerID, action.lineID));

    case _constants.SELECT_ITEM:
      return state.set('scene', selectItem(scene, action.layerID, action.itemID));

    case _constants.UNSELECT_ALL:
      return state.set('scene', unselectAll(scene));

    case _constants.SET_PROPERTIES:
      return state.set('scene', setProperties(scene, action.properties));

    case _constants.REMOVE:
      return state.set('scene', remove(scene, action.catalog));

    default:
      return state;
  }
};

var _constants = require('../constants');

var _models = require('../models');

var _immutable = require('immutable');

var _layerOperations = require('../utils/layer-operations');

function setProperties(scene, properties) {
  return scene.updateIn(['layers', scene.selectedLayer], function (layer) {
    return layer.withMutations(function (layer) {
      layer.selected.lines.forEach(function (lineID) {
        return (0, _layerOperations.setProperties)(layer, 'lines', lineID, properties);
      });
      layer.selected.holes.forEach(function (holeID) {
        return (0, _layerOperations.setProperties)(layer, 'holes', holeID, properties);
      });
      layer.selected.areas.forEach(function (areaID) {
        return (0, _layerOperations.setProperties)(layer, 'areas', areaID, properties);
      });
      (0, _layerOperations.unselectAll)(layer);
    });
  });
}

function selectLine(scene, layerID, lineID) {
  return scene.updateIn(['layers', layerID], function (layer) {
    return layer.withMutations(function (layer) {
      var line = layer.getIn(['lines', lineID]);
      (0, _layerOperations.unselectAll)(layer);
      (0, _layerOperations.select)(layer, 'lines', lineID);
      (0, _layerOperations.select)(layer, 'vertices', line.vertices.get(0));
      (0, _layerOperations.select)(layer, 'vertices', line.vertices.get(1));
    });
  });
}

function selectArea(scene, layerID, areaID) {
  return scene.updateIn(['layers', layerID], function (layer) {
    return layer.withMutations(function (layer) {
      var area = layer.getIn(['areas', areaID]);
      (0, _layerOperations.unselectAll)(layer);
      (0, _layerOperations.select)(layer, 'areas', areaID);
      area.vertices.forEach(function (vertexID) {
        return (0, _layerOperations.select)(layer, 'vertices', vertexID);
      });
    });
  });
}

function selectItem(scene, layerID, itemID) {
  return scene.updateIn(['layers', layerID], function (layer) {
    return layer.withMutations(function (layer) {
      var item = layer.getIn(['items', itemID]);
      (0, _layerOperations.unselectAll)(layer);
      (0, _layerOperations.select)(layer, 'items', itemID);
    });
  });
}

function selectHole(scene, layerID, holeID) {
  return scene.updateIn(['layers', layerID], function (layer) {
    return layer.withMutations(function (layer) {
      (0, _layerOperations.unselectAll)(layer);
      (0, _layerOperations.select)(layer, 'holes', holeID);
    });
  });
}

function unselectAll(scene) {
  return scene.update('layers', function (layer) {
    return layer.map(_layerOperations.unselectAll);
  });
}

function remove(scene, catalog) {
  return scene.updateIn(['layers', scene.selectedLayer], function (layer) {
    return layer.withMutations(function (layer) {
      var _layer$selected = layer.selected;
      var selectedLines = _layer$selected.lines;
      var selectedHoles = _layer$selected.holes;
      var selectedItems = _layer$selected.items;

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
}