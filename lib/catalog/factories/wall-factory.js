"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = WallFactory;
var _react = _interopRequireDefault(require("react"));
var _wallFactory3d = require("./wall-factory-3d");
var SharedStyle = _interopRequireWildcard(require("../../styles/shared-style"));
var Geometry = _interopRequireWildcard(require("../../utils/geometry"));
var _translator = _interopRequireDefault(require("../../translator/translator"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function _defineProperty(obj, key, value) { key = _toPropertyKey(key); if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var EPSILON = 20;
var EXTRA_EPSILON = 5;
var THRESHOLD_ANGLE = 0.5;
var EPSILON_ANGLE = 0.01;
var CHAR_HEIGHT = 11;
var STYLE_TEXT = {
  textAnchor: 'middle'
};
var STYLE_LINE = {
  stroke: SharedStyle.LINE_MESH_COLOR.selected
};
var STYLE_RECT = {
  strokeWidth: 1,
  stroke: SharedStyle.LINE_MESH_COLOR.unselected,
  fill: 'url(#diagonalFill)'
};
var STYLE_RECT_SELECTED = _objectSpread(_objectSpread({}, STYLE_RECT), {}, {
  stroke: SharedStyle.LINE_MESH_COLOR.selected
});
var translator = new _translator["default"]();
function WallFactory(name, info, textures) {
  var wallElement = {
    name: name,
    prototype: 'lines',
    info: info,
    properties: {
      height: {
        label: translator.t('height'),
        type: 'length-measure',
        defaultValue: {
          length: 300
        }
      },
      thickness: {
        label: translator.t('thickness'),
        type: 'length-measure',
        defaultValue: {
          length: 20
        }
      }
    },
    calculatePolygonPoints: function calculatePolygonPoints(element, layer, length, lines1, lines2, wp1, wp2, angleWall1_2, angleWall2_1) {
      var thickness = element.getIn(['properties', 'thickness', 'length']);
      var half_thickness = thickness / 2;
      var line;
      var point;
      var poly_points = [];
      console.log("Rendering end point WP1");
      if (lines1.size == 0) {
        poly_points.push({
          x: 0,
          y: half_thickness
        });
        poly_points.push({
          x: 0,
          y: -half_thickness
        });
      } else if (lines1.size == 1) {
        line = layer.lines.get(lines1.get(0));
        if (line.vertices.get(0) == wp1.id) {
          point = layer.vertices.get(line.vertices.get(1));
        } else {
          point = layer.vertices.get(line.vertices.get(0));
        }
        var angleLine = Geometry.angleBetweenTwoVertices(wp1, point);
        var lengthLine = Geometry.verticesDistance(wp1, point);
        var angleDiff = angleLine - angleWall1_2;
        // we bring it back between -PI and PI to simplify following if / else
        if (angleDiff > Math.PI) {
          angleDiff -= 2 * Math.PI;
        }
        if (angleDiff < -Math.PI) {
          angleDiff += 2 * Math.PI;
        }
        if (Math.abs(angleDiff) < THRESHOLD_ANGLE || lengthLine < EPSILON) {
          poly_points.push({
            x: 0,
            y: half_thickness
          });
          poly_points.push({
            x: 0,
            y: -half_thickness
          });
        } else if (Math.abs(angleDiff) > THRESHOLD_ANGLE && Math.abs(Math.abs(angleDiff) - Math.PI / 2) > EPSILON_ANGLE) {
          var topWall = Geometry.linePassingThroughTwoPoints(0, half_thickness, length, half_thickness);
          var botLine = Geometry.linePassingThroughTwoPoints(0, -half_thickness / Math.cos(angleDiff), lengthLine * Math.cos(angleDiff), lengthLine * Math.sin(angleDiff) - half_thickness / Math.cos(angleDiff));
          point = Geometry.twoLinesIntersection(topWall.a, topWall.b, topWall.c, botLine.a, botLine.b, botLine.c);
          if (point) {
            poly_points.push(point);
          }
          var botWall = Geometry.linePassingThroughTwoPoints(0, -half_thickness, length, -half_thickness);
          var topLine = Geometry.linePassingThroughTwoPoints(0, half_thickness / Math.cos(angleDiff), lengthLine * Math.cos(angleDiff), lengthLine * Math.sin(angleDiff) + half_thickness / Math.cos(angleDiff));
          point = Geometry.twoLinesIntersection(botWall.a, botWall.b, botWall.c, topLine.a, topLine.b, topLine.c);
          if (point) {
            poly_points.push(point);
          }
        } else if (Math.abs(Math.abs(angleDiff) - Math.PI / 2) < EPSILON_ANGLE) {
          if (angleWall1_2 > angleLine) {
            poly_points.push({
              x: -half_thickness,
              y: half_thickness
            });
            poly_points.push({
              x: half_thickness,
              y: -half_thickness
            });
          } else {
            poly_points.push({
              x: half_thickness,
              y: half_thickness
            });
            poly_points.push({
              x: -half_thickness,
              y: -half_thickness
            });
          }
        } else {
          var _topWall = Geometry.linePassingThroughTwoPoints(0, half_thickness, length, half_thickness);
          var _topLine = Geometry.linePassingThroughTwoPoints(0, half_thickness / Math.sin(angleDiff - Math.PI / 2), -lengthLine * Math.sin(angleDiff - Math.PI / 2), lengthLine * Math.cos(angleDiff - Math.PI / 2) + half_thickness / Math.sin(angleDiff - Math.PI / 2));
          point = Geometry.twoLinesIntersection(_topWall.a, _topWall.b, _topWall.c, _topLine.a, _topLine.b, _topLine.c);
          if (point) {
            poly_points.push(point);
          }
          var _botWall = Geometry.linePassingThroughTwoPoints(0, -half_thickness, length, -half_thickness);
          var _botLine = Geometry.linePassingThroughTwoPoints(0, -half_thickness / Math.sin(angleDiff - Math.PI / 2), -lengthLine * Math.sin(angleDiff - Math.PI / 2), lengthLine * Math.cos(angleDiff - Math.PI / 2) - half_thickness / Math.sin(angleDiff - Math.PI / 2));
          point = Geometry.twoLinesIntersection(_botWall.a, _botWall.b, _botWall.c, _botLine.a, _botLine.b, _botLine.c);
          if (point) {
            poly_points.push(point);
          }
        }
      } else {
        console.log("more than 2 lines");
        // We are first computing the min and max angles between the wall and the lines that are impacting rendering
        var lines = lines1.map(function (line) {
          return layer.lines.get(line);
        });
        var points = lines.map(function (line) {
          if (line.vertices.get(0) == wp1.id) {
            point = layer.vertices.get(line.vertices.get(1));
          } else {
            point = layer.vertices.get(line.vertices.get(0));
          }
          return {
            x: point.x,
            y: point.y
          };
        });
        var angles = points.map(function (point) {
          return Geometry.angleBetweenTwoVertices(wp1, point);
        });
        var angleDiffs = angles.map(function (angle) {
          return angle - angleWall1_2;
        });
        var lengths = points.map(function (point) {
          return Geometry.verticesDistance(wp1, point);
        });
        var _angleDiffs$reduce = angleDiffs.reduce(function (acc, angle, idx) {
            if (angle < 0) {
              angle += 2 * Math.PI;
            }
            if (acc.min === undefined || angle < acc.min) {
              acc.min = angle;
              acc.minIdx = idx;
            }
            if (acc.max === undefined || angle > acc.max) {
              acc.max = angle;
              acc.maxIdx = idx;
            }
            return acc;
          }, {
            min: undefined,
            max: undefined,
            minIdx: undefined,
            maxIdx: undefined
          }),
          min = _angleDiffs$reduce.min,
          max = _angleDiffs$reduce.max,
          minIdx = _angleDiffs$reduce.minIdx,
          maxIdx = _angleDiffs$reduce.maxIdx;
        console.log("angles: ", angles);
        console.log("angleDiffs: ", angleDiffs);

        // Rendering the intersection of the wall and line with min angle
        var minLength = lengths.get(minIdx);
        var minAngleDiff = angleDiffs.get(minIdx);
        console.log("minLength: ", minLength);
        console.log("minAngleDiff: ", minAngleDiff);
        if (Math.abs(minAngleDiff) < EPSILON_ANGLE || minLength < EPSILON) {
          poly_points.push({
            x: 0,
            y: half_thickness
          });
        } else if (Math.abs(minAngleDiff) > EPSILON_ANGLE && Math.abs(minAngleDiff) < Math.PI / 2 - EPSILON_ANGLE) {
          var _topWall2 = Geometry.linePassingThroughTwoPoints(0, half_thickness, length, half_thickness);
          var _botLine2 = Geometry.linePassingThroughTwoPoints(0, -half_thickness / Math.cos(minAngleDiff), minLength * Math.cos(minAngleDiff), minLength * Math.sin(minAngleDiff) - half_thickness / Math.cos(minAngleDiff));
          point = Geometry.twoLinesIntersection(_topWall2.a, _topWall2.b, _topWall2.c, _botLine2.a, _botLine2.b, _botLine2.c);
          if (point) {
            poly_points.push(point);
          }
        } else if (Math.abs(Math.abs(minAngleDiff) - Math.PI / 2) < EPSILON_ANGLE) {
          poly_points.push({
            x: half_thickness,
            y: half_thickness
          });
        } else if (Math.abs(minAngleDiff) > Math.PI / 2 + EPSILON_ANGLE && Math.abs(minAngleDiff) < Math.PI - EPSILON_ANGLE) {
          var _topWall3 = Geometry.linePassingThroughTwoPoints(0, half_thickness, length, half_thickness);
          var _topLine2 = Geometry.linePassingThroughTwoPoints(0, half_thickness / Math.sin(minAngleDiff - Math.PI / 2), -minLength * Math.sin(minAngleDiff - Math.PI / 2), minLength * Math.cos(minAngleDiff - Math.PI / 2) + half_thickness / Math.sin(minAngleDiff - Math.PI / 2));
          point = Geometry.twoLinesIntersection(_topWall3.a, _topWall3.b, _topWall3.c, _topLine2.a, _topLine2.b, _topLine2.c);
          if (point) {
            poly_points.push(point);
          }
        } else if (Math.abs(Math.abs(minAngleDiff) - Math.PI) < EPSILON_ANGLE) {
          poly_points.push({
            x: 0,
            y: half_thickness
          });
        } else if (Math.abs(minAngleDiff) > Math.PI + EPSILON_ANGLE && Math.abs(minAngleDiff) < 3 * Math.PI / 2 - EPSILON_ANGLE) {
          var _topWall4 = Geometry.linePassingThroughTwoPoints(0, half_thickness, length, half_thickness);
          var _topLine3 = Geometry.linePassingThroughTwoPoints(0, half_thickness / Math.sin(minAngleDiff - Math.PI / 2), -minLength * Math.sin(minAngleDiff - Math.PI / 2), minLength * Math.cos(minAngleDiff - Math.PI / 2) + half_thickness / Math.sin(minAngleDiff - Math.PI / 2));
          point = Geometry.twoLinesIntersection(_topWall4.a, _topWall4.b, _topWall4.c, _topLine3.a, _topLine3.b, _topLine3.c);
          if (point) {
            poly_points.push(point);
          }
        } else if (Math.abs(Math.abs(minAngleDiff) - 3 * Math.PI / 2) < EPSILON_ANGLE) {
          poly_points.push({
            x: -half_thickness,
            y: half_thickness
          });
        } else if (Math.abs(minAngleDiff) > 3 * Math.PI / 2 + EPSILON_ANGLE && Math.abs(minAngleDiff) < 2 * Math.PI - EPSILON_ANGLE) {
          var _topWall5 = Geometry.linePassingThroughTwoPoints(0, half_thickness, length, half_thickness);
          var _topLine4 = Geometry.linePassingThroughTwoPoints(0, half_thickness / Math.sin(minAngleDiff - Math.PI / 2), -minLength * Math.sin(minAngleDiff - Math.PI / 2), minLength * Math.cos(minAngleDiff - Math.PI / 2) + half_thickness / Math.sin(minAngleDiff - Math.PI / 2));
          point = Geometry.twoLinesIntersection(_topWall5.a, _topWall5.b, _topWall5.c, _topLine4.a, _topLine4.b, _topLine4.c);
          if (point) {
            poly_points.push(point);
          }
        } else {
          poly_points.push({
            x: 0,
            y: half_thickness
          });
        }

        // adds center point
        poly_points.push({
          x: 0,
          y: 0
        });

        // Rendering the intersection of the wall and line with max angle
        var maxLength = lengths.get(maxIdx);
        var maxAngleDiff = angleDiffs.get(maxIdx);
        console.log("maxLength: ", maxLength);
        console.log("maxAngleDiff: ", maxAngleDiff);
        if (Math.abs(maxAngleDiff) < EPSILON_ANGLE || maxLength < EPSILON) {
          poly_points.push({
            x: 0,
            y: -half_thickness
          });
        } else if (Math.abs(maxAngleDiff) > EPSILON_ANGLE && Math.abs(maxAngleDiff) < Math.PI / 2 - EPSILON_ANGLE) {
          var _botWall2 = Geometry.linePassingThroughTwoPoints(0, -half_thickness, length, -half_thickness);
          var _topLine5 = Geometry.linePassingThroughTwoPoints(0, half_thickness / Math.cos(maxAngleDiff), maxLength * Math.cos(maxAngleDiff), maxLength * Math.sin(maxAngleDiff) + half_thickness / Math.cos(maxAngleDiff));
          point = Geometry.twoLinesIntersection(_botWall2.a, _botWall2.b, _botWall2.c, _topLine5.a, _topLine5.b, _topLine5.c);
          if (point) {
            poly_points.push(point);
          }
        } else if (Math.abs(Math.abs(maxAngleDiff) - Math.PI / 2) < EPSILON_ANGLE) {
          poly_points.push({
            x: half_thickness,
            y: -half_thickness
          });
        } else if (Math.abs(maxAngleDiff) > Math.PI / 2 + EPSILON_ANGLE && Math.abs(maxAngleDiff) < Math.PI - EPSILON_ANGLE) {
          var _botWall3 = Geometry.linePassingThroughTwoPoints(0, -half_thickness, length, -half_thickness);
          var _botLine3 = Geometry.linePassingThroughTwoPoints(0, half_thickness / Math.sin(Math.PI / 2 - maxAngleDiff), maxLength * Math.sin(Math.PI / 2 - maxAngleDiff), maxLength * Math.cos(Math.PI / 2 - maxAngleDiff) - half_thickness / Math.sin(Math.PI / 2 - maxAngleDiff));
          point = Geometry.twoLinesIntersection(_botWall3.a, _botWall3.b, _botWall3.c, _botLine3.a, _botLine3.b, _botLine3.c);
          if (point) {
            poly_points.push(point);
          }
        } else if (Math.abs(Math.abs(maxAngleDiff) - Math.PI) < EPSILON_ANGLE) {
          poly_points.push({
            x: 0,
            y: -half_thickness
          });
        } else if (Math.abs(maxAngleDiff) > Math.PI + EPSILON_ANGLE && Math.abs(maxAngleDiff) < 3 * Math.PI / 2 - EPSILON_ANGLE) {
          var _botWall4 = Geometry.linePassingThroughTwoPoints(0, -half_thickness, length, -half_thickness);
          var _botLine4 = Geometry.linePassingThroughTwoPoints(0, -half_thickness / Math.sin(maxAngleDiff - Math.PI / 2), maxLength * Math.sin(maxAngleDiff - Math.PI / 2), maxLength * Math.cos(maxAngleDiff - Math.PI / 2) - half_thickness / Math.sin(maxAngleDiff - Math.PI / 2));
          point = Geometry.twoLinesIntersection(_botWall4.a, _botWall4.b, _botWall4.c, _botLine4.a, _botLine4.b, _botLine4.c);
          if (point) {
            poly_points.push(point);
          }
        } else if (Math.abs(Math.abs(maxAngleDiff) - 3 * Math.PI / 2) < EPSILON_ANGLE) {
          poly_points.push({
            x: -half_thickness,
            y: -half_thickness
          });
        } else if (Math.abs(maxAngleDiff) > 3 * Math.PI / 2 + EPSILON_ANGLE && Math.abs(maxAngleDiff) < 2 * Math.PI - EPSILON_ANGLE) {
          var _botWall5 = Geometry.linePassingThroughTwoPoints(0, -half_thickness, length, -half_thickness);
          var _botLine5 = Geometry.linePassingThroughTwoPoints(0, -half_thickness / Math.sin(maxAngleDiff - Math.PI / 2), maxLength * Math.sin(maxAngleDiff - Math.PI / 2), maxLength * Math.cos(maxAngleDiff - Math.PI / 2) - half_thickness / Math.sin(maxAngleDiff - Math.PI / 2));
          point = Geometry.twoLinesIntersection(_botWall5.a, _botWall5.b, _botWall5.c, _botLine5.a, _botLine5.b, _botLine5.c);
          if (point) {
            poly_points.push(point);
          }
        } else {
          poly_points.push({
            x: 0,
            y: -half_thickness
          });
        }
      }
      console.log("Rendering end point WP2");
      if (lines2.size == 0) {
        poly_points.push({
          x: length,
          y: -half_thickness
        });
        poly_points.push({
          x: length,
          y: half_thickness
        });
      } else if (lines2.size == 1) {
        line = layer.lines.get(lines2.get(0));
        if (line.vertices.get(0) == wp2.id) {
          point = layer.vertices.get(line.vertices.get(1));
        } else {
          point = layer.vertices.get(line.vertices.get(0));
        }
        var _angleLine = Geometry.angleBetweenTwoVertices(wp2, point);
        var _lengthLine = Geometry.verticesDistance(wp2, point);

        // TODO(pg): refactor using angleWall2_1
        var _angleDiff = _angleLine - (angleWall1_2 + Math.PI);
        // we bring it back between -PI and PI to simplify following if / else
        if (_angleDiff > Math.PI) {
          _angleDiff -= 2 * Math.PI;
        }
        if (_angleDiff < -Math.PI) {
          _angleDiff += 2 * Math.PI;
        }
        if (Math.abs(_angleDiff) < THRESHOLD_ANGLE || _lengthLine < EPSILON) {
          poly_points.push({
            x: wp2.x,
            y: wp2.y + half_thickness
          });
          poly_points.push({
            x: wp2.x,
            y: wp2.y - half_thickness
          });
        } else if (Math.abs(_angleDiff) > THRESHOLD_ANGLE && Math.abs(Math.abs(_angleDiff) - Math.PI / 2) > EPSILON_ANGLE) {
          var _botWall6 = Geometry.linePassingThroughTwoPoints(0, -half_thickness, length, -half_thickness);
          var _topLine6 = Geometry.linePassingThroughTwoPoints(length, half_thickness / Math.cos(_angleDiff), length - _lengthLine * Math.cos(_angleDiff), -_lengthLine * Math.sin(_angleDiff) + half_thickness / Math.cos(_angleDiff));
          var concavePoint = Geometry.twoLinesIntersection(_botWall6.a, _botWall6.b, _botWall6.c, _topLine6.a, _topLine6.b, _topLine6.c);
          if (concavePoint) {
            poly_points.push(concavePoint);
          }
          var _topWall6 = Geometry.linePassingThroughTwoPoints(0, half_thickness, length, half_thickness);
          var _botLine6 = Geometry.linePassingThroughTwoPoints(length, -half_thickness / Math.cos(_angleDiff), length - _lengthLine * Math.cos(_angleDiff), -_lengthLine * Math.sin(_angleDiff) - half_thickness / Math.cos(_angleDiff));
          var convexPoint = Geometry.twoLinesIntersection(_topWall6.a, _topWall6.b, _topWall6.c, _botLine6.a, _botLine6.b, _botLine6.c);
          if (convexPoint) {
            poly_points.push(convexPoint);
          }
        } else if (Math.abs(Math.abs(_angleDiff) - Math.PI / 2) < EPSILON_ANGLE) {
          if (angleWall1_2 > _angleLine) {
            poly_points.push({
              x: length - half_thickness,
              y: -half_thickness
            });
            poly_points.push({
              x: length + half_thickness,
              y: half_thickness
            });
          } else {
            poly_points.push({
              x: length + half_thickness,
              y: -half_thickness
            });
            poly_points.push({
              x: length - half_thickness,
              y: half_thickness
            });
          }
        } else {
          var _botWall7 = Geometry.linePassingThroughTwoPoints(0, -half_thickness, length, -half_thickness);
          var _botLine7 = Geometry.linePassingThroughTwoPoints(length, -half_thickness / Math.sin(_angleDiff - Math.PI / 2), length - _lengthLine * Math.sin(_angleDiff - Math.PI / 2), _lengthLine * Math.cos(_angleDiff - Math.PI / 2) - half_thickness / Math.sin(_angleDiff - Math.PI / 2));
          var _concavePoint = Geometry.twoLinesIntersection(_botWall7.a, _botWall7.b, _botWall7.c, _botLine7.a, _botLine7.b, _botLine7.c);
          if (_concavePoint) {
            poly_points.push(_concavePoint);
          }
          var _topWall7 = Geometry.linePassingThroughTwoPoints(0, half_thickness, length, half_thickness);
          var _topLine7 = Geometry.linePassingThroughTwoPoints(length, half_thickness / Math.sin(_angleDiff - Math.PI / 2), length - _lengthLine * Math.sin(_angleDiff - Math.PI / 2), _lengthLine * Math.cos(_angleDiff - Math.PI / 2) + half_thickness / Math.sin(_angleDiff - Math.PI / 2));
          var _convexPoint = Geometry.twoLinesIntersection(_topWall7.a, _topWall7.b, _topWall7.c, _topLine7.a, _topLine7.b, _topLine7.c);
          if (_convexPoint) {
            poly_points.push(_convexPoint);
          }
        }
      } else {
        console.log("more than 2 lines");
        // We are first computing the min and max angles between the wall and the lines that are impacting rendering
        var _lines = lines2.map(function (line) {
          return layer.lines.get(line);
        });
        var _points = _lines.map(function (line) {
          if (line.vertices.get(0) == wp2.id) {
            point = layer.vertices.get(line.vertices.get(1));
          } else {
            point = layer.vertices.get(line.vertices.get(0));
          }
          return {
            x: point.x,
            y: point.y
          };
        });
        var _angles = _points.map(function (point) {
          return Geometry.angleBetweenTwoVertices(wp2, point);
        });
        var _angleDiffs = _angles.map(function (angle) {
          return angle - angleWall2_1;
        });
        var _lengths = _points.map(function (point) {
          return Geometry.verticesDistance(wp2, point);
        });
        var _angleDiffs$reduce2 = _angleDiffs.reduce(function (acc, angle, idx) {
            if (angle < 0) {
              angle += 2 * Math.PI;
            }
            if (acc.min === undefined || angle < acc.min) {
              acc.min = angle;
              acc.minIdx = idx;
            }
            if (acc.max === undefined || angle > acc.max) {
              acc.max = angle;
              acc.maxIdx = idx;
            }
            return acc;
          }, {
            min: undefined,
            max: undefined,
            minIdx: undefined,
            maxIdx: undefined
          }),
          _min = _angleDiffs$reduce2.min,
          _max = _angleDiffs$reduce2.max,
          _minIdx = _angleDiffs$reduce2.minIdx,
          _maxIdx = _angleDiffs$reduce2.maxIdx;
        console.log("angles: ", _angles);
        console.log("angleDiffs: ", _angleDiffs);

        // Rendering the intersection of the wall and line with min angle
        var _minLength = _lengths.get(_minIdx);
        var _minAngleDiff = _angleDiffs.get(_minIdx);
        console.log("minLength: ", _minLength);
        console.log("minAngleDiff: ", _minAngleDiff);
        if (Math.abs(_minAngleDiff) < EPSILON_ANGLE || _minLength < EPSILON) {
          poly_points.push({
            x: wp2.x,
            y: wp2.y - half_thickness
          });
        } else if (Math.abs(_minAngleDiff) > EPSILON_ANGLE && Math.abs(_minAngleDiff) < Math.PI / 2 - EPSILON_ANGLE) {
          var _botWall8 = Geometry.linePassingThroughTwoPoints(0, -half_thickness, length, -half_thickness);
          var _topLine8 = Geometry.linePassingThroughTwoPoints(length, half_thickness / Math.cos(_minAngleDiff), length - _minLength * Math.cos(_minAngleDiff), -_minLength * Math.sin(_minAngleDiff) + half_thickness / Math.cos(_minAngleDiff));
          point = Geometry.twoLinesIntersection(_botWall8.a, _botWall8.b, _botWall8.c, _topLine8.a, _topLine8.b, _topLine8.c);
          if (point) {
            poly_points.push(point);
          }
        } else if (Math.abs(Math.abs(_minAngleDiff) - Math.PI / 2) < EPSILON_ANGLE) {
          poly_points.push({
            x: length - half_thickness,
            y: -half_thickness
          });
        } else if (Math.abs(_minAngleDiff) > Math.PI / 2 + EPSILON_ANGLE && Math.abs(_minAngleDiff) < Math.PI - EPSILON_ANGLE) {
          var _botWall9 = Geometry.linePassingThroughTwoPoints(0, -half_thickness, length, -half_thickness);
          var _botLine8 = Geometry.linePassingThroughTwoPoints(length, -half_thickness / Math.sin(_minAngleDiff - Math.PI / 2), length - _minLength * Math.sin(_minAngleDiff - Math.PI / 2), _minLength * Math.cos(_minAngleDiff - Math.PI / 2) - half_thickness / Math.sin(_minAngleDiff - Math.PI / 2));
          point = Geometry.twoLinesIntersection(_botWall9.a, _botWall9.b, _botWall9.c, _botLine8.a, _botLine8.b, _botLine8.c);
          if (point) {
            poly_points.push(point);
          }
        } else if (Math.abs(Math.abs(_minAngleDiff) - Math.PI) < EPSILON_ANGLE) {
          poly_points.push({
            x: length,
            y: -half_thickness
          });
        } else if (Math.abs(_minAngleDiff) > Math.PI + EPSILON_ANGLE && Math.abs(_minAngleDiff) < 3 * Math.PI / 2 - EPSILON_ANGLE) {
          var _botWall10 = Geometry.linePassingThroughTwoPoints(0, -half_thickness, length, -half_thickness);
          var _botLine9 = Geometry.linePassingThroughTwoPoints(length, -half_thickness / Math.sin(_minAngleDiff - Math.PI / 2), length - _minLength * Math.sin(_minAngleDiff - Math.PI / 2), _minLength * Math.cos(_minAngleDiff - Math.PI / 2) - half_thickness / Math.sin(_minAngleDiff - Math.PI / 2));
          point = Geometry.twoLinesIntersection(_botWall10.a, _botWall10.b, _botWall10.c, _botLine9.a, _botLine9.b, _botLine9.c);
          if (point) {
            poly_points.push(point);
          }
        } else if (Math.abs(Math.abs(_minAngleDiff) - 3 * Math.PI / 2) < EPSILON_ANGLE) {
          poly_points.push({
            x: length - half_thickness,
            y: -half_thickness
          });
        } else if (Math.abs(_minAngleDiff) > 3 * Math.PI / 2 + EPSILON_ANGLE && Math.abs(_minAngleDiff) < 2 * Math.PI - EPSILON_ANGLE) {
          var _botWall11 = Geometry.linePassingThroughTwoPoints(0, -half_thickness, length, -half_thickness);
          var _botLine10 = Geometry.linePassingThroughTwoPoints(length, -half_thickness / Math.sin(_minAngleDiff - Math.PI / 2), length - _minLength * Math.sin(_minAngleDiff - Math.PI / 2), _minLength * Math.cos(_minAngleDiff - Math.PI / 2) - half_thickness / Math.sin(_minAngleDiff - Math.PI / 2));
          point = Geometry.twoLinesIntersection(_botWall11.a, _botWall11.b, _botWall11.c, _botLine10.a, _botLine10.b, _botLine10.c);
          if (point) {
            poly_points.push(point);
          }
        } else {
          poly_points.push({
            x: length,
            y: -half_thickness
          });
        }

        // adds center point
        poly_points.push({
          x: length,
          y: 0
        });

        // Rendering the intersection of the wall and line with max angle
        var _maxLength = _lengths.get(_maxIdx);
        var _maxAngleDiff = _angleDiffs.get(_maxIdx);
        console.log("maxLength: ", _maxLength);
        console.log("maxAngleDiff: ", _maxAngleDiff);
        if (Math.abs(_maxAngleDiff) < EPSILON_ANGLE || _maxLength < EPSILON) {
          poly_points.push({
            x: wp2.x,
            y: wp2.y + half_thickness
          });
        } else if (Math.abs(_maxAngleDiff) > EPSILON_ANGLE && Math.abs(_maxAngleDiff) < Math.PI / 2 - EPSILON_ANGLE) {
          var _topWall8 = Geometry.linePassingThroughTwoPoints(0, half_thickness, length, half_thickness);
          var _botLine11 = Geometry.linePassingThroughTwoPoints(length, -half_thickness / Math.cos(_maxAngleDiff), length - _maxLength * Math.cos(_maxAngleDiff), -_maxLength * Math.sin(_maxAngleDiff) - half_thickness / Math.cos(_maxAngleDiff));
          point = Geometry.twoLinesIntersection(_topWall8.a, _topWall8.b, _topWall8.c, _botLine11.a, _botLine11.b, _botLine11.c);
          if (point) {
            poly_points.push(point);
          }
        } else if (Math.abs(Math.abs(_maxAngleDiff) - Math.PI / 2) < EPSILON_ANGLE) {
          poly_points.push({
            x: length - half_thickness,
            y: half_thickness
          });
        } else if (Math.abs(_maxAngleDiff) > Math.PI / 2 + EPSILON_ANGLE && Math.abs(_maxAngleDiff) < Math.PI - EPSILON_ANGLE) {
          var _topWall9 = Geometry.linePassingThroughTwoPoints(0, half_thickness, length, half_thickness);
          var _topLine9 = Geometry.linePassingThroughTwoPoints(length, half_thickness / Math.sin(_maxAngleDiff - Math.PI / 2), length - _maxLength * Math.sin(_maxAngleDiff - Math.PI / 2), _maxLength * Math.cos(_maxAngleDiff - Math.PI / 2) + half_thickness / Math.sin(_maxAngleDiff - Math.PI / 2));
          point = Geometry.twoLinesIntersection(_topWall9.a, _topWall9.b, _topWall9.c, _topLine9.a, _topLine9.b, _topLine9.c);
          if (point) {
            poly_points.push(point);
          }
        } else if (Math.abs(Math.abs(_maxAngleDiff) - Math.PI) < EPSILON_ANGLE) {
          poly_points.push({
            x: length,
            y: half_thickness
          });
        } else if (Math.abs(_maxAngleDiff) > Math.PI + EPSILON_ANGLE && Math.abs(_maxAngleDiff) < 3 * Math.PI / 2 - EPSILON_ANGLE) {
          var _topWall10 = Geometry.linePassingThroughTwoPoints(0, half_thickness, length, half_thickness);
          var _topLine10 = Geometry.linePassingThroughTwoPoints(length, half_thickness / Math.sin(_maxAngleDiff - Math.PI / 2), length - _maxLength * Math.sin(_maxAngleDiff - Math.PI / 2), _maxLength * Math.cos(_maxAngleDiff - Math.PI / 2) + half_thickness / Math.sin(_maxAngleDiff - Math.PI / 2));
          point = Geometry.twoLinesIntersection(_topWall10.a, _topWall10.b, _topWall10.c, _topLine10.a, _topLine10.b, _topLine10.c);
          if (point) {
            poly_points.push(point);
          }
        } else if (Math.abs(Math.abs(_maxAngleDiff) - 3 * Math.PI / 2) < EPSILON_ANGLE) {
          poly_points.push({
            x: length - half_thickness,
            y: half_thickness
          });
        } else if (Math.abs(_maxAngleDiff) > 3 * Math.PI / 2 + EPSILON_ANGLE && Math.abs(_maxAngleDiff) < 2 * Math.PI - EPSILON_ANGLE) {
          var _topWall11 = Geometry.linePassingThroughTwoPoints(0, half_thickness, length, half_thickness);
          var _topLine11 = Geometry.linePassingThroughTwoPoints(length, half_thickness / Math.sin(_maxAngleDiff - Math.PI / 2), length - _maxLength * Math.sin(_maxAngleDiff - Math.PI / 2), _maxLength * Math.cos(_maxAngleDiff - Math.PI / 2) + half_thickness / Math.sin(_maxAngleDiff - Math.PI / 2));
          point = Geometry.twoLinesIntersection(_topWall11.a, _topWall11.b, _topWall11.c, _topLine11.a, _topLine11.b, _topLine11.c);
          if (point) {
            poly_points.push(point);
          }
        } else {
          poly_points.push({
            x: length,
            y: half_thickness
          });
        }
      }
      return poly_points;
    },
    renderRectangle: function renderRectangle(element, length) {
      var length_5 = length / 5;
      var thickness = element.getIn(['properties', 'thickness', 'length']);
      var half_thickness = thickness / 2;
      var half_thickness_eps = half_thickness + EPSILON;
      var textDistance = half_thickness + EPSILON + EXTRA_EPSILON;
      return element.selected ? /*#__PURE__*/_react["default"].createElement("g", null, /*#__PURE__*/_react["default"].createElement("rect", {
        x: "0",
        y: -half_thickness,
        width: length,
        height: thickness,
        style: STYLE_RECT_SELECTED
      }), /*#__PURE__*/_react["default"].createElement("line", {
        x1: length_5,
        y1: -half_thickness_eps,
        x2: length_5,
        y2: half_thickness_eps,
        style: STYLE_LINE
      }), /*#__PURE__*/_react["default"].createElement("text", {
        x: length_5,
        y: textDistance + CHAR_HEIGHT,
        style: STYLE_TEXT
      }, "A"), /*#__PURE__*/_react["default"].createElement("text", {
        x: length_5,
        y: -textDistance,
        style: STYLE_TEXT
      }, "B")) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("rect", {
        x: "0",
        y: -half_thickness,
        width: length,
        height: thickness,
        style: STYLE_RECT
      }));
    },
    renderPolygon: function renderPolygon(element, length, points) {
      var length_5 = length / 5;
      var thickness = element.getIn(['properties', 'thickness', 'length']);
      var half_thickness = thickness / 2;
      var half_thickness_eps = half_thickness + EPSILON;
      var textDistance = half_thickness + EPSILON + EXTRA_EPSILON;
      return element.selected ? /*#__PURE__*/_react["default"].createElement("g", null, /*#__PURE__*/_react["default"].createElement("polygon", {
        points: points.map(function (p) {
          return "".concat(p.x, ",").concat(p.y);
        }).join(' '),
        style: STYLE_RECT_SELECTED
      }), ";", /*#__PURE__*/_react["default"].createElement("line", {
        x1: length_5,
        y1: -half_thickness_eps,
        x2: length_5,
        y2: half_thickness_eps,
        style: STYLE_LINE
      }), /*#__PURE__*/_react["default"].createElement("text", {
        x: length_5,
        y: textDistance + CHAR_HEIGHT,
        style: STYLE_TEXT
      }, "A"), /*#__PURE__*/_react["default"].createElement("text", {
        x: length_5,
        y: -textDistance,
        style: STYLE_TEXT
      }, "B")) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("polygon", {
        points: points.map(function (p) {
          return "".concat(p.x, ",").concat(p.y);
        }).join(' '),
        style: STYLE_RECT
      }), ";", /*#__PURE__*/_react["default"].createElement("text", {
        x: length_5,
        y: -thickness,
        style: STYLE_TEXT
      }, element.id));
    },
    render2D: function render2D(element, layer, scene) {
      console.log("element ID: ", element.id);
      console.log("element: ", element);
      console.log("layer: ", layer);
      var wall = layer.lines.get(element.id);
      var _layer$vertices$get = layer.vertices.get(element.vertices.get(0)),
        x1 = _layer$vertices$get.x,
        y1 = _layer$vertices$get.y,
        lines1 = _layer$vertices$get.lines;
      var _layer$vertices$get2 = layer.vertices.get(element.vertices.get(1)),
        x2 = _layer$vertices$get2.x,
        y2 = _layer$vertices$get2.y,
        lines2 = _layer$vertices$get2.lines;
      var length = Geometry.pointsDistance(x1, y1, x2, y2);

      // we avoid computation and rendering of very small segments with poly and return the previous rectangle rendering
      if (length < EPSILON) return this.renderRectangle(element, length);

      // Checking intersection with other walls and building points array to build polygon instead of rectangle
      // TODO(pg): investigate why removed lines still appears as undefined in the list of lines
      // refreshing the page removes them but still...
      lines1 = lines1.filter(function (line) {
        return line !== undefined && line !== wall.id;
      });
      lines2 = lines2.filter(function (line) {
        return line !== undefined && line !== wall.id;
      });
      // TODO(pg): investiage why the same line ID appears twice in the list of lines
      // lines1 = lines1.filter((line, idx) => (lines1.indexOf(line) === idx));
      // lines2 = lines2.filter((line, idx) => (lines2.indexOf(line) === idx));

      console.log("lines1.size: ", lines1.size);
      console.log("lines2.size: ", lines2.size);
      console.log("lines1: ", lines1);
      console.log("lines2: ", lines2);
      var wp1 = layer.vertices.get(wall.vertices.get(0));
      var wp2 = layer.vertices.get(wall.vertices.get(1));
      var angleWall1_2 = Geometry.angleBetweenTwoVertices(wp1, wp2);
      var angleWall2_1 = Geometry.angleBetweenTwoVertices(wp2, wp1);
      console.log("angleWall1_2: ", angleWall1_2);
      console.log("angleWall2_1: ", angleWall2_1);
      var poly_points = this.calculatePolygonPoints(element, layer, length, lines1, lines2, wp1, wp2, angleWall1_2, angleWall2_1);
      console.log("polygon points: ", poly_points);
      return this.renderPolygon(element, length, poly_points);
    },
    render3D: function render3D(element, layer, scene) {
      return (0, _wallFactory3d.buildWall)(element, layer, scene, textures);
    },
    updateRender3D: function updateRender3D(element, layer, scene, mesh, oldElement, differences, selfDestroy, selfBuild) {
      return (0, _wallFactory3d.updatedWall)(element, layer, scene, textures, mesh, oldElement, differences, selfDestroy, selfBuild);
    }
  };
  if (textures && textures !== {}) {
    var textureValues = {
      'none': 'None'
    };
    for (var textureName in textures) {
      textureValues[textureName] = textures[textureName].name;
    }
    wallElement.properties.textureA = {
      label: translator.t('texture') + ' A',
      type: 'enum',
      defaultValue: textureValues.bricks ? 'bricks' : 'none',
      values: textureValues
    };
    wallElement.properties.textureB = {
      label: translator.t('texture') + ' B',
      type: 'enum',
      defaultValue: textureValues.bricks ? 'bricks' : 'none',
      values: textureValues
    };
  }
  return wallElement;
}