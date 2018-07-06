'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addGroup = addGroup;
exports.addGroupFromSelected = addGroupFromSelected;
exports.selectGroup = selectGroup;
exports.unselectGroup = unselectGroup;
exports.addToGroup = addToGroup;
exports.removeFromGroup = removeFromGroup;
exports.setGroupAttributes = setGroupAttributes;
exports.setGroupProperties = setGroupProperties;
exports.setGroupBarycenter = setGroupBarycenter;
exports.removeGroup = removeGroup;
exports.removeGroupAndDeleteElements = removeGroupAndDeleteElements;
exports.groupTranslate = groupTranslate;
exports.groupRotate = groupRotate;

var _constants = require('../constants');

function addGroup() {
  return {
    type: _constants.GROUP_ACTIONS.ADD_GROUP
  };
}

function addGroupFromSelected() {
  return {
    type: _constants.GROUP_ACTIONS.ADD_GROUP_FROM_SELECTED
  };
}

function selectGroup(groupID) {
  return {
    type: _constants.GROUP_ACTIONS.SELECT_GROUP,
    groupID: groupID
  };
}

function unselectGroup(groupID) {
  return {
    type: _constants.GROUP_ACTIONS.UNSELECT_GROUP,
    groupID: groupID
  };
}

function addToGroup(groupID, layerID, elementPrototype, elementID) {
  return {
    type: _constants.GROUP_ACTIONS.ADD_TO_GROUP,
    groupID: groupID,
    layerID: layerID,
    elementPrototype: elementPrototype,
    elementID: elementID
  };
}

function removeFromGroup(groupID, layerID, elementPrototype, elementID) {
  return {
    type: _constants.GROUP_ACTIONS.REMOVE_FROM_GROUP,
    groupID: groupID,
    layerID: layerID,
    elementPrototype: elementPrototype,
    elementID: elementID
  };
}

function setGroupAttributes(groupID, attributes) {
  return {
    type: _constants.GROUP_ACTIONS.SET_GROUP_ATTRIBUTES,
    groupID: groupID,
    attributes: attributes
  };
}

function setGroupProperties(groupID, properties) {
  return {
    type: _constants.GROUP_ACTIONS.SET_GROUP_PROPERTIES,
    groupID: groupID,
    properties: properties
  };
}

function setGroupBarycenter(groupID, barycenter) {
  return {
    type: _constants.GROUP_ACTIONS.SET_GROUP_BARYCENTER,
    groupID: groupID,
    barycenter: barycenter
  };
}

function removeGroup(groupID) {
  return {
    type: _constants.GROUP_ACTIONS.REMOVE_GROUP,
    groupID: groupID
  };
}

function removeGroupAndDeleteElements(groupID) {
  return {
    type: _constants.GROUP_ACTIONS.REMOVE_GROUP_AND_DELETE_ELEMENTS,
    groupID: groupID
  };
}

function groupTranslate(groupID, x, y) {
  return {
    type: _constants.GROUP_ACTIONS.GROUP_TRANSLATE,
    groupID: groupID,
    x: x,
    y: y
  };
}

function groupRotate(groupID, rotation) {
  return {
    type: _constants.GROUP_ACTIONS.GROUP_ROTATE,
    groupID: groupID,
    rotation: rotation
  };
}