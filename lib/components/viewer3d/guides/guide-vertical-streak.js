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

  var fontLoader = new Three.FontLoader();
  var font = fontLoader.parse(_helvetiker_regularTypeface.HELVETIKER); // For measures
  var streak = new Three.Object3D();

  var counter = 0;

  for (var i = 0; i <= width; i += step) {

    var geometry = new Three.Geometry();
    geometry.vertices.push(new Three.Vector3(i, 0, 0));
    geometry.vertices.push(new Three.Vector3(i, 0, -height));

    var material = new Three.LineBasicMaterial({ color: colors[counter % colors.length] });

    if (counter % 5 == 0) {
      var shape = new Three.TextGeometry(counter * step, {
        size: 16,
        height: 1,
        font: font
      });

      var wrapper = new Three.MeshBasicMaterial({ color: 0x000000 });
      var words = new Three.Mesh(shape, wrapper);

      words.rotation.x -= Math.PI / 2;
      words.position.set(i - 20, 0, 50);
      streak.add(words);
    }

    streak.add(new Three.LineSegments(geometry, material));
    counter++;
  }
  return streak;
};

var _three = require('three');

var Three = _interopRequireWildcard(_three);

var _helvetiker_regularTypeface = require('../libs/helvetiker_regular.typeface.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }