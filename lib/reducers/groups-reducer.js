'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (state, action) {

  state = state.merge({ sceneHistory: _export2.history.historyPush(state.sceneHistory, state.scene) });

  switch (action.type) {
    case _constants.GROUP_ACTIONS.ADD_GROUP:
      return _export.Group.create(state).updatedState;

    case _constants.GROUP_ACTIONS.ADD_GROUP_FROM_SELECTED:
      return _export.Group.createFromSelectedElements(state).updatedState;

    case _constants.GROUP_ACTIONS.SELECT_GROUP:
      return _export.Group.select(state, action.groupID).updatedState;

    case _constants.GROUP_ACTIONS.UNSELECT_GROUP:
      return _export.Group.unselect(state, action.groupID).updatedState;

    case _constants.GROUP_ACTIONS.ADD_TO_GROUP:
      return _export.Group.addElement(state, action.groupID, action.layerID, action.elementPrototype, action.elementID).updatedState;

    case _constants.GROUP_ACTIONS.REMOVE_FROM_GROUP:
      return _export.Group.removeElement(state, action.groupID, action.layerID, action.elementPrototype, action.elementID).updatedState;

    case _constants.GROUP_ACTIONS.SET_GROUP_ATTRIBUTES:
      return _export.Group.setAttributes(state, action.groupID, action.attributes).updatedState;

    case _constants.GROUP_ACTIONS.SET_GROUP_PROPERTIES:
      return _export.Group.setProperties(state, action.groupID, action.properties).updatedState;

    case _constants.GROUP_ACTIONS.SET_GROUP_BARYCENTER:
      return _export.Group.setBarycenter(state, action.groupID, action.barycenter.get('x'), action.barycenter.get('y')).updatedState;

    case _constants.GROUP_ACTIONS.REMOVE_GROUP:
      return _export.Group.remove(state, action.groupID).updatedState;

    case _constants.GROUP_ACTIONS.REMOVE_GROUP_AND_DELETE_ELEMENTS:
      return _export.Group.removeAndDeleteElements(state, action.groupID).updatedState;

    case _constants.GROUP_ACTIONS.GROUP_TRANSLATE:
      return _export.Group.translate(state, action.groupID, action.x, action.y).updatedState;

    case _constants.GROUP_ACTIONS.GROUP_ROTATE:
      return _export.Group.rotate(state, action.groupID, action.rotation).updatedState;

    default:
      return state;
  }
};

var _constants = require('../constants');

var _export = require('../class/export');

var _export2 = require('../utils/export');