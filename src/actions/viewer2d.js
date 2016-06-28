import {UPDATE_2D_CAMERA} from '../constants';

export function updateCameraView(value) {
  return {
    type: UPDATE_2D_CAMERA,
    value
  }
}
