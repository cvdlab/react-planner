import React from 'react';
import Viewer2D from './viewer2d/viewer2d.jsx';
import Viewer3D from './viewer3d/viewer3d';
import Viewer3DFirstPerson from './viewer3d/viewer3d-first-person';
import VolumesTable from './volumes-summary/volumes-table.jsx';
import ImageEditor from './image-editor/image-editor.jsx';
import * as constants from '../constants';

export default function Content({width, height, state}) {
  let scene = state.get('scene');
  let mode = state.get('mode');
  let viewer2D = state.get('viewer2D');
  let activeSnapElement = state.get('activeSnapElement');
  let snapElements = state.get('snapElements');

  switch (mode) {
    case constants.MODE_3D_VIEW:
      return React.createElement(Viewer3D, {scene, mode, width, height});

    case constants.MODE_3D_FIRST_PERSON:
      return React.createElement(Viewer3DFirstPerson, {scene, mode, width, height});

    case constants.MODE_VOLUMES_SUMMARY:
      return React.createElement(VolumesTable, {scene, mode, width, height});

    case constants.MODE_UPLOADING_IMAGE:
    case constants.MODE_FITTING_IMAGE:
      return React.createElement(ImageEditor, {scene, mode, width, height});

    default:
      return React.createElement(Viewer2D, {scene, mode, width, height, viewer2D, activeSnapElement, snapElements});
  }
}

Content.propTypes = {
  state: React.PropTypes.object.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired
};
