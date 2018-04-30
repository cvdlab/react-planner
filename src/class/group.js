import {
  Project,
  Line
} from './export';
import IDBroker from '../utils/id-broker';
import { List } from 'immutable';
import { Group as GroupModel } from '../models';

class Group{

  static select( state, groupID ){
    let layerList = state.getIn([ 'scene', 'groups', groupID, 'elements' ]);

    state = Project.setAlterate( state );

    layerList.entrySeq().forEach( ([groupLayerID, groupLayerElements]) => {

      let lines = groupLayerElements.get('lines');
      let holes = groupLayerElements.get('holes');
      let items = groupLayerElements.get('items');
      let areas = groupLayerElements.get('areas');

      if( lines ) lines.forEach( lineID => { state = Line.select( state, groupLayerID, lineID ); });
      //TODO per gli altri elementi

    });

    state = Project.setAlterate( state );

    let groups = state.getIn(['scene', 'groups']).map( g  => g.set('selected', false) );

    return state.setIn(['scene', 'groups'], groups).setIn([ 'scene', 'groups', groupID, 'selected' ], true);
  }

  static unselect( state, groupID ){
    return state.setIn([ 'scene', 'groups', groupID, 'selected' ], false);
  }

  static create( state ){
    console.log('create', state);
    let groupID = IDBroker.acquireID();
    return state.setIn(['scene', 'groups', groupID], new GroupModel({ id: groupID, name: groupID}) );
  }

  static addElement( state, groupID, layerID, elementPrototype, elementID ){
    console.log('addElement', state, groupID, layerID, elementPrototype, elementID);
    let actualList = state.getIn(['scene', 'groups', groupID, 'elements', layerID, elementPrototype]) || new List();

    if( actualList.contains(elementID) )
    {
      console.log('damn', actualList, elementID, actualList.contains(elementID));
      return state;
    }

    return state.setIn(['scene', 'groups', groupID, 'elements', layerID, elementPrototype], actualList.push(elementID));
  }

  static removeElement( state, groupID, layerID, elementPrototype, elementID ) {
    console.log('removeElement', state, groupID, layerID, elementPrototype, elementID, state.removeIn(['scene', 'groups', groupID, 'elements', layerID, elementPrototype, elementID]).toJS());
    let actualList = state.getIn(['scene', 'groups', groupID, 'elements', layerID, elementPrototype]);

    if( !actualList || !actualList.contains(elementID) )
    {
      console.log('damn', actualList, elementID, actualList.contains(elementID));
      return state;
    }

    return state.setIn(['scene', 'groups', groupID, 'elements', layerID, elementPrototype], actualList.filterNot( el => el === elementID ));
  }

  static setProperties( state, groupID, properties ){
    console.log('setProperties', state);
    return state.mergeIn(['scene', 'groups', groupID], properties);
  }

  static remove( state, groupID ) {
    console.log('remove', state, groupID);
    return state.removeIn(['scene', 'groups', groupID]);
  }

}

export { Group as default };
