export const AreaGeneric = {
  name: "area-generic",
  tag: ['area'],
  group: "Chiusura orizzontale",
  description: "Porta generica",

  properties: {
    patternColor: {
      type: "color",
      defaultValue: "#c0ad64"
    },
    patternDirection: {
      type: "number",
      defaultValue: 0,
      min: 0,
      max: 359
    }
  },

  render2D: function (options) {
  },

  render3D: function (options) {
  },

  calculateVolume: function (options) {
  }

};
