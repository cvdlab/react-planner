import React from 'react';

let pathSVG = React.createFactory('path');
let lineSVG = React.createFactory('line');
let gSVG = React.createFactory('g');

import render3D from './window-generic.3d';

export default {
  name: "window",
  prototype: "holes",

  info: {
    tag: ['finestra'],
    group: "Comunicazione orizzontale",
    description: "Finestra con grate",
    image: require('./window.png')
  },

  properties: {
    width: {
      type: "number",
      defaultValue: 90,
      min: 0
    },
    height: {
      type: "number",
      defaultValue: 100,
      min: 0
    },
    altitude: {
      type: "number",
      defaultValue: 90,
      min: 0
    }
  },

  render2D: function (hole, layer, scene) {
    const STYLE_HOLE_BASE = {stroke: "#000", strokeWidth: "3px", fill: "#000"};
    const STYLE_HOLE_SELECTED = {stroke: "orange", strokeWidth: "3px", fill: "orange"};
    //let line = layer.lines.get(hole.line);
    //let epsilon = line.properties.get('thickness') / 2;

    let epsilon = 3;

    let holeWidth = hole.properties.get('width');
    let holePath = `M${0} ${ -epsilon}  L${holeWidth} ${-epsilon}  L${holeWidth} ${epsilon}  L${0} ${epsilon}  z`;
    let holeStyle = hole.selected ? STYLE_HOLE_SELECTED : STYLE_HOLE_BASE;

    return gSVG({}, [
      pathSVG({
        key: 1,
        d: holePath,
        style: holeStyle
      }),
      lineSVG({
        key: 2,
        x1: holeWidth / 2,
        y1: -10 - epsilon,
        x2: holeWidth / 2,
        y2: 10 + epsilon,
        style: holeStyle
      }),
    ]);

  },

  render3D,

};
