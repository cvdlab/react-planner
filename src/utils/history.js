import { Map } from 'immutable';
import diff from 'immutablediff';
import patch from 'immutablepatch';

export const historyPush = (historyStructure, item) => {
  if (historyStructure.last) {
    if (historyStructure.last.hashCode() !== item.hashCode()) {
      let toPush = new Map({
        time: Date.now(),
        diff: diff(historyStructure.last, item)
      });

      historyStructure = historyStructure
        .set('last', item)
        .set('undoList', historyStructure.undoList.push(toPush));
    }
  }
  else {
    historyStructure = historyStructure.set('last', item);
  }
  historyStructure = historyStructure.set('redoList', historyStructure.redoList.clear());
  return historyStructure;
};

export const historyPop = (historyStructure) => {
  if (historyStructure.last) {
    if (historyStructure.undoList.size) {
      let last = historyStructure.first;
      for (let x = 0; x < historyStructure.undoList.size - 1; x++) {
        last = patch(last, historyStructure.undoList.get(x).get('diff'));
      }

      historyStructure = historyStructure
        .set('last', last)
        .set('undoList', historyStructure.undoList.pop());
    }
  }
  const lastUndo = historyStructure.undoList.last();
  if (lastUndo) {
    historyStructure = historyStructure.set('redoList', historyStructure.redoList.push(lastUndo));
  }
  return historyStructure;
};

export const historyRedo = (historyStructure) => {
  if (historyStructure.redoList.size > 0) {
    const lastRedoDiff = historyStructure.redoList.last().get('diff');
    // Apply the last diff from the redoList to the last known state
    const redoState = patch(historyStructure.last, lastRedoDiff);
    historyStructure = historyStructure
      .set('last', redoState)
      .update('undoList', undoList => undoList.push(new Map({
        time: Date.now(),
        diff: lastRedoDiff
      })))
      .update('redoList', redoList => redoList.pop());
  }
  return historyStructure;
};