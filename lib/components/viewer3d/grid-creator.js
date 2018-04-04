'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createGrid;

var _three = require('three');

var Three = _interopRequireWildcard(_three);

var _helvetiker_regularTypeface = require('./libs/helvetiker_regular.typeface.js');

var _guideHorizontalStreak = require('./guides/guide-horizontal-streak');

var _guideHorizontalStreak2 = _interopRequireDefault(_guideHorizontalStreak);

var _guideVerticalStreak = require('./guides/guide-vertical-streak');

var _guideVerticalStreak2 = _interopRequireDefault(_guideVerticalStreak);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function createGrid(scene) {

  var grid = new Three.Object3D();
  var fontLoader = new Three.FontLoader();
  var font = fontLoader.parse(_helvetiker_regularTypeface.HELVETIKER); // For measures
  var guides = scene.guides,
      width = scene.width,
      height = scene.height;


  guides.forEach(function (guide) {
    switch (guide.type) {
      case 'horizontal-streak':
        grid.add((0, _guideHorizontalStreak2.default)(width, height, guide, font));
        break;
      case 'vertical-streak':
        grid.add((0, _guideVerticalStreak2.default)(width, height, guide, font));
        break;
    }
  });

  grid.position.y = -1;
  return grid;
}