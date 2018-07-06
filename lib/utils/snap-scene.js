'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.sceneSnapElements = sceneSnapElements;

var _snap = require('./snap');

var _export = require('./export');

var _immutable = require('immutable');

function sceneSnapElements(scene) {
  var snapElements = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _immutable.List();
  var snapMask = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new _immutable.Map();
  var width = scene.width,
      height = scene.height;


  var a = void 0,
      b = void 0,
      c = void 0;
  return snapElements.withMutations(function (snapElements) {
    scene.layers.forEach(function (layer) {
      var lines = layer.lines,
          vertices = layer.vertices;


      vertices.forEach(function (_ref) {
        var vertexID = _ref.id,
            x = _ref.x,
            y = _ref.y;


        if (snapMask.get(_snap.SNAP_POINT)) {
          (0, _snap.addPointSnap)(snapElements, x, y, 10, 10, vertexID);
        }

        if (snapMask.get(_snap.SNAP_LINE)) {
          var _GeometryUtils$horizo = _export.GeometryUtils.horizontalLine(y);

          a = _GeometryUtils$horizo.a;
          b = _GeometryUtils$horizo.b;
          c = _GeometryUtils$horizo.c;

          (0, _snap.addLineSnap)(snapElements, a, b, c, 10, 1, vertexID);

          var _GeometryUtils$vertic = _export.GeometryUtils.verticalLine(x);

          a = _GeometryUtils$vertic.a;
          b = _GeometryUtils$vertic.b;
          c = _GeometryUtils$vertic.c;

          (0, _snap.addLineSnap)(snapElements, a, b, c, 10, 1, vertexID);
        }
      });

      if (snapMask.get(_snap.SNAP_SEGMENT)) {
        lines.forEach(function (_ref2) {
          var lineID = _ref2.id,
              _ref2$vertices = _slicedToArray(_ref2.vertices, 2),
              v0 = _ref2$vertices[0],
              v1 = _ref2$vertices[1];

          var _vertices$get = vertices.get(v0),
              x1 = _vertices$get.x,
              y1 = _vertices$get.y;

          var _vertices$get2 = vertices.get(v1),
              x2 = _vertices$get2.x,
              y2 = _vertices$get2.y;

          (0, _snap.addLineSegmentSnap)(snapElements, x1, y1, x2, y2, 20, 1, lineID);
        });
      }
    });

    if (snapMask.get(_snap.SNAP_GRID)) {
      var divider = 5;
      var gridCellSize = 100 / divider;
      var xCycle = width / gridCellSize;
      var yCycle = height / gridCellSize;

      for (var x = 0; x < xCycle; x++) {
        var xMul = x * gridCellSize;

        for (var y = 0; y < yCycle; y++) {
          var yMul = y * gridCellSize;

          var onXCross = !(x % divider) ? true : false;
          var onYCross = !(y % divider) ? true : false;

          (0, _snap.addGridSnap)(snapElements, xMul, yMul, 10, onXCross && onYCross ? 15 : 10, null);
        }
      }
    }

    if (snapMask.get(_snap.SNAP_GUIDE)) {

      var horizontal = scene.getIn(['guides', 'horizontal']);
      var vertical = scene.getIn(['guides', 'vertical']);

      var hValues = horizontal.valueSeq();
      var vValues = vertical.valueSeq();

      hValues.forEach(function (hVal) {
        vValues.forEach(function (vVal) {
          (0, _snap.addPointSnap)(snapElements, vVal, hVal, 10, 10);
        });
      });

      hValues.forEach(function (hVal) {
        return (0, _snap.addLineSegmentSnap)(snapElements, 0, hVal, width, hVal, 20, 1);
      });
      vValues.forEach(function (vVal) {
        return (0, _snap.addLineSegmentSnap)(snapElements, vVal, 0, vVal, height, 20, 1);
      });
    }
  });
}