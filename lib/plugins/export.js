"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Autosave", {
  enumerable: true,
  get: function get() {
    return _autosave["default"];
  }
});
Object.defineProperty(exports, "ConsoleDebugger", {
  enumerable: true,
  get: function get() {
    return _consoleDebugger["default"];
  }
});
Object.defineProperty(exports, "Keyboard", {
  enumerable: true,
  get: function get() {
    return _keyboard["default"];
  }
});
exports["default"] = void 0;
var _autosave = _interopRequireDefault(require("./autosave"));
var _keyboard = _interopRequireDefault(require("./keyboard"));
var _consoleDebugger = _interopRequireDefault(require("./console-debugger"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var _default = {
  Autosave: _autosave["default"],
  Keyboard: _keyboard["default"],
  ConsoleDebugger: _consoleDebugger["default"]
};
exports["default"] = _default;