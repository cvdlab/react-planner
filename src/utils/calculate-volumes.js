import {List} from 'immutable';
import IDBroker from 'shortid';
import {ElementVolume} from '../models';


export default function calculateVolumes(scene) {

  return new List().withMutations(list => {
    scene.layers.forEach(layer => {
      layer.lines.forEach(({id, type, width, height, thickness}) =>
        list.push(
          new ElementVolume({
            id: IDBroker.generate(),
            elementID: id,
            layerID: layer.id,
            type: type,
            prototype: "line",
            volume: height * thickness,
            composition: "cemento"
          }))
      );

      layer.holes.forEach(({id, type, width, height, thickness}) =>
        list.push(
          new ElementVolume({
            id: IDBroker.generate(),
            elementID: id,
            layerID: layer.id,
            type: type,
            prototype: "hole",
            volume: width * height * thickness,
            composition: "vetro"
          }))
      );

      layer.areas.forEach(({id, type, width, height, thickness}) =>
        list.push(
          new ElementVolume({
            id: IDBroker.generate(),
            elementID: id,
            layerID: layer.id,
            type: type,
            prototype: "area",
            volume: width * height,
            composition: "ceramica"
          }))
      )

    });
  });
}
