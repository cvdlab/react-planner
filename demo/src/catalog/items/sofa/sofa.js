import * as Three from 'three';
import {loadObjWithMaterial} from '../../../utils/load-obj';
import path from 'path';
import convert from 'convert-units';

import React from 'react';

let rectSVG = React.createFactory('rect');
let gSVG = React.createFactory('g');
let textSVG = React.createFactory('text');

export default {
  name: "sofa",
  prototype: "items",

  info: {
    tag: ['furnishings', 'leather'],
    group: "Items",
    description: "Leather sofa",
    image: require('./sofa.png')
  },

  properties: {},

  render2D: function (element, layer, scene) {
    let width = {length: 180, unit: 'cm'};
    let depth = {length: 60, unit: 'cm'};

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

    let width = {length: 180, unit: 'cm'};
    let depth = {length: 60, unit: 'cm'};
    let height = {length: 70, unit: 'cm'};

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

      object.scale.set(newWidth / width.length, newHeight / height.length, newDepth / depth.length);

      if (element.selected) {
        let box = new Three.BoxHelper(object, 0x99c3fb);
        box.material.linewidth = 2;
        box.material.depthTest = false;
        box.renderOrder = 1000;
        object.add(box);
      }

      // Normalize the origin of this item
      let boundingBox = new Three.Box3().setFromObject(object);

      let center = [
        (boundingBox.max.x - boundingBox.min.x) / 2 + boundingBox.min.x,
        (boundingBox.max.y - boundingBox.min.y) / 2 + boundingBox.min.y,
        (boundingBox.max.z - boundingBox.min.z) / 2 + boundingBox.min.z];

      object.position.x -= center[0];
      object.position.y -= center[1] - (boundingBox.max.y - boundingBox.min.y) / 2;
      object.position.z -= center[2];


      return object;
    };

    let mtl = require('./sofa.mtl');
    let obj = require('./sofa.obj');
    let img = require('./texture.jpg');

    return loadObjWithMaterial(mtl, obj, path.dirname(img) + '/')
      .then(object => onLoadItem(object))
  }

};
