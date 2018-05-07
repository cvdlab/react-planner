import { Map, List } from 'immutable';
import {
  MODE_VIEWING_CATALOG,
  MODE_CONFIGURING_PROJECT,
  MODE_IDLE
} from '../constants';

import { State, Catalog } from '../models';

import { history } from '../utils/export';

import { Layer, Group, Line, Hole, Item } from '../class/export';

class Project{

  static setAlterate( state ){
    console.log('setAlterate');
    return { updatedState: state.set('alterate', !state.alterate ) };
  }

  static openCatalog( state ) {
    console.log('openCatalog');
    state = this.rollback(state).updatedState;
    state = state.set('mode', MODE_VIEWING_CATALOG);

    return { updatedState: state };
  }

  static newProject() {
    console.log('newProject');
    return { updatedState: new State() };
  }

  static loadProject(state, sceneJSON) {
    console.log('loadProject');
    state = new State({ scene: sceneJSON, catalog: state.catalog.toJS() });
    return { updatedState: state };
  }

  static setProperties(state, layerID, properties) {
    console.log('setProperties');
    state = Layer.setPropertiesOnSelected( state, layerID, properties ).updatedState;

    state = state.merge({
      sceneHistory: history.historyPush(state.sceneHistory, state.scene)
    });

    return { updatedState: state };
  }

  static updateProperties(state, layerID, properties) {
    console.log('updateProperties');
    state = Layer.updatePropertiesOnSelected( state, layerID, properties ).updatedState;

    state = state.merge({
      sceneHistory: history.historyPush(state.sceneHistory, state.scene)
    });

    return { updatedState: state };
  }

  static setItemsAttributes(state, attributes) {
    console.log('setItemsAttributes');
    //TODO apply only to items
    state.getIn(['scene', 'layers']).forEach( layerID => { state = Layer.setAttributesOnSelected( state, layerID, attributes ).updatedState; } );

    state = state.merge({
      sceneHistory: history.historyPush(state.sceneHistory, state.scene)
    });

    return { updatedState: state };
  }

  static setLinesAttributes(state, attributes) {
    console.log('setLinesAttributes');
    //TODO apply only to lines
    state.getIn(['scene', 'layers']).forEach( layerID => { state = Layer.setAttributesOnSelected( state, layerID, attributes ).updatedState; } );

    state = state.merge({
      sceneHistory: history.historyPush(state.sceneHistory, state.scene)
    });

    return { updatedState: state };
  }

  static setHolesAttributes(state, attributes) {
    console.log('setHolesAttributes');
    //TODO apply only to holes
    state.getIn(['scene', 'layers']).forEach( layerID => { state = Layer.setAttributesOnSelected( state, layerID, attributes ).updatedState; } );

    state = state.merge({
      sceneHistory: history.historyPush(state.sceneHistory, state.scene)
    });

    return { updatedState: state };
  }

  static unselectAll(state) {
    console.log('unselectAll');
    state.getIn(['scene', 'layers']).forEach( ({ id: layerID }) => { state = Layer.unselectAll( state, layerID ).updatedState; });
    state.getIn(['scene', 'groups']).forEach( groupID => { state = Group.unselect( state, groupID ).updatedState; });

    state = state.merge({
      sceneHistory: history.historyPush(state.sceneHistory, state.scene)
    });

    return { updatedState: state };
  }

  static remove(state) {
    console.log('remove');
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

    state = state.merge({
      sceneHistory: history.historyPush(state.sceneHistory, state.scene)
    });

    return { updatedState: state };
  }

  static undo(state) {
    console.log('undo');
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
    console.log('rollback');
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
    console.log('setProjectProperties');
    let scene = state.scene.merge(properties);
    state = state.merge({
      mode: MODE_IDLE,
      scene,
      sceneHistory: history.historyPush(state.sceneHistory, scene)
    });

    return { updatedState: state };
  }

  static openProjectConfigurator(state) {
    console.log('openProjectConfigurator');
    state = state.merge({
      mode: MODE_CONFIGURING_PROJECT,
    });

    return { updatedState: state };
  }

  static initCatalog(state, catalog) {
    console.log('initCatalog');
    state = state.set('catalog', new Catalog(catalog));

    return { updatedState: state };
  }

  static updateMouseCoord(state, coords) {
    //console.log('updateMouseCoord');
    state = state.set('mouse', new Map(coords));

    return { updatedState: state };
  }

  static updateZoomScale(state, scale) {
    //console.log('updateZoomScale');
    state = state.set('zoom', scale);

    return { updatedState: state };
  }

  static toggleSnap(state, mask) {
    console.log('toggleSnap');
    state = state.set('snapMask', mask);
    return { updatedState: state };
  }

  static throwError(state, error) {
    console.log('throwError');
    state = state.set('errors', state.get('errors').push({
      date: Date.now(),
      error
    }));

    return { updatedState: state };
  }

  static throwWarning(state, warning) {
    console.log('throwWarning');
    state = state.set('warnings', state.get('warnings').push({
      date: Date.now(),
      warning
    }));

    return { updatedState: state };
  }

  static copyProperties(state, properties){
    console.log('copyProperties');
    state = state.set('clipboardProperties', properties.toJS());

    return { updatedState: state };
  }

  static pasteProperties(state) {
    console.log('pasteProperties');
    state = this.updateProperties(state, state.getIn(['scene', 'selectedLayer']), state.get('clipboardProperties')).updatedState;

    return { updatedState: state };
  }

  static pushLastSelectedCatalogElementToHistory(state, element) {
    console.log('pushLastSelectedCatalogElementToHistory');
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
    console.log('changeCatalogPage');
    state = state.setIn(['catalog', 'page'], newPage)
      .updateIn(['catalog', 'path'], path => path.push(oldPage));

    return { updatedState: state };
  }

  static goBackToCatalogPage( state, newPage ){
    console.log('goBackToCatalogPage');
    let pageIndex = state.catalog.path.findIndex(page => page === newPage);
    state =  state.setIn(['catalog', 'page'], newPage)
      .updateIn(['catalog', 'path'], path => path.take(pageIndex));

    return { updatedState: state };
  }

  static setMode( state, mode ){
    console.log('setMode');
    state = state.set('mode', mode);
    return { updatedState: state };
  }

}

export { Project as default };
