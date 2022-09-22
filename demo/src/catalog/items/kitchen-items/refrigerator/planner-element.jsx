import React from 'react';
import {Render2D, Render3D} from '../helper';

export default {
  name: '*refrigerator',
  prototype: 'items',

  info: {
    title: 'kitchen refrigerator" ',
    tag: ['kitchen', 'refrigerator'],
    description: 'kitchen refrigerator',
    image: require('./refrig.png')
  },

  properties: {
    width: {
      label: 'Width',
      type: 'length-measure',
      defaultValue: {
        length: 92,
        unit: 'cm'
      }
    },
    height: {
      label: 'Height',
      type: 'length-measure',
      defaultValue: {
        length: 200,
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
        length: 92,
        unit: 'cm'
      }
    }
  },

  render2D: function (element, layer, scene) {
    return Render2D(element);
  },

  render3D: function (element, layer, scene) {
    return Render3D(element, "refrigerator/refrig");
  }
};
