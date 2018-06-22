import { IDBroker } from '../utils/export';

class HorizontalGuide {
  static create(state, coordinate) {
    let hGuideID = IDBroker.acquireID();
    state = state.setIn(['scene', 'guides', 'horizontal', hGuideID], coordinate);

    return { updatedState: state };
  }

  static remove(state, hGuideID) {
    state = state.deleteIn(['scene', 'guides', 'horizontal', hGuideID]);

    return { updatedState: state };
  }
};

class VerticalGuide {
  static create(state, coordinate) {
    let vGuideID = IDBroker.acquireID();
    state = state.setIn(['scene', 'guides', 'vertical', vGuideID], coordinate);

    return { updatedState: state };
  }

  static remove(state, vGuideID) {
    state = state.deleteIn(['scene', 'guides', 'vertical', vGuideID]);

    return { updatedState: state };
  }
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
