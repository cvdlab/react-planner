import {List} from 'immutable';
import IDBroker from 'shortid';
import {ElementVolume} from '../models';


export default function calculateVolumes(scene) {

  let {pixelPerUnit} = scene;

  return new List().withMutations(list => {
    scene.layers.forEach(layer => {
      let {vertices, lines} = layer;

      layer.lines.forEach(({id, type, width, height, thickness, vertices: verticesIDs}) => {
          let {x: x1, y:y1} = vertices.get(verticesIDs.get(0));
          let {x: x2, y:y2} = vertices.get(verticesIDs.get(1));
          let length = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
          list.push(
            new ElementVolume({
              id: IDBroker.generate(),
              elementID: id,
              layerID: layer.id,
              type: type,
              prototype: "lines",
              volume: (height * thickness * length) / Math.pow(pixelPerUnit, 3),
              composition: "cemento"
            }))
        }
      );

      layer.holes.forEach(({id, type, width, height, thickness, line: lineID}) => {

        let line = lines.get(lineID);
        list.push(
          new ElementVolume({
            id: IDBroker.generate(),
            elementID: id,
            layerID: layer.id,
            type: type,
            prototype: "holes",
            volume: width * height * line.thickness / Math.pow(pixelPerUnit, 3),
            composition: "vetro"
          }))
      });

    });
  });
}
