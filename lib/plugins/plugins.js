'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _autosave = require('./autosave');

var _autosave2 = _interopRequireDefault(_autosave);

var _keyboard = require('./keyboard');

var _keyboard2 = _interopRequireDefault(_keyboard);

var _consoleDebugger = require('./console-debugger');

var _consoleDebugger2 = _interopRequireDefault(_consoleDebugger);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = { Autosave: _autosave2.default, Keyboard: _keyboard2.default, ConsoleDebugger: _consoleDebugger2.default };