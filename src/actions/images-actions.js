import {
  SELECT_TOOL_UPLOAD_IMAGE,
  BEGIN_UPLOADING_IMAGE,
  END_UPLOADING_IMAGE,
  BEGIN_FITTING_IMAGE,
  END_FITTING_IMAGE
} from '../constants';

import {browserImageUpload} from '../utils/browser';

export function selectToolUploadImage() {
  return {
    type: SELECT_TOOL_UPLOAD_IMAGE
  }
}


export function beginUploadingImage() {
  return function (dispatch, getState) {
    dispatch({type: BEGIN_UPLOADING_IMAGE});
    var upload = browserImageUpload();
    upload.then(result => {
      dispatch(endUploadingImage(result.data, result.width, result.height));
    });
  };
}

export function endUploadingImage(image, width, height) {
  console.log(width, height)
  return {
    type: END_UPLOADING_IMAGE,
    image, width, height
  }
}

export function beginFittingImage() {
  return {
    type: BEGIN_FITTING_IMAGE
  }
}

export function endFittingImage() {
  return {
    type: END_FITTING_IMAGE
  }
}


