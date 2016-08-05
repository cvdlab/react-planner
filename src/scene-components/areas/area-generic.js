export const AreaGeneric = {
  name: "areaGeneric",
  prototype: "areas",
  tag: ['area'],
  group: "Chiusura orizzontale",
  description: "Porta generica",

  properties: {
    patternColor: {
      type: "color",
      defaultValue: "#cccccc"
    },
    patternDirection: {
      type: "number",
      defaultValue: 0,
      min: 0,
      max: 359
    },
    texture: {
      type: "string",
      defaultValue: 'none'
    }
  },

  render2D: function (options) {
  },

  render3D: function (options) {
  },

  calculateVolume: function (options) {
  }

};
