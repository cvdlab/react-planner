'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state, action) {
  switch (action.type) {

    case _constants.SELECT_TOOL_UPLOAD_IMAGE:
      return state.set('mode', _constants.MODE_UPLOADING_IMAGE);

    case _constants.BEGIN_UPLOADING_IMAGE:
      return state;

    case _constants.END_UPLOADING_IMAGE:
      return endUploadingImage(state, action.image, action.width, action.height);

    case _constants.BEGIN_FITTING_IMAGE:

    case _constants.END_FITTING_IMAGE:

    default:
      return state;

  }
};

var _constants = require('../constants');

var _layerOperations = require('../utils/layer-operations');

function endUploadingImage(state, image, width, height) {

  var scene = state.scene.updateIn(['layers', state.scene.selectedLayer], function (layer) {
    return layer.withMutations(function (layer) {

      var x0 = 0,
          y0 = 0,
          x1 = width,
          y1 = height;

      (0, _layerOperations.addImage)(layer, image, x0, y0, x1, y1);
    });
  });

  return state.merge({
    mode: _constants.MODE_IDLE,
    scene: scene
  });
}