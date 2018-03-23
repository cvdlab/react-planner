'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = WallFactory;

var _wallFactory3d = require('./wall-factory-3d');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _sharedStyle = require('../../shared-style');

var SharedStyle = _interopRequireWildcard(_sharedStyle);

var _geometry = require('../../utils/geometry');

var Geometry = _interopRequireWildcard(_geometry);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var epsilon = 3;
var STYLE_BASE = { stroke: '#8E9BA2', strokeWidth: '1px', fill: '#8E9BA2' };
var STYLE_SELECTED = { stroke: '#99c3fb', strokeWidth: '5px', fill: SharedStyle.COLORS.black };
var STYLE_TEXT = { textAnchor: 'middle' };
var STYLE_LINE = { stroke: '#99c3fb' };

function WallFactory(name, info, textures) {

  var wallElement = {
    name: name,
    prototype: 'lines',
    info: info,
    properties: {
      height: {
        label: 'Height',
        type: 'length-measure',
        defaultValue: {
          length: 300
        }
      },
      thickness: {
        label: 'Thickness',
        type: 'length-measure',
        defaultValue: {
          length: 20
        }
      }
    },

    render2D: function render2D(element, layer, scene) {
      var _layer$vertices$get = layer.vertices.get(element.vertices.get(0)),
          x1 = _layer$vertices$get.x,
          y1 = _layer$vertices$get.y;

      var _layer$vertices$get2 = layer.vertices.get(element.vertices.get(1)),
          x2 = _layer$vertices$get2.x,
          y2 = _layer$vertices$get2.y;

      var length = Geometry.pointsDistance(x1, y1, x2, y2);
      var path = 'M' + 0 + ' ' + -epsilon + '  L' + length + ' ' + -epsilon + '  L' + length + ' ' + epsilon + '  L' + 0 + ' ' + epsilon + '  z';
      var length_5 = length / 5;

      return element.selected ? _react2.default.createElement(
        'g',
        null,
        _react2.default.createElement('path', { d: path, style: element.selected ? STYLE_SELECTED : STYLE_BASE }),
        _react2.default.createElement('line', { x1: length_5, y1: -39, x2: length_5, y2: 38, style: STYLE_LINE }),
        _react2.default.createElement(
          'text',
          { x: length_5, y: 50, style: STYLE_TEXT },
          'A'
        ),
        ',',
        _react2.default.createElement(
          'text',
          { x: length_5, y: -40, style: STYLE_TEXT },
          'B'
        )
      ) : _react2.default.createElement('path', { d: path, style: element.selected ? STYLE_SELECTED : STYLE_BASE });
    },

    render3D: function render3D(element, layer, scene) {
      return (0, _wallFactory3d.buildWall)(element, layer, scene, textures);
    },

    updateRender3D: function updateRender3D(element, layer, scene, mesh, oldElement, differences, selfDestroy, selfBuild) {
      return (0, _wallFactory3d.updatedWall)(element, layer, scene, textures, mesh, oldElement, differences, selfDestroy, selfBuild);
    }

  };

  if (textures && textures !== {}) {

    var textureValues = {
      'none': 'None'
    };

    for (var textureName in textures) {
      textureValues[textureName] = textures[textureName].name;
    }

    wallElement.properties.textureA = {
      label: 'Covering A',
      type: 'enum',
      defaultValue: 'none',
      values: textureValues
    };

    wallElement.properties.textureB = {
      label: 'Covering B',
      type: 'enum',
      defaultValue: 'none',
      values: textureValues
    };
  }

  return wallElement;
}