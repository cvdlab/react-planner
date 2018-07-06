'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initialState = undefined;
exports.default = appReducer;

var _constants = require('../constants');

var _export = require('./export');

var _models = require('../models');

var initialState = exports.initialState = new _models.State();

function appReducer(state, action) {
  if (_constants.PROJECT_ACTIONS[action.type]) return _export.ReactPlannerProjectReducer.apply(undefined, arguments);
  if (_constants.VIEWER2D_ACTIONS[action.type]) return _export.ReactPlannerViewer2dReducer.apply(undefined, arguments);
  if (_constants.VIEWER3D_ACTIONS[action.type]) return _export.ReactPlannerViewer3dReducer.apply(undefined, arguments);
  if (_constants.ITEMS_ACTIONS[action.type]) return _export.ReactPlannerItemsReducer.apply(undefined, arguments);
  if (_constants.HOLE_ACTIONS[action.type]) return _export.ReactPlannerHolesReducer.apply(undefined, arguments);
  if (_constants.LINE_ACTIONS[action.type]) return _export.ReactPlannerLinesReducer.apply(undefined, arguments);
  if (_constants.AREA_ACTIONS[action.type]) return _export.ReactPlannerAreasReducer.apply(undefined, arguments);
  if (_constants.GROUP_ACTIONS[action.type]) return _export.ReactPlannerGroupsReducer.apply(undefined, arguments);
  if (_constants.SCENE_ACTIONS[action.type]) return _export.ReactPlannerSceneReducer.apply(undefined, arguments);
  if (_constants.VERTEX_ACTIONS[action.type]) return _export.ReactPlannerVerticesReducer.apply(undefined, arguments);

  return state || initialState;
};