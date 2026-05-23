import { Map, List } from 'immutable';
import {
  MODE_VIEWING_CATALOG,
  MODE_CONFIGURING_PROJECT,
  MODE_IDLE
} from '../constants';
import { State, Catalog } from '../models';
import { history } from '../utils/export';
import {
  Layer,
  Group,
  Line,
  Hole,
  Item,
  HorizontalGuide,
  VerticalGuide
} from '../class/export';

class Project{

  static setAlterate( state ){
    return { updatedState: state.set('alterate', !state.alterate ) };
  }

  static openCatalog( state ) {
    state = this.setMode( state, MODE_VIEWING_CATALOG ).updatedState;

    return { updatedState: state };
  }

  static newProject(state) {
    state = new State({'viewer2D': state.get('viewer2D')});

    return { updatedState: state };
  }

  static loadProject(state, sceneJSON) {
    state = new State({ scene: sceneJSON, catalog: state.catalog.toJS() });

    return { updatedState: state };
  }

  static setProperties(state, layerID, properties) {
    state = Layer.setPropertiesOnSelected( state, layerID, properties ).updatedState;

    return { updatedState: state };
  }

  static updateProperties(state, layerID, properties) {
    state = Layer.updatePropertiesOnSelected( state, layerID, properties ).updatedState;

    return { updatedState: state };
  }

  static setItemsAttributes(state, attributes) {
    //TODO apply only to items
    state.getIn(['scene', 'layers']).forEach( layer => { state = Layer.setAttributesOnSelected( state, layer.id, attributes ).updatedState; } );

    return { updatedState: state };
  }

  static setLinesAttributes(state, attributes) {
    //TODO apply only to lines
    state.getIn(['scene', 'layers']).forEach( layer => { state = Layer.setAttributesOnSelected( state, layer.id, attributes ).updatedState; } );

    return { updatedState: state };
  }

  static setHolesAttributes(state, attributes) {
    //TODO apply only to holes
    state.getIn(['scene', 'layers']).forEach( layer => { state = Layer.setAttributesOnSelected( state, layer.id, attributes ).updatedState; } );

    return { updatedState: state };
  }

  static unselectAll(state) {
    state.getIn(['scene', 'layers']).forEach( ({ id: layerID }) => { state = Layer.unselectAll( state, layerID ).updatedState; });
    state.getIn(['scene', 'groups']).forEach( group => { state = Group.unselect( state, group.get('id') ).updatedState; });

    return { updatedState: state };
  }

  static remove(state) {
    let selectedLayer = state.getIn(['scene', 'selectedLayer']);
    let {
      lines: selectedLines,
      holes: selectedHoles,
      items: selectedItems
    } = state.getIn(['scene', 'layers', selectedLayer, 'selected']);

    state = Layer.unselectAll( state, selectedLayer ).updatedState;

    selectedLines.forEach(lineID => { state = Line.remove( state, selectedLayer, lineID ).updatedState; });
    selectedHoles.forEach(holeID => { state = Hole.remove( state, selectedLayer, holeID ).updatedState; });
    selectedItems.forEach(itemID => { state = Item.remove( state, selectedLayer, itemID ).updatedState; });

    state = Layer.detectAndUpdateAreas( state, selectedLayer ).updatedState;

    return { updatedState: state };
  }

  static undo(state) {
    let sceneHistory = state.sceneHistory;
    if (state.scene === sceneHistory.last && sceneHistory.list.size > 1) {
      sceneHistory = history.historyPop(sceneHistory);
    }

    state = state.merge({
      mode: MODE_IDLE,
      scene: sceneHistory.last,
      sceneHistory: history.historyPop(sceneHistory)
    });

    return { updatedState: state };
  }

  static rollback(state) {
    let sceneHistory = state.sceneHistory;

    if (!sceneHistory.last && sceneHistory.list.isEmpty()) {
      return { updatedState: state };
    }

    state = this.unselectAll( state ).updatedState;

    state = state.merge({
      mode: MODE_IDLE,
      scene: sceneHistory.last,
      sceneHistory: history.historyPush(sceneHistory, sceneHistory.last),
      snapElements: new List(),
      activeSnapElement: null,
      drawingSupport: new Map(),
      draggingSupport: new Map(),
      rotatingSupport: new Map(),
    });

    return { updatedState: state };
  }

  static setProjectProperties(state, properties) {
    let scene = state.scene.merge(properties);
    state = state.merge({
      mode: MODE_IDLE,
      scene
    });

    return { updatedState: state };
  }

  static openProjectConfigurator(state) {
    state = state.merge({
      mode: MODE_CONFIGURING_PROJECT,
    });

    return { updatedState: state };
  }

  static initCatalog(state, catalog) {
    state = state.set('catalog', new Catalog(catalog));

    return { updatedState: state };
  }

  static updateMouseCoord(state, coords) {
    state = state.set('mouse', new Map(coords));

    return { updatedState: state };
  }

  static updateZoomScale(state, scale) {
    state = state.set('zoom', scale);

    return { updatedState: state };
  }

  static toggleSnap(state, mask) {
    state = state.set('snapMask', mask);
    return { updatedState: state };
  }

  static throwError(state, error) {
    state = state.set('errors', state.get('errors').push({
      date: Date.now(),
      error
    }));

    return { updatedState: state };
  }

  static throwWarning(state, warning) {
    state = state.set('warnings', state.get('warnings').push({
      date: Date.now(),
      warning
    }));

    return { updatedState: state };
  }

  static copyProperties(state, properties){
    state = state.set('clipboardProperties', properties);

    return { updatedState: state };
  }

  static pasteProperties(state) {
    state = this.updateProperties(state, state.getIn(['scene', 'selectedLayer']), state.get('clipboardProperties')).updatedState;

    return { updatedState: state };
  }

  static pushLastSelectedCatalogElementToHistory(state, element) {
    let currHistory = state.selectedElementsHistory;

    let previousPosition = currHistory.findIndex(el => el.name === element.name);
    if (previousPosition !== -1) {
      currHistory = currHistory.splice(previousPosition, 1);
    }
    currHistory = currHistory.splice(0, 0, element);

    state = state.set('selectedElementsHistory', currHistory);
    return { updatedState: state };
  }

  static changeCatalogPage( state, oldPage, newPage ) {
    state = state.setIn(['catalog', 'page'], newPage)
      .updateIn(['catalog', 'path'], path => path.push(oldPage));

    return { updatedState: state };
  }

  static goBackToCatalogPage( state, newPage ){
    let pageIndex = state.catalog.path.findIndex(page => page === newPage);
    state =  state.setIn(['catalog', 'page'], newPage)
      .updateIn(['catalog', 'path'], path => path.take(pageIndex));

    return { updatedState: state };
  }

  static setMode( state, mode ){
    state = state.set('mode', mode);
    return { updatedState: state };
  }

  static addHorizontalGuide( state, coordinate ){
    state = HorizontalGuide.create( state, coordinate ).updatedState;

    return { updatedState: state };
  }

  static addVerticalGuide( state, coordinate ){
    state = VerticalGuide.create( state, coordinate ).updatedState;

    return { updatedState: state };
  }

  static addCircularGuide( state, x, y, radius ){
    console.log('adding horizontal guide at', x, y, radius);

    return { updatedState: state };
  }

  static removeHorizontalGuide( state, guideID ){
    state = HorizontalGuide.remove( state, guideID ).updatedState;

    return { updatedState: state };
  }

  static removeVerticalGuide( state, guideID ){
    state = VerticalGuide.remove( state, guideID ).updatedState;

    return { updatedState: state };
  }

  static removeCircularGuide( state, guideID ){
    console.log('removeing horizontal guide ', guideID);

    return { updatedState: state };
  }

}

export { Project as default };
