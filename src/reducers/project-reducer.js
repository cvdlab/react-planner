import {Seq, Map} from "immutable";
import {LOAD_PROJECT, NEW_PROJECT, OPEN_CATALOG, MODE_VIEWING_CATALOG} from '../constants';
import {State, Scene, Guide} from "../models";
import {loadLayerFromJSON} from '../utils/layer-operations';

export default function (state, action) {

  switch (action.type) {

    case NEW_PROJECT:
      return new State();

    case LOAD_PROJECT:
      return loadProject(state, action.data, action.catalog);

    case OPEN_CATALOG:
      return state.set('mode', MODE_VIEWING_CATALOG);

    default:
      return state;

  }
}


function loadProject(state, data, catalog) {

  let readGuides = guides => new Seq(guides)
    .map(guide => new Guide(guide)
      .set('properties', new Map(guide.properties))
    ).toMap();

  let readScene = scene => new Scene(scene)
    .set('layers', new Seq(scene.layers).map(layer => loadLayerFromJSON(layer, catalog)).toMap())
    .set('guides', readGuides(scene.guides))
    .set('selectedLayer', Object.keys(scene.layers)[0]);
  let scene = readScene(data);

  return new State({scene});
}

