'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReactPlannerViewer3dReducer = exports.ReactPlannerViewer2dReducer = exports.ReactPlannerVerticesReducer = exports.ReactPlannerSceneReducer = exports.ReactPlannerProjectReducer = exports.ReactPlannerGroupsReducer = exports.ReactPlannerLinesReducer = exports.ReactPlannerItemsReducer = exports.ReactPlannerHolesReducer = exports.ReactPlannerAreasReducer = undefined;

var _areasReducer = require('./areas-reducer');

var _areasReducer2 = _interopRequireDefault(_areasReducer);

var _holesReducer = require('./holes-reducer');

var _holesReducer2 = _interopRequireDefault(_holesReducer);

var _itemsReducer = require('./items-reducer');

var _itemsReducer2 = _interopRequireDefault(_itemsReducer);

var _linesReducer = require('./lines-reducer');

var _linesReducer2 = _interopRequireDefault(_linesReducer);

var _groupsReducer = require('./groups-reducer');

var _groupsReducer2 = _interopRequireDefault(_groupsReducer);

var _projectReducer = require('./project-reducer');

var _projectReducer2 = _interopRequireDefault(_projectReducer);

var _sceneReducer = require('./scene-reducer');

var _sceneReducer2 = _interopRequireDefault(_sceneReducer);

var _verticesReducer = require('./vertices-reducer');

var _verticesReducer2 = _interopRequireDefault(_verticesReducer);

var _viewer2dReducer = require('./viewer2d-reducer');

var _viewer2dReducer2 = _interopRequireDefault(_viewer2dReducer);

var _viewer3dReducer = require('./viewer3d-reducer');

var _viewer3dReducer2 = _interopRequireDefault(_viewer3dReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.ReactPlannerAreasReducer = _areasReducer2.default;
exports.ReactPlannerHolesReducer = _holesReducer2.default;
exports.ReactPlannerItemsReducer = _itemsReducer2.default;
exports.ReactPlannerLinesReducer = _linesReducer2.default;
exports.ReactPlannerGroupsReducer = _groupsReducer2.default;
exports.ReactPlannerProjectReducer = _projectReducer2.default;
exports.ReactPlannerSceneReducer = _sceneReducer2.default;
exports.ReactPlannerVerticesReducer = _verticesReducer2.default;
exports.ReactPlannerViewer2dReducer = _viewer2dReducer2.default;
exports.ReactPlannerViewer3dReducer = _viewer3dReducer2.default;
exports.default = {
  ReactPlannerAreasReducer: _areasReducer2.default,
  ReactPlannerHolesReducer: _holesReducer2.default,
  ReactPlannerItemsReducer: _itemsReducer2.default,
  ReactPlannerLinesReducer: _linesReducer2.default,
  ReactPlannerGroupsReducer: _groupsReducer2.default,
  ReactPlannerProjectReducer: _projectReducer2.default,
  ReactPlannerSceneReducer: _sceneReducer2.default,
  ReactPlannerVerticesReducer: _verticesReducer2.default,
  ReactPlannerViewer2dReducer: _viewer2dReducer2.default,
  ReactPlannerViewer3dReducer: _viewer3dReducer2.default
};