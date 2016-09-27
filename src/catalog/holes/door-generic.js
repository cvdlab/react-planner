import render2D from './door-generic.2d.jsx';
import render3D from './door-generic.3d';

export default {
  name: "doorGeneric",
  prototype: "holes",

  info: {
    tag: ['window', 'door', 'opening'],
    group: "Comunicazione orizzontale",
    description: "Porta generica",
  },

  properties: {
    width: {
      type: "number",
      defaultValue: 80,
      min: 0
    },
    height: {
      type: "number",
      defaultValue: 215,
      min: 0
    },
    altitude: {
      type: "number",
      defaultValue: 0,
      min: 0
    }
  },

  render2D,

  render3D,

};
