"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sceneSnapElements = sceneSnapElements;
var _snap = require("./snap");
var _export = require("./export");
var _immutable = require("immutable");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i["return"] && (_r = _i["return"](), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
function sceneSnapElements(scene) {
  var snapElements = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : new _immutable.List();
  var snapMask = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : new _immutable.Map();
  var width = scene.width,
    height = scene.height;
  var a, b, c;
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