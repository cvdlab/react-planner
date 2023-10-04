import {UPDATE_2D_CAMERA, SELECT_TOOL_PAN, SELECT_TOOL_ZOOM_IN, SELECT_TOOL_ZOOM_OUT, FIT_SELECTION} from '../utils/constants';

export function updateCameraView(value) {
  return {
    type: UPDATE_2D_CAMERA,
    value
  }
}

export function selectToolPan() {
  return {
    type: SELECT_TOOL_PAN
  };
}

export function selectToolZoomOut() {
  return {
    type: SELECT_TOOL_ZOOM_OUT
  };
}

export function selectToolZoomIn() {
  return {
    type: SELECT_TOOL_ZOOM_IN
  };
}

export function fitSelection(value) {
  return {
    type: FIT_SELECTION,
    value
  };
}