import {
  Project,
  Line
} from './export';
import IDBroker from '../utils/id-broker';
import { Map, List } from 'immutable';
import { Group as GroupModel } from '../models';

class Group{

  static select( state, groupID ){
    console.log('select group');
    let layerList = state.getIn([ 'scene', 'groups', groupID, 'elements' ]);

    Project.setAlterate( state );

    layerList.entrySeq().forEach( ([groupLayerID, groupLayerElements]) => {

      let { lines, holes, items, areas } = groupLayerElements;

      if( lines ) lines.forEach( lineID => { Line.select( state, groupLayerID, lineID ); });
      //TODO per gli altri elementi

    });

    Project.setAlterate( state );

    let groups = state.getIn(['scene', 'groups']).map( g  => g.set('selected', false) );

    return state.setIn(['scene', 'groups'], groups).setIn([ 'scene', 'groups', groupID, 'selected' ], true);
  }

  static create( state ){
    console.log('create', state);
    let groupID = IDBroker.acquireID();
    return state.setIn(['scene', 'groups', groupID], new GroupModel({ id: groupID, name: groupID}) );
  }

  static addElement( state, groupID, layerID, elementPrototype, elementID ){
    console.log('addElement', state, groupID, layerID, elementPrototype, elementID);
    let actualList = state.getIn(['scene', 'groups', groupID, 'elements', layerID, elementPrototype]) || new List();
    return state.setIn(['scene', 'groups', groupID, 'elements', layerID, elementPrototype], actualList.push(elementID));
  }

  static setProperties( state, groupID, properties ){
    console.log('setProperties', state);
    return state.mergeIn(['scene', 'groups', groupID], properties);
  }

}

export { Group as default };
