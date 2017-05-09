'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = undefined;
exports.default = appReducer;

var _constants = require('../constants');

var _viewer2dReducer = require('./viewer2d-reducer');

var _viewer2dReducer2 = _interopRequireDefault(_viewer2dReducer);

var _projectReducer = require('./project-reducer');

var _projectReducer2 = _interopRequireDefault(_projectReducer);

var _viewer3dReducer = require('./viewer3d-reducer');

var _viewer3dReducer2 = _interopRequireDefault(_viewer3dReducer);

var _holesReducer = require('./holes-reducer');

var _holesReducer2 = _interopRequireDefault(_holesReducer);

var _linesReducer = require('./lines-reducer');

var _linesReducer2 = _interopRequireDefault(_linesReducer);

var _sceneReducer = require('./scene-reducer');

var _sceneReducer2 = _interopRequireDefault(_sceneReducer);

var _verticesReducer = require('./vertices-reducer');

var _verticesReducer2 = _interopRequireDefault(_verticesReducer);

var _itemsReducer = require('./items-reducer');

var _itemsReducer2 = _interopRequireDefault(_itemsReducer);

var _areasReducer = require('./areas-reducer');

var _areasReducer2 = _interopRequireDefault(_areasReducer);

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialState = exports.initialState = new _models.State();

function appReducer(state, action) {
  state = state || initialState;

  if (_constants.PROJECT_ACTIONS[action.type]) return _projectReducer2.default.apply(undefined, arguments);
  if (_constants.VIEWER2D_ACTIONS[action.type]) return _viewer2dReducer2.default.apply(undefined, arguments);
  if (_constants.VIEWER3D_ACTIONS[action.type]) return _viewer3dReducer2.default.apply(undefined, arguments);
  if (_constants.ITEMS_ACTIONS[action.type]) return _itemsReducer2.default.apply(undefined, arguments);
  if (_constants.HOLE_ACTIONS[action.type]) return _holesReducer2.default.apply(undefined, arguments);
  if (_constants.LINE_ACTIONS[action.type]) return _linesReducer2.default.apply(undefined, arguments);
  if (_constants.AREA_ACTIONS[action.type]) return _areasReducer2.default.apply(undefined, arguments);
  if (_constants.SCENE_ACTIONS[action.type]) return _sceneReducer2.default.apply(undefined, arguments);
  if (_constants.VERTEX_ACTIONS[action.type]) return _verticesReducer2.default.apply(undefined, arguments);
  return state;
};