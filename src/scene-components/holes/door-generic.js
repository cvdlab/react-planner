import render2D from './door-generic.2d.jsx';

export const DoorGeneric = {
  name: "doorGeneric",
  prototype: "holes",
  tag: ['window', 'door', 'opening'],
  group: "Comunicazione orizzontale",
  description: "Porta generica",

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

  render3D: function (element, layer) {
  },

  calculateVolume: function (options) {
  }

};
