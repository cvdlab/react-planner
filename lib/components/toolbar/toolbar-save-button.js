"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ToolbarSaveButton;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _fa = require("react-icons/fa");
var _reactPlannerContext = _interopRequireDefault(require("../../utils/react-planner-context"));
var _toolbarButton = _interopRequireDefault(require("./toolbar-button"));
var _browser = require("../../utils/browser");
var _export = require("../../class/export");
var _OBJExporter = require("./OBJExporter");
var _rcDropdown = _interopRequireDefault(require("rc-dropdown"));
var _rcMenu = _interopRequireWildcard(require("rc-menu"));
var _sceneCreator = require("../viewer3d/scene-creator");
var Three = _interopRequireWildcard(require("three"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ToolbarSaveButton(_ref) {
  var state = _ref.state;
  var context = (0, _react.useContext)(_reactPlannerContext["default"]);
  var translator = context.translator,
    catalog = context.catalog;
  var saveProjectToJSONFile = function saveProjectToJSONFile() {
    state = _export.Project.unselectAll(state).updatedState;
    (0, _browser.browserDownload)(JSON.stringify(state.get('scene').toJS()), "json");
  };
  var saveProjectToObjFile = function saveProjectToObjFile() {
    var objExporter = new _OBJExporter.OBJExporter();
    state = _export.Project.unselectAll(state).updatedState;
    var actions = {
      areaActions: context.areaActions,
      holesActions: context.holesActions,
      itemsActions: context.itemsActions,
      linesActions: context.linesActions,
      projectActions: context.projectActions
    };
    var scene = state.get('scene');
    var planData = (0, _sceneCreator.parseData)(scene, actions, catalog);
    setTimeout(function () {
      var plan = planData.plan;
      plan.position.set(plan.position.x, 0.1, plan.position.z);
      var scene3D = new Three.Scene();
      scene3D.add(planData.plan);
      (0, _browser.browserDownload)(objExporter.parse(scene3D), "obj");
    });
  };
  var menu = /*#__PURE__*/_react["default"].createElement(_rcMenu["default"], {
    style: {
      width: 140
    }
  }, /*#__PURE__*/_react["default"].createElement(_rcMenu.Item, {
    key: "1",
    onClick: saveProjectToJSONFile
  }, "JSON"), /*#__PURE__*/_react["default"].createElement(_rcMenu.Item, {
    key: "2",
    onClick: saveProjectToObjFile
  }, "OBJ"));
  return /*#__PURE__*/_react["default"].createElement(_rcDropdown["default"], {
    trigger: ['click'],
    overlay: menu,
    animation: "slide-up",
    placement: "topLeft"
  }, /*#__PURE__*/_react["default"].createElement(_toolbarButton["default"], {
    active: false,
    tooltip: translator.t('Save project')
  }, /*#__PURE__*/_react["default"].createElement(_fa.FaSave, null)));
}
ToolbarSaveButton.propTypes = {
  state: _propTypes["default"].object.isRequired
};