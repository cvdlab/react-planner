import { GROUP_ACTIONS } from '../constants';
import { Group } from '../class/export';
import { history } from '../utils/export';

export default function (state, action) {

  state = state.merge({ sceneHistory: history.historyPush(state.sceneHistory, state.scene) });

  switch (action.type) {
    case GROUP_ACTIONS.ADD_GROUP:
      return Group.create(state).updatedState;

    case GROUP_ACTIONS.ADD_GROUP_FROM_SELECTED:
      return Group.createFromSelectedElements(state).updatedState;

    case GROUP_ACTIONS.SELECT_GROUP:
      return Group.select(state, action.groupID).updatedState;

    case GROUP_ACTIONS.UNSELECT_GROUP:
      return Group.unselect(state, action.groupID).updatedState;

    case GROUP_ACTIONS.ADD_TO_GROUP:
      return Group.addElement(state, action.groupID, action.layerID, action.elementPrototype, action.elementID).updatedState;

    case GROUP_ACTIONS.REMOVE_FROM_GROUP:
      return Group.removeElement(state, action.groupID, action.layerID, action.elementPrototype, action.elementID).updatedState;

    case GROUP_ACTIONS.SET_GROUP_ATTRIBUTES:
      return Group.setAttributes(state, action.groupID, action.attributes).updatedState;

    case GROUP_ACTIONS.SET_GROUP_PROPERTIES:
      return Group.setProperties(state, action.groupID, action.properties).updatedState;

    case GROUP_ACTIONS.SET_GROUP_BARYCENTER:
      return Group.setBarycenter(state, action.groupID, action.barycenter.get('x'), action.barycenter.get('y')).updatedState;

    case GROUP_ACTIONS.REMOVE_GROUP:
      return Group.remove(state, action.groupID).updatedState;

    case GROUP_ACTIONS.REMOVE_GROUP_AND_DELETE_ELEMENTS:
      return Group.removeAndDeleteElements(state, action.groupID).updatedState;

    case GROUP_ACTIONS.GROUP_TRANSLATE:
      return Group.translate(state, action.groupID, action.x, action.y).updatedState;

    case GROUP_ACTIONS.GROUP_ROTATE:
      return Group.rotate(state, action.groupID, action.rotation).updatedState;

    default:
      return state;
  }
}