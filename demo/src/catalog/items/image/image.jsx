import * as Three from 'three';

import React from 'react';

const InsertImageDataURI = `data:image/png;base64,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`;

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
      label: "Image URI",
      type: "string",
      defaultValue: '',
    },
    x1: {
      label: "x1",
      type: "number",
      defaultValue: 0
    },
    y1: {
      label: "y1",
      type: "number",
      defaultValue: 0
    },
    x2: {
      label: "x2",
      type: "number",
      defaultValue: 100
    },
    y2: {
      label: "y2",
      type: "number",
      defaultValue: 100
    },
    distance: {
      label: "Distance",
      type: "length-measure",
      defaultValue: {
        length: 100
      }
    },
    width: {
      label: "Width",
      type: "number",
      defaultValue: 600
    },
    height: {
      label: "Height",
      type: "number",
      defaultValue: 400
    },
  },

  render2D: function (element, layer, scene) {

    let {x1, y1, x2, y2, distance, width, height, imageUri} = element.properties.toJS();

    let pointsDistance = Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

    let scale = distance.length / pointsDistance;

    imageUri = imageUri || InsertImageDataURI;

    let ruler = !element.selected ? null : (
      <g>
        <circle key="1" cx={x1} cy={y1} r="10px" fill="#f45c42"/>
        <circle key="2" cx={x2} cy={y2} r="10px" fill="#f45c42"/>
        <line key="3" x1={x1} y1={y1} x2={x2} y2={y2} stroke="#f45c42" strokeWidth="3px"/>
      </g>
    );

    return (
      <g transform={`scale(${scale}, ${scale}), scale(1,-1) translate(${-width / 2}, ${-height / 2})`}>
        <image key="1" xlinkHref={imageUri} x="0" y="0" width={width} height={height}/>
        {ruler}
      </g>
    )
  },

  render3D: function (element, layer, scene) {
    return Promise.resolve(new Three.Object3D());
  }
};
