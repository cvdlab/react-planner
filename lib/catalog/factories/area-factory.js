'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = AreaFactory;

var _areaFactory3d = require('./area-factory-3d');

var _areaFactory3d2 = _interopRequireDefault(_areaFactory3d);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function AreaFactory(name, info, textures) {

  var areaElement = {
    name: name,
    prototype: "areas",
    info: info,
    properties: {
      patternColor: {
        label: "Color",
        type: "color",
        defaultValue: "#f5f4f4"
      },
      thickness: {
        label: "Thickness",
        type: "length-measure",
        defaultValue: {
          length: 0
        }
      }
    },
    render2D: function render2D(element, layer, scene) {
      var path = "";
      var first = true;

      element.vertices.valueSeq().map(function (vertexID) {
        return layer.vertices.get(vertexID);
      }).forEach(function (vertex, vertexID) {
        path += (first ? 'M' : 'L') + ' ' + vertex.x + ' ' + vertex.y + ' ';
        first = false;
      });

      var fill = element.selected ? "#99c3fb" : element.properties.get('patternColor');

      return _react2.default.createElement('path', { d: path, fill: fill });
    },

    render3D: function render3D(element, layer, scene) {
      return (0, _areaFactory3d2.default)(element, layer, scene, textures);
    }

  };

  if (textures && textures !== {}) {

    var textureValues = {
      'none': 'None'
    };

    for (var textureName in textures) {
      textureValues[textureName] = textures[textureName].name;
    }

    areaElement.properties.texture = {
      label: "Floor",
      type: "enum",
      defaultValue: 'none',
      values: textureValues
    };
  }

  return areaElement;
}