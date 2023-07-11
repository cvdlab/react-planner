"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = WallFactory;
var _react = _interopRequireDefault(require("react"));
var _wallFactory3d = require("./wall-factory-3d");
var SharedStyle = _interopRequireWildcard(require("../../shared-style"));
var Geometry = _interopRequireWildcard(require("../../utils/geometry"));
var _translator = _interopRequireDefault(require("../../translator/translator"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var epsilon = 20;
var STYLE_TEXT = {
  textAnchor: 'middle'
};
var STYLE_LINE = {
  stroke: SharedStyle.LINE_MESH_COLOR.selected
};
var STYLE_RECT = {
  strokeWidth: 1,
  stroke: SharedStyle.LINE_MESH_COLOR.unselected,
  fill: 'url(#diagonalFill)'
};
var STYLE_RECT_SELECTED = _objectSpread(_objectSpread({}, STYLE_RECT), {}, {
  stroke: SharedStyle.LINE_MESH_COLOR.selected
});
var translator = new _translator["default"]();
function WallFactory(name, info, textures) {
  var wallElement = {
    name: name,
    prototype: 'lines',
    info: info,
    properties: {
      height: {
        label: translator.t('height'),
        type: 'length-measure',
        defaultValue: {
          length: 300
        }
      },
      thickness: {
        label: translator.t('thickness'),
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
      var length_5 = length / 5;
      var thickness = element.getIn(['properties', 'thickness', 'length']);
      var half_thickness = thickness / 2;
      var half_thickness_eps = half_thickness + epsilon;
      var char_height = 11;
      var extra_epsilon = 5;
      var textDistance = half_thickness + epsilon + extra_epsilon;
      return element.selected ? /*#__PURE__*/_react["default"].createElement("g", null, /*#__PURE__*/_react["default"].createElement("rect", {
        x: "0",
        y: -half_thickness,
        width: length,
        height: thickness,
        style: STYLE_RECT_SELECTED
      }), /*#__PURE__*/_react["default"].createElement("line", {
        x1: length_5,
        y1: -half_thickness_eps,
        x2: length_5,
        y2: half_thickness_eps,
        style: STYLE_LINE
      }), /*#__PURE__*/_react["default"].createElement("text", {
        x: length_5,
        y: textDistance + char_height,
        style: STYLE_TEXT
      }, "A"), /*#__PURE__*/_react["default"].createElement("text", {
        x: length_5,
        y: -textDistance,
        style: STYLE_TEXT
      }, "B")) : /*#__PURE__*/_react["default"].createElement("rect", {
        x: "0",
        y: -half_thickness,
        width: length,
        height: thickness,
        style: STYLE_RECT
      });
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
      label: translator.t('texture') + ' A',
      type: 'enum',
      defaultValue: textureValues.bricks ? 'bricks' : 'none',
      values: textureValues
    };
    wallElement.properties.textureB = {
      label: translator.t('texture') + ' B',
      type: 'enum',
      defaultValue: textureValues.bricks ? 'bricks' : 'none',
      values: textureValues
    };
  }
  return wallElement;
}