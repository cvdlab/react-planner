'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (width, height, guide) {
  var step = guide.properties.get('step');
  var colors = void 0;

  if (guide.properties.has('color')) {
    colors = [guide.properties.get('color')];
  } else {
    colors = guide.properties.get('colors');
  }

  var fontLoader = new _three2.default.FontLoader();
  var font = fontLoader.parse(_helvetiker_regularTypeface.HELVETIKER); // For measures
  var streak = new _three2.default.Object3D();
  var counter = 0;

  for (var i = 0; i <= height; i += step) {

    var geometry = new _three2.default.Geometry();
    geometry.vertices.push(new _three2.default.Vector3(0, 0, -i));
    geometry.vertices.push(new _three2.default.Vector3(width, 0, -i));

    var material = new _three2.default.LineBasicMaterial({ color: colors[counter % colors.length] });

    if (counter % 5 == 0) {
      var shape = new _three2.default.TextGeometry(counter * step, {
        size: 16,
        height: 1,
        font: font
      });

      var wrapper = new _three2.default.MeshBasicMaterial({ color: 0x000000 });
      var words = new _three2.default.Mesh(shape, wrapper);

      words.rotation.x -= Math.PI / 2;
      words.position.set(-90, 0, -i);
      streak.add(words);
    }

    streak.add(new _three2.default.LineSegments(geometry, material));
    counter++;
  }
  return streak;
};

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

var _helvetiker_regularTypeface = require('../libs/helvetiker_regular.typeface.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }