import Three from 'three';
import {loadObjWithMaterial} from '../../utils/load-obj';

import React from 'react';

let rectSVG = React.createFactory('rect');
let gSVG = React.createFactory('g');
let textSVG = React.createFactory('text');

export default {
  name: "sofa",
  prototype: "items",

  info: {
    tag: ['arredamento', 'pelle'],
    group: "Items",
    description: "Divano in pelle",
    image: require('./sofa.png')
  },

  properties: {},

  render2D: function (element, layer, scene) {
    return gSVG({}, [
      rectSVG({
        key: 1,
        x: 0,
        y: 0,
        width: element.width,
        height: element.height,
        style: {stroke: "black", strokeWidth: "2px", fill: "#84e1ce"}
      }),
      textSVG({
        key: 2,
        x: 0,
        y: 0,
        transform: `translate(${element.width / 2}, ${element.height / 2}) scale(1,-1)`,
        style: {textAnchor: "middle", fontSize: "11px"},
      }, element.type)
    ]);
  },

  render3D: function (item, layer) {

    let onLoadItem = (object) => {
      if (item.selected) {
        let box = new Three.BoxHelper(object, 0x99c3fb);
        box.material.linewidth = 2;
        box.material.depthTest = false;
        object.add(box);
      }
      return object;
    };

    return loadObjWithMaterial('obj/sofa/', 'sofa.mtl', 'obj/sofa/',
      'sofa.obj', onLoadItem)
      .then(object => onLoadItem(object))
  }

};
