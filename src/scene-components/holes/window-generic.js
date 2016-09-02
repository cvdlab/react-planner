import render2D from './window-generic.2d.jsx';

export const WindowGeneric = {
  name: "windowGeneric",
  prototype: "holes",
  tag: ['window', 'door', 'opening'],
  group: "Comunicazione orizzontale",
  description: "Finestra generica",

  properties: {
    width: {
      type: "number",
      defaultValue: 90,
      min: 0
    },
    height: {
      type: "number",
      defaultValue: 100,
      min: 0
    },
    altitude: {
      type: "number",
      defaultValue: 90,
      min: 0
    }
  },

  render2D,

  render3D: function (options) {
  },

  calculateVolume: function (options) {
  }

};
