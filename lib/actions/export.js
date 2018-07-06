'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.groupsActions = exports.areaActions = exports.itemsActions = exports.verticesActions = exports.sceneActions = exports.holesActions = exports.linesActions = exports.viewer3DActions = exports.viewer2DActions = exports.projectActions = undefined;

var _projectActions = require('./project-actions');

var projectActions = _interopRequireWildcard(_projectActions);

var _viewer2dActions = require('./viewer2d-actions');

var viewer2DActions = _interopRequireWildcard(_viewer2dActions);

var _viewer3dActions = require('./viewer3d-actions');

var viewer3DActions = _interopRequireWildcard(_viewer3dActions);

var _linesActions = require('./lines-actions');

var linesActions = _interopRequireWildcard(_linesActions);

var _holesActions = require('./holes-actions');

var holesActions = _interopRequireWildcard(_holesActions);

var _sceneActions = require('./scene-actions');

var sceneActions = _interopRequireWildcard(_sceneActions);

var _verticesActions = require('./vertices-actions');

var verticesActions = _interopRequireWildcard(_verticesActions);

var _itemsActions = require('./items-actions');

var itemsActions = _interopRequireWildcard(_itemsActions);

var _areaActions = require('./area-actions');

var areaActions = _interopRequireWildcard(_areaActions);

var _groupsActions = require('./groups-actions');

var groupsActions = _interopRequireWildcard(_groupsActions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.projectActions = projectActions;
exports.viewer2DActions = viewer2DActions;
exports.viewer3DActions = viewer3DActions;
exports.linesActions = linesActions;
exports.holesActions = holesActions;
exports.sceneActions = sceneActions;
exports.verticesActions = verticesActions;
exports.itemsActions = itemsActions;
exports.areaActions = areaActions;
exports.groupsActions = groupsActions;
exports.default = {
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