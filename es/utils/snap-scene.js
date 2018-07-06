var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

import { SNAP_POINT, SNAP_LINE, SNAP_SEGMENT, SNAP_GRID, SNAP_GUIDE, addPointSnap, addLineSnap, addLineSegmentSnap, addGridSnap } from './snap';
import { GeometryUtils } from './export';
import { Map, List } from 'immutable';

export function sceneSnapElements(scene) {
  var snapElements = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new List();
  var snapMask = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new Map();
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


        if (snapMask.get(SNAP_POINT)) {
          addPointSnap(snapElements, x, y, 10, 10, vertexID);
        }

        if (snapMask.get(SNAP_LINE)) {
          var _GeometryUtils$horizo = GeometryUtils.horizontalLine(y);

          a = _GeometryUtils$horizo.a;
          b = _GeometryUtils$horizo.b;
          c = _GeometryUtils$horizo.c;

          addLineSnap(snapElements, a, b, c, 10, 1, vertexID);

          var _GeometryUtils$vertic = GeometryUtils.verticalLine(x);

          a = _GeometryUtils$vertic.a;
          b = _GeometryUtils$vertic.b;
          c = _GeometryUtils$vertic.c;

          addLineSnap(snapElements, a, b, c, 10, 1, vertexID);
        }
      });

      if (snapMask.get(SNAP_SEGMENT)) {
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

          addLineSegmentSnap(snapElements, x1, y1, x2, y2, 20, 1, lineID);
        });
      }
    });

    if (snapMask.get(SNAP_GRID)) {
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

          addGridSnap(snapElements, xMul, yMul, 10, onXCross && onYCross ? 15 : 10, null);
        }
      }
    }

    if (snapMask.get(SNAP_GUIDE)) {

      var horizontal = scene.getIn(['guides', 'horizontal']);
      var vertical = scene.getIn(['guides', 'vertical']);

      var hValues = horizontal.valueSeq();
      var vValues = vertical.valueSeq();

      hValues.forEach(function (hVal) {
        vValues.forEach(function (vVal) {
          addPointSnap(snapElements, vVal, hVal, 10, 10);
        });
      });

      hValues.forEach(function (hVal) {
        return addLineSegmentSnap(snapElements, 0, hVal, width, hVal, 20, 1);
      });
      vValues.forEach(function (vVal) {
        return addLineSegmentSnap(snapElements, vVal, 0, vVal, height, 20, 1);
      });
    }
  });
}