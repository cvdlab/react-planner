import render3D from './wall-generic.3d.js';
import React from 'react';
import {distanceFromTwoPoints} from '../../utils/geometry';

let pathSVG = React.createFactory('path');

export default {
  name: "wallGeneric",
  prototype: "lines",

  info: {
    tag: ['wall'],
    group: "Comunicazione orizzontale",
    description: "Finestra generica",
    image: require('./wall.png')
  },

  properties: {
    height: {
      type: "number",
      defaultValue: 300
    },
    thickness: {
      type: "number",
      defaultValue: 20
    },
    textureA: {
      type: "enum",
      defaultValue: 'none',
      values: {
        'none': "Nessuna",
        'bricks': "Mattoni",
        'painted': "Pittura"
      }
    },
    textureB: {
      type: "enum",
      defaultValue: 'none',
      values: {
        'none': "Nessuna",
        'bricks': "Mattoni",
        'painted': "Pittura"
      }
    }
  },

  render2D: function (line, layer, scene) {
    const STYLE_BASE = {stroke: "#8E9BA2", strokeWidth: "1px", fill: "#8E9BA2"};
    const STYLE_SELECTED = {stroke: "#99c3fb", strokeWidth: "5px", fill: "#000"};

    //let line = layer.lines.get(hole.line);
    //let epsilon = line.properties.get('thickness') / 2;

    let epsilon = 3;

    let {x:x1, y:y1} = layer.vertices.get(line.vertices.get(0));
    let {x:x2, y: y2} = layer.vertices.get(line.vertices.get(1));

    let length = distanceFromTwoPoints(x1, y1, x2, y2);

    return pathSVG({
      d: `M${0} ${ -epsilon}  L${length} ${-epsilon}  L${length} ${epsilon}  L${0} ${epsilon}  z`,
      style: line.selected ? STYLE_SELECTED : STYLE_BASE
    });
  },

  render3D,

};
