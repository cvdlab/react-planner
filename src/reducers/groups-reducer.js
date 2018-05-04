import {GROUP_ACTIONS} from '../constants';

import { Group } from '../class/export';

export default function (state, action) {
  switch (action.type){
    case GROUP_ACTIONS.ADD_GROUP:
      console.log('ADD_GROUP');
      return Group.create( state ).updatedState;

    case GROUP_ACTIONS.ADD_GROUP_FROM_SELECTED:
      console.log('ADD_GROUP_FROM_SELECTED');
      return Group.createFromSelectedElements( state ).updatedState;

    case GROUP_ACTIONS.SELECT_GROUP:
      console.log('SELECT_GROUP');
      return Group.select( state, action.groupID ).updatedState;

    case GROUP_ACTIONS.UNSELECT_GROUP:
      console.log('UNSELECT_GROUP');
      return Group.unselect( state, action.groupID ).updatedState;

    case GROUP_ACTIONS.ADD_TO_GROUP:
      console.log('ADD_TO_GROUP');
      return Group.addElement( state, action.groupID, action.layerID, action.elementPrototype, action.elementID ).updatedState;

    case GROUP_ACTIONS.REMOVE_FROM_GROUP:
      console.log('REMOVE_FROM_GROUP');
      return Group.removeElement( state, action.groupID, action.layerID, action.elementPrototype, action.elementID ).updatedState;

    case GROUP_ACTIONS.SET_GROUP_PROPERTIES:
      console.log('SET_GROUP_PROPERTIES', state);
      return Group.setProperties( state, action.groupID, action.properties ).updatedState;

    case GROUP_ACTIONS.REMOVE_GROUP:
      console.log('REMOVE_GROUP', state);
      return Group.remove( state, action.groupID ).updatedState;

    case GROUP_ACTIONS.REMOVE_GROUP_AND_DELETE_ELEMENTS:
      console.log('REMOVE_GROUP_AND_DELETE_ELEMENTS', state);
      return Group.removeAndDeleteElements( state, action.groupID ).updatedState;

    default:
      return state;
  }
}

