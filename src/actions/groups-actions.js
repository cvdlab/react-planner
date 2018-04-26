import { GROUP_ACTIONS } from '../constants';

export function addGroup() {
  return {
    type: GROUP_ACTIONS.ADD_GROUP
  };
}

export function selectGroup(groupID) {
  return {
    type: GROUP_ACTIONS.SELECT_GROUP,
    groupID
  };
}

export function addToGroup( groupID, layerID, elementPrototype, elementID ) {
  return {
    type: GROUP_ACTIONS.ADD_TO_GROUP,
    groupID,
    layerID,
    elementPrototype,
    elementID
  };
}
