import {List, Map, Iterable, fromJS, Seq} from "immutable";
import {ViewerHelper} from 'react-svg-pan-zoom';

import {LOAD_PROJECT, NEW_PROJECT} from '../constants';
import {State, Scene, Layer, Vertex, Line, Hole, Area, ElementsSet, Image, Item} from "../models";
import Catalog from '../catalog/catalog'; // TODO: Use a catalog instance
import {loadLayerFromJSON} from '../utils/layer-operations';

export default function (state, action) {

  switch (action.type) {

    case NEW_PROJECT:
      return new State();

    case LOAD_PROJECT:
      return loadProject(state, action.data);

    default:
      return state;

  }
}


function loadProject(state, data) {
  let readScene = scene => new Scene(scene)
    .set('layers', new Seq(scene.layers).map(layer => loadLayerFromJSON(layer)))
    .set('selectedLayer', Object.keys(scene.layers)[0]);

  let scene = readScene(data);

  return new State({scene});
}

