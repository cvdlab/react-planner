import { FontLoader, TextGeometry, MeshBasicMaterial, Mesh, BoxHelper } from 'three';
import React from 'react';
import { HELVETIKER } from './helvetiker_regular.typeface.js';

const fontLoader = new FontLoader();
const font = fontLoader.parse(HELVETIKER);

const defaultFontSize = 16;
const defaultColor = '#000000';

export default {
  name: 'text',
  prototype: 'items',

  info: {
    tag: ['text'],
    title: 'Text 3D',
    description: 'Text',
    image: require('./img.png')
  },

  properties: {
    text: {
      label: 'text',
      type: 'string',
      defaultValue: 'Custom Text'
    },
    fontSize: {
      label: 'font size',
      type: 'number',
      defaultValue: defaultFontSize
    },
    color: {
      label: 'text color',
      type: 'color',
      defaultValue: defaultColor
    },
    altitude: {
      label: 'altitude',
      type: 'length-measure',
      defaultValue: {
        length: 0,
        unit: 'cm'
      }
    }
  },

  render2D: function (element, layer, scene) {

    let color = element.properties.get('color') || defaultColor;
    let text = element.properties.get('text') || '';
    let fontSize = element.properties.get('fontSize') || defaultFontSize;
    let textHorizontalPadding = defaultFontSize;
    let width = ( ( text.length - ( text.length / 2 ) ) * fontSize ) + textHorizontalPadding;
    let height = 2 * fontSize;

    return (
      <g>
        <rect
          x={-width / 2}
          y={-height / 2}
          fill="#FFF"
          width={width}
          height={height}
          stroke="#000"
          strokeWidth="2"
        />
        <text
          x="0"
          y="0"
          fontFamily="Arial"
          alignmentBaseline="middle"
          textAnchor="middle"
          fontSize={fontSize}
          fill={color}
          transform={'scale(1,-1)'}
        >
          {text}
        </text>
      </g>
    )
  },

  render3D: function (element, layer, scene) {

    let text = element.properties.get('text') || '';
    let size = element.properties.get('fontSize') || defaultFontSize;
    let textHorizontalPadding = defaultFontSize;
    let width = ( ( text.length - ( text.length / 2 ) ) * size ) + textHorizontalPadding;
    let color = element.properties.get('color') || defaultColor;

    let mesh = new Mesh(
      new TextGeometry( text, { size, height: 1, font }),
      new MeshBasicMaterial({color})
    );

    if (element.selected) {
      let box = new BoxHelper(mesh, 0x99c3fb);
      box.material.linewidth = 2;
      box.material.depthTest = false;
      box.renderOrder = 1000;
      mesh.add(box);
    }

    mesh.position.y += element.properties.getIn(['altitude','length']);
    mesh.position.x -= ( width / 2 );

    return Promise.resolve( mesh );
  }
};
