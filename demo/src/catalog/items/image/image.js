import Three from 'three';

import React from 'react';
import convert from 'convert-units';

let gSVG = React.createFactory('g');
let imgSVG = React.createFactory('image');
let circleSVG = React.createFactory('circle');
let lineSVG = React.createFactory('line');


export default {
  name: "image",
  prototype: "items",

  info: {
    tag: ['image'],
    group: "Items",
    description: "Image",
    image: require('./image.png')
  },

  properties: {
    imageUri: {
      type: "string",
      defaultValue: '',
    },
    x1: {
      type: "number",
      defaultValue: 0
    },
    y1: {
      type: "number",
      defaultValue: 0
    },
    x2: {
      type: "number",
      defaultValue: 100
    },
    y2: {
      type: "number",
      defaultValue: 100
    },
    distance: {
      type: "length-measure",
      defaultValue: {
        length: 100,
        unit: 'cm'
      }
    },
    width: {
      type: "number",
      defaultValue: 600
    },
    height: {
      type: "number",
      defaultValue: 400
    },
  },

  render2D: function (element, layer, scene) {

    let {x1, y1, x2, y2, distance, width, height, imageUri} = element.properties.toJS();

    let pointsDistance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

    let distanceNormalized = convert(distance.length)
        .from(distance.unit)
        .to(scene.unit) * scene.pixelPerUnit;

    let scale = distanceNormalized / pointsDistance;

    imageUri = imageUri || 'https://dummyimage.com/600x400/cccccc/0e26b0&text=insert+image';

    let ruler = !element.selected ? null : gSVG({key: 2}, [
      circleSVG({key: 1, cx: x1, cy: y1, r: "10px", fill: "#f45c42"}),
      circleSVG({key: 2, cx: x2, cy: y2, r: "10px", fill: "#f45c42"}),
      lineSVG({key: 3, x1, y1, x2, y2, stroke: "#f45c42", strokeWidth: "3px"})
    ]);

    return gSVG({transform: `scale(${scale}, ${scale}), scale(1,-1) translate(${-width / 2}, ${-height / 2})`}, [
      imgSVG({
        key: 1,
        xlinkHref: imageUri,
        x: 0,
        y: 0,
        width,
        height
      }),
      ruler
    ]);
  },

  render3D: function (element, layer, scene) {
    return Three.Object3D();
  }

};
