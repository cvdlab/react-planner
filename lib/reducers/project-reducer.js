'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state, action) {

  switch (action.type) {
    case _constants.NEW_PROJECT:
      return _export2.Project.newProject(state).updatedState;

    case _constants.LOAD_PROJECT:
      return _export2.Project.loadProject(state, action.sceneJSON).updatedState;

    case _constants.OPEN_CATALOG:
      return _export2.Project.openCatalog(state).updatedState;

    case _constants.CHANGE_CATALOG_PAGE:
      return _export2.Project.changeCatalogPage(state, action.oldPage, action.newPage).updatedState;

    case _constants.GO_BACK_TO_CATALOG_PAGE:
      return _export2.Project.goBackToCatalogPage(state, action.newPage).updatedState;

    case _constants.SELECT_TOOL_EDIT:
      return _export2.Project.setMode(state, _constants.MODE_IDLE).updatedState;

    case _constants.UNSELECT_ALL:
      return _export2.Project.unselectAll(state).updatedState;

    case _constants.SET_PROPERTIES:
      state = state.merge({ sceneHistory: _export.history.historyPush(state.sceneHistory, state.scene) });
      return _export2.Project.setProperties(state, state.getIn(['scene', 'selectedLayer']), action.properties).updatedState;

    case _constants.SET_ITEMS_ATTRIBUTES:
      state = state.merge({ sceneHistory: _export.history.historyPush(state.sceneHistory, state.scene) });
      return _export2.Project.setItemsAttributes(state, action.itemsAttributes).updatedState;

    case _constants.SET_LINES_ATTRIBUTES:
      state = state.merge({ sceneHistory: _export.history.historyPush(state.sceneHistory, state.scene) });
      return _export2.Project.setLinesAttributes(state, action.linesAttributes).updatedState;

    case _constants.SET_HOLES_ATTRIBUTES:
      state = state.merge({ sceneHistory: _export.history.historyPush(state.sceneHistory, state.scene) });
      return _export2.Project.setHolesAttributes(state, action.holesAttributes).updatedState;

    case _constants.REMOVE:
      state = state.merge({ sceneHistory: _export.history.historyPush(state.sceneHistory, state.scene) });
      return _export2.Project.remove(state).updatedState;

    case _constants.UNDO:
      return _export2.Project.undo(state).updatedState;

    case _constants.ROLLBACK:
      return _export2.Project.rollback(state).updatedState;

    case _constants.SET_PROJECT_PROPERTIES:
      state = state.merge({ sceneHistory: _export.history.historyPush(state.sceneHistory, state.scene) });
      return _export2.Project.setProjectProperties(state, action.properties).updatedState;

    case _constants.OPEN_PROJECT_CONFIGURATOR:
      state = state.merge({ sceneHistory: _export.history.historyPush(state.sceneHistory, state.scene) });
      return _export2.Project.openProjectConfigurator(state).updatedState;

    case _constants.INIT_CATALOG:
      return _export2.Project.initCatalog(state, action.catalog).updatedState;

    case _constants.UPDATE_MOUSE_COORDS:
      return _export2.Project.updateMouseCoord(state, action.coords).updatedState;

    case _constants.UPDATE_ZOOM_SCALE:
      return _export2.Project.updateZoomScale(state, action.scale).updatedState;

    case _constants.TOGGLE_SNAP:
      return _export2.Project.toggleSnap(state, action.mask).updatedState;

    case _constants.THROW_ERROR:
      return _export2.Project.throwError(state, action.error).updatedState;

    case _constants.THROW_WARNING:
      return _export2.Project.throwWarning(state, action.warning).updatedState;

    case _constants.COPY_PROPERTIES:
      return _export2.Project.copyProperties(state, action.properties).updatedState;

    case _constants.PASTE_PROPERTIES:
      state = state.merge({ sceneHistory: _export.history.historyPush(state.sceneHistory, state.scene) });
      return _export2.Project.pasteProperties(state).updatedState;

    case _constants.PUSH_LAST_SELECTED_CATALOG_ELEMENT_TO_HISTORY:
      return _export2.Project.pushLastSelectedCatalogElementToHistory(state, action.element).updatedState;

    case _constants.ALTERATE_STATE:
      return _export2.Project.setAlterate(state).updatedState;

    case _constants.SET_MODE:
      return _export2.Project.setMode(state, action.mode).updatedState;

    case _constants.ADD_HORIZONTAL_GUIDE:
      state = state.merge({ sceneHistory: _export.history.historyPush(state.sceneHistory, state.scene) });
      return _export2.Project.addHorizontalGuide(state, action.coordinate).updatedState;

    case _constants.ADD_VERTICAL_GUIDE:
      return _export2.Project.addVerticalGuide(state, action.coordinate).updatedState;

    case _constants.ADD_CIRCULAR_GUIDE:
      return _export2.Project.addCircularGuide(state, action.x, action.y, action.radius).updatedState;

    case _constants.REMOVE_HORIZONTAL_GUIDE:
      return _export2.Project.removeHorizontalGuide(state, action.guideID).updatedState;

    case _constants.REMOVE_VERTICAL_GUIDE:
      return _export2.Project.removeVerticalGuide(state, action.guideID).updatedState;

    case _constants.REMOVE_CIRCULAR_GUIDE:
      return _export2.Project.removeCircularGuide(state, action.guideID).updatedState;

    default:
      return state;

  }
};

var _export = require('../utils/export');

var _constants = require('../constants');

var _export2 = require('../class/export');