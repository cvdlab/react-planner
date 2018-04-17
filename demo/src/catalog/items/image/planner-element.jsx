import * as Three from 'three';
import React from 'react';
import ImageFul from './imageful';

export default {
  name: "image",
  prototype: "items",

  info: {
    title: "image",
    tag: ['image'],
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
      defaultValue: 0
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
    }
  },

  render2D: function (element, layer, scene) {

    let {x1, y1, x2, y2, distance, width, height, imageUri} = element.properties.toJS();

    return (
      <ImageFul
        imageUri={imageUri}
        element={element}
        distance={distance}
        x1={x1}
        x2={x2}
        y1={y1}
        y2={y2}
        width={width}
        height={height}
        layer={layer}
        scene={scene}
      />
    );
  },

  render3D: function (element, layer, scene) {
    return Promise.resolve(new Three.Object3D());
  }
};
