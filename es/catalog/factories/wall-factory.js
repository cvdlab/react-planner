import buildWall from './wall-factory-3d';
import React from 'react';
import * as SharedStyle from '../../shared-style';
import * as Geometry from '../../utils/geometry';

var epsilon = 3;
var STYLE_BASE = { stroke: '#8E9BA2', strokeWidth: '1px', fill: '#8E9BA2' };
var STYLE_SELECTED = { stroke: '#99c3fb', strokeWidth: '5px', fill: SharedStyle.COLORS.black };
var STYLE_TEXT = { textAnchor: 'middle' };
var STYLE_LINE = { stroke: '#99c3fb' };

export default function WallFactory(name, info, textures) {

  var wallElement = {
    name: name,
    prototype: 'lines',
    info: info,
    properties: {
      height: {
        label: 'Height',
        type: 'length-measure',
        defaultValue: {
          length: 300
        }
      },
      thickness: {
        label: 'Thickness',
        type: 'length-measure',
        defaultValue: {
          length: 20
        }
      }
    },

    render2D: function render2D(element, layer, scene) {
      var _layer$vertices$get = layer.vertices.get(element.vertices.get(0)),
          x1 = _layer$vertices$get.x,
          y1 = _layer$vertices$get.y;

      var _layer$vertices$get2 = layer.vertices.get(element.vertices.get(1)),
          x2 = _layer$vertices$get2.x,
          y2 = _layer$vertices$get2.y;

      var length = Geometry.pointsDistance(x1, y1, x2, y2);
      var path = 'M' + 0 + ' ' + -epsilon + '  L' + length + ' ' + -epsilon + '  L' + length + ' ' + epsilon + '  L' + 0 + ' ' + epsilon + '  z';
      var length_5 = length / 5;

      return element.selected ? React.createElement(
        'g',
        null,
        React.createElement('path', { d: path, style: element.selected ? STYLE_SELECTED : STYLE_BASE }),
        React.createElement('line', { x1: length_5, y1: -39, x2: length_5, y2: 38, style: STYLE_LINE }),
        React.createElement(
          'text',
          { x: length_5, y: 50, style: STYLE_TEXT },
          'A'
        ),
        ',',
        React.createElement(
          'text',
          { x: length_5, y: -40, style: STYLE_TEXT },
          'B'
        )
      ) : React.createElement('path', { d: path, style: element.selected ? STYLE_SELECTED : STYLE_BASE });
    },

    render3D: function render3D(element, layer, scene) {
      return buildWall(element, layer, scene, textures);
    }

  };

  if (textures && textures !== {}) {

    var textureValues = {
      'none': 'None'
    };

    for (var textureName in textures) {
      textureValues[textureName] = textures[textureName].name;
    }

    wallElement.properties.textureA = {
      label: 'Covering A',
      type: 'enum',
      defaultValue: 'bricks',
      values: textureValues
    };

    wallElement.properties.textureB = {
      label: 'Covering B',
      type: 'enum',
      defaultValue: 'bricks',
      values: textureValues
    };
  }

  return wallElement;
}