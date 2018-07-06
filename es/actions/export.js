import * as projectActions from './project-actions';
import * as viewer2DActions from './viewer2d-actions';
import * as viewer3DActions from './viewer3d-actions';
import * as linesActions from './lines-actions';
import * as holesActions from './holes-actions';
import * as sceneActions from './scene-actions';
import * as verticesActions from './vertices-actions';
import * as itemsActions from './items-actions';
import * as areaActions from './area-actions';
import * as groupsActions from './groups-actions';

export { projectActions, viewer2DActions, viewer3DActions, linesActions, holesActions, sceneActions, verticesActions, itemsActions, areaActions, groupsActions };

export default {
  projectActions: projectActions,
  viewer2DActions: viewer2DActions,
  viewer3DActions: viewer3DActions,
  linesActions: linesActions,
  holesActions: holesActions,
  sceneActions: sceneActions,
  verticesActions: verticesActions,
  itemsActions: itemsActions,
  areaActions: areaActions,
  groupsActions: groupsActions
};