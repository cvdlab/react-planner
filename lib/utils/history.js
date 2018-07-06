'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.historyPop = exports.historyPush = undefined;

var _immutable = require('immutable');

var _immutablediff = require('immutablediff');

var _immutablediff2 = _interopRequireDefault(_immutablediff);

var _immutablepatch = require('immutablepatch');

var _immutablepatch2 = _interopRequireDefault(_immutablepatch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var historyPush = exports.historyPush = function historyPush(historyStructure, item) {
  if (historyStructure.last) {
    if (historyStructure.last.hashCode() !== item.hashCode()) {
      var toPush = new _immutable.Map({
        time: Date.now(),
        diff: (0, _immutablediff2.default)(historyStructure.last, item)
      });

      historyStructure = historyStructure.set('last', item).set('list', historyStructure.list.push(toPush));
    }
  } else {
    historyStructure = historyStructure.set('last', item);
  }
  return historyStructure;
};

var historyPop = exports.historyPop = function historyPop(historyStructure) {
  if (historyStructure.last) {
    if (historyStructure.list.size) {
      var last = historyStructure.first;
      for (var x = 0; x < historyStructure.list.size - 1; x++) {
        last = (0, _immutablepatch2.default)(last, historyStructure.list.get(x).get('diff'));
      }

      historyStructure = historyStructure.set('last', last).set('list', historyStructure.list.pop());
    }
  }
  return historyStructure;
};