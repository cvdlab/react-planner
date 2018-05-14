import {GROUP_ACTIONS} from '../constants';
import { Group } from '../class/export';

export default function (state, action) {
  switch (action.type){
    case GROUP_ACTIONS.ADD_GROUP:
      return Group.create( state ).updatedState;

    case GROUP_ACTIONS.ADD_GROUP_FROM_SELECTED:
      return Group.createFromSelectedElements( state ).updatedState;

    case GROUP_ACTIONS.SELECT_GROUP:
      return Group.select( state, action.groupID ).updatedState;

    case GROUP_ACTIONS.UNSELECT_GROUP:
      return Group.unselect( state, action.groupID ).updatedState;

    case GROUP_ACTIONS.ADD_TO_GROUP:
      return Group.addElement( state, action.groupID, action.layerID, action.elementPrototype, action.elementID ).updatedState;

    case GROUP_ACTIONS.REMOVE_FROM_GROUP:
      return Group.removeElement( state, action.groupID, action.layerID, action.elementPrototype, action.elementID ).updatedState;

    case GROUP_ACTIONS.SET_GROUP_ATTRIBUTES:
      return Group.setAttributes( state, action.groupID, action.attributes ).updatedState;

    case GROUP_ACTIONS.SET_GROUP_PROPERTIES:
      return Group.setProperties( state, action.groupID, action.properties ).updatedState;

    case GROUP_ACTIONS.REMOVE_GROUP:
      return Group.remove( state, action.groupID ).updatedState;

    case GROUP_ACTIONS.REMOVE_GROUP_AND_DELETE_ELEMENTS:
      return Group.removeAndDeleteElements( state, action.groupID ).updatedState;

    default:
      return state;
  }
}

