//import { Map, List, fromJS } from 'immutable';
import { IDBroker } from '../utils/export';
/*import {
  nearestSnap,
  addLineSegmentSnap,
} from '../utils/snap';*/


class HorizontalGuide {
  static create(state, coordinate) {
    console.log('creating in HorizontalGuide class');

    let hGuideID = IDBroker.acquireID();

    state = state.setIn(['scene', 'guides', 'horizontal', hGuideID], coordinate);

    return { updatedState: state };
  }
};

class VerticalGuide {
};

class CircularGuide {
};

export {
  HorizontalGuide,
  VerticalGuide,
  CircularGuide
};

export default {
  HorizontalGuide,
  VerticalGuide,
  CircularGuide
};