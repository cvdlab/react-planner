import { GROUP_ACTIONS } from '../constants';

export function addGroup() {
  return {
    type: GROUP_ACTIONS.ADD_GROUP
  };
}

export function addGroupFromSelected() {
  return {
    type: GROUP_ACTIONS.ADD_GROUP_FROM_SELECTED
  };
}

export function selectGroup(groupID) {
  return {
    type: GROUP_ACTIONS.SELECT_GROUP,
    groupID: groupID
  };
}

export function unselectGroup(groupID) {
  return {
    type: GROUP_ACTIONS.UNSELECT_GROUP,
    groupID: groupID
  };
}

export function addToGroup(groupID, layerID, elementPrototype, elementID) {
  return {
    type: GROUP_ACTIONS.ADD_TO_GROUP,
    groupID: groupID,
    layerID: layerID,
    elementPrototype: elementPrototype,
    elementID: elementID
  };
}

export function removeFromGroup(groupID, layerID, elementPrototype, elementID) {
  return {
    type: GROUP_ACTIONS.REMOVE_FROM_GROUP,
    groupID: groupID,
    layerID: layerID,
    elementPrototype: elementPrototype,
    elementID: elementID
  };
}

export function setGroupAttributes(groupID, attributes) {
  return {
    type: GROUP_ACTIONS.SET_GROUP_ATTRIBUTES,
    groupID: groupID,
    attributes: attributes
  };
}

export function setGroupProperties(groupID, properties) {
  return {
    type: GROUP_ACTIONS.SET_GROUP_PROPERTIES,
    groupID: groupID,
    properties: properties
  };
}

export function setGroupBarycenter(groupID, barycenter) {
  return {
    type: GROUP_ACTIONS.SET_GROUP_BARYCENTER,
    groupID: groupID,
    barycenter: barycenter
  };
}

export function removeGroup(groupID) {
  return {
    type: GROUP_ACTIONS.REMOVE_GROUP,
    groupID: groupID
  };
}

export function removeGroupAndDeleteElements(groupID) {
  return {
    type: GROUP_ACTIONS.REMOVE_GROUP_AND_DELETE_ELEMENTS,
    groupID: groupID
  };
}

export function groupTranslate(groupID, x, y) {
  return {
    type: GROUP_ACTIONS.GROUP_TRANSLATE,
    groupID: groupID,
    x: x,
    y: y
  };
}

export function groupRotate(groupID, rotation) {
  return {
    type: GROUP_ACTIONS.GROUP_ROTATE,
    groupID: groupID,
    rotation: rotation
  };
}