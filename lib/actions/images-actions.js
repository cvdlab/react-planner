'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.selectToolUploadImage = selectToolUploadImage;
exports.beginUploadingImage = beginUploadingImage;
exports.endUploadingImage = endUploadingImage;
exports.beginFittingImage = beginFittingImage;
exports.endFittingImage = endFittingImage;

var _constants = require('../constants');

var _browser = require('../utils/browser');

function selectToolUploadImage() {
  return {
    type: _constants.SELECT_TOOL_UPLOAD_IMAGE
  };
}

function beginUploadingImage() {
  return function (dispatch, getState) {
    dispatch({ type: _constants.BEGIN_UPLOADING_IMAGE });
    var upload = (0, _browser.browserImageUpload)();
    upload.then(function (result) {
      dispatch(endUploadingImage(result.data, result.width, result.height));
    });
  };
}

function endUploadingImage(image, width, height) {
  return {
    type: _constants.END_UPLOADING_IMAGE,
    image: image, width: width, height: height
  };
}

function beginFittingImage() {
  return {
    type: _constants.BEGIN_FITTING_IMAGE
  };
}

function endFittingImage() {
  return {
    type: _constants.END_FITTING_IMAGE
  };
}