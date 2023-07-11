"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Content", {
  enumerable: true,
  get: function get() {
    return _content["default"];
  }
});
Object.defineProperty(exports, "FooterBarComponents", {
  enumerable: true,
  get: function get() {
    return _export3["default"];
  }
});
Object.defineProperty(exports, "SidebarComponents", {
  enumerable: true,
  get: function get() {
    return _export2["default"];
  }
});
Object.defineProperty(exports, "StyleComponents", {
  enumerable: true,
  get: function get() {
    return _export5["default"];
  }
});
Object.defineProperty(exports, "ToolbarComponents", {
  enumerable: true,
  get: function get() {
    return _export["default"];
  }
});
Object.defineProperty(exports, "Viewer2DComponents", {
  enumerable: true,
  get: function get() {
    return _export4["default"];
  }
});
exports["default"] = void 0;
var _export = _interopRequireDefault(require("./toolbar/export"));
var _content = _interopRequireDefault(require("./content"));
var _export2 = _interopRequireDefault(require("./sidebar/export"));
var _export3 = _interopRequireDefault(require("./footerbar/export"));
var _export4 = _interopRequireDefault(require("./viewer2d/export"));
var _export5 = _interopRequireDefault(require("./style/export"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = {
  ToolbarComponents: _export["default"],
  Content: _content["default"],
  SidebarComponents: _export2["default"],
  FooterBarComponents: _export3["default"],
  Viewer2DComponents: _export4["default"],
  StyleComponents: _export5["default"]
};
exports["default"] = _default;