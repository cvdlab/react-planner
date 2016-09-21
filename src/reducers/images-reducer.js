import {
  SELECT_TOOL_UPLOAD_IMAGE,
  BEGIN_UPLOADING_IMAGE,
  END_UPLOADING_IMAGE,
  BEGIN_FITTING_IMAGE,
  END_FITTING_IMAGE,

  MODE_IDLE,
  MODE_UPLOADING_IMAGE,
  MODE_FITTING_IMAGE
} from '../constants';

import {addImage} from '../utils/layer-operations';


export default function (state, action) {
  switch (action.type) {

    case SELECT_TOOL_UPLOAD_IMAGE:
      return state.set('mode', MODE_UPLOADING_IMAGE);

    case BEGIN_UPLOADING_IMAGE:
      return state;

    case END_UPLOADING_IMAGE:
      return endUploadingImage(state, action.image, action.width, action.height);

    case BEGIN_FITTING_IMAGE:

    case END_FITTING_IMAGE:

    default:
      return state;

  }
}


function endUploadingImage(state, image, width, height) {

  let scene = state.scene.updateIn(['layers', state.scene.selectedLayer], layer => layer.withMutations(layer => {

    let x0= 0, y0=0, x1=width, y1=height;

    addImage(layer, image, x0, y0, x1, y1);
  }));

  return state.merge({
      mode: MODE_IDLE,
      scene
    }
  );
}
