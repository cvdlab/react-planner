"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = appReducer;
exports.initialState = void 0;
var _constants = require("../constants");
var _export = require("./export");
var _models = require("../models");
var initialState = new _models.State();
exports.initialState = initialState;
function appReducer(state, action) {
  if (_constants.PROJECT_ACTIONS[action.type]) return _export.ReactPlannerProjectReducer.apply(void 0, arguments);
  if (_constants.VIEWER2D_ACTIONS[action.type]) return _export.ReactPlannerViewer2dReducer.apply(void 0, arguments);
  if (_constants.VIEWER3D_ACTIONS[action.type]) return _export.ReactPlannerViewer3dReducer.apply(void 0, arguments);
  if (_constants.ITEMS_ACTIONS[action.type]) return _export.ReactPlannerItemsReducer.apply(void 0, arguments);
  if (_constants.HOLE_ACTIONS[action.type]) return _export.ReactPlannerHolesReducer.apply(void 0, arguments);
  if (_constants.LINE_ACTIONS[action.type]) return _export.ReactPlannerLinesReducer.apply(void 0, arguments);
  if (_constants.AREA_ACTIONS[action.type]) return _export.ReactPlannerAreasReducer.apply(void 0, arguments);
  if (_constants.GROUP_ACTIONS[action.type]) return _export.ReactPlannerGroupsReducer.apply(void 0, arguments);
  if (_constants.SCENE_ACTIONS[action.type]) return _export.ReactPlannerSceneReducer.apply(void 0, arguments);
  if (_constants.VERTEX_ACTIONS[action.type]) return _export.ReactPlannerVerticesReducer.apply(void 0, arguments);
  return state || initialState;
}
;