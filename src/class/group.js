import {
  Project,
  Line
} from './export';
import IDBroker from '../utils/id-broker';
import { Map } from 'immutable';
import { Group as GroupModel } from '../models';

class Group{

  static select( state, groupID ){
    console.log('select group');
    let group = state.scene.getIn([ 'groups', groupID ]);

    Project.setAlterate( state );

    group.entrySeq().forEach( groupLayer => {

      let groupLayerID = groupLayer[0];
      let groupLayerElements = groupLayer[1];

      let { lines, holes, items, areas } = groupLayerElements;

      lines.forEach( lineID => { Line.select( state, groupLayerID, lineID ); });
      //TODO per gli altri elementi

    });

    Project.setAlterate( state );

    return state;
  }

  static create( state ){
    let groupID = IDBroker.acquireID();
    return state.setIn(['scene', 'groups', groupID], new GroupModel({ id: groupID, name: groupID}) );
  }

  static addElement( state, groupID, layerID, elementPrototype, elementID ){
    console.log('TODO addElement', state, groupID, layerID, elementPrototype, elementID);
    return state;
  }

}

export { Group as default };
