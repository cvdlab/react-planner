import React from 'react';
import Viewer2D from './viewer2d/viewer2d.jsx';
import Viewer3D from './viewer3d/viewer3d';
import Viewer3DFirstPerson from './viewer3d/viewer3d-first-person';
import ImageEditor from './image-editor/image-editor.jsx';
import CatalogList from './catalog-view/catalog-list.jsx';
import * as constants from '../constants';

export default function Content({width, height, state, customContents}) {
  let scene = state.get('scene');
  let mode = state.get('mode');
  let viewer2D = state.get('viewer2D');
  let activeSnapElement = state.get('activeSnapElement');
  let snapElements = state.get('snapElements');

  switch (mode) {
    case constants.MODE_3D_VIEW:
      return <Viewer3D scene={scene} mode={mode} width={width} height={height}/>;

    case constants.MODE_3D_FIRST_PERSON:
      return <Viewer3DFirstPerson scene={scene} mode={mode} width={width} height={height}/>;

    case constants.MODE_UPLOADING_IMAGE:
    case constants.MODE_FITTING_IMAGE:
      return <ImageEditor scene={scene} mode={mode} width={width} height={height}/>;

    case constants.MODE_VIEWING_CATALOG:
      return <CatalogList scene={scene} mode={mode} width={width} height={height}/>;

    case constants.MODE_IDLE:
    case constants.MODE_2D_ZOOM_IN:
    case constants.MODE_2D_ZOOM_OUT:
    case constants.MODE_2D_PAN:
    case constants.MODE_WAITING_DRAWING_LINE:
    case constants.MODE_DRAGGING_LINE:
    case constants.MODE_DRAGGING_VERTEX:
    case constants.MODE_DRAWING_LINE:
    case constants.MODE_DRAWING_HOLE:
    case constants.MODE_DRAWING_ITEM:
      return <Viewer2D scene={scene} mode={mode} width={width} height={height} viewer2D={viewer2D}
                       activeSnapElement={activeSnapElement} snapElement={snapElements}/>;

    default:
      if(customContents.hasOwnProperty(mode)){
        let CustomContent = customContents[mode];
        return <CustomContent width={width} height={height} state={state}/>
      }else{
        throw new Error(`Mode ${mode} doesn't have a mapped content`);
      }
  }
}

Content.propTypes = {
  state: React.PropTypes.object.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired
};
