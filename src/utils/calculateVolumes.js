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
            base: "line",
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
            base: "hole",
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
            base: "area",
            volume: width * height,
            composition: "ceramica"
          }))
      )

    });
  });
}
