import React from 'react';
import {Render2D, Render3D} from '../helper';

export default {
  name: '*wall-cabinet2',
  prototype: 'items',

  info: {
    title: 'kitchen wall cabinet type 2',
    tag: ['kitchen', 'wall', 'cabinet'],
    description: 'kitchen cabinet type 2',
    image: require('./wall2.png')
  },

  properties: {
    width: {
      label: 'Width',
      type: 'length-measure',
      defaultValue: {
        length: 76,
        unit: 'cm'
      }
    },
    height: {
      label: 'Height',
      type: 'length-measure',
      defaultValue: {
        length: 92,
        unit: 'cm'
      }
    },
    altitude: {
      label: 'Altitude',
      type: 'length-measure',
      defaultValue: {
        length: 120,
        unit: 'cm'
      }
    },
    thickness: {
      label: 'Thickness',
      type: 'length-measure',
      defaultValue: {
        length: 66,
        unit: 'cm'
      }
    }
  },

  render2D: function (element, layer, scene) {
    return Render2D(element);
  },

  render3D: function (element, layer, scene) {
    return Render3D(element, "wall-cabinet2/wall2");
  }
};
