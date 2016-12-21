import createArea from './area-factory-3d';
import React from 'react';

export default function AreaFactory(name, info, textures) {

  let textureValues = {
    'none': 'None'
  };

  for (let textureName in textures) {
    textureValues[textureName] = textures[textureName].name
  }

  return {
    name,
    prototype: "areas",
    info,
    properties: {
      patternColor: {
        label: "Color",
        type: "color",
        defaultValue: "#f5f4f4"
      },
      texture: {
        label: "Floor",
        type: "enum",
        defaultValue: 'none',
        values: textureValues
      }
    },
    render2D: function (element, layer, scene) {
      let path = "";
      let first = true;

      element.vertices.valueSeq()
        .map(vertexID => layer.vertices.get(vertexID))
        .forEach((vertex, vertexID) => {
          path += `${first ? 'M' : 'L'} ${vertex.x} ${vertex.y} `;
          first = false;
        });

      let fill = element.selected ? "#99c3fb" : element.properties.get('patternColor');

      return (<path d={path} fill={fill}/>);
    },

    render3D: function (element, layer, scene) {
      return createArea(element, layer, scene, textures)
    },

  }

}
