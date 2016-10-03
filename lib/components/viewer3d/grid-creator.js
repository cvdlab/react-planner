'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = createGrid;

var _three = require('three');

var _three2 = _interopRequireDefault(_three);

var _helvetiker_regularTypeface = require('./libs/helvetiker_regular.typeface.js');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createGrid(sizeX, sizeY, step) {

  var grid = new _three2.default.Object3D();
  var fontLoader = new _three2.default.FontLoader();
  var font = fontLoader.parse(_helvetiker_regularTypeface.HELVETIKER); // For measures
  var material = void 0;
  var counter = 0;

  /* Draw horizontal lines */
  for (var i = 0; i <= sizeY; i += 1) {

    if (counter % step == 0 || counter % (step / 5) == 0) {

      var geometry = new _three2.default.Geometry();
      geometry.vertices.push(new _three2.default.Vector3(0, 0, -i));
      geometry.vertices.push(new _three2.default.Vector3(sizeX, 0, -i));

      if (counter % step == 0) {

        material = new _three2.default.LineBasicMaterial({ color: 0x000000 });

        var shape = new _three2.default.TextGeometry(counter, {
          size: 16,
          height: 1,
          font: font
        });

        var wrapper = new _three2.default.MeshBasicMaterial({ color: 0x000000 });
        var words = new _three2.default.Mesh(shape, wrapper);

        words.rotation.x -= Math.PI / 2;
        words.position.set(-90, 0, -i);
        grid.add(words);
      } else if (counter % (step / 5) == 0) {
        material = new _three2.default.LineBasicMaterial({ color: 0xaaaaaa });
      }

      grid.add(new _three2.default.LineSegments(geometry, material));
    }

    counter++;
  }

  counter = 0;

  /* Draw vertical lines */
  for (var _i = 0; _i <= sizeX; _i += 1) {

    if (counter % step == 0 || counter % (step / 5) == 0) {

      var _geometry = new _three2.default.Geometry();
      _geometry.vertices.push(new _three2.default.Vector3(_i, 0, 0));
      _geometry.vertices.push(new _three2.default.Vector3(_i, 0, -sizeY));

      if (counter % step == 0) {

        material = new _three2.default.LineBasicMaterial({ color: 0x000000 });

        var _shape = new _three2.default.TextGeometry(counter, {
          size: 16,
          height: 1,
          font: font
        });

        var _wrapper = new _three2.default.MeshBasicMaterial({ color: 0x000000 });
        var _words = new _three2.default.Mesh(_shape, _wrapper);

        _words.rotation.x -= Math.PI / 2;
        _words.position.set(_i - 20, 0, 50);
        grid.add(_words);
      } else if (counter % (step / 5) == 0) {
        material = new _three2.default.LineBasicMaterial({ color: 0xaaaaaa });
      }

      grid.add(new _three2.default.LineSegments(_geometry, material));
    }

    counter++;
  }
  return grid;
}