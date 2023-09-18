"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.historyRedo = exports.historyPush = exports.historyPop = void 0;
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
      historyStructure = historyStructure.set('last', item).set('undoList', historyStructure.undoList.push(toPush));
    }
  } else {
    historyStructure = historyStructure.set('last', item);
  }
  historyStructure = historyStructure.set('redoList', historyStructure.redoList.clear());
  return historyStructure;
};
exports.historyPush = historyPush;
var historyPop = function historyPop(historyStructure) {
  if (historyStructure.last) {
    if (historyStructure.undoList.size) {
      var last = historyStructure.first;
      for (var x = 0; x < historyStructure.undoList.size - 1; x++) {
        last = (0, _immutablepatch["default"])(last, historyStructure.undoList.get(x).get('diff'));
      }
      historyStructure = historyStructure.set('last', last).set('undoList', historyStructure.undoList.pop());
    }
  }
  var lastUndo = historyStructure.undoList.last();
  if (lastUndo) {
    historyStructure = historyStructure.set('redoList', historyStructure.redoList.push(lastUndo));
  }
  return historyStructure;
};
exports.historyPop = historyPop;
var historyRedo = function historyRedo(historyStructure) {
  if (historyStructure.redoList.size > 0) {
    var lastRedoDiff = historyStructure.redoList.last().get('diff');
    // Apply the last diff from the redoList to the last known state
    var redoState = (0, _immutablepatch["default"])(historyStructure.last, lastRedoDiff);
    historyStructure = historyStructure.set('last', redoState).update('undoList', function (undoList) {
      return undoList.push(new _immutable.Map({
        time: Date.now(),
        diff: lastRedoDiff
      }));
    }).update('redoList', function (redoList) {
      return redoList.pop();
    });
  }
  return historyStructure;
};
exports.historyRedo = historyRedo;