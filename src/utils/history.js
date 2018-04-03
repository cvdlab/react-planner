import { Map, List, Record, Seq } from 'immutable';
import diff from 'immutablediff';
import patch from 'immutablepatch';

const isImmutable = obj => obj instanceof Seq;

export const historyPush = (historyStructure, item) => {
  if (historyStructure.last) {
    let differences = diff(historyStructure.last, item);
    if (differences.size) {
      let toPush = new Map({
        time: Date.now(),
        diff: differences
      });

      historyStructure = historyStructure
        .set('last', item)
        .set('list', historyStructure.list.push(toPush));
    }
  }
  else {
    historyStructure = historyStructure.set('last', item);
  }
  return historyStructure;
};

export const historyPop = (historyStructure) => {
  if (historyStructure.last) {
    if (historyStructure.list.size) {
      let last = historyStructure.first;
      for (let x = 0; x < historyStructure.list.size - 1; x++) {
        last = patch(last, historyStructure.list.get(x).get('diff'));
      }

      historyStructure = historyStructure
        .set('last', last)
        .set('list', historyStructure.list.pop());
    }
  }
  return historyStructure;
};
