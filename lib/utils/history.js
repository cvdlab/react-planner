"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.historyPush = exports.historyPop = void 0;
var _immutable = require("immutable");
var _immutablediff = _interopRequireDefault(require("immutablediff"));
var _immutablepatch = _interopRequireDefault(require("immutablepatch"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var historyPush = function historyPush(historyStructure, item) {
  if (historyStructure.last) {
    if (historyStructure.last.hashCode() !== item.hashCode()) {
      var toPush = new _immutable.Map({
        time: Date.now(),
        diff: (0, _immutablediff["default"])(historyStructure.last, item)
      });
      historyStructure = historyStructure.set('last', item).set('list', historyStructure.list.push(toPush));
    }
  } else {
    historyStructure = historyStructure.set('last', item);
  }
  return historyStructure;
};
exports.historyPush = historyPush;
var historyPop = function historyPop(historyStructure) {
  if (historyStructure.last) {
    if (historyStructure.list.size) {
      var last = historyStructure.first;
      for (var x = 0; x < historyStructure.list.size - 1; x++) {
        last = (0, _immutablepatch["default"])(last, historyStructure.list.get(x).get('diff'));
      }
      historyStructure = historyStructure.set('last', last).set('list', historyStructure.list.pop());
    }
  }
  return historyStructure;
};
exports.historyPop = historyPop;