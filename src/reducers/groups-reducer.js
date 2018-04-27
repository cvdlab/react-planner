import { select, unselectAll } from '../utils/layer-operations';
import { setAlterateState } from '../utils/layer-operations';

import {history} from '../utils/export';

import {GROUP_ACTIONS} from '../constants';

import { Group } from '../class/export';

export default function (state, action) {
  switch (action.type){
    case GROUP_ACTIONS.ADD_GROUP:
      //return selectGroup(state, action.groupID);
      console.log('ADD_GROUP');
      return Group.create( state );

    case GROUP_ACTIONS.SELECT_GROUP:
      //return selectGroup(state, action.groupID);
      console.log('SELECT_GROUP');
      return Group.select( state, action.groupID );

    case GROUP_ACTIONS.ADD_TO_GROUP:
      console.log('ADD_TO_GROUP');
      return Group.addElement( state, action.groupID, action.layerID, action.elementPrototype, action.elementID );

    case GROUP_ACTIONS.SET_GROUP_PROPERTIES:
      console.log('SET_GROUP_PROPERTIES', state);
      return Group.setProperties( state, action.groupID, action.properties );

    default:
      return state;
  }
}

