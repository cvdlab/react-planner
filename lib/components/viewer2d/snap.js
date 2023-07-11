"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ActiveDrawingHelper;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var Geometry = _interopRequireWildcard(require("../../utils/geometry"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var STYLE = {
  stroke: '#D32F2F',
  strokeWidth: "1px"
};
function ActiveDrawingHelper(_ref) {
  var snap = _ref.snap,
    width = _ref.width,
    height = _ref.height;
  switch (snap.type) {
    case 'point':
      return /*#__PURE__*/_react["default"].createElement("g", {
        transform: "translate(".concat(snap.x, " ").concat(snap.y, ")")
      }, /*#__PURE__*/_react["default"].createElement("line", {
        x1: "0",
        y1: "-70",
        x2: "0",
        y2: "70",
        style: STYLE
      }), /*#__PURE__*/_react["default"].createElement("line", {
        x1: "-70",
        y1: "0",
        x2: "70",
        y2: "0",
        style: STYLE
      }));
    case 'line':
      var h0 = Geometry.horizontalLine(0);
      var h1 = Geometry.horizontalLine(height);
      var pointH0 = Geometry.twoLinesIntersection(snap.a, snap.b, snap.c, h0.a, h0.b, h0.c);
      var pointH1 = Geometry.twoLinesIntersection(snap.a, snap.b, snap.c, h1.a, h1.b, h1.c);
      var v0 = Geometry.verticalLine(0);
      var v1 = Geometry.verticalLine(width);
      var pointV0 = Geometry.twoLinesIntersection(snap.a, snap.b, snap.c, v0.a, v0.b, v0.c);
      var pointV1 = Geometry.twoLinesIntersection(snap.a, snap.b, snap.c, v1.a, v1.b, v1.c);
      if (pointH0 && pointH1) return /*#__PURE__*/_react["default"].createElement("line", {
        x1: pointH0.x,
        y1: pointH0.y,
        x2: pointH1.x,
        y2: pointH1.y,
        style: STYLE
      });
      if (pointV0 && pointV1) return /*#__PURE__*/_react["default"].createElement("line", {
        x1: pointV0.x,
        y1: pointV0.y,
        x2: pointV1.x,
        y2: pointV1.y,
        style: STYLE
      });
      return null;
    case 'line-segment':
      return /*#__PURE__*/_react["default"].createElement("line", {
        x1: snap.x1,
        y1: snap.y1,
        x2: snap.x2,
        y2: snap.y2,
        style: STYLE
      });
    default:
      return null;
  }
}
ActiveDrawingHelper.propTypes = {
  snap: _propTypes["default"].object.isRequired,
  width: _propTypes["default"].number.isRequired,
  height: _propTypes["default"].number.isRequired
};