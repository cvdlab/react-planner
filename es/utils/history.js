import { Map } from 'immutable';
import diff from 'immutablediff';
import patch from 'immutablepatch';

export var historyPush = function historyPush(historyStructure, item) {
  if (historyStructure.last) {
    if (historyStructure.last.hashCode() !== item.hashCode()) {
      var toPush = new Map({
        time: Date.now(),
        diff: diff(historyStructure.last, item)
      });

      historyStructure = historyStructure.set('last', item).set('list', historyStructure.list.push(toPush));
    }
  } else {
    historyStructure = historyStructure.set('last', item);
  }
  return historyStructure;
};

export var historyPop = function historyPop(historyStructure) {
  if (historyStructure.last) {
    if (historyStructure.list.size) {
      var last = historyStructure.first;
      for (var x = 0; x < historyStructure.list.size - 1; x++) {
        last = patch(last, historyStructure.list.get(x).get('diff'));
      }

      historyStructure = historyStructure.set('last', last).set('list', historyStructure.list.pop());
    }
  }
  return historyStructure;
};