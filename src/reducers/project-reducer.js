import { history } from '../utils/export';
import {
  LOAD_PROJECT,
  NEW_PROJECT,
  OPEN_CATALOG,
  SELECT_TOOL_EDIT,
  MODE_IDLE,
  UNSELECT_ALL,
  SET_PROPERTIES,
  SET_ITEMS_ATTRIBUTES,
  SET_LINES_ATTRIBUTES,
  SET_HOLES_ATTRIBUTES,
  REMOVE,
  UNDO,
  ROLLBACK,
  SET_PROJECT_PROPERTIES,
  OPEN_PROJECT_CONFIGURATOR,
  INIT_CATALOG,
  UPDATE_MOUSE_COORDS,
  UPDATE_ZOOM_SCALE,
  TOGGLE_SNAP,
  CHANGE_CATALOG_PAGE,
  GO_BACK_TO_CATALOG_PAGE,
  THROW_ERROR,
  THROW_WARNING,
  COPY_PROPERTIES,
  PASTE_PROPERTIES,
  PUSH_LAST_SELECTED_CATALOG_ELEMENT_TO_HISTORY,
  ALTERATE_STATE
} from '../constants';

import { Project } from '../class/export';

export default function (state, action) {

  switch (action.type) {
    case NEW_PROJECT:
      return Project.newProject(state).updatedState;

    case LOAD_PROJECT:
      return Project.loadProject(state, action.sceneJSON).updatedState;

    case OPEN_CATALOG:
      return Project.openCatalog(state).updatedState;

    case CHANGE_CATALOG_PAGE:
      return Project.changeCatalogPage( state, action.oldPage, action.newPage ).updatedState;

    case GO_BACK_TO_CATALOG_PAGE:
      return Project.goBackToCatalogPage( state, action.newPage ).updatedState;

    case SELECT_TOOL_EDIT:
      return Project.setMode(state, MODE_IDLE).updatedState;

    case UNSELECT_ALL:
      return Project.unselectAll(state).updatedState;

    case SET_PROPERTIES:
      state = state.merge({ sceneHistory: history.historyPush(state.sceneHistory, state.scene) });
      return Project.setProperties(state, state.getIn(['scene', 'selectedLayer']), action.properties).updatedState;

    case SET_ITEMS_ATTRIBUTES:
      state = state.merge({ sceneHistory: history.historyPush(state.sceneHistory, state.scene) });
      return Project.setItemsAttributes(state, action.itemsAttributes).updatedState;

    case SET_LINES_ATTRIBUTES:
      state = state.merge({ sceneHistory: history.historyPush(state.sceneHistory, state.scene) });
      return Project.setLinesAttributes(state, action.linesAttributes).updatedState;

    case SET_HOLES_ATTRIBUTES:
      state = state.merge({ sceneHistory: history.historyPush(state.sceneHistory, state.scene) });
      return Project.setHolesAttributes(state, action.holesAttributes).updatedState;

    case REMOVE:
      state = state.merge({ sceneHistory: history.historyPush(state.sceneHistory, state.scene) });
      return Project.remove(state).updatedState;

    case UNDO:
      return Project.undo(state).updatedState;

    case ROLLBACK:
      return Project.rollback(state).updatedState;

    case SET_PROJECT_PROPERTIES:
      state = state.merge({ sceneHistory: history.historyPush(state.sceneHistory, state.scene) });
      return Project.setProjectProperties(state, action.properties).updatedState;

    case OPEN_PROJECT_CONFIGURATOR:
      state = state.merge({ sceneHistory: history.historyPush(state.sceneHistory, state.scene) });
      return Project.openProjectConfigurator(state).updatedState;

    case INIT_CATALOG:
      return Project.initCatalog(state, action.catalog).updatedState;

    case UPDATE_MOUSE_COORDS:
      return Project.updateMouseCoord(state, action.coords).updatedState;

    case UPDATE_ZOOM_SCALE:
      return Project.updateZoomScale(state, action.scale).updatedState;

    case TOGGLE_SNAP:
      return Project.toggleSnap(state, action.mask).updatedState;

    case THROW_ERROR:
      return Project.throwError(state, action.error).updatedState;

    case THROW_WARNING:
      return Project.throwWarning(state, action.warning).updatedState;

    case COPY_PROPERTIES:
      return Project.copyProperties(state, action.properties).updatedState;

    case PASTE_PROPERTIES:
      return Project.pasteProperties(state).updatedState;

    case PUSH_LAST_SELECTED_CATALOG_ELEMENT_TO_HISTORY:
      return Project.pushLastSelectedCatalogElementToHistory(state, action.element).updatedState;

    case ALTERATE_STATE:
      return Project.setAlterate( state ).updatedState;

    default:
      return state;

  }
}
