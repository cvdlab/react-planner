import Three from 'three';
import {loadObjWithMaterial} from '../../../utils/load-obj';

import React from 'react';
import convert from 'convert-units';

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
    let width = {length: 1.60, unit: 'ft'};
    let depth = {length: 0.59, unit: 'ft'};

    let newWidth = convert(width.length)
        .from(width.unit)
        .to(scene.unit) * scene.pixelPerUnit;

    let newDepth = convert(depth.length)
        .from(depth.unit)
        .to(scene.unit) * scene.pixelPerUnit;


    return gSVG({transform: `translate(${-newWidth / 2},${-newDepth / 2})`}, [
      rectSVG({
        key: 1,
        x: 0,
        y: 0,
        width: newWidth,
        height: newDepth,
        style: {stroke: element.selected ? '#0096fd' : '#000', strokeWidth: "2px", fill: "#84e1ce"}
      }),
      textSVG({
        key: 2,
        x: 0,
        y: 0,
        transform: `translate(${newWidth / 2}, ${newDepth / 2}) scale(1,-1)`,
        style: {textAnchor: "middle", fontSize: "11px"},
      }, element.type)
    ]);
  },

  render3D: function (element, layer, scene) {

    let width = {length: 1.60, unit: 'ft'};
    let depth = {length: 0.59, unit: 'ft'};
    let height = {length: 1.05, unit: 'ft'};

    let onLoadItem = (object) => {

      let newWidth = convert(width.length)
          .from(width.unit)
          .to(scene.unit) * scene.pixelPerUnit;

      let newHeight = convert(height.length)
          .from(height.unit)
          .to(scene.unit) * scene.pixelPerUnit;

      let newDepth = convert(depth.length)
          .from(depth.unit)
          .to(scene.unit) * scene.pixelPerUnit;

      if (element.selected) {
        let box = new Three.BoxHelper(object, 0x99c3fb);
        box.material.linewidth = 2;
        box.material.depthTest = false;
        object.add(box);
      }

      object.scale.set(newWidth / width.length, newHeight / height.length, newDepth / depth.length);

      console.log(newWidth / width.length, newHeight / height.length, newDepth / depth.length);


      return object;
    };

    let mtl = require('./tv.mtl');
    let obj = require('./tv.obj');

    return loadObjWithMaterial(mtl, obj, '')
      .then(object => onLoadItem(object))
  }

};
