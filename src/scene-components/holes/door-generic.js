export const DoorGeneric = {
  name: "doorGeneric",
  prototype: "holes",
  tag: ['window', 'door', 'opening'],
  group: "Comunicazione orizzontale",
  description: "Porta generica",

  properties: {
    width: {
      type: "number",
      defaultValue: 10,
      min: 0
    },
    height: {
      type: "number",
      defaultValue: 10,
      min: 0
    },
    altitude: {
      type: "number",
      defaultValue: 10,
      min: 0
    }
  },

  render2D: function (options) {
  },

  render3D: function (options) {
  },

  calculateVolume: function (options) {
  }

};
