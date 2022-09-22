import React from 'react';
import {Render2D, Render3D} from '../helper';

export default {
  name: '*chair',
  prototype: 'items',

  info: {
    title: 'kitchen chair" ',
    tag: ['kitchen', 'chair'],
    description: 'kitchen chair',
    image: require('./chair.png')
  },

  properties: {
    width: {
      label: 'Width',
      type: 'length-measure',
      defaultValue: {
        length: 40,
        unit: 'cm'
      }
    },
    height: {
      label: 'Height',
      type: 'length-measure',
      defaultValue: {
        length: 60,
        unit: 'cm'
      }
    },
    altitude: {
      label: 'Altitude',
      type: 'length-measure',
      defaultValue: {
        length: 0
      }
    },
    thickness: {
      label: 'Thickness',
      type: 'length-measure',
      defaultValue: {
        length: 40,
        unit: 'cm'
      }
    }
  },

  render2D: function (element, layer, scene) {
    return Render2D(element);
  },

  render3D: function (element, layer, scene) {
    return Render3D(element, "chair/chair");
  }
};
