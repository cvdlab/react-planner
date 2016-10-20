'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = undefined;
exports.default = appReducers;

var _constants = require('../constants');

var constants = _interopRequireWildcard(_constants);

var _viewer2dReducer = require('./viewer2d-reducer');

var _viewer2dReducer2 = _interopRequireDefault(_viewer2dReducer);

var _editingReducer = require('./editing-reducer');

var _editingReducer2 = _interopRequireDefault(_editingReducer);

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

var _models = require('../models');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var initialState = exports.initialState = new _models.State();

function appReducers(state, action) {
  state = state || initialState;

  switch (action.type) {
    case constants.NEW_PROJECT:
    case constants.LOAD_PROJECT:
    case constants.SAVE_PROJECT:
    case constants.LOAD_PROJECT_FROM_FILE:
    case constants.SAVE_PROJECT_TO_FILE:
    case constants.OPEN_CATALOG:
      return (0, _projectReducer2.default)(state, action);

    case constants.UPDATE_2D_CAMERA:
    case constants.SELECT_TOOL_PAN:
    case constants.SELECT_TOOL_ZOOM_IN:
    case constants.SELECT_TOOL_ZOOM_OUT:
      return (0, _viewer2dReducer2.default)(state, action);

    case constants.SELECT_TOOL_EDIT:
    case constants.SELECT_LINE:
    case constants.SELECT_AREA:
    case constants.SELECT_HOLE:
    case constants.SELECT_ITEM:
    case constants.UNSELECT_ALL:
    case constants.SET_PROPERTIES:
    case constants.REMOVE:
      return (0, _editingReducer2.default)(state, action);

    case constants.SELECT_TOOL_3D_VIEW:
    case constants.SELECT_TOOL_3D_FIRST_PERSON:
      return (0, _viewer3dReducer2.default)(state, action);

    case constants.SELECT_TOOL_DRAWING_LINE:
    case constants.BEGIN_DRAWING_LINE:
    case constants.UPDATE_DRAWING_LINE:
    case constants.END_DRAWING_LINE:
    case constants.BEGIN_DRAGGING_LINE:
    case constants.UPDATE_DRAGGING_LINE:
    case constants.END_DRAGGING_LINE:
      return (0, _linesReducer2.default)(state, action);

    case constants.SELECT_TOOL_DRAWING_HOLE:
    case constants.UPDATE_DRAWING_HOLE:
    case constants.END_DRAWING_HOLE:
    case constants.BEGIN_DRAGGING_HOLE:
    case constants.UPDATE_DRAGGING_HOLE:
    case constants.END_DRAGGING_HOLE:
      return (0, _holesReducer2.default)(state, action);

    case constants.ADD_LAYER:
    case constants.SET_LAYER_PROPERTIES:
    case constants.SELECT_LAYER:
      return (0, _sceneReducer2.default)(state, action);

    case constants.BEGIN_DRAGGING_VERTEX:
    case constants.UPDATE_DRAGGING_VERTEX:
    case constants.END_DRAGGING_VERTEX:
      return (0, _verticesReducer2.default)(state, action);

    case constants.SELECT_TOOL_DRAWING_ITEM:
    case constants.UPDATE_DRAWING_ITEM:
    case constants.END_DRAWING_ITEM:
    case constants.BEGIN_DRAGGING_ITEM:
    case constants.UPDATE_DRAGGING_ITEM:
    case constants.END_DRAGGING_ITEM:
    case constants.BEGIN_ROTATING_ITEM:
    case constants.UPDATE_ROTATING_ITEM:
    case constants.END_ROTATING_ITEM:
      return (0, _itemsReducer2.default)(state, action);

    default:
      return state;
  }
};