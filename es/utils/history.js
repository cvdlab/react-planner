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
      historyStructure = historyStructure.set('last', item).set('undoList', historyStructure.undoList.push(toPush));
    }
  } else {
    historyStructure = historyStructure.set('last', item);
  }
  historyStructure = historyStructure.set('redoList', historyStructure.redoList.clear());
  return historyStructure;
};
export var historyPop = function historyPop(historyStructure) {
  if (historyStructure.last) {
    if (historyStructure.undoList.size) {
      var last = historyStructure.first;
      for (var x = 0; x < historyStructure.undoList.size - 1; x++) {
        last = patch(last, historyStructure.undoList.get(x).get('diff'));
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
export var historyRedo = function historyRedo(historyStructure) {
  if (historyStructure.redoList.size > 0) {
    var lastRedoDiff = historyStructure.redoList.last().get('diff');
    // Apply the last diff from the redoList to the last known state
    var redoState = patch(historyStructure.last, lastRedoDiff);
    historyStructure = historyStructure.set('last', redoState).update('undoList', function (undoList) {
      return undoList.push(new Map({
        time: Date.now(),
        diff: lastRedoDiff
      }));
    }).update('redoList', function (redoList) {
      return redoList.pop();
    });
  }
  return historyStructure;
};