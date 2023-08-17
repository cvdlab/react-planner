"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Content;
var _react = _interopRequireDefault(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _viewer2d = _interopRequireDefault(require("./viewer2d/viewer2d"));
var _viewer3d = _interopRequireDefault(require("./viewer3d/viewer3d"));
var _viewer3dFirstPerson = _interopRequireDefault(require("./viewer3d/viewer3d-first-person"));
var _catalogList = _interopRequireDefault(require("./catalog-view/catalog-list"));
var _projectConfigurator = _interopRequireDefault(require("./configurator/project-configurator"));
var constants = _interopRequireWildcard(require("../utils/constants"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function Content(_ref) {
  var width = _ref.width,
    height = _ref.height,
    state = _ref.state,
    customContents = _ref.customContents;
  var mode = state.get('mode');
  switch (mode) {
    case constants.MODE_3D_VIEW:
      return /*#__PURE__*/_react["default"].createElement(_viewer3d["default"], {
        state: state,
        width: width,
        height: height
      });

    // TODO(react-planner #16)
    // case constants.MODE_3D_FIRST_PERSON:
    //   return <Viewer3DFirstPerson state={state} width={width} height={height} />;

    case constants.MODE_VIEWING_CATALOG:
      return /*#__PURE__*/_react["default"].createElement(_catalogList["default"], {
        state: state,
        width: width,
        height: height
      });
    case constants.MODE_IDLE:
    case constants.MODE_2D_ZOOM_IN:
    case constants.MODE_2D_ZOOM_OUT:
    case constants.MODE_2D_PAN:
    case constants.MODE_WAITING_DRAWING_LINE:
    case constants.MODE_DRAGGING_LINE:
    case constants.MODE_DRAGGING_VERTEX:
    case constants.MODE_DRAGGING_ITEM:
    case constants.MODE_DRAWING_LINE:
    case constants.MODE_DRAWING_HOLE:
    case constants.MODE_DRAWING_ITEM:
    case constants.MODE_DRAGGING_HOLE:
    case constants.MODE_ROTATING_ITEM:
      return /*#__PURE__*/_react["default"].createElement(_viewer2d["default"], {
        state: state,
        width: width,
        height: height
      });
    case constants.MODE_CONFIGURING_PROJECT:
      return /*#__PURE__*/_react["default"].createElement(_projectConfigurator["default"], {
        width: width,
        height: height,
        state: state
      });
    default:
      if (customContents.hasOwnProperty(mode)) {
        var CustomContent = customContents[mode];
        return /*#__PURE__*/_react["default"].createElement(CustomContent, {
          width: width,
          height: height,
          state: state
        });
      } else {
        throw new Error("Mode ".concat(mode, " doesn't have a mapped content"));
      }
  }
}
Content.propTypes = {
  state: _propTypes["default"].object.isRequired,
  width: _propTypes["default"].number.isRequired,
  height: _propTypes["default"].number.isRequired
};