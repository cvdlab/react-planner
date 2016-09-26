import {List, Map, Iterable, fromJS, Seq} from "immutable";
import {ViewerHelper} from 'react-svg-pan-zoom';

import {LOAD_PROJECT, NEW_PROJECT} from '../constants';
import {State, Scene, Layer, Vertex, Line, Hole, Area, ElementsSet, Image} from "../models";
import Catalog from '../catalog/catalog'; // TODO: Use a catalog instance

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

  let catalog = new Catalog();

  let readVertex = vertex => new Vertex(vertex)
    .set('lines', new List(vertex.lines))
    .set('areas', new List(vertex.areas));

  let readLine = line => new Line(line)
    .set('type', catalog.getElement(line.type).name)
    .set('vertices', new List(line.vertices))
    .set('holes', new List(line.holes))
    .set('properties', new Map(line.properties || {}));

  let readHole = hole => new Hole(hole)
    .set('type', catalog.getElement(hole.type).name)
    .set('properties', new Map(hole.properties || {}));

  let readArea = area => new Area(area)
    .set('type', catalog.getElement(area.type).name)
    .set('vertices', new List(area.vertices))
    .set('properties', new Map(area.properties || {}));

  let readImage = image => new Image(image)
    .set('vertices', new List(image.vertices));

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
    .set('images', new Seq(layer.images).map(image => readImage(image)).toMap())
    .set('selected', layer.selected ? readElementsSet(layer.selected) : new ElementsSet());


  let readScene = scene => new Scene(scene)
    .set('layers', new Seq(scene.layers).map(layer => readLayer(layer)).toMap())
    .set('selectedLayer', Object.keys(scene.layers)[0]);

  let scene = readScene(data);


  return new State({scene});
}

