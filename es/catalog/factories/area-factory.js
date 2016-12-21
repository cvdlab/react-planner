import createArea from './area-factory-3d';
import React from 'react';

export default function AreaFactory(name, info, textures) {

  var areaElement = {
    name: name,
    prototype: "areas",
    info: info,
    properties: {
      patternColor: {
        label: "Color",
        type: "color",
        defaultValue: "#f5f4f4"
      }
    },
    render2D: function render2D(element, layer, scene) {
      var path = "";
      var first = true;

      element.vertices.valueSeq().map(function (vertexID) {
        return layer.vertices.get(vertexID);
      }).forEach(function (vertex, vertexID) {
        path += (first ? 'M' : 'L') + ' ' + vertex.x + ' ' + vertex.y + ' ';
        first = false;
      });

      var fill = element.selected ? "#99c3fb" : element.properties.get('patternColor');

      return React.createElement('path', { d: path, fill: fill });
    },

    render3D: function render3D(element, layer, scene) {
      return createArea(element, layer, scene, textures);
    }

  };

  if (textures && textures !== {}) {

    var textureValues = {
      'none': 'None'
    };

    for (var textureName in textures) {
      textureValues[textureName] = textures[textureName].name;
    }

    areaElement.properties.texture = {
      label: "Floor",
      type: "enum",
      defaultValue: 'none',
      values: textureValues
    };
  }

  return areaElement;
}