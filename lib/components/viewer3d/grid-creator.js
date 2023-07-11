"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = createGrid;
var Three = _interopRequireWildcard(require("three"));
var _helvetiker_regularTypeface = require("./libs/helvetiker_regular.typeface.js");
var _gridHorizontalStreak = _interopRequireDefault(require("./grids/grid-horizontal-streak"));
var _gridVerticalStreak = _interopRequireDefault(require("./grids/grid-vertical-streak"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function createGrid(scene) {
  var gridMesh = new Three.Object3D();
  gridMesh.name = 'grid';
  var fontLoader = new Three.FontLoader();
  var font = fontLoader.parse(_helvetiker_regularTypeface.HELVETIKER); // For measures
  var grids = scene.grids,
    width = scene.width,
    height = scene.height;
  grids.forEach(function (grid) {
    switch (grid.type) {
      case 'horizontal-streak':
        gridMesh.add((0, _gridHorizontalStreak["default"])(width, height, grid, font));
        break;
      case 'vertical-streak':
        gridMesh.add((0, _gridVerticalStreak["default"])(width, height, grid, font));
        break;
    }
  });
  gridMesh.position.y = -1;
  return gridMesh;
}