import React from 'react';
import {Render2D, Render3D} from '../helper';

export default {
  name: '*microwave',
  prototype: 'items',

  info: {
    title: 'kitchen microwave',
    tag: ['kitchen', 'microwave'],
    description: 'kitchen microwave',
    image: require('./microwave.png')
  },

  properties: {
    width: {
      label: 'Width',
      type: 'length-measure',
      defaultValue: {
        length: 62,
        unit: 'cm'
      }
    },
    height: {
      label: 'Height',
      type: 'length-measure',
      defaultValue: {
        length: 38,
        unit: 'cm'
      }
    },
    altitude: {
      label: 'Altitude',
      type: 'length-measure',
      defaultValue: {
        length: 92
      }
    },
    thickness: {
      label: 'Thickness',
      type: 'length-measure',
      defaultValue: {
        length: 48,
        unit: 'cm'
      }
    }
  },

  render2D: function (element, layer, scene) {
    return Render2D(element);
  },

  render3D: function (element, layer, scene) {
    return Render3D(element, "microwave/microwave");
  }
};
