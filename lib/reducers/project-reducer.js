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
      return state.set('mode', _constants.MODE_VIEWING_CATALOG);

    default:
      return state;

  }
};

var _immutable = require("immutable");

var _constants = require("../constants");

var _models = require("../models");

var _layerOperations = require("../utils/layer-operations");

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

  return new _models.State({ scene: scene });
}