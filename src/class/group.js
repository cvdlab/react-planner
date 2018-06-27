import {
  Project,
  Line,
  Hole,
  Item,
  Area,
  Layer,
  Vertex
} from './export';
import { Map, List } from 'immutable';
import { Group as GroupModel } from '../models';
import { IDBroker, MathUtils, GeometryUtils } from '../utils/export';

class Group{

  static select( state, groupID ){
    let layerList = state.getIn([ 'scene', 'groups', groupID, 'elements' ]);

    state = Project.setAlterate( state ).updatedState;

    layerList.entrySeq().forEach( ([groupLayerID, groupLayerElements]) => {
      state = Layer.unselectAll( state, groupLayerID ).updatedState;

      let lines = groupLayerElements.get('lines');
      let holes = groupLayerElements.get('holes');
      let items = groupLayerElements.get('items');
      let areas = groupLayerElements.get('areas');

      if( lines ) lines.forEach( lineID => { state = Line.select( state, groupLayerID, lineID ).updatedState; });
      if( holes ) holes.forEach( holeID => { state = Hole.select( state, groupLayerID, holeID ).updatedState; });
      if( items ) items.forEach( itemID => { state = Item.select( state, groupLayerID, itemID ).updatedState; });
      if( areas ) areas.forEach( areaID => { state = Area.select( state, groupLayerID, areaID ).updatedState; });
    });

    state = Project.setAlterate( state ).updatedState;

    let groups = state.getIn(['scene', 'groups']).map( g  => g.set('selected', false) );

    state = state.setIn(['scene', 'groups'], groups).setIn([ 'scene', 'groups', groupID, 'selected' ], true);

    return { updatedState: state };
  }

  static unselect( state, groupID ){
    let layerList = state.getIn([ 'scene', 'groups', groupID, 'elements' ]);
    let reduced = layerList.reduce( ( newState, layer, layerID ) => Layer.unselectAll( newState, layerID ).updatedState, state );
    state = reduced.setIn([ 'scene', 'groups', groupID, 'selected' ], false);

    return { updatedState: state };
  }

  static create( state ){
    let groupID = IDBroker.acquireID();

    state = state.setIn(['scene', 'groups', groupID], new GroupModel({ id: groupID, name: groupID}) );

    return { updatedState: state };
  }

  static createFromSelectedElements( state ){
    let groupID = IDBroker.acquireID();

    state = state.setIn(['scene', 'groups', groupID], new GroupModel({ id: groupID, name: groupID}) );

    state.getIn(['scene', 'layers']).forEach((layer) => {

      let layerID = layer.get('id');
      let layerElements = {
        'lines': layer.get('lines').filter( el => el.get('selected') ),
        'items': layer.get('items').filter( el => el.get('selected') ),
        'holes': layer.get('holes').filter( el => el.get('selected') ),
        'areas': layer.get('areas').filter( el => el.get('selected') )
      };

      for( let elementPrototype in layerElements ) {
        layerElements[elementPrototype].forEach( el => state = this.addElement( state, groupID, layerID, elementPrototype, el.get('id') ).updatedState );
      }
    });

    return {updatedState: state};
  }

  static addElement( state, groupID, layerID, elementPrototype, elementID ){
    let actualList = state.getIn(['scene', 'groups', groupID, 'elements', layerID, elementPrototype]) || new List();

    if( !actualList.contains(elementID) ) {
      state = state.setIn(['scene', 'groups', groupID, 'elements', layerID, elementPrototype], actualList.push(elementID));

      state = this.reloadBaricenter( state, groupID ).updatedState;
    }

    return { updatedState: state };
  }

  static setBarycenter( state, groupID, x, y ) {
    if (typeof x !== 'undefined') state = state.setIn(['scene', 'groups', groupID, 'x'], x);
    if (typeof y !== 'undefined') state = state.setIn(['scene', 'groups', groupID, 'y'], y);

    return { updatedState: state };
  }

  static reloadBaricenter( state, groupID ) {
    let layerList = state.getIn([ 'scene', 'groups', groupID, 'elements' ]);

    let { a, b, c, d, e, f, SVGHeight } = state.get('viewer2D').toJS();

    let m1 = [
      [ a, b, c ],
      [ d, e, f ],
      [ 0, 0, 1 ]
    ];

    let xBar = 0;
    let yBar = 0;
    let elementCount = 0;

    layerList.entrySeq().forEach( ([groupLayerID, groupLayerElements]) => {
      state = Layer.unselectAll( state, groupLayerID ).updatedState;

      let lines = groupLayerElements.get('lines');
      let holes = groupLayerElements.get('holes');
      let items = groupLayerElements.get('items');
      let areas = groupLayerElements.get('areas');

      if( lines ) lines.forEach( ( lineID ) => {
        let vertices = state.getIn(['scene', 'layers', groupLayerID, 'lines', lineID, 'vertices'])
          .map( vID => state.getIn(['scene', 'layers', groupLayerID, 'vertices', vID]) );

        let { x: x1, y: y1 } = vertices.get(0);
        let { x: x2, y: y2 } = vertices.get(1);
        let { x: xM, y: yM } = GeometryUtils.midPoint( x1, y1, x2, y2 );

        xBar += xM;
        yBar += yM;
        elementCount++;
      });

      if( holes ) holes.forEach( holeID => {
        let hole = state.getIn(['scene', 'layers', groupLayerID, 'holes', holeID]);
        let lineVertices = state.getIn(['scene', 'layers', groupLayerID, 'lines', hole.line, 'vertices'])
          .map( vID => state.getIn(['scene', 'layers', groupLayerID, 'vertices', vID]) );
        let { x: x1, y: y1 } = lineVertices.get(0);
        let { x: x2, y: y2 } = lineVertices.get(1);
        let { x, y } = GeometryUtils.extendLine( x1, y1, x2, y2, hole.offset * GeometryUtils.pointsDistance( x1, y1, x2, y2 ) );

        xBar += x;
        yBar += y;
        elementCount++;
      });

      if( items ) items.forEach( itemID => {
        let { x, y } = state.getIn(['scene', 'layers', groupLayerID, 'items', itemID]);

        xBar += x;
        yBar += y;
        elementCount++;
      });

      if( areas ) areas.forEach( areaID => {
        let areaVertices = state.getIn(['scene', 'layers', groupLayerID, 'areas', areaID, 'vertices'])
          .map( vID => state.getIn(['scene', 'layers', groupLayerID, 'vertices', vID]) ).toJS();
        let { x, y } = GeometryUtils.verticesMidPoint( areaVertices );

        xBar += x;
        yBar += y;
        elementCount++;
      });
    });

    if( elementCount ) {
      state = this.setBarycenter( state, groupID, xBar / elementCount, yBar / elementCount ).updatedState;
    }

    return { updatedState: state };
  }

  static removeElement( state, groupID, layerID, elementPrototype, elementID ) {
    let actualList = state.getIn(['scene', 'groups', groupID, 'elements', layerID, elementPrototype]);

    if( !actualList || !actualList.contains(elementID) )
    {
      return { updatedState: state };
    }

    state = state.setIn(['scene', 'groups', groupID, 'elements', layerID, elementPrototype], actualList.filterNot( el => el === elementID ));

    return { updatedState : state };
  }

  static setAttributes( state, groupID, attributes ){
    state = state.mergeIn(['scene', 'groups', groupID], attributes);

    return { updatedState : state };
  }

  static setProperties( state, groupID, properties ){
    state = state.mergeIn(['scene', 'groups', groupID, 'properties'], properties);

    return { updatedState : state };
  }

  static remove( state, groupID ) {
    state = state.removeIn(['scene', 'groups', groupID]);

    return { updatedState : state };
  }

  static removeAndDeleteElements( state, groupID ) {
    let layerList = state.getIn([ 'scene', 'groups', groupID, 'elements' ]);

    layerList.entrySeq().forEach( ([groupLayerID, groupLayerElements]) => {
      state = Layer.unselectAll( state, groupLayerID ).updatedState;

      let lines = groupLayerElements.get('lines');
      let holes = groupLayerElements.get('holes');
      let items = groupLayerElements.get('items');
      let areas = groupLayerElements.get('areas');

      if( lines ) {
        lines.forEach( lineID => {
          state = Line.remove( state, groupLayerID, lineID ).updatedState;
          state = Layer.detectAndUpdateAreas( state, groupLayerID ).updatedState;
        });
      }

      if( holes ) holes.forEach( holeID => { state = Hole.remove( state, groupLayerID, holeID ).updatedState; });
      if( items ) items.forEach( itemID => { state = Item.remove( state, groupLayerID, itemID ).updatedState; });
      //( actually ) no effect by area's destruction
      if( false && areas ) areas.forEach( areaID => { state = Area.remove( state, groupLayerID, areaID ).updatedState; });
    });

    state = state.deleteIn([ 'scene', 'groups', groupID ]);

    return { updatedState: state };
  }

  static translate( state, groupID, x, y ) {
    let deltaX = x - state.getIn(['scene', 'groups', groupID, 'x']);
    let deltaY = y - state.getIn(['scene', 'groups', groupID, 'y']);

    let layerList = state.getIn([ 'scene', 'groups', groupID, 'elements' ]);

    layerList.entrySeq().forEach( ([groupLayerID, groupLayerElements]) => {
      let lines = groupLayerElements.get('lines');
      //let holes = groupLayerElements.get('holes');
      let items = groupLayerElements.get('items');
      //let areas = groupLayerElements.get('areas');

      //move vertices instead lines avoiding multiple vertex translation
      if( lines ) {
        let vertices = {};
        lines.forEach( lineID => {
          let line = state.getIn(['scene', 'layers', groupLayerID, 'lines', lineID]);
          if( !vertices[ line.vertices.get(0) ] ) vertices[ line.vertices.get(0) ] = state.getIn(['scene', 'layers', groupLayerID, 'vertices', line.vertices.get(0)])
          if( !vertices[ line.vertices.get(1) ] ) vertices[ line.vertices.get(1) ] = state.getIn(['scene', 'layers', groupLayerID, 'vertices', line.vertices.get(1)])
        });

        for( let vertexID in vertices ) {
          let { x: xV, y: yV } = vertices[ vertexID ];
          state = Vertex.setAttributes( state, groupLayerID, vertexID, new Map({ x: xV + deltaX, y: yV + deltaY }) ).updatedState;
        }

        //need to be separated from setAttributes cycle
        for( let vertexID in vertices ) {
          state = Vertex.beginDraggingVertex( state, groupLayerID, vertexID ).updatedState;
          state = Vertex.endDraggingVertex( state ).updatedState;
        }
      }

      if( items ) state = items
        .map( itemID => state.getIn(['scene', 'layers', groupLayerID, 'items', itemID]) )
        .reduce( ( newState, item ) => {
          let { x: xI, y: yI } = item;
          return Item.setAttributes( newState, groupLayerID, item.id, new Map({ x: xI + deltaX, y: yI + deltaY }) ).updatedState;
        }, state );

      //translation of holes and areas should not take any effect
      //if( holes ) holes.forEach( holeID => { state = Hole.select( state, groupLayerID, holeID ).updatedState; });
      //if( areas ) areas.forEach( areaID => { state = Area.select( state, groupLayerID, areaID ).updatedState; });

      state = Layer.detectAndUpdateAreas( state, groupLayerID ).updatedState;
    });

    state = this.setBarycenter( state, groupID, x, y ).updatedState;

    state = Group.select( state, groupID ).updatedState;

    return { updatedState: state };
  }

  static rotate( state, groupID, newAlpha ) {


    let { x: barX, y: barY, rotation } = state.getIn(['scene', 'groups', groupID]);

    let alpha = newAlpha - rotation;

    state = Group.setAttributes( state, groupID, new Map({ rotation: newAlpha }) ).updatedState;

    let layerList = state.getIn([ 'scene', 'groups', groupID, 'elements' ]);

    layerList.entrySeq().forEach( ([groupLayerID, groupLayerElements]) => {
      let lines = groupLayerElements.get('lines');
      let holes = groupLayerElements.get('holes');
      let items = groupLayerElements.get('items');
      let areas = groupLayerElements.get('areas');

      //move vertices instead lines avoiding multiple vertex translation
      if( lines ) {
        let vertices = {};
        lines.forEach( lineID => {
          let line = state.getIn(['scene', 'layers', groupLayerID, 'lines', lineID]);
          if( !vertices[ line.vertices.get(0) ] ) vertices[ line.vertices.get(0) ] = state.getIn(['scene', 'layers', groupLayerID, 'vertices', line.vertices.get(0)])
          if( !vertices[ line.vertices.get(1) ] ) vertices[ line.vertices.get(1) ] = state.getIn(['scene', 'layers', groupLayerID, 'vertices', line.vertices.get(1)])
        });

        for( let vertexID in vertices ) {
          let { x: xV, y: yV } = vertices[ vertexID ];
          let { x: newX, y: newY } = GeometryUtils.rotatePointAroundPoint( xV, yV, barX, barY, alpha );
          state = Vertex.setAttributes( state, groupLayerID, vertexID, new Map({ x: newX, y: newY }) ).updatedState;
        }
        //need to be separated from setAttributes cycle
        for( let vertexID in vertices ) {
          state = Vertex.beginDraggingVertex( state, groupLayerID, vertexID ).updatedState;
          state = Vertex.endDraggingVertex( state ).updatedState;
        }
      }

      if( items ) state = items
        .map( itemID => state.getIn(['scene', 'layers', groupLayerID, 'items', itemID]) )
        .reduce( ( newState, item ) => {
          let { x: xI, y: yI, rotation: rI } = item;

          let { x: newX, y: newY } = GeometryUtils.rotatePointAroundPoint( xI, yI, barX, barY, alpha );

          return Item.setAttributes( newState, groupLayerID, item.id, new Map({ x: newX, y: newY, rotation: rI + alpha }) ).updatedState;
        }, state );

      //rotation of holes and areas should not take any effect
      //if( holes ) holes.forEach( holeID => { state = Hole.select( state, groupLayerID, holeID ).updatedState; });
      //if( areas ) areas.forEach( areaID => { state = Area.select( state, groupLayerID, areaID ).updatedState; });

      state = Layer.detectAndUpdateAreas( state, groupLayerID ).updatedState;
    });

    state = Group.select( state, groupID ).updatedState;

    return { updatedState: state };
  }

}

export { Group as default };
