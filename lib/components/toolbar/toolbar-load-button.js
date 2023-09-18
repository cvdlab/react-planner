"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = ToolbarLoadButton;
var _react = _interopRequireWildcard(require("react"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var _load = _interopRequireDefault(require("./icons/load.svg"));
var _reactPlannerContext = _interopRequireDefault(require("../../utils/react-planner-context"));
var _toolbarButton = _interopRequireDefault(require("./toolbar-button"));
var _browser = require("../../utils/browser");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function ToolbarLoadButton(_ref) {
  var state = _ref.state;
  var _useContext = (0, _react.useContext)(_reactPlannerContext["default"]),
    projectActions = _useContext.projectActions,
    translator = _useContext.translator;
  var loadProjectFromFile = function loadProjectFromFile(event) {
    event.preventDefault();
    (0, _browser.browserUpload)().then(function (data) {
      projectActions.loadProject(JSON.parse(data));
    });
  };
  return /*#__PURE__*/_react["default"].createElement(_toolbarButton["default"], {
    active: false,
    tooltip: translator.t("Load project"),
    onClick: loadProjectFromFile
  }, /*#__PURE__*/_react["default"].createElement(_load["default"], null), "Load");
}
ToolbarLoadButton.propTypes = {
  state: _propTypes["default"].object.isRequired
};