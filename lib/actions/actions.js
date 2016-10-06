'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _projectActions = require('../actions/project-actions');

var projectActions = _interopRequireWildcard(_projectActions);

var _viewer2dActions = require('../actions/viewer2d-actions');

var viewer2DActions = _interopRequireWildcard(_viewer2dActions);

var _editingActions = require('../actions/editing-actions');

var editingActions = _interopRequireWildcard(_editingActions);

var _viewer3dActions = require('../actions/viewer3d-actions');

var viewer3DActions = _interopRequireWildcard(_viewer3dActions);

var _linesActions = require('../actions/lines-actions');

var linesActions = _interopRequireWildcard(_linesActions);

var _holesActions = require('../actions/holes-actions');

var holesActions = _interopRequireWildcard(_holesActions);

var _sceneActions = require('../actions/scene-actions');

var sceneActions = _interopRequireWildcard(_sceneActions);

var _verticesActions = require('../actions/vertices-actions');

var verticesActions = _interopRequireWildcard(_verticesActions);

var _itemsActions = require('../actions/items-actions');

var itemsActions = _interopRequireWildcard(_itemsActions);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

exports.default = {
  projectActions: projectActions,
  viewer2DActions: viewer2DActions,
  editingActions: editingActions,
  viewer3DActions: viewer3DActions,
  linesActions: linesActions,
  holesActions: holesActions,
  sceneActions: sceneActions,
  verticesActions: verticesActions,
  itemsActions: itemsActions
};