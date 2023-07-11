"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "ReactPlannerAreasReducer", {
  enumerable: true,
  get: function get() {
    return _areasReducer["default"];
  }
});
Object.defineProperty(exports, "ReactPlannerGroupsReducer", {
  enumerable: true,
  get: function get() {
    return _groupsReducer["default"];
  }
});
Object.defineProperty(exports, "ReactPlannerHolesReducer", {
  enumerable: true,
  get: function get() {
    return _holesReducer["default"];
  }
});
Object.defineProperty(exports, "ReactPlannerItemsReducer", {
  enumerable: true,
  get: function get() {
    return _itemsReducer["default"];
  }
});
Object.defineProperty(exports, "ReactPlannerLinesReducer", {
  enumerable: true,
  get: function get() {
    return _linesReducer["default"];
  }
});
Object.defineProperty(exports, "ReactPlannerProjectReducer", {
  enumerable: true,
  get: function get() {
    return _projectReducer["default"];
  }
});
Object.defineProperty(exports, "ReactPlannerSceneReducer", {
  enumerable: true,
  get: function get() {
    return _sceneReducer["default"];
  }
});
Object.defineProperty(exports, "ReactPlannerVerticesReducer", {
  enumerable: true,
  get: function get() {
    return _verticesReducer["default"];
  }
});
Object.defineProperty(exports, "ReactPlannerViewer2dReducer", {
  enumerable: true,
  get: function get() {
    return _viewer2dReducer["default"];
  }
});
Object.defineProperty(exports, "ReactPlannerViewer3dReducer", {
  enumerable: true,
  get: function get() {
    return _viewer3dReducer["default"];
  }
});
exports["default"] = void 0;
var _areasReducer = _interopRequireDefault(require("./areas-reducer"));
var _holesReducer = _interopRequireDefault(require("./holes-reducer"));
var _itemsReducer = _interopRequireDefault(require("./items-reducer"));
var _linesReducer = _interopRequireDefault(require("./lines-reducer"));
var _groupsReducer = _interopRequireDefault(require("./groups-reducer"));
var _projectReducer = _interopRequireDefault(require("./project-reducer"));
var _sceneReducer = _interopRequireDefault(require("./scene-reducer"));
var _verticesReducer = _interopRequireDefault(require("./vertices-reducer"));
var _viewer2dReducer = _interopRequireDefault(require("./viewer2d-reducer"));
var _viewer3dReducer = _interopRequireDefault(require("./viewer3d-reducer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = {
  ReactPlannerAreasReducer: _areasReducer["default"],
  ReactPlannerHolesReducer: _holesReducer["default"],
  ReactPlannerItemsReducer: _itemsReducer["default"],
  ReactPlannerLinesReducer: _linesReducer["default"],
  ReactPlannerGroupsReducer: _groupsReducer["default"],
  ReactPlannerProjectReducer: _projectReducer["default"],
  ReactPlannerSceneReducer: _sceneReducer["default"],
  ReactPlannerVerticesReducer: _verticesReducer["default"],
  ReactPlannerViewer2dReducer: _viewer2dReducer["default"],
  ReactPlannerViewer3dReducer: _viewer3dReducer["default"]
};
exports["default"] = _default;