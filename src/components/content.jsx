import React from 'react';
import PropTypes from 'prop-types';
import Viewer2D from './viewer2d/viewer2d';
import Viewer3D from './viewer3d/viewer3d';
import Viewer3DFirstPerson from './viewer3d/viewer3d-first-person';
import CatalogList from './catalog-view/catalog-list';
import ProjectConfigurator from './configurator/project-configurator';

import * as constants from '../constants';

export default function Content({width, height, state, customContents}) {
  let mode = state.get('mode');

  switch (mode) {
    case constants.MODE_3D_VIEW:
      return <Viewer3D state={state} width={width} height={height}/>;

    case constants.MODE_3D_FIRST_PERSON:
      return <Viewer3DFirstPerson state={state} width={width} height={height}/>;

    case constants.MODE_VIEWING_CATALOG:
      return <CatalogList state={state} width={width} height={height}/>;

    case constants.MODE_IDLE:
    case constants.MODE_2D_ZOOM_IN:
    case constants.MODE_2D_ZOOM_OUT:
    case constants.MODE_2D_PAN:
    case constants.MODE_WAITING_DRAWING_LINE:
    case constants.MODE_DRAGGING_LINE:
    case constants.MODE_DRAGGING_VERTEX:
    case constants.MODE_DRAGGING_ITEM:
    case constants.MODE_DRAWING_LINE:
    case constants.MODE_DRAWING_HOLE:
    case constants.MODE_DRAWING_ITEM:
    case constants.MODE_DRAGGING_HOLE:
    case constants.MODE_ROTATING_ITEM:
      return <Viewer2D state={state} width={width} height={height}/>;

    case constants.MODE_CONFIGURING_PROJECT:
      return <ProjectConfigurator width={width} height={height} state={state}/>;

    default:
      if (customContents.hasOwnProperty(mode)) {
        let CustomContent = customContents[mode];
        return <CustomContent width={width} height={height} state={state}/>
      } else {
        throw new Error(`Mode ${mode} doesn't have a mapped content`);
      }
  }
}

Content.propTypes = {
  state: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired
};
