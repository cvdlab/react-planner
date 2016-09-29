import Three from 'three';
import {loadObjWithMaterial} from '../../../utils/load-obj';

import React from 'react';

let rectSVG = React.createFactory('rect');
let gSVG = React.createFactory('g');
let textSVG = React.createFactory('text');

export default {
  name: "tv",
  prototype: "items",

  info: {
    tag: ['arredamento', 'elettronica'],
    group: "Items",
    description: "Televisore LCD",
    image: require('./tv.png')
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

  render3D: function (element, layer, scene) {

    let onLoadItem = (object) => {

      let boundingBox = new Three.Box3().setFromObject(object);

      let initialWidth = boundingBox.max.x - boundingBox.min.x;
      let initialHeight = boundingBox.max.y - boundingBox.min.y;
      let initialThickness = boundingBox.max.z - boundingBox.min.z;

      let scaleY = Math.min(element.width / initialWidth, element.height / initialThickness);


      if (element.selected) {
        let box = new Three.BoxHelper(object, 0x99c3fb);
        box.material.linewidth = 2;
        box.material.depthTest = false;
        object.add(box);
      }

      object.scale.set(element.width / initialWidth, scaleY, element.height / initialThickness);

      return object;
    };

    let mtl = require('./tv.mtl');
    let obj = require('./tv.obj');

    return loadObjWithMaterial(mtl, obj, '')
      .then(object => onLoadItem(object))
  }

};
