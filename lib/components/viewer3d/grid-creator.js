'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createGrid;

var _three = require('three');

var Three = _interopRequireWildcard(_three);

var _guideHorizontalStreak = require('./guides/guide-horizontal-streak');

var _guideHorizontalStreak2 = _interopRequireDefault(_guideHorizontalStreak);

var _guideVerticalStreak = require('./guides/guide-vertical-streak');

var _guideVerticalStreak2 = _interopRequireDefault(_guideVerticalStreak);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function createGrid(scene) {

  var grid = new Three.Object3D();

  scene.guides.forEach(function (guide) {
    switch (guide.type) {
      case "horizontal-streak":
        grid.add((0, _guideHorizontalStreak2.default)(scene.width, scene.height, guide));
        break;
      case 'vertical-streak':
        grid.add((0, _guideVerticalStreak2.default)(scene.width, scene.height, guide));
        break;
    }
  });

  grid.position.y = -1;
  return grid;
}