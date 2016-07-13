import {List, Map, Iterable, fromJS, Seq} from "immutable";
import {ViewerHelper} from 'react-svg-pan-zoom';

import {LOAD_PROJECT, NEW_PROJECT} from '../constants';
import {State, Scene, Layer, Vertex, Line, Hole, Area, ElementsSet} from "../models";
import SceneComponents from '../scene-components/scene-components';

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

  let readVertex = vertex => new Vertex(vertex)
    .set('lines', new List(vertex.lines))
    .set('areas', new List(vertex.areas));

  let readLine = line => new Line(line)
    .set('type', SceneComponents.hasOwnProperty(line.type) ? line.type : SceneComponents.defaultLine.name)
    .set('vertices', new List(line.vertices))
    .set('holes', new List(line.holes));

  let readHole = hole => new Hole(hole)
    .set('type', SceneComponents.hasOwnProperty(hole.type) ? hole.type : SceneComponents.defaultHole.name);

  let readArea = area => new Area(area)
    .set('type', SceneComponents.hasOwnProperty(area.type) ? area.type : SceneComponents.defaultArea.name)
    .set('vertices', new List(area.vertices));

  let readElementsSet = (elementsSet => {
    return new ElementsSet({
      lines: new List(elementsSet.lines),
      areas: new List(elementsSet.areas),
      holes: new List(elementsSet.holes)
    });
  });


  let readLayer = layer => new Layer(layer)
    .set('vertices', new Seq(layer.vertices).map(vertex => readVertex(vertex)).toMap())
    .set('lines', new Seq(layer.lines).map(line => readLine(line)).toMap())
    .set('holes', new Seq(layer.holes).map(hole => readHole(hole)).toMap())
    .set('areas', new Seq(layer.areas).map(area => readArea(area)).toMap())
    .set('selected', layer.selected ? readElementsSet(layer.selected) : new ElementsSet());


  let readScene = scene => new Scene(scene)
    .set('layers', new Seq(scene.layers).map(layer => readLayer(layer)).toMap());

  let scene = readScene(data);


  return state.set('scene', scene)
    .set('viewer2D', new Map()); //reset 2d camera
}

