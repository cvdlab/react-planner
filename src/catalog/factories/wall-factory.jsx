import buildWall from './wall-factory-3d';
import React from 'react';
import * as SharedStyle from '../../shared-style';

function pointsDistance(x0, y0, x1, y1) {
  return Math.sqrt(Math.pow((x1 - x0), 2) + Math.pow((y1 - y0), 2));
}

const epsilon = 3;
const STYLE_BASE = {stroke: '#8E9BA2', strokeWidth: '1px', fill: '#8E9BA2'};
const STYLE_SELECTED = {stroke: '#99c3fb', strokeWidth: '5px', fill: SharedStyle.COLORS.black};
const STYLE_TEXT = {textAnchor: 'middle'};
const STYLE_LINE = {stroke: '#99c3fb'};

export default function WallFactory(name, info, textures) {

  let wallElement = {
    name,
    prototype: 'lines',
    info,
    properties: {
      height: {
        label: 'Height',
        type: 'length-measure',
        defaultValue: {
          length: 300,
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

    render2D: function (element, layer, scene) {
      let {x:x1, y:y1} = layer.vertices.get(element.vertices.get(0));
      let {x:x2, y: y2} = layer.vertices.get(element.vertices.get(1));

      let diffX = x2 - x1;
      let diffY = y2 - y1;
      let length = Math.sqrt( ( diffX * diffX ) + ( diffY * diffY ) );
      let path = `M${0} ${ -epsilon}  L${length} ${-epsilon}  L${length} ${epsilon}  L${0} ${epsilon}  z`;
      let length_5 = length / 5;

      return (element.selected) ?
        <g>
          <path d={path} style={element.selected ? STYLE_SELECTED : STYLE_BASE}/>
          <line x1={length_5} y1={-39} x2={length_5} y2={38} style={STYLE_LINE}/>
          <text x={length_5} y={50} style={STYLE_TEXT}>A</text>
          ,
          <text x={length_5} y={-40} style={STYLE_TEXT}>B</text>
        </g> :
        <path d={path} style={element.selected ? STYLE_SELECTED : STYLE_BASE}/>
    },

    render3D: function (element, layer, scene) {
      return buildWall(element, layer, scene, textures)
    },

  };

  if (textures && textures !== {}) {

    let textureValues = {
      'none': 'None'
    };

    for (let textureName in textures) {
      textureValues[textureName] = textures[textureName].name
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

  return wallElement

}
