function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
import React from 'react';
import { createArea, updatedArea } from './area-factory-3d';
import * as SharedStyle from '../../shared-style';
import Translator from '../../translator/translator';
var translator = new Translator();
export default function AreaFactory(name, info, textures) {
  var areaElement = {
    name: name,
    prototype: 'areas',
    info: _objectSpread(_objectSpread({}, info), {}, {
      visibility: {
        catalog: false,
        layerElementsVisible: false
      }
    }),
    properties: {
      patternColor: {
        label: translator.t('color'),
        type: 'color',
        defaultValue: SharedStyle.AREA_MESH_COLOR.unselected
      },
      thickness: {
        label: translator.t('thickness'),
        type: 'length-measure',
        defaultValue: {
          length: 0
        }
      }
    },
    render2D: function render2D(element, layer, scene) {
      var path = '';

      ///print area path
      element.vertices.forEach(function (vertexID, ind) {
        var vertex = layer.vertices.get(vertexID);
        path += (ind ? 'L' : 'M') + vertex.x + ' ' + vertex.y + ' ';
      });

      //add holes
      element.holes.forEach(function (areaID) {
        var area = layer.areas.get(areaID);
        area.vertices.reverse().forEach(function (vertexID, ind) {
          var vertex = layer.vertices.get(vertexID);
          path += (ind ? 'L' : 'M') + vertex.x + ' ' + vertex.y + ' ';
        });
      });
      var fill = element.selected ? SharedStyle.AREA_MESH_COLOR.selected : element.properties.get('patternColor');
      return /*#__PURE__*/React.createElement("path", {
        d: path,
        fill: fill
      });
    },
    render3D: function render3D(element, layer, scene) {
      return createArea(element, layer, scene, textures);
    },
    updateRender3D: function updateRender3D(element, layer, scene, mesh, oldElement, differences, selfDestroy, selfBuild) {
      return updatedArea(element, layer, scene, textures, mesh, oldElement, differences, selfDestroy, selfBuild);
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
      label: translator.t('texture'),
      type: 'enum',
      defaultValue: 'none',
      values: textureValues
    };
  }
  return areaElement;
}