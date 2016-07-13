export const WallGeneric = {
  name: "wallGeneric",
  prototype: "lines",
  tag: ['wall'],
  group: "Comunicazione orizzontale",
  description: "Finestra generica",

  properties: {
    height: {
      type: "number",
      defaultValue: 10
    },
    thickness: {
      type: "number",
      defaultValue: 3
    }
  },

  render2D: function (options) {
  },

  render3D: function (options) {
  },

  calculateVolume: function (options) {
  }

};
