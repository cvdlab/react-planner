"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.viewer3DActions = exports.viewer2DActions = exports.verticesActions = exports.sceneActions = exports.projectActions = exports.linesActions = exports.itemsActions = exports.holesActions = exports.groupsActions = exports["default"] = exports.areaActions = void 0;
var projectActions = _interopRequireWildcard(require("./project-actions"));
exports.projectActions = projectActions;
var viewer2DActions = _interopRequireWildcard(require("./viewer2d-actions"));
exports.viewer2DActions = viewer2DActions;
var viewer3DActions = _interopRequireWildcard(require("./viewer3d-actions"));
exports.viewer3DActions = viewer3DActions;
var linesActions = _interopRequireWildcard(require("./lines-actions"));
exports.linesActions = linesActions;
var holesActions = _interopRequireWildcard(require("./holes-actions"));
exports.holesActions = holesActions;
var sceneActions = _interopRequireWildcard(require("./scene-actions"));
exports.sceneActions = sceneActions;
var verticesActions = _interopRequireWildcard(require("./vertices-actions"));
exports.verticesActions = verticesActions;
var itemsActions = _interopRequireWildcard(require("./items-actions"));
exports.itemsActions = itemsActions;
var areaActions = _interopRequireWildcard(require("./area-actions"));
exports.areaActions = areaActions;
var groupsActions = _interopRequireWildcard(require("./groups-actions"));
exports.groupsActions = groupsActions;
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
var _default = {
  projectActions: projectActions,
  viewer2DActions: viewer2DActions,
  viewer3DActions: viewer3DActions,
  linesActions: linesActions,
  holesActions: holesActions,
  sceneActions: sceneActions,
  verticesActions: verticesActions,
  itemsActions: itemsActions,
  areaActions: areaActions,
  groupsActions: groupsActions
};
exports["default"] = _default;